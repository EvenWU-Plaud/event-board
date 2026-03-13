"use client";
import React, { useMemo, useState } from "react";

const currentUser = "Even";

const countryOptions = [
  { code: "AE", name: "United Arab Emirates", region: "EMEA" },
  { code: "AR", name: "Argentina", region: "AMER" },
  { code: "AT", name: "Austria", region: "EMEA" },
  { code: "AU", name: "Australia", region: "SEA" },
  { code: "BE", name: "Belgium", region: "EMEA" },
  { code: "BR", name: "Brazil", region: "AMER" },
  { code: "CA", name: "Canada", region: "AMER" },
  { code: "CH", name: "Switzerland", region: "EMEA" },
  { code: "CN", name: "China", region: "SEA" },
  { code: "DE", name: "Germany", region: "EMEA" },
  { code: "DK", name: "Denmark", region: "EMEA" },
  { code: "ES", name: "Spain", region: "EMEA" },
  { code: "FI", name: "Finland", region: "EMEA" },
  { code: "FR", name: "France", region: "EMEA" },
  { code: "GB", name: "United Kingdom", region: "EMEA" },
  { code: "HK", name: "Hong Kong", region: "SEA" },
  { code: "ID", name: "Indonesia", region: "SEA" },
  { code: "IE", name: "Ireland", region: "EMEA" },
  { code: "IN", name: "India", region: "SEA" },
  { code: "IT", name: "Italy", region: "EMEA" },
  { code: "JP", name: "Japan", region: "SEA" },
  { code: "KR", name: "South Korea", region: "SEA" },
  { code: "MX", name: "Mexico", region: "AMER" },
  { code: "MY", name: "Malaysia", region: "SEA" },
  { code: "NL", name: "Netherlands", region: "EMEA" },
  { code: "NO", name: "Norway", region: "EMEA" },
  { code: "NZ", name: "New Zealand", region: "SEA" },
  { code: "PH", name: "Philippines", region: "SEA" },
  { code: "PL", name: "Poland", region: "EMEA" },
  { code: "PT", name: "Portugal", region: "EMEA" },
  { code: "SE", name: "Sweden", region: "EMEA" },
  { code: "SG", name: "Singapore", region: "SEA" },
  { code: "TH", name: "Thailand", region: "SEA" },
  { code: "TR", name: "Turkey", region: "EMEA" },
  { code: "TW", name: "Taiwan", region: "SEA" },
  { code: "US", name: "United States", region: "AMER" },
  { code: "VN", name: "Vietnam", region: "SEA" },
  { code: "ZA", name: "South Africa", region: "EMEA" },
];

const categoryOptions = [
  "Brand Event",
  "User Event",
  "B2B Event",
  "Trade Show",
  "Retail Activation",
  "Partner Event",
  "Media Event",
  "Training",
];

const boothSideOptions = ["1", "2", "3", "4"];
const stages = ["Planning", "Execution", "At Risk", "Completed"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const regionOwners = {
  EMEA: { owner: "Even", email: "even@plaud.ai" },
  SEA: { owner: "Christina", email: "christina@plaud.ai" },
  AMER: { owner: "Alyssa", email: "alyssa.gordon@plaud.ai" },
};

const categoryColors = {
  "Brand Event": { background: "#dbeafe", color: "#1d4ed8" },
  "User Event": { background: "#ede9fe", color: "#6d28d9" },
  "B2B Event": { background: "#dcfce7", color: "#15803d" },
  "Trade Show": { background: "#fee2e2", color: "#b91c1c" },
  "Retail Activation": { background: "#fef3c7", color: "#b45309" },
  "Partner Event": { background: "#cffafe", color: "#0f766e" },
  "Media Event": { background: "#fce7f3", color: "#be185d" },
  Training: { background: "#e2e8f0", color: "#334155" },
};

const timelineBlueprint = [
  { id: "decision", label: "Event decision", offsetDays: -120, group: "Strategy" },
  { id: "approval", label: "Internal approval", offsetDays: -110, group: "Strategy" },
  { id: "organizer-comm", label: "Organizer communication", offsetDays: -100, group: "Organizer & Commercial" },
  { id: "booth-contract", label: "Booth booking & contract", offsetDays: -90, group: "Organizer & Commercial" },
  { id: "material-plan", label: "Material planning", offsetDays: -90, group: "Materials & Product" },
  { id: "organizer-payment", label: "Organizer payment", offsetDays: -85, group: "Organizer & Commercial" },
  { id: "production-start", label: "Production start", offsetDays: -70, group: "Materials & Product" },
  { id: "vendor-pitching", label: "Vendor pitching", offsetDays: -70, group: "Vendor & Booth" },
  { id: "booth-design", label: "Booth design", offsetDays: -60, group: "Vendor & Booth" },
  { id: "vendor-contract", label: "Vendor contract", offsetDays: -50, group: "Vendor & Booth" },
  { id: "vendor-payment", label: "Vendor payment", offsetDays: -45, group: "Vendor & Booth" },
  { id: "promotor-hiring", label: "Promotor hiring", offsetDays: -45, group: "Promotor & Staffing" },
  { id: "shipment", label: "Shipment / logistics", offsetDays: -21, group: "Materials & Product" },
  { id: "staff-scheduling", label: "Staff scheduling", offsetDays: -20, group: "Promotor & Staffing" },
  { id: "promotor-training", label: "Promotor training", offsetDays: -10, group: "Promotor & Staffing" },
  { id: "final-check", label: "Final readiness check", offsetDays: -7, group: "Final Prep" },
  { id: "event-execution", label: "Event execution", offsetDays: 0, group: "Event Day" },
  { id: "lead-wrap", label: "Lead consolidation", offsetDays: 3, group: "Post Event" },
  { id: "report", label: "Event report", offsetDays: 7, group: "Post Event" },
];

const defaultWorkstreams = [
  {
    id: "organizer",
    title: "Organizer & Commercial",
    tasks: [
      { id: "organizer-contact", label: "Organizer communication", done: false },
      { id: "price-negotiation", label: "Price negotiation", done: false },
      { id: "organizer-contract", label: "Organizer contract signed", done: false },
      { id: "organizer-payment", label: "Organizer payment completed", done: false },
    ],
  },
  {
    id: "vendor",
    title: "Vendor & Booth",
    tasks: [
      { id: "vendor-pitching", label: "Vendor pitching", done: false },
      { id: "booth-design", label: "Booth design approved", done: false },
      { id: "vendor-contract", label: "Vendor contract signed", done: false },
      { id: "vendor-payment", label: "Vendor payment completed", done: false },
    ],
  },
  {
    id: "materials",
    title: "Materials & Product",
    tasks: [
      { id: "material-plan", label: "Material / product quantity planned", done: false },
      { id: "material-purchase", label: "Material / product purchased", done: false },
      { id: "shipment-ready", label: "Shipment / delivery ready", done: false },
    ],
  },
  {
    id: "promotor",
    title: "Promotor & Staffing",
    tasks: [
      { id: "promotor-hiring", label: "Promotor hiring", done: false },
      { id: "staff-schedule", label: "Staff scheduling", done: false },
      { id: "promotor-training", label: "Promotor training completed", done: false },
    ],
  },
];

const defaultMaterials = [
  { id: "mat-1", name: "Brochure", quantity: 300, status: "Planned" },
  { id: "mat-2", name: "Demo unit", quantity: 12, status: "In Production" },
  { id: "mat-3", name: "Poster", quantity: 20, status: "Ready to Ship" },
];

const defaultBudgetItems = [
  { id: "booth-fee", label: "Booth fee", budget: 0, actual: 0 },
  { id: "design-fee", label: "Design fee", budget: 0, actual: 0 },
  { id: "construction-fee", label: "Construction fee", budget: 0, actual: 0 },
  { id: "third-party", label: "Third-party vendor fee", budget: 0, actual: 0 },
  { id: "materials", label: "Materials / product purchase", budget: 0, actual: 0 },
  { id: "shipping", label: "Shipping / logistics", budget: 0, actual: 0 },
  { id: "promotor", label: "Promotor / staffing", budget: 0, actual: 0 },
];

function cloneWorkstreams() {
  return defaultWorkstreams.map((group) => ({
    ...group,
    tasks: group.tasks.map((task) => ({ ...task })),
  }));
}
function cloneBudgetItems() { return defaultBudgetItems.map((item) => ({ ...item })); }
function cloneMaterials() { return defaultMaterials.map((item) => ({ ...item })); }
function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function buildTimeline(eventDate) {
  if (!eventDate) return timelineBlueprint.map((item) => ({ ...item, dueDate: "", done: false }));
  return timelineBlueprint.map((item) => ({ ...item, dueDate: addDays(eventDate, item.offsetDays), done: false }));
}
function getCountryMeta(code) { return countryOptions.find((item) => item.code === code) || null; }
function getCountryLabel(code) {
  const meta = getCountryMeta(code);
  return meta ? `${meta.code} · ${meta.name}` : code || "";
}
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
}
function formatDateRange(startDate, endDate) {
  if (!startDate) return "TBD";
  if (!endDate || startDate === endDate) return startDate;
  return `${startDate} → ${endDate}`;
}
function daysUntil(dateStr) {
  if (!dateStr) return 0;
  const today = new Date();
  const target = new Date(`${dateStr}T00:00:00`);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}
