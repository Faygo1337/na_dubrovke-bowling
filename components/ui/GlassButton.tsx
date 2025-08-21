"use client";

import type React from "react";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function GlassButton({
  children,
  onClick,
  className = "",
}: GlassButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        px-4 py-2 rounded-2xl
        bg-white/10 backdrop-blur-[11px]
        border border-white/30
        text-white font-medium text-lg
        transition-all duration-300
        hover:bg-white/25 hover:scale-105
        active:scale-95
        shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1)]
        before:absolute before:top-0 before:left-0 before:right-0 before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent
        after:absolute after:top-0 after:left-0 after:w-px after:h-full
        after:bg-gradient-to-b after:from-white/80 after:via-transparent after:to-white/30
        ${className}
      `}
    >
      {children}
    </button>
  );
}
