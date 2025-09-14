import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logohata.svg" // pastikan file ada di /public/logohata.webp
      alt="Logo Hata"
      width={40}
      height={40}
      priority
      className={cn("h-10 w-auto", className)}
    />
  );
};

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logohata.svg"
      alt="Logo Hata Icon"
      width={24}
      height={24}
      priority
      className={cn("h-6 w-6", className)}
    />
  );
};

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logohata.svg"
      alt="Logo Hata Stroke"
      width={28}
      height={28}
      priority
      className={cn("h-7 w-7", className)}
    />
  );
};
