"use client";

import Image from "next/image";
import { useMediaSrc } from "./MediaProvider";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
  size?: "sm" | "md";
};

export default function Logo({
  variant = "dark",
  className = "",
  size = "md"
}: LogoProps) {
  const media = useMediaSrc();
  const isLight = variant === "light";
  const dimensions =
    size === "sm"
      ? { width: 110, height: 94, widthClass: "w-[110px]" }
      : { width: 220, height: 80, widthClass: "w-48 md:w-56" };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src={media("/images/path12.svg")}
        alt="SARL Alain Coutant"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className={`h-auto ${dimensions.widthClass} ${
          isLight ? "drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]" : ""
        }`}
      />
      <span className="sr-only">Couverture & Patrimoine</span>
    </div>
  );
}

