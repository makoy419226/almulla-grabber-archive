import { BrandIcon } from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type AlmullaLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  compact?: boolean;
};

export function AlmullaLogo({
  className,
  markClassName,
  textClassName,
  compact = false,
}: AlmullaLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandIcon className={cn("h-12 w-10 shrink-0", markClassName)} />
      {!compact && (
        <div className={cn("leading-none", textClassName)}>
          <div
            className="mb-1 text-right text-[0.98rem] font-bold text-[#9b842a] sm:text-[1.1rem]"
            dir="rtl"
            lang="ar"
          >
            <span className="text-primary">الملا</span> القابضة
          </div>
          <div className="font-serif text-[1.1rem] font-bold leading-none sm:text-[1.35rem]">
            <span className="text-primary">AlMulla</span>{" "}
            <span className="text-[#7a6720]">Holding</span>
          </div>
        </div>
      )}
    </div>
  );
}
