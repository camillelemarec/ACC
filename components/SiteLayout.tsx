"use client";

import { useEffect, useState } from "react";
import BurgerButton from "./BurgerButton";
import MenuOverlay from "./MenuOverlay";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative min-h-screen bg-offwhite">
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
      <BurgerButton open={open} onToggle={() => setOpen((prev) => !prev)} />
      {children}
    </div>
  );
}

