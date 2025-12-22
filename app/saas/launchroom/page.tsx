import Image from "next/image";
import Link from "next/link";
import { Icons } from "./_components/Icons";

export default function LaunchRoomLanding() {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white overflow-x-hidden relative">
            {/* Abstract Backgrounds */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#45D4BF]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Nav */}
            <nav className="pd-container py-6 flex items-center justify-between relative z-10 w-full max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-2 text-[#45D4BF]">
                    <Icons.Logo className="w-8 h-8" />
                    <span className="font-bold text-xl tracking-tight text-white">LunchRoom</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/saas/launchroom/sign-in" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Sign In
                    </Link>
                    <Link
                        href="/saas/launchroom/sign-in"
                        className="px-5 py-2 rounded-full bg-white text-[#0F172A] font-semibold text-sm hover:bg-[#45D4BF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(69,212,191,0.4)]"
                    >
                        Enter Demo
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <main className="relative z-10 pt-20 pb-32 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#45D4BF] mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-[#45D4BF] animate-pulse" />
                        Live Demo Access Open
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                        The client portal for <br />
                        <span className="text-[#45D4BF] lr-text-glow">modern studios.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Replace email threads with a cinematic, centralized HQ.
                        Give your clients a premium experience that matches your work.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link
                            href="/saas/launchroom/sign-in"
                            className="h-12 px-8 rounded-full bg-[#45D4BF] text-[#0F172A] font-semibold flex items-center gap-2 hover:bg-[#2DD4BF] hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(69,212,191,0.3)]"
                        >
                            Start Full Demo <Icons.ChevronRight className="w-4 h-4" />
                        </Link>
                        <button className="h-12 px-8 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                            <Icons.Brief className="w-4 h-4" /> View Features
                        </button>
                    </div>

                    {/* App Preview UI */}
                    <div className="relative mx-auto max-w-6xl aspect-[16/9] rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl shadow-2xl overflow-hidden group">
                        {/* Mock UI Header */}
                        <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                                <div className="w-3 h-3 rounded-full bg-slate-700" />
                            </div>
                            <div className="mx-auto w-64 h-6 rounded-md bg-white/5" />
                        </div>
                        {/* Mock UI Content */}
                        <div className="p-8 grid grid-cols-12 gap-6 h-full text-left">
                            <div className="col-span-3 space-y-3">
                                <div className="h-8 w-3/4 rounded bg-white/5" />
                                <div className="h-4 w-1/2 rounded bg-white/5" />
                                <div className="mt-8 space-y-2">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="h-10 w-full rounded-lg bg-white/5" />)}
                                </div>
                            </div>
                            <div className="col-span-9 space-y-6">
                                <div className="h-32 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5" />
                                <div className="grid grid-cols-3 gap-6">
                                    {[1, 2, 3].map(i => <div key={i} className="h-40 rounded-xl bg-white/5 border border-white/5" />)}
                                </div>
                            </div>
                        </div>

                        {/* Overlay CTA */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <Link href="/saas/launchroom/sign-in" className="px-8 py-3 rounded-full bg-white text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                Enter Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-6 bg-[#0B1121]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <p>© 2024 LunchRoom SaaS Demo. Built for high-end studios.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Support</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
