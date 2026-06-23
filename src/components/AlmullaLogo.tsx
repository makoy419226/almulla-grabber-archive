import logoImg from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type AlmullaLogoProps = {
  className?: string;
  compact?: boolean;
};

export function AlmullaLogo({
  className,
  compact = false,
}: AlmullaLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "shrink-0 overflow-hidden",
          compact ? "h-12 w-12 rounded-xl" : "h-[3.1rem] w-[8.9rem]",
        )}
      >
        <img
          src={logoImg}
          alt="AlMulla Holding"
          className={cn(
            "h-full w-full select-none",
            compact ? "object-cover object-[left_center]" : "object-contain",
          )}
          draggable={false}
        />
      </div>
    </div>
  );
}
