export function Heading() {
  return (
    <div className="relative w-full h-[var(--header-height)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <svg
          width="100%"
          height="100%"
          className="w-full h-full"
          style={{ minHeight: "var(--header-height)" }}
        >
          <defs>
            {/* Linear gradient: primary-500 (#22c55e) to mango yellow (#FFC43D) */}
            <linearGradient id="sparkle-warm" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFC43D" stopOpacity="0.7" />
            </linearGradient>
            <pattern
              id="sparkle-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="8" cy="8" r="1.5" fill="#FFC43D" />{" "}
              {/* mango yellow */}
              <circle cx="24" cy="24" r="1.2" fill="#22c55e" />{" "}
              {/* primary-500 */}
              <circle cx="16" cy="20" r="1" fill="#FFD97A" />{" "}
              <circle cx="28" cy="10" r="1.2" fill="#FFB300" />{" "}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sparkle-warm)" />
          <rect width="100%" height="100%" fill="url(#sparkle-pattern)" />
        </svg>
      </div>
      <div className="absolute top-0 w-full h-full bg-black opacity-40 z-10" />
      <h1 className="text-3xl  text-center text-white absolute top-[30px] left-[130px] z-20 drop-shadow-lg">
        MEAL PREP ASSISTANT
      </h1>
    </div>
  );
}
