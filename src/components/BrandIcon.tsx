export function BrandIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 110" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="almulla-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#e1c46a" />
          <stop offset="52%" stopColor="#b9922d" />
          <stop offset="100%" stopColor="#8c6d1d" />
        </linearGradient>
      </defs>
      <path
        d="M48 4
           C 34 13, 27 27, 27 39
           C 27 50, 33 58, 39 65
           C 45 73, 48 80, 48 88
           C 48 93, 46 98, 42 105
           C 53 99, 61 91, 65 81
           C 70 69, 69 58, 62 48
           C 58 42, 53 37, 51 31
           C 48 24, 48 15, 48 4 Z"
        fill="url(#almulla-gold)"
      />
      <path
        d="M40 17
           C 30 26, 24 35, 24 45
           C 24 54, 28 61, 34 67
           C 39 72, 43 78, 44 85
           C 37 80, 30 72, 25 62
           C 18 49, 20 31, 40 17 Z"
        fill="url(#almulla-gold)"
        opacity="0.9"
      />
      <path
        d="M58 10
           C 69 18, 75 29, 76 41
           C 77 53, 73 64, 66 74
           C 60 82, 57 89, 56 97
           C 64 91, 71 82, 76 71
           C 83 56, 82 37, 58 10 Z"
        fill="url(#almulla-gold)"
        opacity="0.82"
      />
      <path
        d="M43 39
           C 48 34, 56 34, 60 40
           C 64 46, 63 54, 58 58
           C 53 63, 45 63, 40 57
           C 36 52, 36 43, 43 39 Z"
        fill="none"
        stroke="#0f0f0f"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 47 C 42 42, 49 41, 54 45"
        fill="none"
        stroke="#0f0f0f"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M45 64 C 43 69, 42 76, 44 83"
        fill="none"
        stroke="#0f0f0f"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
