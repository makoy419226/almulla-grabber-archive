import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
};

export function AnimatedStat({ value, label, suffix = "", prefix = "" }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasAnimated(true);
        const duration = 1100;
        const startedAt = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="metric-card data-center">
      <div className="metric-value">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  );
}
