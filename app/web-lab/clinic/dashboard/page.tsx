"use client";

import React from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type AppointmentStatus = "upcoming" | "in-progress" | "completed" | "cancelled";

type Appointment = {
  id: string;
  patientName: string;
  time: string;
  visitType: "In person" | "Video" | "Phone";
  reason: string;
  doctor: string;
  status: AppointmentStatus;
  room?: string;
  notes?: string;
};

type LiveRequest = {
  id: string;
  receivedAt: string;
  source: "Web intake" | "Call center" | "Portal";
  patientName: string;
  snippet: string;
  urgency: "routine" | "soon" | "today";
};

type Metric = {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
  hint: string;
};

/* -------------------------------------------------------------------------- */
/*                                  MOCK DATA                                 */
/* -------------------------------------------------------------------------- */

const METRICS: Metric[] = [
  {
    label: "Patients today",
    value: "18",
    trend: "up",
    hint: "+4 vs last Tuesday",
  },
  {
    label: "Average wait",
    value: "06 min",
    trend: "down",
    hint: "-3 min vs last week",
  },
  {
    label: "Same-week slots",
    value: "88%",
    trend: "flat",
    hint: "Within clinic target",
  },
];

const APPOINTMENTS: Appointment[] = [
  {
    id: "APT-1024",
    patientName: "Lina Saeed",
    time: "09:15",
    visitType: "In person",
    reason: "New concern · chest tightness",
    doctor: "Dr. Lina Al-Hassan",
    status: "in-progress",
    room: "Room 2",
    notes: "Arrived · triage finished",
  },
  {
    id: "APT-1025",
    patientName: "Mohammad Akram",
    time: "09:40",
    visitType: "Video",
    reason: "Follow-up · blood pressure",
    doctor: "Dr. Omar Khalid",
    status: "upcoming",
    room: "Video · Link sent",
  },
  {
    id: "APT-1026",
    patientName: "Sara Suleiman",
    time: "10:05",
    visitType: "In person",
    reason: "Annual checkup",
    doctor: "Dr. Lina Al-Hassan",
    status: "upcoming",
    room: "Room 1",
  },
  {
    id: "APT-1027",
    patientName: "Nour Al-Masri",
    time: "10:30",
    visitType: "Video",
    reason: "Mental health · anxiety & sleep",
    doctor: "Dr. Sara Younes",
    status: "upcoming",
    room: "Video · Link pending",
  },
  {
    id: "APT-1028",
    patientName: "Omar Zahran",
    time: "11:00",
    visitType: "Phone",
    reason: "Lab results review",
    doctor: "Dr. Omar Khalid",
    status: "upcoming",
    room: "Phone",
  },
  {
    id: "APT-1020",
    patientName: "Huda Jaber",
    time: "08:15",
    visitType: "In person",
    reason: "Stomach pain",
    doctor: "Dr. Lina Al-Hassan",
    status: "completed",
    room: "Room 3",
    notes: "Visit completed · follow-up in 3 weeks",
  },
];