function getChecklistProgress(workstreams) {
  const tasks = (workstreams || []).flatMap((group) => group.tasks || []);
  return { total: tasks.length, completed: tasks.filter((task) => task.done).length };
}
function getTimelineProgress(timeline) {
  const items = timeline || [];
  return { total: items.length, completed: items.filter((item) => item.done).length };
}
function getBudgetSummary(items) {
  const budget = (items || []).reduce((sum, item) => sum + Number(item.budget || 0), 0);
  const actual = (items || []).reduce((sum, item) => sum + Number(item.actual || 0), 0);
  return { budget, actual, variance: actual - budget };
}
function getProjectRisk(project) {
  const timeline = project.timeline || [];
  const today = new Date();
  const pending = timeline.filter((item) => !item.done && item.dueDate);
  const overdue = pending.find((item) => new Date(`${item.dueDate}T23:59:59`) < today);
  if (overdue) return { level: "Delayed", message: `${overdue.label} overdue`, color: "#b91c1c", bg: "#fee2e2" };
  const soon = pending.find((item) => {
    const diff = Math.ceil((new Date(`${item.dueDate}T23:59:59`) - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 7;
  });
  if (soon) return { level: "At Risk", message: `${soon.label} due soon`, color: "#b45309", bg: "#fef3c7" };
  return { level: "On Track", message: "No delayed milestone", color: "#15803d", bg: "#dcfce7" };
}
function getTimelineGroups(timeline) {
  const order = [];
  const map = {};
  (timeline || []).forEach((item) => {
    if (!map[item.group]) {
      map[item.group] = [];
      order.push(item.group);
    }
    map[item.group].push(item);
  });
  return order.map((name) => ({ name, items: map[name] }));
}
function buildMailtoLink(application) {
  const assignee = regionOwners[application.region];
  if (!assignee) return "#";
  const subject = encodeURIComponent(`[New Event Application] ${application.name}`);
  const body = encodeURIComponent(
    `Hi ${assignee.owner},

A new event application has been submitted.

Event: ${application.name}
Applicant: ${application.applicant}
Region: ${application.region}
Country: ${getCountryLabel(application.country)}
City: ${application.city}
Category: ${application.category}
Date: ${formatDateRange(application.startDate, application.endDate)}
Estimated Budget: ${formatCurrency(application.estimatedBudget)}
Official Website: ${application.website}
Notes: ${application.notes || "-"}
Due Date: ${application.dueDate}

Please review within one week.
`
  );
  return `mailto:${assignee.email}?subject=${subject}&body=${body}`;
}

const baseProject = (overrides) => ({
  workstreams: cloneWorkstreams(),
  budgetItems: cloneBudgetItems(),
  materials: cloneMaterials(),
  ...overrides,
  timeline: buildTimeline(overrides.startDate),
});

const initialProjects = [
  baseProject({ id: 1, name: "Paris Retail Partner Event", country: "FR", region: "EMEA", city: "Paris", owner: "Even", stage: "Planning", priority: "S", startDate: "2026-04-18", endDate: "2026-04-20", budget: 18000, category: "Partner Event", notes: "Sellable: No | Booth: 24 sqm | Open sides: 2", sellable: "No", boothSizeSqm: "24", boothOpenSides: "2" }),
  baseProject({ id: 2, name: "Berlin Media Demo Day", country: "DE", region: "EMEA", city: "Berlin", owner: "Even", stage: "Execution", priority: "S", startDate: "2026-03-29", endDate: "2026-03-30", budget: 12000, category: "Media Event", notes: "Sellable: No | Booth: 12 sqm | Open sides: 1", sellable: "No", boothSizeSqm: "12", boothOpenSides: "1" }),
  baseProject({ id: 3, name: "Amsterdam Creator Meetup", country: "NL", region: "EMEA", city: "Amsterdam", owner: "Even", stage: "At Risk", priority: "A", startDate: "2026-04-08", endDate: "2026-04-09", budget: 9000, category: "User Event", notes: "Sellable: No | Booth: 0 sqm | Open sides: 0", sellable: "No", boothSizeSqm: "", boothOpenSides: "" }),
  baseProject({ id: 4, name: "Madrid Distributor Training", country: "ES", region: "EMEA", city: "Madrid", owner: "Even", stage: "Completed", priority: "B", startDate: "2026-03-05", endDate: "2026-03-06", budget: 6500, category: "Training", notes: "Sellable: No | Booth: 0 sqm | Open sides: 0", sellable: "No", boothSizeSqm: "", boothOpenSides: "" }),
];

const initialApplications = [{
  id: 101,
  name: "Milan Design Week Booth",
  applicant: "Taylor",
  country: "IT",
  region: "EMEA",
  city: "Milan",
  category: "Trade Show",
  startDate: "2026-04-11",
  endDate: "2026-04-14",
  estimatedBudget: 15000,
  website: "https://example.com/milan-design-week",
  notes: "Potential premium creator exposure.",
  status: "Pending Review",
  dueDate: addDays(new Date().toISOString().slice(0, 10), 7),
  assignedOwner: regionOwners.EMEA.owner,
  assignedEmail: regionOwners.EMEA.email,
}];

const stageColors = {
  Planning: { background: "#eef2ff", color: "#3730a3" },
  Execution: { background: "#dbeafe", color: "#1d4ed8" },
  "At Risk": { background: "#fef3c7", color: "#b45309" },
  Completed: { background: "#dcfce7", color: "#15803d" },
};
const priorityColors = {
  S: { background: "#fee2e2", color: "#b91c1c" },
  A: { background: "#ffedd5", color: "#c2410c" },
  B: { background: "#ecfeff", color: "#155e75" },
};

function emptyProject() {
  return {
    name: "", country: "", region: "", city: "", owner: "", category: "", startDate: "", endDate: "",
    budget: "", priority: "", stage: "Planning", notes: "", sellable: "", boothSizeSqm: "", boothOpenSides: "",
    workstreams: cloneWorkstreams(), budgetItems: cloneBudgetItems(), timeline: [], materials: cloneMaterials(),
  };
}
function emptyApplication() {
  return { name: "", applicant: "", country: "", region: "", city: "", category: "", startDate: "", endDate: "", estimatedBudget: "", website: "", notes: "" };
}

function Field({ label, required = false, children }) {
  return <div><div style={required ? styles.requiredLabel : styles.fieldLabel}>{label}{required && <span style={styles.requiredStar}>*</span>}</div>{children}</div>;
}

function CountryPicker({ label, required = false, triggerValue, searchValue, setSearchValue, isOpen, setIsOpen, options, onSelect }) {
  return (
    <div>
      <div style={required ? styles.requiredLabel : styles.fieldLabel}>{label}{required && <span style={styles.requiredStar}>*</span>}</div>
      <div style={styles.searchSelectBox}>
        <button type="button" style={styles.searchSelectTrigger(triggerValue)} onClick={() => setIsOpen((prev) => !prev)}>
          <span>{triggerValue ? getCountryLabel(triggerValue) : "Select country"}</span>
          <span style={styles.triggerArrow}>{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen && (
          <>
            <input style={styles.input} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search country code or name" />
            <div style={styles.searchSelectList}>
              {options.slice(0, 8).map((item) => (
                <button key={item.code} type="button" style={styles.searchSelectItem} onClick={() => onSelect(item.code)}>
                  <span>{item.code} · {item.name}</span>
                  <span style={styles.searchSelectMeta}>{item.region}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return <div style={styles.metricCard}><div style={styles.metricTitle}>{title}</div><div style={styles.metricValue}>{value}</div></div>;
}
function Info({ label, value }) {
  return <div style={styles.infoCard}><div style={styles.infoLabel}>{label}</div><div style={styles.infoValue}>{value}</div></div>;
}

function ProjectCard({ project, onClick, isSelected }) {
  const d = daysUntil(project.startDate);
  const priorityStyle = priorityColors[project.priority] || { background: "#f1f5f9", color: "#334155" };
  const progress = getChecklistProgress(project.workstreams || []);
  const risk = getProjectRisk(project);
  return (
    <button type="button" style={{ ...styles.projectCardButton, ...(isSelected ? styles.projectCardSelected : {}) }} onClick={onClick}>
      <div style={styles.projectTopRow}><div style={styles.projectName}>{project.name}</div><span style={{ ...styles.priorityBadge, ...priorityStyle }}>{project.priority || "—"}</span></div>
      <div style={styles.metaText}>{project.city}, {getCountryLabel(project.country)}</div>
      <div style={styles.metaText}>Region: {project.region || getCountryMeta(project.country)?.region || "—"}</div>
      <div style={styles.metaText}>Owner: {project.owner}</div>
      <div style={styles.infoGrid}>
        <Info label="Date" value={formatDateRange(project.startDate, project.endDate)} />
        <Info label="D-Day" value={d >= 0 ? `${d} days` : `${Math.abs(d)} days ago`} />
        <Info label="Budget" value={formatCurrency(project.budget)} />
        <Info label="Category" value={project.category} />
      </div>
      <div style={{ ...styles.riskBadge, background: risk.bg, color: risk.color }}>{risk.level}: {risk.message}</div>
      <div style={styles.progressRow}><span style={styles.progressText}>Checklist progress</span><span style={styles.progressText}>{progress.completed}/{progress.total}</span></div>
      <div style={styles.progressBarTrack}><div style={{ ...styles.progressBarFill, width: `${progress.total ? (progress.completed / progress.total) * 100 : 0}%` }} /></div>
      <div style={styles.noteBox}>
        <div style={styles.noteItem}><strong>Sellable:</strong> {project.sellable || "—"}</div>
        <div style={styles.noteItem}><strong>Booth:</strong> {project.boothSizeSqm ? `${project.boothSizeSqm} sqm` : "—"}</div>
        <div style={styles.noteItem}><strong>Open sides:</strong> {project.boothOpenSides || "—"}</div>
      </div>
    </button>
  );
}

function ReviewQueue({ applications, reviewFilter, setReviewFilter, isOpen, setIsOpen, onApprove, onReject, getDueState }) {
  return (
    <div style={styles.todoCard}>
      <button type="button" style={styles.queueToggleButton(isOpen)} onClick={() => setIsOpen((prev) => !prev)}><span>Regional Review Queue</span><span style={styles.triggerArrow}>{isOpen ? "▲" : "▼"}</span></button>
      {isOpen && (
        <>
          <div style={styles.queueFilterRow}>
            <button type="button" style={reviewFilter === "waiting" ? styles.activeFilterTab : styles.filterTab} onClick={() => setReviewFilter("waiting")}>Waiting</button>
            <button type="button" style={reviewFilter === "finished" ? styles.activeFilterTab : styles.filterTab} onClick={() => setReviewFilter("finished")}>Finished</button>
          </div>
          <div style={styles.todoList}>
            {applications.length === 0 ? <div style={styles.emptyStateSmall}>No applications in this view.</div> : applications.map((item) => (
              <div key={item.id} style={reviewFilter === "finished" ? styles.todoItemMuted : styles.todoItem}>
                <div style={styles.todoHeader}><div style={styles.todoTitle}>{item.name}</div><span style={styles.todoBadgeStatus(item.status)}>{item.status}</span></div>
                <div style={styles.metaText}>{item.region} · {getCountryLabel(item.country)} · {item.city}</div>
                {item.applicant && <div style={styles.metaText}>Applicant: {item.applicant}</div>}
                <div style={styles.metaText}>Assigned to: {item.assignedOwner} ({item.assignedEmail})</div>
                {reviewFilter === "waiting" && <div style={styles.metaText}>DDL: <span style={styles.duePill(getDueState(item.dueDate, item.status))}>{item.dueDate}</span></div>}
                <div style={styles.todoActions}>
                  {reviewFilter === "waiting" && (
                    <>
                      <button type="button" style={styles.approveButton} onClick={() => onApprove(item.id)}>Approve</button>
                      <button type="button" style={styles.rejectButton} onClick={() => onReject(item.id)}>Reject</button>
                      <a href={buildMailtoLink(item)} style={styles.linkButton}>Email owner</a>
                    </>
                  )}
                  <a href={item.website} target="_blank" rel="noreferrer" style={styles.linkButtonSecondary}>Open site</a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TimelineCards({ project, canEdit, onToggle }) {
  const groups = getTimelineGroups(project.timeline || []);
  const currentPhaseIndex = groups.findIndex((group) => group.items.some((item) => !item.done));
  return (
    <div style={styles.phaseGrid}>
      {groups.map((group, index) => {
        const completed = group.items.filter((item) => item.done).length;
        const progress = group.items.length ? (completed / group.items.length) * 100 : 0;
        const isCurrent = index === currentPhaseIndex;
        return (
          <div key={group.name} style={{ ...styles.phaseCard, ...(isCurrent ? styles.phaseCardCurrent : {}) }}>
            <div style={styles.phaseHeader}><div style={styles.phaseTitle}>{group.name}</div><div style={styles.phaseCount}>{completed}/{group.items.length}</div></div>
            <div style={styles.phaseProgressTrack}><div style={{ ...styles.phaseProgressFill, width: `${progress}%` }} /></div>
            <div style={styles.phaseTaskList}>
              {group.items.map((item) => (
                <label key={item.id} style={styles.phaseTaskRow}>
                  <input type="checkbox" checked={item.done} disabled={!canEdit} onChange={() => onToggle(item.id)} />
                  <span style={item.done ? styles.taskTextDone : styles.taskText}>{item.label}</span>
                </label>
              ))}
            </div>
            {isCurrent && <div style={styles.currentPhaseTag}>Current Phase</div>}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("board");
  const [boardView, setBoardView] = useState("board");
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [calendarRegionFilter, setCalendarRegionFilter] = useState("all");
  const [calendarOwnerFilter, setCalendarOwnerFilter] = useState("all");
  const [calendarCategoryFilter, setCalendarCategoryFilter] = useState("all");
  const [projects, setProjects] = useState(initialProjects);
  const [applications, setApplications] = useState(initialApplications);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState(emptyProject());
  const [newApplication, setNewApplication] = useState(emptyApplication());
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [editCountrySearch, setEditCountrySearch] = useState("");
  const [applicationCountrySearch, setApplicationCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showEditCountryDropdown, setShowEditCountryDropdown] = useState(false);
  const [showApplicationCountryDropdown, setShowApplicationCountryDropdown] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("waiting");
  const [showApplyQueue, setShowApplyQueue] = useState(false);
  const [showMaterialsTable, setShowMaterialsTable] = useState(false);

  const selectedProject = useMemo(() => projects.find((project) => project.id === selectedProjectId) || null, [projects, selectedProjectId]);
  const canEditSelectedProject = selectedProject?.owner === currentUser;
  const countries = useMemo(() => ["all", ...Array.from(new Set(projects.map((p) => p.country).filter(Boolean)))], [projects]);
  const owners = useMemo(() => ["all", ...Array.from(new Set(projects.map((p) => p.owner).filter(Boolean)))], [projects]);
  const regions = useMemo(() => ["all", ...Array.from(new Set(projects.map((p) => p.region).filter(Boolean)))], [projects]);

  const filteredCountryOptions = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    return q ? countryOptions.filter((item) => `${item.code} ${item.name}`.toLowerCase().includes(q)) : countryOptions;
  }, [countrySearch]);
  const filteredEditCountryOptions = useMemo(() => {
    const q = editCountrySearch.trim().toLowerCase();
    return q ? countryOptions.filter((item) => `${item.code} ${item.name}`.toLowerCase().includes(q)) : countryOptions;
  }, [editCountrySearch]);
  const filteredApplicationCountryOptions = useMemo(() => {
    const q = applicationCountrySearch.trim().toLowerCase();
    return q ? countryOptions.filter((item) => `${item.code} ${item.name}`.toLowerCase().includes(q)) : countryOptions;
  }, [applicationCountrySearch]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const q = search.toLowerCase();
      const matchesSearch = project.name.toLowerCase().includes(q) || project.city.toLowerCase().includes(q) || project.country.toLowerCase().includes(q) || (getCountryMeta(project.country)?.name || "").toLowerCase().includes(q) || (project.region || "").toLowerCase().includes(q) || project.category.toLowerCase().includes(q) || project.owner.toLowerCase().includes(q);
      const matchesCountry = countryFilter === "all" || project.country === countryFilter;
      const matchesOwner = ownerFilter === "all" || project.owner === ownerFilter;
      const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
      return matchesSearch && matchesCountry && matchesOwner && matchesPriority;
    });
  }, [projects, search, countryFilter, ownerFilter, priorityFilter]);

  const calendarProjects = useMemo(() => projects.filter((project) => (calendarRegionFilter === "all" || project.region === calendarRegionFilter) && (calendarOwnerFilter === "all" || project.owner === calendarOwnerFilter) && (calendarCategoryFilter === "all" || project.category === calendarCategoryFilter)), [projects, calendarRegionFilter, calendarOwnerFilter, calendarCategoryFilter]);
  const calendarGroups = useMemo(() => {
    const groups = monthNames.map((name, idx) => ({ monthIndex: idx, monthName: name, events: [] }));
    calendarProjects.forEach((project) => {
      if (!project.startDate) return;
      groups[new Date(`${project.startDate}T00:00:00`).getMonth()].events.push(project);
    });
    groups.forEach((group) => group.events.sort((a, b) => a.startDate.localeCompare(b.startDate)));
    return groups;
  }, [calendarProjects]);

  const metrics = useMemo(() => {
    const total = filteredProjects.length;
    const atRisk = filteredProjects.filter((p) => p.stage === "At Risk").length;
    const upcoming = filteredProjects.filter((p) => { const days = daysUntil(p.startDate); return days >= 0 && days <= 30; }).length;
    const totalBudget = filteredProjects.reduce((sum, p) => sum + Number(p.budget || 0), 0);
    return { total, atRisk, upcoming, totalBudget };
  }, [filteredProjects]);

  const waitingApplications = useMemo(() => [...applications].filter((item) => item.status === "Pending Review").sort((a, b) => new Date(a.dueDate || "9999-12-31") - new Date(b.dueDate || "9999-12-31")), [applications]);
  const finishedApplications = useMemo(() => [...applications].filter((item) => item.status === "Approved" || item.status === "Rejected").sort((a, b) => new Date(b.dueDate || "1900-01-01") - new Date(a.dueDate || "1900-01-01")), [applications]);
  const visibleApplications = reviewFilter === "waiting" ? waitingApplications : finishedApplications;

  function getDueState(dueDate, status) {
    if (status !== "Pending Review") return "neutral";
    const today = new Date();
    const due = new Date(`${dueDate}T23:59:59`);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "overdue";
    if (diffDays <= 2) return "soon";
    return "normal";
  }

  function handleNewProjectChange(field, value) {
    if (field === "country") {
      const meta = getCountryMeta(value);
      setNewProject((prev) => ({ ...prev, country: value, region: meta?.region || "" }));
      return;
    }
    if (field === "startDate") {
      setNewProject((prev) => ({ ...prev, startDate: value, timeline: value ? buildTimeline(value) : [] }));
      return;
    }
    setNewProject((prev) => ({ ...prev, [field]: value }));
  }

  function handleSelectedProjectChange(field, value) {
    if (!selectedProject || !canEditSelectedProject) return;
    setProjects((prev) => prev.map((project) => {
      if (project.id !== selectedProject.id) return project;
      if (field === "country") {
        const meta = getCountryMeta(value);
        return { ...project, country: value, region: meta?.region || "" };
      }
      if (field === "startDate") {
        const rebuiltTimeline = timelineBlueprint.map((item, idx) => ({ ...project.timeline[idx], dueDate: value ? addDays(value, item.offsetDays) : "" }));
        return { ...project, startDate: value, timeline: rebuiltTimeline };
      }
      return { ...project, [field]: field === "budget" ? Number(value || 0) : value };
    }));
  }

  function toggleWorkstreamTask(groupId, taskId) {
    if (!selectedProject || !canEditSelectedProject) return;
    setProjects((prev) => prev.map((project) => project.id !== selectedProject.id ? project : ({
      ...project,
      workstreams: (project.workstreams || []).map((group) => group.id !== groupId ? group : ({ ...group, tasks: group.tasks.map((task) => task.id !== taskId ? task : { ...task, done: !task.done }) })),
    })));
  }
  function toggleTimelineItem(itemId) {
    if (!selectedProject || !canEditSelectedProject) return;
    setProjects((prev) => prev.map((project) => project.id !== selectedProject.id ? project : ({ ...project, timeline: (project.timeline || []).map((item) => item.id !== itemId ? item : { ...item, done: !item.done }) })));
  }
  function updateBudgetItem(itemId, field, value) {
    if (!selectedProject || !canEditSelectedProject) return;
    setProjects((prev) => prev.map((project) => project.id !== selectedProject.id ? project : ({ ...project, budgetItems: (project.budgetItems || []).map((item) => item.id !== itemId ? item : { ...item, [field]: Number(value || 0) }) })));
  }
  function updateMaterialItem(itemId, field, value) {
    if (!selectedProject || !canEditSelectedProject) return;
    setProjects((prev) => prev.map((project) => project.id !== selectedProject.id ? project : ({ ...project, materials: (project.materials || []).map((item) => item.id !== itemId ? item : { ...item, [field]: field === "quantity" ? Number(value || 0) : value }) })));
  }
  function addMaterialItem() {
    if (!selectedProject || !canEditSelectedProject) return;
    setProjects((prev) => prev.map((project) => project.id !== selectedProject.id ? project : ({ ...project, materials: [...(project.materials || []), { id: `mat-${Date.now()}`, name: "", quantity: 0, status: "Planned" }] })));
    setShowMaterialsTable(true);
  }
  function deleteMaterialItem(itemId) {
    if (!selectedProject || !canEditSelectedProject) return;
    setProjects((prev) => prev.map((project) => project.id !== selectedProject.id ? project : ({ ...project, materials: (project.materials || []).filter((item) => item.id !== itemId) })));
  }
  function handleApplicationChange(field, value) {
    if (field === "country") {
      const meta = getCountryMeta(value);
      setNewApplication((prev) => ({ ...prev, country: value, region: meta?.region || "" }));
      return;
    }
    setNewApplication((prev) => ({ ...prev, [field]: value }));
  }
  function openProjectDetail(id) {
    setSelectedProjectId(id);
    setBoardView("detail");
    setActiveTab("board");
  }
  function handleAddProject(e) {
    e.preventDefault();
    const requiredMissing = [];
    if (!newProject.name) requiredMissing.push("Event name");
    if (!newProject.country) requiredMissing.push("Country");
    if (!newProject.city) requiredMissing.push("City");
    if (!newProject.category) requiredMissing.push("Event Category");
    if (!newProject.owner) requiredMissing.push("Owner");
    if (!newProject.startDate) requiredMissing.push("Start date");
    if (!newProject.endDate) requiredMissing.push("End date");
    if (!newProject.priority) requiredMissing.push("Priority");
    if (requiredMissing.length > 0) { alert(`Cannot create event. Please fill required fields: ${requiredMissing.join(", ")}`); return; }
    const projectToAdd = baseProject({ ...newProject, id: Date.now(), budget: Number(newProject.budget || 0), stage: newProject.stage || "Planning" });
    setProjects((prev) => [projectToAdd, ...prev]);
    setSelectedProjectId(projectToAdd.id);
    setBoardView("detail");
    setNewProject(emptyProject());
    setCountrySearch("");
    setShowCountryDropdown(false);
    setShowAddModal(false);
  }
  function handleApplyForEvent(e) {
    e.preventDefault();
    const requiredMissing = [];
    if (!newApplication.name) requiredMissing.push("Event name");
    if (!newApplication.applicant) requiredMissing.push("Applicant");
    if (!newApplication.country) requiredMissing.push("Country");
    if (!newApplication.city) requiredMissing.push("City");
    if (!newApplication.category) requiredMissing.push("Event Category");
    if (!newApplication.startDate) requiredMissing.push("Start date");
    if (!newApplication.endDate) requiredMissing.push("End date");
    if (!newApplication.website) requiredMissing.push("Official website link");
    if (requiredMissing.length > 0) { alert(`Cannot submit application. Please fill required fields: ${requiredMissing.join(", ")}`); return; }
    const assignee = regionOwners[newApplication.region];
    const application = { ...newApplication, id: Date.now(), estimatedBudget: Number(newApplication.estimatedBudget || 0), status: "Pending Review", dueDate: addDays(new Date().toISOString().slice(0, 10), 7), assignedOwner: assignee?.owner || "Unassigned", assignedEmail: assignee?.email || "" };
    setApplications((prev) => [application, ...prev]);
    setNewApplication(emptyApplication());
    setApplicationCountrySearch("");
    setShowApplicationCountryDropdown(false);
    setApplicationSubmitted(true);
    alert(`Application submitted. Routed to ${application.assignedOwner} with a 7-day review deadline.`);
  }
  function handleApproveApplication(id) {
    const app = applications.find((a) => a.id === id);
    if (!app) return;
    const newProjectFromApp = baseProject({ id: Date.now(), name: app.name, country: app.country, region: app.region, city: app.city, owner: app.assignedOwner, stage: "Planning", priority: "A", startDate: app.startDate, endDate: app.endDate, budget: app.estimatedBudget || 0, category: app.category, notes: app.notes || "", sellable: "", boothSizeSqm: "", boothOpenSides: "" });
    setProjects((prev) => [newProjectFromApp, ...prev]);
    setSelectedProjectId(newProjectFromApp.id);
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status: "Approved" } : a));
  }
  function handleRejectApplication(id) { setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status: "Rejected" } : a)); }
  function handleDeleteProject() {
    if (!selectedProject) return;
    const nextProjects = projects.filter((project) => project.id !== selectedProject.id);
    setProjects(nextProjects);
    setSelectedProjectId(nextProjects[0]?.id || null);
    setBoardView(nextProjects[0]?.id ? "detail" : "board");
  }
  function selectCountryForNewProject(code) { handleNewProjectChange("country", code); setCountrySearch(""); setShowCountryDropdown(false); }
  function selectCountryForSelectedProject(code) { handleSelectedProjectChange("country", code); setEditCountrySearch(""); setShowEditCountryDropdown(false); }
  function selectCountryForApplication(code) { handleApplicationChange("country", code); setApplicationCountrySearch(""); setShowApplicationCountryDropdown(false); }

  const selectedRisk = selectedProject ? getProjectRisk(selectedProject) : null;
  const selectedChecklist = selectedProject ? getChecklistProgress(selectedProject.workstreams || []) : { total: 0, completed: 0 };
  const selectedTimelineProgress = selectedProject ? getTimelineProgress(selectedProject.timeline || []) : { total: 0, completed: 0 };
  const selectedBudgetSummary = selectedProject ? getBudgetSummary(selectedProject.budgetItems || []) : { budget: 0, actual: 0, variance: 0 };
  const selectedTimelineGroups = selectedProject ? getTimelineGroups(selectedProject.timeline || []) : [];
  const currentPhaseIndex = selectedTimelineGroups.findIndex((group) => group.items.some((item) => !item.done));

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.tabBar}>
          <button type="button" style={activeTab === "board" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("board")}>Event Board</button>
          <button type="button" style={activeTab === "calendar" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("calendar")}>Global Event Calendar</button>
          <button type="button" style={activeTab === "apply" ? styles.activeTabButton : styles.tabButton} onClick={() => setActiveTab("apply")}>Apply for New Event</button>
        </div>

        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>Offline Events Project Board</h1>
            <p style={styles.subtitle}>Track partner events, media days, distributor trainings, creator meetups, applications, timeline risk, and annual global event visibility.</p>
          </div>
        </div>

        {activeTab === "board" ? (
          boardView === "board" ? (
            <>
              <div style={styles.toolbar}>
                <div style={styles.filters}>
                  <input style={{ ...styles.input, minWidth: 240 }} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search city, country, owner, or project" />
                  <select style={styles.filterSelect} value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>{countries.map((country) => <option key={country} value={country}>{country === "all" ? "All countries" : getCountryLabel(country)}</option>)}</select>
                  <select style={styles.filterSelect} value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)}>{owners.map((owner) => <option key={owner} value={owner}>{owner === "all" ? "All owners" : owner}</option>)}</select>
                  <select style={styles.filterSelect} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                    <option value="all">All priorities</option><option value="S">S Priority</option><option value="A">A Priority</option><option value="B">B Priority</option>
                  </select>
                </div>
                <div style={styles.buttonRow}><button type="button" style={styles.primaryButton} onClick={() => setShowAddModal(true)}>+ Add New Event</button></div>
              </div>

              <div style={styles.summaryGrid}><div style={styles.metricsGrid}>
                <MetricCard title="Active Projects" value={String(metrics.total)} />
                <MetricCard title="Upcoming in 30 Days" value={String(metrics.upcoming)} />
                <MetricCard title="At Risk" value={String(metrics.atRisk)} />
                <MetricCard title="Tracked Budget" value={formatCurrency(metrics.totalBudget)} />
              </div></div>

              <div style={styles.boardOnlyGrid}>
                {stages.map((stage) => {
                  const stageProjects = filteredProjects.filter((p) => p.stage === stage);
                  const countStyle = stageColors[stage] || { background: "#e2e8f0", color: "#334155" };
                  return (
                    <div key={stage} style={styles.column}>
                      <div style={styles.columnHeader}><h2 style={styles.columnTitle}>{stage}</h2><span style={{ ...styles.countBadge, ...countStyle }}>{stageProjects.length}</span></div>
                      <div style={styles.columnBody}>{stageProjects.length === 0 ? <div style={styles.emptyState}>No projects in this stage</div> : stageProjects.map((project) => <ProjectCard key={project.id} project={project} isSelected={project.id === selectedProjectId} onClick={() => openProjectDetail(project.id)} />)}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : selectedProject ? (
            <div style={styles.detailPageWrap}>
              <div style={styles.detailPageHeader}>
                <button type="button" style={styles.secondaryButton} onClick={() => setBoardView("board")}>← Back to Board</button>
                <button type="button" style={styles.dangerButton} onClick={handleDeleteProject}>Delete Event</button>
              </div>
              <div style={styles.detailPageCard}>
                <div style={styles.detailHero}>
                  <div><h2 style={styles.detailTitle}>{selectedProject.name}</h2><div style={styles.metaText}>{selectedProject.city}, {getCountryLabel(selectedProject.country)} · {selectedProject.region || "—"}</div></div>
                  <span style={{ ...styles.priorityBadge, ...(priorityColors[selectedProject.priority] || { background: "#f1f5f9", color: "#334155" }) }}>{selectedProject.priority || "—"}</span>
                </div>

                <div style={styles.dashboardGrid}>
                  <div style={styles.dashboardCard}><div style={styles.metricTitle}>Event Risk</div><div style={{ ...styles.riskBadge, background: selectedRisk.bg, color: selectedRisk.color }}>{selectedRisk.level}</div><div style={styles.helpText}>{selectedRisk.message}</div></div>
                  <div style={styles.dashboardCard}><div style={styles.metricTitle}>Timeline Progress</div><div style={styles.metricValueSmall}>{selectedTimelineProgress.completed}/{selectedTimelineProgress.total}</div></div>
                  <div style={styles.dashboardCard}><div style={styles.metricTitle}>Checklist Progress</div><div style={styles.metricValueSmall}>{selectedChecklist.completed}/{selectedChecklist.total}</div></div>
                  <div style={styles.dashboardCard}><div style={styles.metricTitle}>Budget Variance</div><div style={styles.metricValueSmall}>{formatCurrency(selectedBudgetSummary.variance)}</div></div>
                </div>

                <div style={styles.ownerGuardCard}><div style={styles.ownerGuardTitle}>Editing permission</div><div style={styles.helpText}>Only the event owner can edit this page. Current user: <strong>{currentUser}</strong>. Event owner: <strong>{selectedProject.owner}</strong>.</div></div>

                <div style={styles.detailSectionTitle}>Event Details</div>
                <div style={styles.formGrid}>
                  <Field label="Event name"><input disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.input : { ...styles.input, ...styles.disabledInput }} value={selectedProject.name} onChange={(e) => handleSelectedProjectChange("name", e.target.value)} placeholder="Event name" /></Field>
                  <Field label="Owner"><input disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.input : { ...styles.input, ...styles.disabledInput }} value={selectedProject.owner} onChange={(e) => handleSelectedProjectChange("owner", e.target.value)} placeholder="Owner" /></Field>
                  {canEditSelectedProject ? <CountryPicker label="Country code" required triggerValue={selectedProject.country} searchValue={editCountrySearch} setSearchValue={setEditCountrySearch} isOpen={showEditCountryDropdown} setIsOpen={setShowEditCountryDropdown} options={filteredEditCountryOptions} onSelect={selectCountryForSelectedProject} /> : <Field label="Country code"><input style={{ ...styles.input, ...styles.disabledInput }} value={getCountryLabel(selectedProject.country)} readOnly /></Field>}
                  <Field label="Region"><input style={{ ...styles.input, ...styles.readonlyInput }} value={selectedProject.region || ""} readOnly /></Field>
                  <Field label="City"><input disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.input : { ...styles.input, ...styles.disabledInput }} value={selectedProject.city} onChange={(e) => handleSelectedProjectChange("city", e.target.value)} placeholder="City" /></Field>
                  <Field label="Event Category"><select disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.selectPlaceholder(selectedProject.category) : { ...styles.selectPlaceholder(selectedProject.category), ...styles.disabledInput }} value={selectedProject.category} onChange={(e) => handleSelectedProjectChange("category", e.target.value)}><option value="" disabled>Event Category</option>{categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></Field>
                  <Field label="Priority"><select disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.selectPlaceholder(selectedProject.priority) : { ...styles.selectPlaceholder(selectedProject.priority), ...styles.disabledInput }} value={selectedProject.priority} onChange={(e) => handleSelectedProjectChange("priority", e.target.value)}><option value="" disabled>Priority</option><option value="S">S</option><option value="A">A</option><option value="B">B</option></select></Field>
                  <Field label="Stage"><select disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.select : { ...styles.select, ...styles.disabledInput }} value={selectedProject.stage} onChange={(e) => handleSelectedProjectChange("stage", e.target.value)}>{stages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}</select></Field>
                  <Field label="Start date"><input disabled={!canEditSelectedProject} lang="en-GB" style={canEditSelectedProject ? styles.input : { ...styles.input, ...styles.disabledInput }} type="date" value={selectedProject.startDate} onChange={(e) => handleSelectedProjectChange("startDate", e.target.value)} /></Field>
                  <Field label="End date"><input disabled={!canEditSelectedProject} lang="en-GB" style={canEditSelectedProject ? styles.input : { ...styles.input, ...styles.disabledInput }} type="date" value={selectedProject.endDate} onChange={(e) => handleSelectedProjectChange("endDate", e.target.value)} /></Field>
                  <Field label="Budget"><div style={styles.inputWithSuffix}><input disabled={!canEditSelectedProject} style={canEditSelectedProject ? { ...styles.input, paddingRight: 52 } : { ...styles.input, ...styles.disabledInput, paddingRight: 52 }} type="number" value={selectedProject.budget} onChange={(e) => handleSelectedProjectChange("budget", e.target.value)} placeholder="Budget" /><span style={styles.inputSuffix}>USD</span></div></Field>
                  <Field label="Sellable"><select disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.selectPlaceholder(selectedProject.sellable || "") : { ...styles.selectPlaceholder(selectedProject.sellable || ""), ...styles.disabledInput }} value={selectedProject.sellable || ""} onChange={(e) => handleSelectedProjectChange("sellable", e.target.value)}><option value="" disabled>Sellable?</option><option value="Yes">Yes</option><option value="No">No</option></select></Field>
                  <Field label="Booth size"><input disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.input : { ...styles.input, ...styles.disabledInput }} value={selectedProject.boothSizeSqm || ""} onChange={(e) => handleSelectedProjectChange("boothSizeSqm", e.target.value)} placeholder="Booth size (sqm)" /></Field>
                  <Field label="Open sides"><select disabled={!canEditSelectedProject} style={canEditSelectedProject ? styles.selectPlaceholder(selectedProject.boothOpenSides || "") : { ...styles.selectPlaceholder(selectedProject.boothOpenSides || ""), ...styles.disabledInput }} value={selectedProject.boothOpenSides || ""} onChange={(e) => handleSelectedProjectChange("boothOpenSides", e.target.value)}><option value="" disabled>Open sides</option>{boothSideOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></Field>
                </div>
                <Field label="Notes"><textarea style={canEditSelectedProject ? styles.textarea : { ...styles.textarea, ...styles.disabledInput }} disabled={!canEditSelectedProject} value={selectedProject.notes || ""} onChange={(e) => handleSelectedProjectChange("notes", e.target.value)} placeholder="Notes" /></Field>

                <div style={styles.detailSectionTitle}>Event Timeline</div>
                <TimelineCards project={selectedProject} canEdit={canEditSelectedProject} onToggle={toggleTimelineItem} />

                <div style={styles.lifecycleBarWrap}>
                  {selectedTimelineGroups.map((group, index) => {
                    const allDone = group.items.every((item) => item.done);
                    const isCurrent = index === currentPhaseIndex;
                    return (
                      <div key={group.name} style={styles.lifecycleStep}>
                        <div style={allDone ? styles.lifecycleDotDone : isCurrent ? styles.lifecycleDotCurrent : styles.lifecycleDotUpcoming} />
                        <div style={isCurrent ? styles.lifecycleLabelCurrent : styles.lifecycleLabel}>{group.name}</div>
                      </div>
                    );
                  })}
                </div>

                <div style={styles.detailSectionTitle}>Project Management Checklist</div>
                <div style={styles.workstreamGrid}>
                  {(selectedProject.workstreams || []).map((group) => {
                    const groupCompleted = group.tasks.filter((task) => task.done).length;
                    return (
                      <div key={group.id} style={styles.workstreamCard}>
                        <div style={styles.workstreamHeader}>
                          <div style={styles.workstreamTitle}>{group.title}</div>
                          <div style={styles.workstreamHeaderActions}>
                            {group.title === "Materials & Product" && <button type="button" style={styles.inlineLinkButton} onClick={() => setShowMaterialsTable((prev) => !prev)}>{showMaterialsTable ? "Hide details" : "Open details"}</button>}
                            <div style={styles.workstreamProgress}>{groupCompleted}/{group.tasks.length}</div>
                          </div>
                        </div>
                        <div style={styles.taskList}>
                          {group.tasks.map((task) => <label key={task.id} style={styles.taskRow}><input type="checkbox" checked={task.done} disabled={!canEditSelectedProject} onChange={() => toggleWorkstreamTask(group.id, task.id)} /><span style={task.done ? styles.taskTextDone : styles.taskText}>{task.label}</span></label>)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {showMaterialsTable && (
                  <div style={styles.materialsPanel}>
                    <div style={styles.materialsHeaderTop}><div style={styles.detailSectionTitle}>Materials Detail</div>{canEditSelectedProject && <button type="button" style={styles.primaryGhostButton} onClick={addMaterialItem}>+ Add Material</button>}</div>
                    <div style={styles.materialsTable}>
                      <div style={styles.materialsHeaderRow}><div>Material Name</div><div>Quantity</div><div>Status</div><div>Action</div></div>
                      {(selectedProject.materials || []).map((item) => (
                        <div key={item.id} style={styles.materialsDataRow}>
                          <div><input type="text" disabled={!canEditSelectedProject} value={item.name} onChange={(e) => updateMaterialItem(item.id, "name", e.target.value)} style={canEditSelectedProject ? styles.smallInput : { ...styles.smallInput, ...styles.disabledInput }} /></div>
                          <div><input type="number" disabled={!canEditSelectedProject} value={item.quantity} onChange={(e) => updateMaterialItem(item.id, "quantity", e.target.value)} style={canEditSelectedProject ? styles.smallInput : { ...styles.smallInput, ...styles.disabledInput }} /></div>
                          <div><select disabled={!canEditSelectedProject} value={item.status} onChange={(e) => updateMaterialItem(item.id, "status", e.target.value)} style={canEditSelectedProject ? styles.smallInput : { ...styles.smallInput, ...styles.disabledInput }}><option value="Planned">Planned</option><option value="In Production">In Production</option><option value="Ready to Ship">Ready to Ship</option><option value="Shipped">Shipped</option><option value="Delivered">Delivered</option></select></div>
                          <div>{canEditSelectedProject && <button type="button" style={styles.deleteTextButton} onClick={() => deleteMaterialItem(item.id)}>Delete</button>}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={styles.detailSectionTitle}>Budget Tracking</div>
                <div style={styles.budgetSummaryGrid}>
                  <div style={styles.dashboardCard}><div style={styles.metricTitle}>Planned Budget</div><div style={styles.metricValueSmall}>{formatCurrency(selectedBudgetSummary.budget)}</div></div>
                  <div style={styles.dashboardCard}><div style={styles.metricTitle}>Actual Spend</div><div style={styles.metricValueSmall}>{formatCurrency(selectedBudgetSummary.actual)}</div></div>
                  <div style={styles.dashboardCard}><div style={styles.metricTitle}>Variance</div><div style={styles.metricValueSmall}>{formatCurrency(selectedBudgetSummary.variance)}</div></div>
                </div>
                <div style={styles.budgetTable}>
                  <div style={styles.budgetHeaderRow}><div>Cost item</div><div>Budget</div><div>Actual</div></div>
                  {(selectedProject.budgetItems || []).map((item) => (
                    <div key={item.id} style={styles.budgetDataRow}>
                      <div>{item.label}</div>
                      <div><input type="number" disabled={!canEditSelectedProject} value={item.budget} onChange={(e) => updateBudgetItem(item.id, "budget", e.target.value)} style={canEditSelectedProject ? styles.smallInput : { ...styles.smallInput, ...styles.disabledInput }} /></div>
                      <div><input type="number" disabled={!canEditSelectedProject} value={item.actual} onChange={(e) => updateBudgetItem(item.id, "actual", e.target.value)} style={canEditSelectedProject ? styles.smallInput : { ...styles.smallInput, ...styles.disabledInput }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null
        ) : activeTab === "calendar" ? (
          <div style={styles.calendarPageWrap}>
            <div style={styles.toolbar}>
              <div style={styles.filters}>
                <select style={styles.filterSelect} value={calendarRegionFilter} onChange={(e) => setCalendarRegionFilter(e.target.value)}>{regions.map((region) => <option key={region} value={region}>{region === "all" ? "All regions" : region}</option>)}</select>
                <select style={styles.filterSelect} value={calendarOwnerFilter} onChange={(e) => setCalendarOwnerFilter(e.target.value)}>{owners.map((owner) => <option key={owner} value={owner}>{owner === "all" ? "All owners" : owner}</option>)}</select>
                <select style={styles.filterSelect} value={calendarCategoryFilter} onChange={(e) => setCalendarCategoryFilter(e.target.value)}><option value="all">All categories</option>{categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}</select>
              </div>
            </div>
            <div style={styles.calendarGrid}>
              {calendarGroups.map((group) => (
                <div key={group.monthIndex} style={styles.calendarMonthCard}>
                  <div style={styles.calendarMonthHeader}><div style={styles.calendarMonthTitle}>{group.monthName}</div><div style={styles.calendarMonthCount}>{group.events.length}</div></div>
                  <div style={styles.calendarEventsList}>
                    {group.events.length === 0 ? <div style={styles.emptyStateSmall}>No events</div> : group.events.map((project) => {
                      const cat = categoryColors[project.category] || { background: "#e2e8f0", color: "#334155" };
                      const risk = getProjectRisk(project);
                      return (
                        <button key={project.id} type="button" style={styles.calendarEventCard} onClick={() => openProjectDetail(project.id)}>
                          <div style={styles.calendarEventTop}><div style={styles.calendarEventName}>{project.name}</div><span style={{ ...styles.categoryBadge, background: cat.background, color: cat.color }}>{project.category}</span></div>
                          <div style={styles.metaText}>{formatDateRange(project.startDate, project.endDate)}</div>
                          <div style={styles.metaText}>{project.city}, {getCountryLabel(project.country)}</div>
                          <div style={styles.metaText}>Owner: {project.owner}</div>
                          <div style={{ ...styles.riskBadge, background: risk.bg, color: risk.color }}>{risk.level}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.applyPageLayout}>
            <div style={styles.applyHeroCard}>
              <div><h2 style={styles.sectionTitle}>Apply for New Event</h2><p style={styles.subtitle}>For teammates to submit new event opportunities. Submissions are routed automatically to the regional owner, added to the review queue, and assigned a 7-day deadline.</p></div>
              <div style={styles.applyHeroMeta}><div style={styles.infoPill}>Auto region routing</div><div style={styles.infoPill}>7-day DDL</div><div style={styles.infoPill}>Email draft generated</div></div>
            </div>
            <div style={styles.applyContentGrid}>
              <div style={styles.applyFormCard}>
                {applicationSubmitted ? (
                  <div style={styles.confirmationCard}><div style={styles.confirmationIcon}>✓</div><h3 style={styles.confirmationTitle}>Application Submitted</h3><p style={styles.helpText}>Your event opportunity has been sent to the regional owner and added to the review queue. They have a 7-day window to review the request.</p><button type="button" style={styles.primaryButton} onClick={() => setApplicationSubmitted(false)}>Submit Another Event</button></div>
                ) : (
                  <>
                    <div style={styles.formTitle}>Submit a new application</div>
                    <form onSubmit={handleApplyForEvent}>
                      <div style={styles.formGrid}>
                        <Field label="Event name" required><input style={styles.input} value={newApplication.name} onChange={(e) => handleApplicationChange("name", e.target.value)} placeholder="Event name" /></Field>
                        <Field label="Applicant" required><input style={styles.input} value={newApplication.applicant} onChange={(e) => handleApplicationChange("applicant", e.target.value)} placeholder="Your name" /></Field>
                        <CountryPicker label="Country code" required triggerValue={newApplication.country} searchValue={applicationCountrySearch} setSearchValue={setApplicationCountrySearch} isOpen={showApplicationCountryDropdown} setIsOpen={setShowApplicationCountryDropdown} options={filteredApplicationCountryOptions} onSelect={selectCountryForApplication} />
                        <Field label="Region"><input style={{ ...styles.input, ...styles.readonlyInput }} value={newApplication.region || ""} placeholder="Auto-filled from country" readOnly /></Field>
                        <Field label="City" required><input style={styles.input} value={newApplication.city} onChange={(e) => handleApplicationChange("city", e.target.value)} placeholder="City" /></Field>
                        <Field label="Event Category" required><select style={styles.selectPlaceholder(newApplication.category)} value={newApplication.category} onChange={(e) => handleApplicationChange("category", e.target.value)}><option value="" disabled>Select category</option>{categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></Field>
                        <Field label="Start date" required><input lang="en-GB" style={styles.input} type="date" value={newApplication.startDate} onChange={(e) => handleApplicationChange("startDate", e.target.value)} /></Field>
                        <Field label="End date" required><input lang="en-GB" style={styles.input} type="date" value={newApplication.endDate} onChange={(e) => handleApplicationChange("endDate", e.target.value)} /></Field>
                        <Field label="Official website link" required><input style={styles.input} value={newApplication.website} onChange={(e) => handleApplicationChange("website", e.target.value)} placeholder="https://" /></Field>
                        <Field label="Estimated budget"><div style={styles.inputWithSuffix}><input style={{ ...styles.input, paddingRight: 52 }} type="number" value={newApplication.estimatedBudget} onChange={(e) => handleApplicationChange("estimatedBudget", e.target.value)} placeholder="Estimated budget" /><span style={styles.inputSuffix}>USD</span></div></Field>
                      </div>
                      <textarea style={styles.textarea} value={newApplication.notes} onChange={(e) => handleApplicationChange("notes", e.target.value)} placeholder="Notes (optional)" />
                      <div style={styles.assignmentBox}><div style={styles.assignmentTitle}>Regional routing preview</div><div style={styles.helpText}>{newApplication.region && regionOwners[newApplication.region] ? `${newApplication.region} applications will be routed to ${regionOwners[newApplication.region].owner} (${regionOwners[newApplication.region].email}) with a 7-day deadline.` : "Choose a country to preview who will receive the application."}</div></div>
                      <div style={styles.modalFooter}><button type="submit" style={styles.primaryButton}>Submit Application</button></div>
                    </form>
                  </>
                )}
              </div>
              <ReviewQueue applications={visibleApplications} reviewFilter={reviewFilter} setReviewFilter={setReviewFilter} isOpen={showApplyQueue} setIsOpen={setShowApplyQueue} onApprove={handleApproveApplication} onReject={handleRejectApplication} getDueState={getDueState} />
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={styles.modalHeader}><div><div style={styles.formTitle}>Add New Event</div><div style={styles.helpText}>For event owners to add confirmed projects directly into the board.</div></div><button type="button" style={styles.secondaryButton} onClick={() => setShowAddModal(false)}>Close</button></div>
            <form onSubmit={handleAddProject}>
              <div style={styles.formGrid}>
                <Field label="Event name" required><input style={styles.input} value={newProject.name} onChange={(e) => handleNewProjectChange("name", e.target.value)} placeholder="Event name" /></Field>
                <Field label="Owner" required><input style={styles.input} value={newProject.owner} onChange={(e) => handleNewProjectChange("owner", e.target.value)} placeholder="Owner" /></Field>
                <CountryPicker label="Country code" required triggerValue={newProject.country} searchValue={countrySearch} setSearchValue={setCountrySearch} isOpen={showCountryDropdown} setIsOpen={setShowCountryDropdown} options={filteredCountryOptions} onSelect={selectCountryForNewProject} />
                <Field label="Region"><input style={{ ...styles.input, ...styles.readonlyInput }} value={newProject.region || ""} placeholder="Auto-filled from country" readOnly /></Field>
                <Field label="City" required><input style={styles.input} value={newProject.city} onChange={(e) => handleNewProjectChange("city", e.target.value)} placeholder="City" /></Field>
                <Field label="Event Category" required><select style={styles.selectPlaceholder(newProject.category)} value={newProject.category} onChange={(e) => handleNewProjectChange("category", e.target.value)}><option value="" disabled>Select category</option>{categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></Field>
                <Field label="Priority" required><select style={styles.selectPlaceholder(newProject.priority)} value={newProject.priority} onChange={(e) => handleNewProjectChange("priority", e.target.value)}><option value="" disabled>Priority</option><option value="S">S</option><option value="A">A</option><option value="B">B</option></select></Field>
                <Field label="Start date" required><input lang="en-GB" style={styles.input} type="date" value={newProject.startDate} onChange={(e) => handleNewProjectChange("startDate", e.target.value)} /></Field>
                <Field label="End date" required><input lang="en-GB" style={styles.input} type="date" value={newProject.endDate} onChange={(e) => handleNewProjectChange("endDate", e.target.value)} /></Field>
                <Field label="Budget"><div style={styles.inputWithSuffix}><input style={{ ...styles.input, paddingRight: 52 }} type="number" value={newProject.budget} onChange={(e) => handleNewProjectChange("budget", e.target.value)} placeholder="Budget" /><span style={styles.inputSuffix}>USD</span></div></Field>
                <Field label="Sellable"><select style={styles.selectPlaceholder(newProject.sellable)} value={newProject.sellable} onChange={(e) => handleNewProjectChange("sellable", e.target.value)}><option value="" disabled>Sellable?</option><option value="Yes">Yes</option><option value="No">No</option></select></Field>
                <Field label="Booth size"><input style={styles.input} value={newProject.boothSizeSqm} onChange={(e) => handleNewProjectChange("boothSizeSqm", e.target.value)} placeholder="Booth size (sqm)" /></Field>
                <Field label="Open sides"><select style={styles.selectPlaceholder(newProject.boothOpenSides)} value={newProject.boothOpenSides} onChange={(e) => handleNewProjectChange("boothOpenSides", e.target.value)}><option value="" disabled>Open sides</option>{boothSideOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></Field>
              </div>
              <textarea style={styles.textarea} value={newProject.notes} onChange={(e) => handleNewProjectChange("notes", e.target.value)} placeholder="Notes (optional)" />
              <div style={styles.modalFooter}><button type="button" style={styles.secondaryButton} onClick={() => setShowAddModal(false)}>Cancel</button><button type="submit" style={styles.primaryButton}>Create Event</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f8fafc", padding: "24px", fontFamily: "Arial, sans-serif", color: "#0f172a", boxSizing: "border-box" },
  container: { maxWidth: "1280px", margin: "0 auto" },
  tabBar: { display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" },
  tabButton: { border: "1px solid #cbd5e1", borderRadius: "999px", background: "white", color: "#475569", padding: "10px 16px", fontSize: "14px", fontWeight: 700, cursor: "pointer" },
  activeTabButton: { border: "1px solid #bfdbfe", borderRadius: "999px", background: "#eff6ff", color: "#1d4ed8", padding: "10px 16px", fontSize: "14px", fontWeight: 700, cursor: "pointer" },
  headerRow: { display: "flex", gap: "16px", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", marginBottom: "20px" },
  title: { fontSize: "32px", margin: 0 },
  subtitle: { marginTop: "8px", color: "#475569", maxWidth: "760px", lineHeight: 1.5 },
  toolbar: { display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px" },
  buttonRow: { display: "flex", gap: "10px", flexWrap: "wrap" },
  filters: { display: "flex", gap: "12px", flexWrap: "wrap", flex: 1 },
  filterSelect: { padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", minWidth: "180px", fontSize: "14px", background: "white", boxSizing: "border-box" },
  input: { padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", minWidth: 0, width: "100%", fontSize: "14px", boxSizing: "border-box" },
  select: { padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", minWidth: 0, width: "100%", fontSize: "14px", background: "white", boxSizing: "border-box" },
  textarea: { padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", width: "100%", minHeight: "92px", fontSize: "14px", boxSizing: "border-box", resize: "vertical", marginBottom: "12px" },
  searchSelectBox: { display: "flex", flexDirection: "column", gap: "8px" },
  searchSelectTrigger: (hasValue) => ({ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "white", fontSize: "14px", color: hasValue ? "#0f172a" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left" }),
  triggerArrow: { color: "#64748b", fontSize: "11px", marginLeft: "8px" },
  searchSelectList: { border: "1px solid #e2e8f0", borderRadius: "12px", background: "#fff", maxHeight: "220px", overflowY: "auto", padding: "6px", display: "flex", flexDirection: "column", gap: "6px" },
  searchSelectItem: { border: "1px solid #e2e8f0", borderRadius: "10px", background: "white", padding: "8px 10px", textAlign: "left", display: "flex", justifyContent: "space-between", gap: "10px", cursor: "pointer", fontSize: "13px" },
  searchSelectMeta: { color: "#64748b", fontSize: "12px", fontWeight: 700 },
  requiredLabel: { fontSize: "12px", color: "#334155", marginBottom: "6px", fontWeight: 600 },
  requiredStar: { color: "#dc2626", marginLeft: "2px" },
  fieldLabel: { fontSize: "12px", color: "#64748b", marginBottom: "6px", fontWeight: 600 },
  selectPlaceholder: (value) => ({ padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", width: "100%", fontSize: "14px", background: "white", boxSizing: "border-box", color: value ? "#0f172a" : "#94a3b8" }),
  inputWithSuffix: { position: "relative", width: "100%" },
  inputSuffix: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", fontWeight: 700, color: "#64748b", pointerEvents: "none" },
  summaryGrid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "16px", marginBottom: "24px" },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" },
  metricCard: { background: "white", borderRadius: "18px", padding: "18px", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)" },
  metricTitle: { fontSize: "14px", color: "#64748b", marginBottom: "8px" },
  metricValue: { fontSize: "28px", fontWeight: 700 },
  boardOnlyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" },
  column: { background: "white", borderRadius: "18px", padding: "16px", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)", minHeight: "300px" },
  columnHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  columnTitle: { margin: 0, fontSize: "18px" },
  countBadge: { borderRadius: "999px", padding: "4px 10px", fontSize: "12px", fontWeight: 700 },
  columnBody: { display: "flex", flexDirection: "column", gap: "12px" },
  emptyState: { border: "1px dashed #cbd5e1", borderRadius: "14px", padding: "24px", textAlign: "center", color: "#94a3b8" },
  projectCardButton: { border: "1px solid #e2e8f0", borderRadius: "16px", padding: "14px", background: "#ffffff", textAlign: "left", cursor: "pointer", width: "100%" },
  projectCardSelected: { border: "1px solid #2563eb", boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.12)" },
  projectTopRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" },
  projectName: { fontWeight: 700, fontSize: "15px", lineHeight: 1.4 },
  priorityBadge: { borderRadius: "999px", padding: "4px 10px", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" },
  metaText: { fontSize: "13px", color: "#64748b", marginBottom: "4px" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "12px" },
  infoCard: { background: "#f8fafc", borderRadius: "12px", padding: "8px" },
  infoLabel: { fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", marginBottom: "4px" },
  infoValue: { fontSize: "13px", fontWeight: 600, color: "#334155", lineHeight: 1.4 },
  noteBox: { background: "#f8fafc", borderRadius: "12px", padding: "10px" },
  noteItem: { fontSize: "13px", color: "#475569", marginBottom: "6px", lineHeight: 1.5 },
  progressRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "6px" },
  progressText: { fontSize: "12px", fontWeight: 700, color: "#64748b" },
  progressBarTrack: { width: "100%", height: "8px", borderRadius: "999px", background: "#e2e8f0", overflow: "hidden", marginBottom: "10px" },
  progressBarFill: { height: "100%", borderRadius: "999px", background: "#2563eb" },
  riskBadge: { display: "inline-flex", alignItems: "center", borderRadius: "999px", padding: "6px 10px", fontSize: "12px", fontWeight: 700, marginBottom: "10px" },
  detailPageWrap: { display: "flex", flexDirection: "column", gap: "16px" },
  detailPageHeader: { display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center" },
  detailPageCard: { background: "white", borderRadius: "18px", padding: "20px", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)" },
  detailHero: { display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start", marginBottom: "18px" },
  detailTitle: { margin: 0, fontSize: "28px", fontWeight: 700 },
  dashboardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "16px" },
  dashboardCard: { border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px", background: "#fff" },
  metricValueSmall: { fontSize: "22px", fontWeight: 700, color: "#0f172a" },
  ownerGuardCard: { border: "1px solid #e2e8f0", background: "#f8fafc", borderRadius: "12px", padding: "12px", marginBottom: "12px" },
  ownerGuardTitle: { fontSize: "13px", fontWeight: 700, color: "#334155" },
  disabledInput: { background: "#f8fafc", color: "#94a3b8", cursor: "not-allowed" },
  readonlyInput: { background: "#f8fafc", color: "#64748b" },
  detailSectionTitle: { fontSize: "16px", fontWeight: 700, marginBottom: "12px", marginTop: "12px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px", marginBottom: "12px" },
  phaseGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "16px" },
  phaseCard: { border: "1px solid #e2e8f0", borderRadius: "14px", padding: "14px", background: "#ffffff" },
  phaseCardCurrent: { background: "#eff6ff", boxShadow: "0 0 0 2px rgba(37,99,235,0.15)" },
  phaseHeader: { display: "flex", justifyContent: "space-between", marginBottom: "6px" },
  phaseTitle: { fontSize: "14px", fontWeight: 700 },
  phaseCount: { fontSize: "12px", color: "#64748b", fontWeight: 700 },
  phaseProgressTrack: { height: "6px", background: "#e2e8f0", borderRadius: "999px", marginBottom: "10px" },
  phaseProgressFill: { height: "100%", background: "#2563eb", borderRadius: "999px" },
  phaseTaskList: { display: "flex", flexDirection: "column", gap: "6px" },
  phaseTaskRow: { display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#334155" },
  currentPhaseTag: { marginTop: "10px", fontSize: "11px", fontWeight: 700, color: "#1d4ed8" },
  lifecycleBarWrap: { display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px", padding: "12px", background: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0" },
  lifecycleStep: { display: "flex", alignItems: "center", gap: "8px" },
  lifecycleDotDone: { width: "10px", height: "10px", borderRadius: "999px", background: "#16a34a" },
  lifecycleDotCurrent: { width: "10px", height: "10px", borderRadius: "999px", background: "#2563eb" },
  lifecycleDotUpcoming: { width: "10px", height: "10px", borderRadius: "999px", background: "#cbd5e1" },
  lifecycleLabel: { fontSize: "12px", color: "#64748b", fontWeight: 600 },
  lifecycleLabelCurrent: { fontSize: "12px", color: "#1d4ed8", fontWeight: 700 },
  workstreamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px", marginTop: "12px" },
  workstreamCard: { border: "1px solid #e2e8f0", borderRadius: "14px", background: "#fff", padding: "14px" },
  workstreamHeader: { display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", marginBottom: "10px" },
  workstreamTitle: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
  workstreamHeaderActions: { display: "flex", alignItems: "center", gap: "10px" },
  workstreamProgress: { fontSize: "12px", fontWeight: 700, color: "#64748b" },
  inlineLinkButton: { border: "none", background: "transparent", color: "#2563eb", fontSize: "12px", fontWeight: 700, cursor: "pointer", padding: 0 },
  taskList: { display: "flex", flexDirection: "column", gap: "10px" },
  taskRow: { display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#334155" },
  taskText: { color: "#334155" },
  taskTextDone: { color: "#64748b", textDecoration: "line-through" },
  primaryGhostButton: { border: "1px solid #bfdbfe", background: "#eff6ff", color: "#1d4ed8", borderRadius: "10px", padding: "8px 12px", fontSize: "12px", fontWeight: 700, cursor: "pointer" },
  materialsPanel: { marginBottom: "16px" },
  materialsHeaderTop: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "12px" },
  materialsTable: { border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", background: "#fff" },
  materialsHeaderRow: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 90px", gap: "12px", padding: "12px 14px", fontSize: "12px", fontWeight: 700, color: "#64748b", background: "#f8fafc" },
  materialsDataRow: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 90px", gap: "12px", padding: "12px 14px", alignItems: "center", borderTop: "1px solid #e2e8f0", fontSize: "13px" },
  deleteTextButton: { border: "none", background: "transparent", color: "#dc2626", fontSize: "12px", fontWeight: 700, cursor: "pointer", padding: 0 },
  budgetSummaryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "12px" },
  budgetTable: { border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", background: "#fff" },
  budgetHeaderRow: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px", padding: "12px 14px", fontSize: "12px", fontWeight: 700, color: "#64748b", background: "#f8fafc" },
  budgetDataRow: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "12px", padding: "12px 14px", alignItems: "center", borderTop: "1px solid #e2e8f0", fontSize: "13px" },
  smallInput: { width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" },
  calendarPageWrap: { display: "flex", flexDirection: "column", gap: "16px" },
  calendarGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "16px" },
  calendarMonthCard: { background: "white", borderRadius: "18px", padding: "16px", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)", minHeight: "260px" },
  calendarMonthHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  calendarMonthTitle: { fontSize: "18px", fontWeight: 700 },
  calendarMonthCount: { fontSize: "12px", fontWeight: 700, color: "#64748b", background: "#e2e8f0", borderRadius: "999px", padding: "4px 10px" },
  calendarEventsList: { display: "flex", flexDirection: "column", gap: "10px" },
  calendarEventCard: { border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px", background: "#fff", textAlign: "left", cursor: "pointer" },
  calendarEventTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" },
  calendarEventName: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
  categoryBadge: { borderRadius: "999px", padding: "4px 8px", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap" },
  applyPageLayout: { display: "flex", flexDirection: "column", gap: "16px" },
  applyHeroCard: { background: "white", borderRadius: "18px", padding: "20px", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)", display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" },
  applyHeroMeta: { display: "flex", gap: "8px", flexWrap: "wrap" },
  infoPill: { background: "#eef2ff", color: "#3730a3", borderRadius: "999px", padding: "6px 10px", fontSize: "12px", fontWeight: 700 },
  sectionTitle: { margin: 0, fontSize: "24px", fontWeight: 700 },
  applyContentGrid: { display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(320px, 1fr)", gap: "16px", alignItems: "start" },
  applyFormCard: { background: "white", borderRadius: "18px", padding: "18px", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)" },
  confirmationCard: { textAlign: "center", padding: "40px 20px" },
  confirmationIcon: { fontSize: "42px", color: "#16a34a", marginBottom: "10px", fontWeight: 800 },
  confirmationTitle: { fontSize: "20px", fontWeight: 700, marginBottom: "10px" },
  todoCard: { background: "white", borderRadius: "18px", padding: "18px", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)" },
  queueToggleButton: (isOpen) => ({ width: "100%", border: "1px solid #e2e8f0", borderRadius: "12px", background: isOpen ? "#f8fafc" : "white", color: "#0f172a", padding: "12px 14px", fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left", marginBottom: isOpen ? "10px" : "0" }),
  queueFilterRow: { display: "flex", gap: "8px", marginBottom: "10px" },
  filterTab: { border: "1px solid #cbd5e1", background: "white", borderRadius: "999px", padding: "6px 12px", fontSize: "12px", fontWeight: 700, cursor: "pointer", color: "#475569" },
  activeFilterTab: { border: "1px solid #bfdbfe", background: "#eff6ff", borderRadius: "999px", padding: "6px 12px", fontSize: "12px", fontWeight: 700, cursor: "pointer", color: "#1d4ed8" },
  todoList: { display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" },
  todoItemMuted: { border: "1px solid #e2e8f0", borderRadius: "14px", padding: "12px", background: "#f8fafc", opacity: 0.9 },
  todoItem: { border: "1px solid #e2e8f0", borderRadius: "14px", padding: "12px", background: "#fff" },
  todoHeader: { display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "6px" },
  todoTitle: { fontSize: "14px", fontWeight: 700 },
  todoBadgeStatus: (status) => ({ fontSize: "11px", fontWeight: 700, color: status === "Approved" ? "#166534" : status === "Rejected" ? "#991b1b" : "#1d4ed8", background: status === "Approved" ? "#dcfce7" : status === "Rejected" ? "#fee2e2" : "#dbeafe", padding: "4px 8px", borderRadius: "999px", whiteSpace: "nowrap" }),
  duePill: (state) => ({ display: "inline-block", padding: "2px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, color: state === "overdue" ? "#991b1b" : state === "soon" ? "#92400e" : "#334155", background: state === "overdue" ? "#fee2e2" : state === "soon" ? "#fef3c7" : "#e2e8f0" }),
  todoActions: { display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" },
  linkButton: { textDecoration: "none", background: "#2563eb", color: "white", padding: "8px 10px", borderRadius: "10px", fontSize: "12px", fontWeight: 700 },
  approveButton: { background: "#16a34a", color: "white", border: "none", borderRadius: "10px", padding: "8px 10px", fontSize: "12px", fontWeight: 700, cursor: "pointer" },
  rejectButton: { background: "#dc2626", color: "white", border: "none", borderRadius: "10px", padding: "8px 10px", fontSize: "12px", fontWeight: 700, cursor: "pointer" },
  linkButtonSecondary: { textDecoration: "none", background: "#eef2ff", color: "#3730a3", padding: "8px 10px", borderRadius: "10px", fontSize: "12px", fontWeight: 700 },
  emptyStateSmall: { border: "1px dashed #cbd5e1", borderRadius: "12px", padding: "18px", textAlign: "center", color: "#94a3b8", fontSize: "13px" },
  assignmentBox: { border: "1px solid #dbeafe", background: "#f8fbff", borderRadius: "12px", padding: "12px", marginBottom: "12px" },
  assignmentTitle: { fontSize: "13px", fontWeight: 700, color: "#1d4ed8", marginBottom: "6px" },
  formTitle: { fontSize: "16px", fontWeight: 700, marginBottom: "12px" },
  primaryButton: { border: "none", borderRadius: "10px", background: "#2563eb", color: "white", padding: "10px 14px", fontSize: "14px", fontWeight: 700, cursor: "pointer" },
  secondaryButton: { border: "1px solid #cbd5e1", borderRadius: "10px", background: "white", color: "#0f172a", padding: "10px 14px", fontSize: "14px", fontWeight: 700, cursor: "pointer" },
  dangerButton: { border: "none", borderRadius: "10px", background: "#dc2626", color: "white", padding: "10px 14px", fontSize: "14px", fontWeight: 700, cursor: "pointer" },
  helpText: { marginTop: "10px", fontSize: "13px", color: "#64748b", lineHeight: 1.5 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", zIndex: 1000 },
  modalCard: { width: "min(860px, 100%)", background: "white", borderRadius: "20px", padding: "20px", boxShadow: "0 20px 60px rgba(15, 23, 42, 0.18)", maxHeight: "90vh", overflowY: "auto" },
  modalHeader: { display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start", marginBottom: "12px" },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: "10px" },
};
