"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { format, addDays, subDays } from "date-fns";

// --- Types ---

export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: "Admin" | "Editor" | "Viewer";
    status: "online" | "away" | "busy";
};

export type Notification = {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: Date;
    read: boolean;
};

export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignee: User;
    dueDate: Date;
    tags: string[];
};

export type Project = {
    id: string;
    name: string;
    client: string;
    status: "active" | "completed" | "on-hold";
    progress: number;
    budget: {
        total: number;
        used: number;
        currency: string;
    };
    team: User[];
    deadline: Date;
    tasks: Task[];
};

type SaaSContextType = {
    currentUser: User;
    activeProject: Project | null;
    projects: Project[];
    notifications: Notification[];
    unreadNotificationsCount: number;
    isLoading: boolean;

    // Actions
    setActiveProject: (projectId: string) => void;
    addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
    markNotificationRead: (id: string) => void;
    markAllNotificationsRead: () => void;
    updateTaskStatus: (projectId: string, taskId: string, newStatus: TaskStatus) => void;
    createNewTask: (projectId: string, task: Omit<Task, "id">) => void;
};

// --- Mock Data Generators (Logic & Physics Simulation) ---

const MOCK_USERS: User[] = [
    { id: "u1", name: "Omar Rezk", email: "omar@omrex.studio", avatar: "OR", role: "Admin", status: "online" },
    { id: "u2", name: "Sarah Design", email: "sarah@studio.com", avatar: "SD", role: "Editor", status: "busy" },
    { id: "u3", name: "Mike Dev", email: "mike@code.com", avatar: "MD", role: "Viewer", status: "away" },
];

const GENERATE_TASKS = (count: number): Task[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `t-${Math.random().toString(36).substr(2, 9)}`,
        title: [
            "Refactor Authentication Middleware",
            "Design New Landing Page Hero",
            "Optimize Database Queries",
            "Client Feedback Review",
            "Fix Hydration Errors in Layout"
        ][i % 5] + ` ${i + 1}`,
        description: "This needs to be addressed before the next sprint release. Ensure high code quality.",
        status: ["todo", "in-progress", "review", "done"][i % 4] as TaskStatus,
        priority: ["low", "medium", "high", "urgent"][i % 4] as TaskPriority,
        assignee: MOCK_USERS[i % MOCK_USERS.length],
        dueDate: addDays(new Date(), i * 2),
        tags: ["Development", "Design", "Marketing"][i % 3] ? [["Development", "Design", "Marketing"][i % 3]] : []
    }));
};

const MOCK_PROJECTS: Project[] = [
    {
        id: "p1",
        name: "LaunchRoom SaaS",
        client: "Internal",
        status: "active",
        progress: 68,
        budget: { total: 50000, used: 32400, currency: "USD" },
        team: MOCK_USERS,
        deadline: addDays(new Date(), 45),
        tasks: GENERATE_TASKS(12)
    },
    {
        id: "p2",
        name: "Pearl Dental Rebrand",
        client: "Dr. Pearl",
        status: "on-hold",
        progress: 92,
        budget: { total: 12000, used: 11500, currency: "USD" },
        team: [MOCK_USERS[0], MOCK_USERS[1]],
        deadline: subDays(new Date(), 5),
        tasks: GENERATE_TASKS(5)
    }
];

// --- Context Definition ---

const SaaSContext = createContext<SaaSContextType | undefined>(undefined);

export function SaaSProvider({ children }: { children: ReactNode }) {
    const [currentUser] = useState<User>(MOCK_USERS[0]);
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [activeProjectId, setActiveProjectId] = useState<string>(MOCK_PROJECTS[0].id);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "n1",
            title: "System Update",
            message: "LaunchRoom v2.0 deployed successfully.",
            type: "success",
            timestamp: subDays(new Date(), 1),
            read: false
        }
    ]);
    const [isLoading, setIsLoading] = useState(true);

    // Initial "Boot" Simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            addNotification({
                title: "Welcome Back",
                message: `Session restored for ${currentUser.name}. System operational.`,
                type: "info"
            });
        }, 800);
        return () => clearTimeout(timer);
    }, [currentUser.name]);

    // Computed
    const activeProject = projects.find(p => p.id === activeProjectId) || null;
    const unreadNotificationsCount = notifications.filter(n => !n.read).length;

    // Actions
    const setActiveProject = (projectId: string) => {
        // "Physics" simulation: simple delay or eager update? Eager is better for UI, but we could add logging.
        console.log(`[System] Switching context to project: ${projectId}`);
        setActiveProjectId(projectId);
    };

    const addNotification = (notif: Omit<Notification, "id" | "timestamp" | "read">) => {
        const newNotif: Notification = {
            ...notif,
            id: `n-${Date.now()}`,
            timestamp: new Date(),
            read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markNotificationRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllNotificationsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const updateTaskStatus = (projectId: string, taskId: string, newStatus: TaskStatus) => {
        setProjects(prevProjects => prevProjects.map(project => {
            if (project.id === projectId) {
                return {
                    ...project,
                    tasks: project.tasks.map(task =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                    )
                };
            }
            return project;
        }));

        // Logical side effect: If all tasks done, update project progress?
        // keeping it simple for now to avoid infinite loops, but could be added.
    };

    const createNewTask = (projectId: string, taskData: Omit<Task, "id">) => {
        const newTask: Task = {
            ...taskData,
            id: `t-${Date.now()}`
        };
        setProjects(prev => prev.map(p =>
            p.id === projectId
                ? { ...p, tasks: [newTask, ...p.tasks] }
                : p
        ));
        addNotification({
            title: "Task Created",
            message: `New task "${newTask.title}" added to ${newTask.status}.`,
            type: "success"
        });
    };

    return (
        <SaaSContext.Provider value={{
            currentUser,
            projects,
            activeProject,
            notifications,
            unreadNotificationsCount,
            isLoading,
            setActiveProject,
            addNotification,
            markNotificationRead,
            markAllNotificationsRead,
            updateTaskStatus,
            createNewTask
        }}>
            {children}
        </SaaSContext.Provider>
    );
}

export function useSaaS() {
    const context = useContext(SaaSContext);
    if (context === undefined) {
        throw new Error("useSaaS must be used within a SaaSProvider");
    }
    return context;
}
