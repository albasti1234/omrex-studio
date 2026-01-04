// app/web-lab/perfumes/layout.tsx
import type { ReactNode } from "react";
import PerfumeNavbar from "./PerfumeNavbar";

type PerfumeLayoutProps = {
  children: ReactNode;
};

export default function PerfumeLayout({ children }: PerfumeLayoutProps) {
  return (
    <div className="min-h-screen bg-[#05070b] text-slate-50">
      {/* خلفية سينمائية خفيفة */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(251,191,36,0.06),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(56,189,248,0.08),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(15,23,42,0.85),#020617)]"
      />
      <div className="relative">
        <PerfumeNavbar />
        {children}
      </div>
    </div>
  );
}