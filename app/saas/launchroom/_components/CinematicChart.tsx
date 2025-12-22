"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import { useMemo } from 'react';

type ChartDataPoint = {
    name: string;
    value: number;
    value2?: number;
};

interface CinematicChartProps {
    data: ChartDataPoint[];
    type?: "area" | "bar";
    color?: string; // Main accent color hex
    height?: number;
    showGrid?: boolean;
    showAxis?: boolean;
}

export function CinematicChart({
    data,
    type = "area",
    color = "#45D4BF",
    height = 300,
    showGrid = true,
    showAxis = true
}: CinematicChartProps) {

    // Custom Tooltip Component for that "Luxurious" feel
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl shadow-black/50">
                    <p className="text-slate-400 text-xs mb-2 font-medium uppercase tracking-wider">{label}</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-white shadow-glow">{payload[0].value}</span>
                        <span className="text-xs text-[#45D4BF] mb-1 font-mono">Units</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ height }} className="w-full relative group">
            <ResponsiveContainer width="100%" height="100%">
                {type === "area" ? (
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                            <filter id="glow" height="200%" width="200%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
                                <feFlood floodColor={color} floodOpacity="0.5" result="color" />
                                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                                <feMerge>
                                    <feMergeNode in="shadow" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />}
                        {showAxis && <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} dy={10} />}
                        {showAxis && <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />}
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            filter="url(#glow)"
                            animationDuration={2000}
                            animationEasing="ease-out"
                        />
                    </AreaChart>
                ) : (
                    <BarChart data={data} barSize={40}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={1} />
                                <stop offset="100%" stopColor={color} stopOpacity={0.4} />
                            </linearGradient>
                        </defs>
                        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} vertical={false} />}
                        {showAxis && <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} dy={10} />}
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'white', opacity: 0.05 }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="url(#barGradient)" strokeWidth={0} />
                            ))}
                        </Bar>
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
