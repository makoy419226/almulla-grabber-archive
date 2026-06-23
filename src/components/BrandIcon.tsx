export function BrandIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gold-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d4a64a" />
          <stop offset="100%" stopColor="#8a6a25" />
        </linearGradient>
      </defs>
      <path
        d="M50 5 C 25 25, 15 50, 30 75 C 38 90, 50 95, 50 95 C 50 95, 62 90, 70 75 C 85 50, 75 25, 50 5 Z"
        fill="url(#gold-grad)"
      />
      <circle cx="50" cy="55" r="10" fill="#fff" />
      <path d="M50 75 C 42 70, 42 60, 50 55 C 58 60, 58 70, 50 75 Z" fill="#8a1538" />
    </svg>
  );
}
