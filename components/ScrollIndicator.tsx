export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 text-white/80">
      <span className="text-xs uppercase tracking-[0.35em]">Scroll</span>
      <span className="h-12 w-px bg-white/30" />
      <div className="h-3 w-3 animate-bounce rounded-full bg-accent" />
    </div>
  );
}

