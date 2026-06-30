import logoImg from "@/assets/logo.png";
import logoMarkImg from "@/assets/logo-stacked-transparent.png";
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
          compact ? "h-12 w-9" : "h-[3.1rem] w-[9rem] sm:h-[4rem] sm:w-[11.6rem]",
        )}
      >
        {compact ? (
          <div
            role="img"
            aria-label="AlMulla Holding"
            className="h-[142%] w-full bg-[var(--gold)]"
            style={{
              WebkitMaskImage: `url(${logoMarkImg})`,
              WebkitMaskPosition: "top center",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "cover",
              maskImage: `url(${logoMarkImg})`,
              maskPosition: "top center",
              maskRepeat: "no-repeat",
              maskSize: "cover",
            }}
          />
        ) : (
          <img
            src={logoImg}
            alt="AlMulla Holding"
            className="h-full w-full select-none object-contain"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}
