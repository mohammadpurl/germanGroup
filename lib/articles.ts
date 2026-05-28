import type { Locale } from "./i18n";

export type LocalizedArticle = {
  title: string;
  excerpt: string;
  content: string[];
};

export type Article = {
  slug: string;
  category: "maintenance" | "diagnostics" | "repair";
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
  translations: Record<Locale, LocalizedArticle>;
};

export const articles: Article[] = [
  {
    slug: "bmw-engine-overheating-diagnosis",
    category: "diagnostics",
    readingMinutes: 6,
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-15",
    translations: {
      fa: {
        title: "نشانه‌های اولیه داغ کردن موتور BMW و روش تشخیص دقیق",
        excerpt:
          "بالا رفتن دمای موتور همیشه از رادیاتور شروع نمی‌شود؛ ترموستات، واترپمپ، هواگیری ناقص و نشتی مخفی هم می‌توانند عامل باشند.",
        content: [
          "داغ کردن موتور در خودروهای BMW معمولاً فقط یک ایراد ساده در سیستم خنک‌کاری نیست. در بسیاری از موارد، مشکل از مجموعه‌ای از نشتی‌های کوچک، خرابی واترپمپ برقی، ترموستات ضعیف، یا حتی خطای سنسور دما شروع می‌شود و اگر زود تشخیص داده نشود، به واشر سرسیلندر یا تاب برداشتن قطعات منتهی می‌شود.",
          "اولین مرحله در German Group همیشه دیاگ کامل و بررسی داده‌های زنده است. ما دمای واقعی آب، رفتار فن، عملکرد واترپمپ و کدهای ذخیره‌شده ECU را کنار هم تحلیل می‌کنیم تا بین خطای سنسور و ایراد مکانیکی تفاوت بگذاریم.",
          "در مرحله بعد، سیستم خنک‌کاری تحت تست فشار قرار می‌گیرد. بسیاری از BMWها در ظاهر نشتی ندارند، اما زیر فشار مشخص می‌شود که مخزن انبساط، اتصالات یا هوزینگ ترموستات در حال از دست دادن فشار هستند.",
          "اگر خودرو سابقه جوش آوردن داشته باشد، تست کمپرس و بررسی گازهای احتراق در سیستم آب ضروری است. این مرحله کمک می‌کند قبل از باز کردن موتور، درباره سلامت واشر سرسیلندر تصمیم دقیق‌تری بگیریم.",
          "جمع‌بندی: اگر آمپر یا دمای موتور BMW شما ناپایدار شده، ادامه رانندگی تصمیم پرهزینه‌ای است. تشخیص درست در مراحل اولیه، جلوی خرابی‌های چندبرابری را می‌گیرد.",
        ],
      },
      en: {
        title: "Early BMW Engine Overheating Signs and How to Diagnose Them",
        excerpt:
          "Rising engine temperature is not always just a radiator problem. Thermostats, electric water pumps, hidden leaks, and trapped air can all be involved.",
        content: [
          "Engine overheating in BMW vehicles is rarely a single-part failure. In many cases the real problem is a chain of cooling-system weakness: a tired thermostat, failing electric water pump, hidden pressure loss, or misleading sensor readings. Left unchecked, it can escalate into head gasket failure or cylinder-head distortion.",
          "At German Group, the first step is always a full diagnostic session with live data. We review coolant temperature behavior, fan logic, pump performance, and stored ECU faults together so we can separate a sensor issue from a real mechanical fault.",
          "We then pressure-test the cooling system. Many BMWs show no obvious external leak at rest, but under test pressure the expansion tank, thermostat housing, or a hose joint reveals the actual loss point.",
          "If the car has already overheated badly, compression testing and combustion-gas checks become essential. That allows a more accurate decision before major engine disassembly is considered.",
          "Bottom line: once temperature becomes unstable, continuing to drive is a costly gamble. Early diagnosis prevents much larger engine-repair bills.",
        ],
      },
    },
  },
  {
    slug: "dsg-gearbox-warning-signs",
    category: "repair",
    readingMinutes: 5,
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-16",
    translations: {
      fa: {
        title: "۵ هشدار مهم قبل از خرابی جدی گیربکس DSG",
        excerpt:
          "لرزش، تأخیر در تعویض دنده و هشدارهای مقطعی، معمولاً آخرین اخطارها قبل از خرابی جدی DSG هستند.",
        content: [
          "گیربکس‌های DSG به‌خاطر سرعت تعویض دنده و عملکرد اسپرت شناخته می‌شوند، اما نسبت به کیفیت روغن، دمای کارکرد و کالیبراسیون نرم‌افزاری حساس هستند. بسیاری از خرابی‌های پرهزینه، هفته‌ها قبل از توقف کامل خودرو نشانه می‌دهند.",
          "اولین هشدار معمولاً تأخیر کوتاه هنگام درگیر شدن دنده یا لرزش در شروع حرکت است. این علائم می‌توانند به فرسودگی کلاچ، مشکل مکاترونیک یا افت فشار روغن مربوط باشند.",
          "نشانه دوم، کوبش یا تعویض دنده خشن در دنده‌های پایین است. در این مرحله، فقط تعویض قطعه راه‌حل نیست؛ باید داده‌های گیربکس، دمای روغن، خطاهای ثبت‌شده و نسخه نرم‌افزار کنترل هم‌زمان بررسی شوند.",
          "هشدار سوم، ورود مقطعی خودرو به حالت اضطراری است. اگر پیغام گیربکس ظاهر و ناپدید می‌شود، نباید منتظر ماند تا ایراد دائمی شود. بسیاری از مشتریان زمانی مراجعه می‌کنند که دیگر خودرو امکان حرکت ایمن ندارد.",
          "در German Group، تشخیص DSG فقط با تست جاده‌ای انجام نمی‌شود. ما وضعیت روغن، adaptation values، عملکرد سلوئیدها و سلامت مکاترونیک را به‌صورت مرحله‌ای بررسی می‌کنیم تا تعمیر هدفمند و قابل پیش‌بینی باشد.",
        ],
      },
      en: {
        title: "5 Warning Signs Before a Serious DSG Gearbox Failure",
        excerpt:
          "Shuddering, delayed engagement, and intermittent gearbox alerts are often the last warnings before a major DSG failure.",
        content: [
          "DSG gearboxes are known for fast shifts and sharp response, but they are also sensitive to oil condition, temperature, and calibration. Many expensive failures give warning signs weeks before the car becomes undriveable.",
          "The first warning is often hesitation when selecting drive or a shudder during initial take-off. That can point to clutch wear, mechatronic issues, or unstable hydraulic pressure.",
          "A second sign is harsh low-gear shifting. At that stage, replacing a part blindly is not enough. Gearbox data, fault memory, oil temperature, and control-software version all need to be assessed together.",
          "A third red flag is intermittent limp mode. If the gearbox warning appears and disappears, do not wait for a total failure. Many owners arrive only after the car can no longer move safely.",
          "At German Group, DSG diagnosis is not limited to a road test. We check oil condition, adaptation values, solenoid behavior, and mechatronic health so the repair plan is precise and predictable.",
        ],
      },
    },
  },
  {
    slug: "how-german-car-diagnostics-works",
    category: "diagnostics",
    readingMinutes: 7,
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-17",
    translations: {
      fa: {
        title: "دیاگ حرفه‌ای خودروهای آلمانی دقیقاً چگونه انجام می‌شود؟",
        excerpt:
          "دیاگ واقعی فقط خواندن خطا نیست؛ تحلیل داده‌های زنده، تست قطعات و تطبیق رفتار ECU با شرایط واقعی خودرو است.",
        content: [
          "بسیاری از رانندگان فکر می‌کنند دیاگ یعنی وصل کردن دستگاه و پاک کردن چند خطا. در خودروهای آلمانی، این فقط بخش کوچکی از فرایند است. خطاها بدون تحلیل زمینه‌ای، اغلب به تعویض اشتباه قطعه منجر می‌شوند.",
          "مرحله اول، اسکن کامل همه یونیت‌ها است. ما فقط موتور را نمی‌خوانیم؛ گیربکس، ABS، بدنه، سیستم تهویه و ماژول‌های ارتباطی هم بررسی می‌شوند، چون گاهی ریشه ایراد در بخشی غیرمنتظره است.",
          "مرحله دوم، تحلیل داده‌های زنده است. سنسورها ممکن است در حالت ایستا طبیعی به‌نظر برسند اما زیر بار، هنگام شتاب‌گیری یا در دمای خاص رفتار غیرعادی نشان دهند. اینجاست که تشخیص دقیق شکل می‌گیرد.",
          "مرحله سوم، تست تطبیقی و اندازه‌گیری مستقیم است. اگر ECU خطای فشار سوخت می‌دهد، ما صرفاً پمپ یا سنسور را حدس نمی‌زنیم؛ فشار واقعی، فرمان ECU و پاسخ قطعه را کنار هم بررسی می‌کنیم.",
          "نتیجه یک دیاگ حرفه‌ای باید روشن باشد: چه چیزی خراب است، چه چیزی هنوز سالم است، چه ریسکی در ادامه استفاده وجود دارد، و کدام مسیر تعمیر اقتصادی‌تر و مطمئن‌تر است.",
        ],
      },
      en: {
        title: "How Professional German Car Diagnostics Actually Works",
        excerpt:
          "Real diagnostics is not just reading fault codes. It combines live data, component testing, and ECU behavior analysis in real conditions.",
        content: [
          "Many drivers assume diagnostics means plugging in a scanner and clearing a few codes. On German vehicles, that is only a small part of the process. Without context, stored faults often lead to the wrong part being replaced.",
          "The first step is a full-system scan. We do not read the engine module alone; gearbox, ABS, body systems, climate modules, and network gateways are all checked because the root cause may sit outside the obvious area.",
          "The second step is live-data analysis. Some sensors look normal at idle but fail under load, during acceleration, or at specific temperatures. That is where a correct diagnosis begins to take shape.",
          "The third step is correlation testing. If the ECU reports a fuel-pressure issue, we do not guess between a sensor and a pump. We compare measured pressure, ECU command, and actual component response.",
          "A proper diagnostic outcome must be clear: what is faulty, what is still healthy, what the operating risk is, and which repair path is the most reliable and cost-effective.",
        ],
      },
    },
  },
  {
    slug: "detailing-and-pdr-for-luxury-cars",
    category: "maintenance",
    readingMinutes: 5,
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-18",
    translations: {
      fa: {
        title: "چه زمانی دیتیلینگ یا PDR برای خودروهای لوکس ارزشمندتر است؟",
        excerpt:
          "برای خودروهای آلمانی، حفظ رنگ اصلی و کیفیت متریال بدنه به اندازهٔ سلامت فنی اهمیت دارد.",
        content: [
          "در خودروهای لوکس، ظاهر بدنه فقط یک موضوع زیبایی نیست. کیفیت رنگ، یکنواختی سطح و حفظ قطعات فابریک مستقیماً روی ارزش فروش و حس مالکیت خودرو اثر می‌گذارد.",
          "اگر روی بدنه خط‌وخش سطحی، کدری رنگ یا آلودگی‌های عمیق وجود دارد، دیتیلینگ حرفه‌ای می‌تواند ظاهر خودرو را احیا کند. اما اگر فرورفتگی بدون شکست رنگ وجود داشته باشد، PDR معمولاً انتخاب هوشمندانه‌تری است.",
          "مزیت اصلی PDR این است که رنگ فابریک حفظ می‌شود. این موضوع در خودروهای آلمانی و مدل‌های حساس به افت ارزش، اهمیت زیادی دارد و از رنگ‌آمیزی غیرضروری جلوگیری می‌کند.",
          "در German Group، قبل از شروع کار، شدت آسیب، زاویه نور، ضخامت رنگ و جنس پنل بررسی می‌شود تا مشخص شود دیتیلینگ، پولیش چندمرحله‌ای یا PDR کدام‌یک بهترین نتیجه را می‌دهد.",
          "هدف فقط ظاهر بهتر نیست؛ هدف، حفظ اصالت خودرو و رسیدن به نتیجه‌ای است که در نور طبیعی، نور کارگاهی و شست‌وشوی بعدی هم پایدار بماند.",
        ],
      },
      en: {
        title: "When Detailing or PDR Delivers More Value on Luxury Cars",
        excerpt:
          "On premium German vehicles, preserving original paint and body quality matters as much as the mechanical condition.",
        content: [
          "On luxury cars, body condition is not just cosmetic. Paint quality, surface uniformity, and originality all influence resale value and long-term ownership satisfaction.",
          "If the car has light scratches, paint haze, or embedded contamination, professional detailing can restore depth and finish. If there is a dent without paint breakage, paintless dent repair is often the smarter route.",
          "The biggest advantage of PDR is preserving factory paint. On German vehicles where originality affects value, avoiding unnecessary repainting is a major benefit.",
          "At German Group, we inspect damage depth, light reflection, panel material, and paint thickness before choosing between detailing, multi-stage polishing, or PDR.",
          "The goal is not just a better first impression. The goal is a durable finish that still looks correct in daylight, workshop light, and after future washes.",
        ],
      },
    },
  },
];

export function getArticlesByLang(lang: Locale) {
  return articles.map((article) => ({
    ...article,
    localized: article.translations[lang],
  }));
}

export function getArticleBySlug(lang: Locale, slug: string) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  return {
    ...article,
    localized: article.translations[lang],
  };
}
