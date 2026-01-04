import { Header } from "../../_components/Header";
import { Card } from "../../_components/UiComponents";
import { MILESTONES } from "../../_lib/demoData";
import { formatCurrency, formatDate } from "../../_lib/utils";

export default function TimelinePage() {
    return (
        <>
            <Header title="Project Timeline" />
            <main className="p-8 max-w-5xl mx-auto">
                <div className="relative border-l border-slate-800 ml-4 md:ml-12 space-y-12 pb-24">
                    {MILESTONES.map((m, i) => (
                        <div key={m.id} className="relative pl-8 md:pl-16">
                            {/* Dot */}
                            <div className={`absolute -left-[5px] md:-left-[9px] top-4 w-2.5 h-2.5 md:w-4 md:h-4 rounded-full border-4 border-[#0F172A] z-10 
                ${m.completed ? 'bg-[#45D4BF]' : i === 3 ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'}`}
                            />

                            <Card className={`relative group transition-all duration-300 hover:-translate-y-1 ${!m.completed && i > 3 ? 'opacity-50' : 'opacity-100'}`}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="text-sm font-bold text-[#45D4BF] mb-1">{formatDate(m.date)}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                                        <p className="text-sm text-slate-400 max-w-lg">
                                            {m.completed
                                                ? "This milestone has been completed and approved by all stakeholders."
                                                : "Scheduled phase. pending completion of previous dependencies."}
                                        </p>
                                    </div>

                                    {m.completed && (
                                        <div className="px-4 py-2 rounded-lg bg-[#45D4BF]/10 text-[#45D4BF] text-xs font-bold uppercase tracking-wider border border-[#45D4BF]/20">
                                            Completed
                                        </div>
                                    )}
                                    {!m.completed && i === 3 && (
                                        <div className="px-4 py-2 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                                            In Progress
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
