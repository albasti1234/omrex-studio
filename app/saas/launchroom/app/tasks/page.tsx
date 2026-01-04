"use client";

import { useMemo, useState } from "react";
import { Header } from "../../_components/Header";
import { Card, Badge, Button } from "../../_components/UiComponents";
import { Icons } from "../../_components/Icons";
import { useSaaS, Task, TaskStatus } from "../../_lib/SaaSContext";
import { cn, formatDate } from "../../_lib/utils";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const COLUMNS: { id: TaskStatus, label: string, color: string }[] = [
    { id: "todo", label: "To Do", color: "bg-slate-500" },
    { id: "in-progress", label: "In Progress", color: "bg-blue-500" },
    { id: "review", label: "In Review", color: "bg-amber-500" },
    { id: "done", label: "Done", color: "bg-emerald-500" },
];

export default function TasksPage() {
    const { activeProject, updateTaskStatus, createNewTask, currentUser } = useSaaS();
    const [filter, setFilter] = useState<"all" | "my">("all");

    const filteredTasks = useMemo(() => {
        if (!activeProject) return [];
        let tasks = activeProject.tasks;
        if (filter === "my") {
            tasks = tasks.filter(t => t.assignee.id === currentUser.id);
        }
        return tasks;
    }, [activeProject, filter, currentUser.id]);

    const handleMoveTask = (taskId: string, currentStatus: TaskStatus, direction: 'next' | 'prev') => {
        if (!activeProject) return;
        const currentIndex = COLUMNS.findIndex(c => c.id === currentStatus);
        const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex >= 0 && nextIndex < COLUMNS.length) {
            updateTaskStatus(activeProject.id, taskId, COLUMNS[nextIndex].id);
        }
    };

    if (!activeProject) return <div className="p-10 text-white">Loading Project...</div>;

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#0F172A]">
            <Header title="Sprint Board" />

            {/* Toolbar */}
            <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F172A]/50 backdrop-blur-sm z-30">
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button
                            onClick={() => setFilter("all")}
                            className={cn("px-4 py-1.5 text-xs font-medium rounded-md transition-all", filter === "all" ? "bg-slate-700 text-white shadow-sm" : "text-slate-500 hover:text-white")}
                        >
                            All Tasks
                        </button>
                        <button
                            onClick={() => setFilter("my")}
                            className={cn("px-4 py-1.5 text-xs font-medium rounded-md transition-all", filter === "my" ? "bg-slate-700 text-white shadow-sm" : "text-slate-500 hover:text-white")}
                        >
                            My Tasks
                        </button>
                    </div>
                    <div className="text-slate-400 text-sm">
                        <span className="text-white font-bold">{filteredTasks.length}</span> tasks visible
                    </div>
                </div>
                <Button className="bg-[#45D4BF] text-[#0F172A] hover:bg-[#2dd4bf] shadow-[0_0_20px_rgba(69,212,191,0.2)]">
                    <Icons.Plus className="w-4 h-4 mr-2" />
                    New Issue
                </Button>
            </div>

            {/* Kanban Board */}
            <main className="flex-1 overflow-x-auto overflow-y-hidden p-8">
                <div className="flex gap-6 h-full min-w-[1200px]">
                    <LayoutGroup>
                        {COLUMNS.map(col => {
                            const colTasks = filteredTasks.filter(t => t.status === col.id);

                            return (
                                <div key={col.id} className="w-[350px] flex flex-col h-full bg-[#0B1121]/50 rounded-2xl border border-white/5 backdrop-blur-sm">
                                    {/* Column Header */}
                                    <div className="p-4 flex items-center justify-between border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-2 h-2 rounded-full", col.color)} />
                                            <span className="font-semibold text-slate-200 text-sm">{col.label}</span>
                                        </div>
                                        <Badge variant="neutral" className="bg-slate-800/50 text-slate-400 border-0">
                                            {colTasks.length}
                                        </Badge>
                                    </div>

                                    {/* Tasks Container */}
                                    <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                                        <AnimatePresence mode="popLayout">
                                            {colTasks.map(task => (
                                                <motion.div
                                                    layoutId={task.id}
                                                    key={task.id}
                                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                                    className="group relative"
                                                >
                                                    <Card className="p-4 cursor-grab active:cursor-grabbing border-white/5 hover:border-[#45D4BF]/50 bg-[#1E293B]/40 hover:bg-[#1E293B]/80 transition-all duration-300 shadow-lg hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]">

                                                        {/* Priority & Move Controls */}
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div className={cn(
                                                                "h-1.5 w-10 rounded-full",
                                                                task.priority === 'urgent' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' :
                                                                    task.priority === 'high' ? 'bg-orange-500' :
                                                                        task.priority === 'medium' ? 'bg-blue-500' : 'bg-slate-600'
                                                            )} title={`Priority: ${task.priority}`} />

                                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {col.id !== 'todo' && (
                                                                    <button
                                                                        onClick={() => handleMoveTask(task.id, task.status, 'prev')}
                                                                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                                                                        title="Move Back"
                                                                    >
                                                                        <Icons.ChevronRight className="w-3 h-3 rotate-180" />
                                                                    </button>
                                                                )}
                                                                {col.id !== 'done' && (
                                                                    <button
                                                                        onClick={() => handleMoveTask(task.id, task.status, 'next')}
                                                                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                                                                        title="Move Forward"
                                                                    >
                                                                        <Icons.ChevronRight className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <h4 className="font-medium text-slate-200 mb-2 leading-relaxed group-hover:text-white transition-colors">
                                                            {task.title}
                                                        </h4>

                                                        {/* Footer */}
                                                        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[8px] font-bold text-slate-300">
                                                                    {task.assignee.avatar}
                                                                </div>
                                                                <span className="text-[10px] text-slate-500">{formatDate(task.dueDate)}</span>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                {task.tags.map(tag => (
                                                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-3 rounded-xl border border-dashed border-slate-700/50 text-slate-500 text-sm hover:border-[#45D4BF]/50 hover:text-[#45D4BF] hover:bg-[#45D4BF]/5 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Icons.Plus className="w-4 h-4" /> Add Task
                                            </motion.button>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </LayoutGroup>
                </div>
            </main>
        </div>
    );
}
