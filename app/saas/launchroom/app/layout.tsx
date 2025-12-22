import { Sidebar } from "../_components/Sidebar";
import { SaaSProvider } from "../_lib/SaaSContext";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SaaSProvider>
            <div className="min-h-screen bg-[#0F172A] text-slate-100 flex">
                {/* Sidebar - Fixed */}
                <Sidebar />

                {/* Main Content - Offset for sidebar */}
                <div className="flex-1 md:ml-64 flex flex-col min-w-0 transition-all duration-300">
                    {/* We let pages render their own header or included here */}
                    {children}
                </div>
            </div>
        </SaaSProvider>
    );
}
