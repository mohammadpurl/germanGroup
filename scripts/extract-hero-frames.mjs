/**
 * Extract cinematic hero frame sequences with ffmpeg.
 *
 * Usage:
 *   node scripts/extract-hero-frames.mjs
 *   node scripts/extract-hero-frames.mjs path/to/german-group-hero.mov
 *
 * Without a source file, generates a dark cinematic demo MP4 first.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FPS = 8;
const QUALITY = 65;
const DURATION = 22;

const sourceArg = process.argv[2];
const defaultSource = path.join(ROOT, "public/video/hero-source.mp4");
const demoSource = path.join(ROOT, "public/video/hero-demo-source.mp4");
const sourcePath = sourceArg ? path.resolve(sourceArg) : defaultSource;

const desktopDir = path.join(ROOT, "public/video_frames");
const mobileDir = path.join(ROOT, "public/video/frames-mobile");
const posterPath = path.join(ROOT, "public/video_frames/f_001.webp");

function runFfmpeg(args) {
  console.log(`\n> ffmpeg ${args.join(" ")}\n`);
  const result = spawnSync("ffmpeg", args, { stdio: "inherit", cwd: ROOT });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function resolveSource() {
  if (sourceArg && fs.existsSync(sourcePath)) {
    return sourcePath;
  }

  if (fs.existsSync(defaultSource)) {
    return defaultSource;
  }

  console.log("No hero-source.mp4 found — generating cinematic demo source…");
  ensureDir(path.dirname(demoSource));

  runFfmpeg([
    "-y",
    "-f",
    "lavfi",
    "-i",
    `testsrc2=size=1280x720:rate=30:duration=${DURATION}`,
    "-vf",
    "eq=brightness=-0.88:contrast=0.55:saturation=0.35,hue=s=0.6",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-an",
    demoSource,
  ]);

  return demoSource;
}

function extractDesktop(input) {
  ensureDir(desktopDir);

  runFfmpeg([
    "-y",
    "-i",
    input,
    "-vf",
    `fps=${FPS},scale=1280:720:flags=lanczos`,
    "-c:v",
    "libwebp",
    "-quality",
    String(QUALITY),
    "-compression_level",
    "6",
    "-loop",
    "0",
    "-an",
    path.join(desktopDir, "f_%03d.webp"),
  ]);
}

function extractMobile(input) {
  ensureDir(mobileDir);

  runFfmpeg([
    "-y",
    "-i",
    input,
    "-vf",
    `fps=${FPS},crop=720:in_h:(in_w-720)/2:0,scale=720:1280:flags=lanczos`,
    "-c:v",
    "libwebp",
    "-quality",
    String(QUALITY),
    "-compression_level",
    "6",
    "-loop",
    "0",
    "-an",
    path.join(mobileDir, "f_%03d.webp"),
  ]);
}

function extractPoster(input) {
  ensureDir(path.dirname(posterPath));

  runFfmpeg([
    "-y",
    "-i",
    input,
    "-vf",
    "scale=1280:720:flags=lanczos",
    "-frames:v",
    "1",
    "-c:v",
    "libwebp",
    "-quality",
    "80",
    posterPath,
  ]);
}

function countFrames(dir) {
  return fs.readdirSync(dir).filter((file) => file.endsWith(".webp")).length;
}

const input = resolveSource();
extractDesktop(input);
extractMobile(input);
extractPoster(input);

const desktopCount = countFrames(desktopDir);
const mobileCount = countFrames(mobileDir);

console.log("\nDone.");
console.log(`Desktop frames: ${desktopCount} → public/video_frames/`);
console.log(`Mobile frames:  ${mobileCount} → public/video/frames-mobile/`);
console.log(`Poster:         ${posterPath}`);
console.log(
  `\nUpdate HERO_FRAME_COUNT in lib/hero-cinematic-config.ts if not ${desktopCount}.`
);
