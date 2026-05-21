"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type DarkSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
};

export function DarkSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "انتخاب کنید",
  required,
}: DarkSelectProps) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const display = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div ref={wrapRef} className="res-field res-select-wrap">
      <label className="res-label" htmlFor={id}>
        {label}
      </label>

      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(
          "res-input res-select-trigger",
          open && "res-select-trigger--open"
        )}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={cn("truncate", isPlaceholder && "text-white/35")}>
          {display}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180 text-gold"
          )}
          aria-hidden
        />
      </button>

      {/* برای اعتبارسنجی فرم */}
      <select
        tabIndex={-1}
        aria-hidden
        className="sr-only"
        value={value}
        required={required}
        onChange={() => {}}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="res-select-menu"
        >
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <li key={opt} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "res-select-option",
                    selected && "res-select-option--active"
                  )}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
