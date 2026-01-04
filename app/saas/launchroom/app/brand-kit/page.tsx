import { Header } from "../../_components/Header";
import { Card, Button } from "../../_components/UiComponents";
import { BRAND_COLORS } from "../../_lib/demoData";
import { Icons } from "../../_components/Icons";

export default function BrandKitPage() {
    return (
        <>
            <Header title="Brand Assets" />
            <main className="p-8 space-y-8">
                {/* Downloads */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Downloads</h2>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Icons.Download className="w-4 h-4" /> Download All
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="group cursor-pointer hover:border-[#45D4BF]/30 transition-all">
                            <div className="aspect-[16/9] bg-slate-900 rounded-lg mb-4 flex items-center justify-center border border-slate-800">
                                <Icons.Logo className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Logomark.svg</div>
                                    <div className="text-xs text-slate-500">Vector Asset</div>
                                </div>
                                <Button variant="ghost" size="sm"><Icons.Download className="w-4 h-4" /></Button>
                            </div>
                        </Card>
                        <Card className="group cursor-pointer hover:border-[#45D4BF]/30 transition-all">
                            <div className="aspect-[16/9] bg-white rounded-lg mb-4 flex items-center justify-center border border-slate-200">
                                <Icons.Logo className="w-12 h-12 text-black" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Logomark_Dark.png</div>
                                    <div className="text-xs text-slate-500">High-Res Raster</div>
                                </div>
                                <Button variant="ghost" size="sm"><Icons.Download className="w-4 h-4" /></Button>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Colors */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-6">Color Palette</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {BRAND_COLORS.map(color => (
                            <Card key={color.hex} className="p-4 space-y-4 hover:bg-white/5">
                                <div
                                    className="h-24 rounded-xl border border-white/5 shadow-lg"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <div>
                                    <div className="font-bold text-white">{color.name}</div>
                                    <div className="text-xs font-mono text-slate-400 bg-black/20 px-2 py-1 rounded inline-block mt-1">
                                        {color.hex}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Typography */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-6">Typography</h2>
                    <Card className="space-y-8">
                        <div className="space-y-2">
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Display</div>
                            <div className="text-5xl font-bold text-white tracking-tight">The quick brown fox.</div>
                            <div className="text-sm text-[#45D4BF]">Outfit Bold</div>
                        </div>
                        <div className="w-full h-px bg-white/5" />
                        <div className="space-y-4">
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Body</div>
                            <div className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                                Aesthetic dentistry is the marriage of art and science. We craft smiles that are not only beautiful but functionally precise.
                            </div>
                            <div className="text-sm text-[#45D4BF]">Inter Regular</div>
                        </div>
                    </Card>
                </section>
            </main>
        </>
    );
}
