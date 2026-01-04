// app/web-lab/clinic/layout.tsx
import type { ReactNode } from "react";
import ClinicNavbar from "./ClinicNavbar";

type ClinicLayoutProps = {
  children: ReactNode;
};

export default function ClinicLayout({ children }: ClinicLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6fbff] via-[#e4edf5] to-[#d3e1ee] text-slate-900">
      {/* navbar الخاص بالعيادة */}
      <ClinicNavbar />

      {/* محتوى صفحة العيادة الأصلي (ClinicPage) */}
      {children}
    </div>
  );
}