// Types
export type Status = "todo" | "in-progress" | "approved" | "done";

export interface Task {
    id: string;
    title: string;
    status: Status;
    assignee: string; // Avatar URL or Initials
    dueDate: string;
}

export interface Milestone {
    id: string;
    title: string;
    date: string;
    completed: boolean;
}

export interface Activity {
    id: string;
    user: string;
    action: string;
    target: string;
    time: string;
}

export interface ColorToken {
    name: string;
    hex: string;
    variable: string;
}

// Data
export const PROJECT_INFO = {
    name: "Pearl Dental Website Build",
    client: "Pearl Dental Studio",
    status: "In Progress",
    dueDate: "2024-04-15",
    progress: 65,
};

export const TASKS: Task[] = [
    { id: "1", title: "Homepage Hero Section Design", status: "done", assignee: "JD", dueDate: "2024-03-01" },
    { id: "2", title: "Mobile Navigation State", status: "done", assignee: "JD", dueDate: "2024-03-02" },
    { id: "3", title: "Services Grid Layout", status: "approved", assignee: "AL", dueDate: "2024-03-05" },
    { id: "4", title: "Booking Flow Integration", status: "in-progress", assignee: "JD", dueDate: "2024-03-10" },
    { id: "5", title: "Dark Mode Contrast Check", status: "in-progress", assignee: "AL", dueDate: "2024-03-11" },
    { id: "6", title: "SEO Meta Tags Implementation", status: "todo", assignee: "JD", dueDate: "2024-03-15" },
    { id: "7", title: "Performance Optimization (Lighthouse)", status: "todo", assignee: "JD", dueDate: "2024-03-20" },
    { id: "8", title: "Client Training Session", status: "todo", assignee: "PM", dueDate: "2024-03-25" },
    { id: "9", title: "Final QA Walkthrough", status: "todo", assignee: "PM", dueDate: "2024-03-28" },
    { id: "10", title: "Domain Propagation Check", status: "todo", assignee: "Dev", dueDate: "2024-03-29" },
];

export const MILESTONES: Milestone[] = [
    { id: "1", title: "Discovery Phase", date: "2024-02-01", completed: true },
    { id: "2", title: "Wireframes Approved", date: "2024-02-15", completed: true },
    { id: "3", title: "Visual Design Review", date: "2024-03-01", completed: true },
    { id: "4", title: "Development Sprint 1", date: "2024-03-15", completed: false },
    { id: "5", title: "UAT (User Acceptance Testing)", date: "2024-03-30", completed: false },
    { id: "6", title: "Go Live", date: "2024-04-15", completed: false },
];

export const ACTIVITY_FEED: Activity[] = [
    { id: "1", user: "John Doe", action: "completed task", target: "Homepage Hero Section Design", time: "2h ago" },
    { id: "2", user: "Alice Lee", action: "commented on", target: "Services Grid Layout", time: "4h ago" },
    { id: "3", user: "Pearl Client", action: "approved", target: "Visual Design Milestone", time: "1d ago" },
    { id: "4", user: "System", action: "deployed", target: "Staging Environment v2.4", time: "1d ago" },
    { id: "5", user: "John Doe", action: "uploaded", target: "Brand_Assets_Final.zip", time: "2d ago" },
];

export const BRAND_COLORS: ColorToken[] = [
    { name: "Pearl Primary", hex: "#14b8a6", variable: "--pd-primary" },
    { name: "Pearl Dark", hex: "#0f172a", variable: "--pd-dark" },
    { name: "Sand Accent", hex: "#f5f5f4", variable: "--pd-accent" },
    { name: "Error Red", hex: "#ef4444", variable: "--pd-error" },
];
