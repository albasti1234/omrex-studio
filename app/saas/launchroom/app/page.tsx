"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Header } from "../_components/Header";
import { Card, Badge, Button } from "../_components/UiComponents";
import { Icons } from "../_components/Icons";
import { CinematicChart } from "../_components/CinematicChart";
import { useSaaS } from "../_lib/SaaSContext";
import { cn, formatCurrency } from "../_lib/utils";

export default function DashboardPage() {
    const { activeProject, currentUser, notifications, unreadNotificationsCount } = useSaaS();

    // --- Derived State (Logic) ---
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }, []);

    const projectProgressData = useMemo(() => {
        if (!activeProject) return [];
        // Simulate a curve based on "progress"
        return [
            { name: "Mon", value: Math.max(10, activeProject.progress - 40) },
            { name: "Tue", value: Math.max(15, activeProject.progress - 30) },
            { name: "Wed", value: Math.max(25, activeProject.progress - 20) },
            { name: "Thu", value: Math.max(45, activeProject.progress - 10) },
            { name: "Fri", value: activeProject.progress },
            { name: "Sat", value: activeProject.progress + 2 },
            { name: "Sun", value: activeProject.progress + 5 },
        ];
    }, [activeProject]);

    const budgetStats = useMemo(() => {
        if (!activeProject) return [];
        return [
            { name: "Design", value: 4500 },
            { name: "Dev", value: 8200 },
            { name: "Server", value: 1200 },
            { name: "Marketing", value: 3000 },
        ];
    }, [activeProject]);


    if (!activeProject) return <div className="p-10 text-white">Loading Project Context...</div>;

    const nextMilestone = activeProject.deadline;

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#0F172A]">
            <Header title="Mission Control" />

            <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">

                {/* --- Hero Welcome Section --- */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 lg:p-12 group">
                    {/* Cinematic Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-[#0F172A] to-[#0F172A] z-0" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#45D4BF]/20 blur-[100px] rounded-full mix-blend-screen animate-pulse" />
                    <div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 transition-transform duration-1000">
                        <Icons.Logo className="w-80 h-80 text-white" />
                    </div>

                    <div className="relative z-10 max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Badge variant="accent" className="animate-fade-in-up">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-2" />
                                Live Session
                            </Badge>
                            <span className="text-slate-400 text-sm font-mono tracking-wide">
                                {format(new Date(), "EEEE, MMMM do, yyyy")}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            {greeting}, <span className="text-[#45D4BF]">{currentUser.name.split(' ')[0]}</span>.
                        </h2>

                        <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                            You are managing <strong>{activeProject.name}</strong>. The sprint velocity is up by 12% this week.
                            {unreadNotificationsCount > 0 && <span className="block mt-2 text-[#45D4BF]">You have {unreadNotificationsCount} unread system alerts.</span>}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Button size="lg" className="shadow-[0_0_20px_rgba(69,212,191,0.3)] hover:shadow-[0_0_30px_rgba(69,212,191,0.5)] transition-all">
                                View Sprint Board
                            </Button>
                            <Button variant="secondary" size="lg" className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10">
                                <Icons.Download className="w-4 h-4 mr-2" />
                                Export Report
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- Bento Grid Layout --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Stat Card 1: Velocity */}
                    <Card className="p-6 relative overflow-hidden group hover:border-[#45D4BF]/30 transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                <Icons.StatusProgress className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+12.5%</span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Project Velocity</h3>
                            <div className="text-3xl font-bold text-white">{activeProject.progress}%</div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </Card>

                    {/* Stat Card 2: Tasks */}
                    <Card className="p-6 relative overflow-hidden group hover:border-[#45D4BF]/30 transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                                <Icons.Tasks className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-full">{activeProject.tasks.length} Total</span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Tasks</h3>
                            <div className="text-3xl font-bold text-white">{activeProject.tasks.filter(t => t.status !== 'done').length}</div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </Card>

                    {/* Stat Card 3: Budget */}
                    <Card className="p-6 relative overflow-hidden group hover:border-[#45D4BF]/30 transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                                <Icons.Billing className="w-6 h-6" />
                            </div>
                            <div className="w-24 h-8">
                                <CinematicChart data={budgetStats} type="bar" height={32} showGrid={false} showAxis={false} color="#10b981" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Budget Burn</h3>
                            <div className="text-3xl font-bold text-white">{formatCurrency(activeProject.budget.used)}</div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </Card>

                    {/* Stat Card 4: Team */}
                    <Card className="p-6 relative overflow-hidden group hover:border-[#45D4BF]/30 transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                                <Icons.Timeline className="w-6 h-6" />
                            </div>
                            <div className="flex -space-x-2">
                                {activeProject.team.map((m, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full border border-[#0F172A] bg-slate-700 flex items-center justify-center text-[8px] font-bold text-white">
                                        {m.avatar}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Deadline</h3>
                            <div className="text-3xl font-bold text-white">{format(activeProject.deadline, "MMM dd")}</div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </Card>
                </div>

                {/* --- Main Chart Section --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[500px]">
                    <Card className="lg:col-span-2 p-8 flex flex-col h-full bg-[#0B1121]/50 backdrop-blur-sm border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold text-white">Productivity Trends</h3>
                                <p className="text-slate-400 text-sm">Task completion rate over the last 7 days</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 rounded-md bg-white/10 text-white text-xs hover:bg-white/20 transition-colors">Week</button>
                                <button className="px-3 py-1 rounded-md bg-transparent text-slate-500 text-xs hover:text-white transition-colors">Month</button>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0 relative z-10">
                            <CinematicChart data={projectProgressData} type="area" height={360} />
                        </div>

                        {/* Background Detail */}
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#45D4BF]/5 to-transparent pointer-events-none" />
                    </Card>

                    {/* --- Recent Activity Feed --- */}
                    <Card className="p-0 flex flex-col h-full overflow-hidden border-white/5 bg-[#0B1121]/50">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Icons.Bell className="w-4 h-4 text-[#45D4BF]" />
                                Live Activity
                            </h3>
                            <Badge variant="neutral" className="bg-white/5 border-0">Real-time</Badge>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {/* Notification Stream */}
                            {notifications.length === 0 && (
                                <div className="text-center text-slate-500 py-10">No new notifications</div>
                            )}
                            {notifications.map((notif, i) => (
                                <div key={notif.id} className="flex gap-4 animate-fade-in group">
                                    <div className="relative mt-1">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full ring-4 ring-[#0B1121]",
                                            notif.type === 'success' ? "bg-emerald-500" :
                                                notif.type === 'info' ? "bg-blue-500" : "bg-amber-500"
                                        )} />
                                        {i !== notifications.length - 1 && (
                                            <div className="absolute top-3 left-1 w-px h-full bg-slate-800 group-hover:bg-slate-700 transition-colors" />
                                        )}
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{notif.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                                        <p className="text-[10px] text-slate-600 mt-2 font-mono">{format(notif.timestamp, "HH:mm")}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
