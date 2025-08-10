"use client";
import { useEffect } from "react";

export default function Modal({
  open, onClose, children,
}: { open: boolean; onClose: () => void; children: React.ReactNode; }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-xl bg-neutral-900 text-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}
