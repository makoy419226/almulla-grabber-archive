import logoImg from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type AlmullaLogoProps = {
  className?: string;
  compact?: boolean;
};

export function AlmullaLogo({ className, compact = false }: AlmullaLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "shrink-0 overflow-hidden",
          compact ? "h-12 w-9" : "h-[2.4rem] w-[6.9rem] sm:h-[3.1rem] sm:w-[8.9rem]",
        )}
      >
        <img
          src={logoImg}
          alt="AlMulla Holding"
          className={cn(
            "select-none",
            compact ? "h-full w-auto max-w-none" : "h-full w-full object-contain",
          )}
          draggable={false}
        />
      </div>
    </div>
  );
}