const LIVE_REQUESTS: LiveRequest[] = [
  {
    id: "REQ-2101",
    receivedAt: "09:32",
    source: "Web intake",
    patientName: "Yasmin Khoury",
    snippet: "New chest discomfort when climbing stairs…",
    urgency: "today",
  },
  {
    id: "REQ-2102",
    receivedAt: "09:28",
    source: "Portal",
    patientName: "Adel Mahmoud",
    snippet: "Needs follow-up for diabetes medication dosage…",
    urgency: "soon",
  },
  {
    id: "REQ-2103",
    receivedAt: "09:20",
    source: "Call center",
    patientName: "Layla Hasan",
    snippet: "Routine annual checkup request for next week…",
    urgency: "routine",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function ClinicDashboardPage(): React.ReactElement {
  const [selectedAppointmentId, setSelectedAppointmentId] = React.useState<
    string | null
  >(APPOINTMENTS[0]?.id ?? null);

  const [statusFilter, setStatusFilter] =
    React.useState<AppointmentStatus | "all">("upcoming");

  const [tab, setTab] = React.useState<"today" | "week">("today");

  const selectedAppointment = APPOINTMENTS.find(
    (a) => a.id === selectedAppointmentId,
  );

  const filteredAppointments = APPOINTMENTS.filter((apt) => {
    if (statusFilter === "all") return true;
    return apt.status === statusFilter;
  });

  return (
    <main className="min-h-screen bg-[#071620] text-slate-50">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-60 flex-col border-r border-cyan-900/40 bg-[#07131b]/95 px-4 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:flex">
          <SidebarHeader />
          <nav className="mt-6 space-y-6 text-sm">
            <SidebarSection label="Today">
              <SidebarLink label="Clinic overview" active />
              <SidebarLink label="Schedule" />
              <SidebarLink label="Live requests" />
            </SidebarSection>
            <SidebarSection label="People">
              <SidebarLink label="Patients" />
              <SidebarLink label="Clinicians" />
            </SidebarSection>
            <SidebarSection label="System">
              <SidebarLink label="Intake form" />
              <SidebarLink label="Availability & slots" />
              <SidebarLink label="Notifications" />
            </SidebarSection>
          </nav>
          <SidebarFooter />
        </aside>

        {/* MAIN PANEL */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* TOP BAR */}
          <TopBar />

          {/* CONTENT */}
          <div className="flex flex-1 flex-col gap-6 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            {/* ROW 1: Metrics + Filters */}
            <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200/85">
                  Calmline Clinic · Staff dashboard
                </p>
                <h1 className="mt-1 text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
                  Today at a glance
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <TabSwitch tab={tab} setTab={setTab} />
                <StatusFilter
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />
              </div>
            </section>

            {/* ROW 2: Metrics + Live requests */}
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <MetricsRow />
              <LiveRequestsPanel />
            </section>

            {/* ROW 3: Schedule + Detail */}
            <section className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
              <SchedulePanel
                appointments={filteredAppointments}
                selectedId={selectedAppointmentId}
                setSelectedId={setSelectedAppointmentId}
              />
              <DetailPanel appointment={selectedAppointment || null} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SIDEBAR PIECES                               */
/* -------------------------------------------------------------------------- */

function SidebarHeader(): React.ReactElement {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-sky-400 text-slate-950 shadow-[0_10px_30px_rgba(8,47,73,0.9)]">
        🩺
      </div>
      <div>
        <p className="text-[0.8rem] font-semibold text-slate-50">
          Calmline Clinic
        </p>
        <p className="text-[0.68rem] text-cyan-100/80">
          Internal staff surface
        </p>
      </div>
    </div>
  );
}

function SidebarSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div>
      <p className="mb-1 text-[0.7rem] uppercase tracking-[0.22em] text-cyan-200/70">
        {label}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SidebarLink({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}): React.ReactElement {
  return (
    <button
      type="button"
      className={[
        "flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-[0.78rem] transition",
        active
          ? "bg-cyan-500/15 text-cyan-50 shadow-[0_12px_40px_rgba(8,47,73,0.9)]"
          : "text-cyan-100/80 hover:bg-cyan-500/10 hover:text-cyan-50",
      ].join(" ")}
    >
      <span>{label}</span>
      {active && <span className="text-[0.7rem]">•</span>}
    </button>
  );
}

function SidebarFooter(): React.ReactElement {
  return (
    <div className="mt-auto space-y-2 pt-6 text-[0.7rem] text-cyan-100/70">
      <div className="flex items-center justify-between rounded-xl bg-cyan-950/60 px-2.5 py-2">
        <div>
          <p className="text-[0.72rem] font-medium text-cyan-50">
            Intake connection
          </p>
          <p className="text-[0.68rem] text-cyan-100/70">
            Web-Lab · /clinic booking
          </p>
        </div>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/90 text-[0.7rem] font-semibold text-slate-900 shadow-[0_0_20px_rgba(52,211,153,0.9)]">
          ●
        </span>
      </div>
      <p className="text-[0.68rem] text-cyan-200/70">
        This dashboard is a demo surface. All names and data are placeholders.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   TOP BAR                                  */
/* -------------------------------------------------------------------------- */

function TopBar(): React.ReactElement {
  return (
    <header className="flex items-center justify-between border-b border-cyan-900/40 bg-[#051018]/95 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 text-xs text-cyan-100/85">
        <span className="hidden rounded-full border border-cyan-800/70 bg-cyan-950/60 px-3 py-1 sm:inline-flex">
          Today · Tuesday · 09:40
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[0.72rem] text-emerald-100">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
          Intake channel:{" "}
          <span className="font-medium">Web-Lab /clinic surface</span>
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <button className="hidden items-center gap-1 rounded-full border border-cyan-800/70 bg-cyan-950/70 px-3 py-1 text-cyan-100/85 transition hover:border-cyan-500/80 hover:bg-cyan-900/80 sm:inline-flex">
          ⟳ Refresh demo
        </button>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-700/70 bg-cyan-900/80 text-[0.8rem] text-cyan-100/90 transition hover:border-cyan-400 hover:bg-cyan-800">
          ?
        </button>
        <div className="flex items-center gap-2 rounded-full border border-cyan-700/70 bg-cyan-900/70 px-2 py-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-cyan-300 to-sky-300 text-[0.78rem] font-semibold text-slate-950">
            N
          </div>
          <span className="hidden text-[0.76rem] text-cyan-100/90 sm:inline">
            Staff · Demo mode
          </span>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                               METRICS + TABS                                */
/* -------------------------------------------------------------------------- */

function MetricsRow(): React.ReactElement {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-cyan-900/50 bg-gradient-to-br from-[#071824] via-[#05131f] to-[#071321] p-3 sm:p-4">
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-cyan-200/80">
        Capacity & flow
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ metric }: { metric: Metric }): React.ReactElement {
  const color =
    metric.trend === "up"
      ? "text-emerald-300"
      : metric.trend === "down"
      ? "text-rose-300"
      : "text-cyan-200";

  const icon =
    metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "•";

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="rounded-2xl border border-cyan-900/60 bg-cyan-950/40 px-3 py-2.5 text-xs text-cyan-100/85 shadow-[0_18px_50px_rgba(15,23,42,0.9)]"
    >
      <p className="text-[0.72rem] text-cyan-200/85">{metric.label}</p>
      <div className="mt-1 flex items-end justify-between">
        <p className="text-lg font-semibold text-slate-50">{metric.value}</p>
        <div className="flex items-center gap-1 text-[0.7rem]">
          <span className={color}>{icon}</span>
          <span className="text-cyan-200/80">{metric.hint}</span>
        </div>
      </div>
    </motion.div>
  );
}

function TabSwitch({
  tab,
  setTab,
}: {
  tab: "today" | "week";
  setTab: (tab: "today" | "week") => void;
}): React.ReactElement {
  return (
    <div className="inline-flex items-center rounded-full border border-cyan-800/90 bg-cyan-950/70 p-0.5 text-[0.7rem] text-cyan-100/85">
      <button
        type="button"
        onClick={() => setTab("today")}
        className={[
          "rounded-full px-3 py-1 transition",
          tab === "today"
            ? "bg-cyan-500/80 text-slate-950 shadow-[0_10px_30px_rgba(8,47,73,0.9)]"
            : "hover:bg-cyan-500/20",
        ].join(" ")}
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => setTab("week")}
        className={[
          "rounded-full px-3 py-1 transition",
          tab === "week"
            ? "bg-cyan-500/80 text-slate-950 shadow-[0_10px_30px_rgba(8,47,73,0.9)]"
            : "hover:bg-cyan-500/20",
        ].join(" ")}
      >
        This week
      </button>
    </div>
  );
}

function StatusFilter({
  statusFilter,
  setStatusFilter,
}: {
  statusFilter: AppointmentStatus | "all";
  setStatusFilter: (status: AppointmentStatus | "all") => void;
}): React.ReactElement {
  const options: { id: AppointmentStatus | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "in-progress", label: "In progress" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-cyan-800/90 bg-cyan-950/70 px-2 py-0.5 text-[0.7rem] text-cyan-100/85">
      <span className="hidden text-cyan-300/85 sm:inline">Filter:</span>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setStatusFilter(opt.id)}
          className={[
            "rounded-full px-2.5 py-0.5 transition",
            statusFilter === opt.id
              ? "bg-cyan-500/80 text-slate-950 shadow-[0_10px_30px_rgba(8,47,73,0.9)]"
              : "hover:bg-cyan-500/20",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               LIVE REQUESTS                                 */
/* -------------------------------------------------------------------------- */

function LiveRequestsPanel(): React.ReactElement {
  return (
    <div className="flex flex-col rounded-3xl border border-cyan-900/60 bg-gradient-to-br from-[#071824] via-[#05131f] to-[#071321] p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2 text-[0.78rem]">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-cyan-200/80">
            Live intake
          </p>
          <p className="text-xs text-cyan-100/85">
            Requests coming from the public booking surface.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.7rem] text-emerald-100">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
          3 active
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-xs">
        {LIVE_REQUESTS.map((req) => (
          <motion.div
            key={req.id}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-2xl border border-cyan-900/60 bg-cyan-950/40 px-3 py-2 text-cyan-100/90"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.8rem] font-medium text-slate-50">
                {req.patientName}
              </p>
              <span className="text-[0.68rem] text-cyan-200/80">
                {req.receivedAt}
              </span>
            </div>
            <div className="mt-0.5 flex items-center justify-between gap-2 text-[0.7rem]">
              <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-cyan-100/90">
                {req.source}
              </span>
              <UrgencyBadge urgency={req.urgency} />
            </div>
            <p className="mt-1 line-clamp-2 text-[0.72rem] text-cyan-100/90">
              {req.snippet}
            </p>
          </motion.div>
        ))}
      </div>

      <button className="mt-2 self-start rounded-full border border-cyan-700/80 bg-cyan-950/70 px-3 py-1 text-[0.7rem] text-cyan-100/85 transition hover:border-cyan-400 hover:bg-cyan-900">
        Open intake queue ↗
      </button>
    </div>
  );
}

function UrgencyBadge({
  urgency,
}: {
  urgency: LiveRequest["urgency"];
}): React.ReactElement {
  const label =
    urgency === "today" ? "Today" : urgency === "soon" ? "Soon" : "Routine";
  const color =
    urgency === "today"
      ? "bg-rose-500/20 text-rose-100 border border-rose-400/70"
      : urgency === "soon"
      ? "bg-amber-500/15 text-amber-100 border border-amber-300/70"
      : "bg-emerald-500/15 text-emerald-100 border border-emerald-300/70";

  return (
    <span
      className={[
        "rounded-full px-2 py-0.5 text-[0.7rem]",
        color,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SCHEDULE PANEL                                */
/* -------------------------------------------------------------------------- */

function SchedulePanel({
  appointments,
  selectedId,
  setSelectedId,
}: {
  appointments: Appointment[];
  selectedId: string | null;
  setSelectedId: (id: string) => void;
}): React.ReactElement {
  return (
    <div className="flex min-h-[260px] flex-col rounded-3xl border border-cyan-900/60 bg-gradient-to-br from-[#071824] via-[#05131f] to-[#071321] p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs text-cyan-100/85">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-cyan-200/80">
            Today&apos;s schedule
          </p>
          <p className="text-[0.72rem]">
            Click a patient to open their visit preview on the right.
          </p>
        </div>
        <button className="rounded-full border border-cyan-800/80 bg-cyan-950/70 px-2.5 py-1 text-[0.7rem] text-cyan-100/85 transition hover:border-cyan-500 hover:bg-cyan-900">
          Export day
        </button>
      </div>

      <div className="mt-1 grid grid-cols-[minmax(0,1.5fr)_minmax(0,2.2fr)_minmax(0,1.6fr)_minmax(0,1.4fr)] gap-2 border-b border-cyan-900/60 pb-1.5 text-[0.68rem] text-cyan-300/80">
        <span>Time & patient</span>
        <span>Reason</span>
        <span>Doctor</span>
        <span className="text-right">Status</span>
      </div>

      <div className="mt-1 flex-1 space-y-1 overflow-y-auto pr-1 text-xs">
        {appointments.map((apt) => {
          const isSelected = apt.id === selectedId;
          return (
            <motion.button
              key={apt.id}
              type="button"
              onClick={() => setSelectedId(apt.id)}
              whileHover={{ y: -1, scale: 1.005 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className={[
                "grid w-full grid-cols-[minmax(0,1.5fr)_minmax(0,2.2fr)_minmax(0,1.6fr)_minmax(0,1.4fr)] items-center gap-2 rounded-2xl border px-2.5 py-1.5 text-left transition",
                isSelected
                  ? "border-cyan-400/80 bg-cyan-500/15 shadow-[0_18px_50px_rgba(8,47,73,0.9)]"
                  : "border-cyan-900/70 bg-cyan-950/40 hover:border-cyan-400/70 hover:bg-cyan-950/70",
              ].join(" ")}
            >
              <div className="flex flex-col text-[0.76rem] text-cyan-100/90">
                <span className="font-medium text-slate-50">
                  {apt.time} · {apt.patientName}
                </span>
                <span className="text-[0.7rem] text-cyan-200/80">
                  {apt.visitType}
                </span>
              </div>
              <div className="text-[0.74rem] text-cyan-100/90">
                {apt.reason}
              </div>
              <div className="text-[0.74rem] text-cyan-100/90">
                {apt.doctor}
              </div>
              <div className="flex items-center justify-end gap-2 text-[0.7rem]">
                {apt.room && (
                  <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-cyan-100/85">
                    {apt.room}
                  </span>
                )}
                <StatusBadge status={apt.status} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: AppointmentStatus;
}): React.ReactElement {
  const labelMap: Record<AppointmentStatus, string> = {
    upcoming: "Upcoming",
    "in-progress": "In progress",
    completed: "Done",
    cancelled: "Cancelled",
  };

  const styleMap: Record<AppointmentStatus, string> = {
    upcoming:
      "bg-sky-500/15 text-sky-100 border border-sky-300/70",
    "in-progress":
      "bg-emerald-500/20 text-emerald-100 border border-emerald-300/80",
    completed:
      "bg-cyan-500/10 text-cyan-100 border border-cyan-300/60",
    cancelled:
      "bg-rose-500/15 text-rose-100 border border-rose-300/70",
  };

  return (
    <span
      className={[
        "rounded-full px-2 py-0.5 text-[0.7rem]",
        styleMap[status],
      ].join(" ")}
    >
      {labelMap[status]}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                DETAIL PANEL                                 */
/* -------------------------------------------------------------------------- */

function DetailPanel({
  appointment,
}: {
  appointment: Appointment | null;
}): React.ReactElement {
  if (!appointment) {
    return (
      <div className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-cyan-900/60 bg-gradient-to-br from-[#071824] via-[#05131f] to-[#071321] p-4 text-center text-xs text-cyan-100/75">
        <p className="text-[0.8rem] font-medium text-cyan-50">
          Select a patient from the schedule
        </p>
        <p className="mt-1 max-w-xs text-[0.74rem]">
          This panel gives staff a concise preview of what&apos;s coming before
          they enter the room or start the call.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[260px] flex-col rounded-3xl border border-cyan-900/60 bg-gradient-to-br from-[#071824] via-[#05131f] to-[#071321] p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs text-cyan-100/85">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-cyan-200/80">
            Visit preview
          </p>
          <p className="text-[0.8rem] text-slate-50">
            {appointment.time} · {appointment.patientName}
          </p>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="space-y-3 text-xs text-cyan-100/90">
        <div className="grid gap-2 sm:grid-cols-2">
          <DetailField
            label="Visit type"
            value={appointment.visitType}
          />
          <DetailField label="Doctor" value={appointment.doctor} />
          <DetailField
            label="Room / channel"
            value={appointment.room ?? "TBD"}
          />
          <DetailField label="ID" value={appointment.id} />
        </div>

        <div className="rounded-2xl border border-cyan-900/70 bg-cyan-950/40 px-3 py-2">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-cyan-200/80">
            Reason & context
          </p>
          <p className="mt-1 text-[0.78rem] text-cyan-50">
            {appointment.reason}
          </p>
          <p className="mt-1 text-[0.72rem] text-cyan-100/85">
            In a real system this panel would pull <strong>patient notes</strong>{" "}
            and <strong>latest intake answers</strong> from the same web form
            your guests see on the public clinic page.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <button className="rounded-2xl bg-emerald-400/90 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_14px_40px_rgba(16,185,129,0.9)] transition hover:bg-emerald-300">
            Open chart
          </button>
          <button className="rounded-2xl border border-cyan-700/80 bg-cyan-950/60 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cyan-100/85 transition hover:border-cyan-400 hover:bg-cyan-900">
            Mark as roomed
          </button>
        </div>

        <div className="mt-1 rounded-2xl border border-cyan-900/70 bg-cyan-950/30 px-3 py-2 text-[0.72rem] text-cyan-100/80">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-cyan-200/80">
            Demo note
          </p>
          <p className="mt-1">
            Every surface here is front-end only. You can reuse this layout as a{" "}
            <strong>control room UI</strong> for real clinics by connecting it
            to your booking backend and EHR.
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.ReactElement {
  return (
    <div className="rounded-2xl border border-cyan-900/70 bg-cyan-950/40 px-3 py-1.5 text-[0.74rem] text-cyan-100/85">
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cyan-200/80">
        {label}
      </p>
      <p className="mt-0.5 text-[0.76rem] text-slate-50">{value}</p>
    </div>
  );
}