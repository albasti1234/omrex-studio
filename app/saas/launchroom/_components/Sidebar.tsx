"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./Icons";
import { cn } from "../_lib/utils";
import { useSaaS } from "../_lib/SaaSContext";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/saas/launchroom/app", icon: Icons.Dashboard },
    { label: "Brief", href: "/saas/launchroom/app/brief", icon: Icons.Brief },
    { label: "Tasks", href: "/saas/launchroom/app/tasks", icon: Icons.Tasks },
    { label: "Timeline", href: "/saas/launchroom/app/timeline", icon: Icons.Timeline },
    { label: "Brand Kit", href: "/saas/launchroom/app/brand-kit", icon: Icons.Brand },
    { label: "Preview", href: "/saas/launchroom/app/preview", icon: Icons.Preview },
    { label: "Billing", href: "/saas/launchroom/app/billing", icon: Icons.Billing },
];

export function Sidebar() {
    const pathname = usePathname();
    const { activeProject, currentUser, projects, setActiveProject } = useSaaS();

    if (!activeProject) return null;

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 border-r border-slate-800 bg-[#0F172A] hidden md:flex flex-col z-50 transition-all duration-300">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
                <div className="flex items-center gap-2 text-[#45D4BF]">
                    <Icons.Logo className="w-6 h-6 animate-pulse" />
                    <span className="font-bold text-lg tracking-tight text-white">LunchRoom</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-white/5 shadow-inner border border-white/5"
                                    : "text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
                            )}
                        >
                            <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-[#45D4BF]" : "text-slate-500 group-hover:text-slate-300")} />
                            {item.label}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#45D4BF] rounded-full shadow-[0_0_10px_#45D4BF]" />
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 px-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Projects</p>
                    <div className="space-y-1">
                        {projects.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setActiveProject(p.id)}
                                className={cn(
                                    "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left",
                                    activeProject.id === p.id ? "text-white bg-white/5" : "text-slate-400 hover:text-white"
                                )}
                            >
                                <span className={cn("w-2 h-2 rounded-full", activeProject.id === p.id ? "bg-[#45D4BF] shadow-[0_0_8px_#45D4BF]" : "bg-slate-700")} />
                                <span className="truncate">{p.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-slate-800/50 bg-[#0B1121]/50 backdrop-blur-sm">
                <div className="bg-slate-900/50 rounded-xl p-3 flex items-center gap-3 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#45D4BF] to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-[#0F172A] group-hover:ring-[#45D4BF]/20 transition-all">
                        {currentUser.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white truncate group-hover:text-[#45D4BF] transition-colors">
                            {currentUser.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {currentUser.role}
                        </div>
                    </div>
                    <Icons.Settings className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                </div>
            </div>
        </aside>
    );
}
