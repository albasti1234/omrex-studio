import { Header } from "../../_components/Header";
import { Card, Badge, Button } from "../../_components/UiComponents";
import { Icons } from "../../_components/Icons";
import { formatCurrency } from "../../_lib/utils";

const INVOICES = [
    { id: "INV-001", date: "Jan 15, 2024", amount: 4500, status: "paid", item: "Discovery & Strategy" },
    { id: "INV-002", date: "Feb 01, 2024", amount: 8000, status: "paid", item: "Design Phase 1" },
    { id: "INV-003", date: "Mar 01, 2024", amount: 8000, status: "pending", item: "Development Sprint 1" },
];

export default function BillingPage() {
    return (
        <>
            <Header title="Billing & Plans" />
            <main className="p-8 max-w-5xl mx-auto space-y-8">

                {/* Current Plan */}
                <Card className="flex flex-col md:flex-row items-center justify-between p-8 bg-gradient-to-br from-[#45D4BF]/10 to-transparent border-[#45D4BF]/20">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#45D4BF] flex items-center justify-center text-[#0F172A]">
                            <Icons.Billing className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Professional Plan</h2>
                            <p className="text-slate-400 mt-1">Billed monthly • Next payment Apr 01</p>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex flex-col items-end gap-2">
                        <div className="text-3xl font-bold text-white">{formatCurrency(250)}<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                        <Button variant="outline" size="sm">Manage Subscription</Button>
                    </div>
                </Card>

                {/* Invoices */}
                <section>
                    <h3 className="text-xl font-bold text-white mb-6">Invoice History</h3>
                    <div className="rounded-2xl border border-slate-800 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-[#0F172A] border-b border-slate-800">
                                <tr>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                                {INVOICES.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono text-sm text-[#45D4BF]">{inv.id}</td>
                                        <td className="p-4 text-sm text-white font-medium">{inv.item}</td>
                                        <td className="p-4 text-sm text-slate-400">{inv.date}</td>
                                        <td className="p-4 text-sm text-white font-bold">{formatCurrency(inv.amount)}</td>
                                        <td className="p-4">
                                            <Badge variant={inv.status === 'paid' ? 'success' : 'warning'}>
                                                {inv.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button variant="ghost" size="sm"><Icons.Download className="w-4 h-4" /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    );
}
