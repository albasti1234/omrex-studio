import { loginAsDemo } from "../actions";
import { Icons } from "../_components/Icons";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(69,212,191,0.08)_0%,transparent_50%)]" />

            <div className="relative z-10 w-full max-w-md p-8">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#45D4BF]/10 text-[#45D4BF] mb-6 border border-[#45D4BF]/20">
                        <Icons.Logo className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Enter the demo environment to explore.</p>
                </div>

                <form action={loginAsDemo} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Access Code</label>
                        <div className="relative">
                            <input
                                type="password"
                                value="demo-access-123"
                                readOnly
                                className="w-full h-12 rounded-xl bg-black/20 border border-white/10 px-4 text-white text-lg tracking-widest text-center focus:outline-none focus:border-[#45D4BF]/50 transition-colors"
                                disabled
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#45D4BF] bg-[#45D4BF]/10 px-2 py-0.5 rounded-full border border-[#45D4BF]/20">
                                PRE-FILLED
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-[#45D4BF] text-[#0F172A] font-bold text-lg hover:bg-[#2DD4BF] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(69,212,191,0.3)]"
                    >
                        Enter Demo
                    </button>

                    <p className="text-center text-xs text-slate-500">
                        By entering, you agree to view this super cool demo.
                    </p>
                </form>
            </div>
        </div>
    );
}
