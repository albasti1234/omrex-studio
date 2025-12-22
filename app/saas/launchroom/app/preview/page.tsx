import Link from "next/link";
import { Header } from "../../_components/Header";
import { Icons } from "../../_components/Icons";

export default function PreviewPage() {
    return (
        <>
            <Header title="Live Previews" />
            <main className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Ember Kitchen */}
                    <div className="group relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                        {/* Text */}
                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                            <h3 className="text-2xl font-bold text-white mb-2">Ember Kitchen</h3>
                            <p className="text-slate-300 text-sm mb-6">Culinary experience website demo.</p>
                            <Link href="/demos/ember-kitchen" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-500 transition-colors">
                                Open Preview <Icons.ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    </div>

                    {/* Pearl Dental */}
                    <div className="group relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                        {/* Text */}
                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                            <h3 className="text-2xl font-bold text-white mb-2">Pearl Dental</h3>
                            <p className="text-slate-300 text-sm mb-6">High-end medical practice demo.</p>
                            <Link href="/demos/pearl-dental" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#45D4BF] text-slate-900 font-bold hover:bg-[#2DD4BF] transition-colors">
                                Open Preview <Icons.ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-[#45D4BF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    </div>
                </div>
            </main>
        </>
    );
}
