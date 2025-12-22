"use client";

import { Icons } from "./Icons";
import { Button } from "./UiComponents";
import { logoutDemo } from "../actions";

export function Header({ title }: { title: string }) {
    return (
        <header className="h-16 border-b border-slate-800/50 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-white tracking-tight">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 w-64 rounded-full bg-slate-900 border border-slate-800 pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-700 transition-all hover:bg-slate-800/50"
                    />
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="size-9 p-0 rounded-full"
                >
                    <Icons.Bell className="w-4 h-4" />
                </Button>

                <div className="h-6 w-px bg-slate-800 mx-1" />

                <form action={logoutDemo}>
                    <Button variant="ghost" className="text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300">
                        Sign out
                    </Button>
                </form>
            </div>
        </header>
    );
}
