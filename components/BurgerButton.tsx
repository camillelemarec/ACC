"use client";

type BurgerButtonProps = {
  open: boolean;
  onToggle: () => void;
};

export default function BurgerButton({ open, onToggle }: BurgerButtonProps) {
  return (
    <button
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      onClick={onToggle}
      className="fixed right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/78 shadow-soft backdrop-blur transition hover:bg-white"
    >
      <span className="relative block h-4 w-7">
        <span
          className={`absolute left-0 top-0 h-[2px] w-full bg-primary transition duration-300 ${
            open ? "opacity-70" : "opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] h-[2px] w-full bg-primary transition duration-300 ${
            open ? "opacity-70" : "opacity-100"
          }`}
        />
        <span
          className={`absolute bottom-0 left-0 h-[2px] w-full bg-primary transition duration-300 ${
            open ? "opacity-70" : "opacity-100"
          }`}
        />
      </span>
    </button>
  );
}

