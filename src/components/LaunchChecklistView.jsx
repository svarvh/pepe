import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Award,
  Sparkles,
  Layers,
  ShieldCheck,
  FileText,
  ExternalLink,
  Filter,
  BarChart2
} from "lucide-react";
import confetti from "canvas-confetti";
import { StorageService } from "../services/storage";

export default function LaunchChecklistView({ onNavigate }) {
  const [checklist, setChecklist] = useState(StorageService.getLaunchChecklist());
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copied, setCopied] = useState(false);

  const completedCount = checklist.filter(c => c.status === "completed").length;
  const totalCount = checklist.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const categories = [
    { id: "all", label: "All Items (20)" },
    { id: "Core learning", label: "1. Core Learning (5)" },
    { id: "Testing and results", label: "2. Testing & Results (5)" },
    { id: "Administration", label: "3. Administration (5)" },
    { id: "Production readiness", label: "4. Production Readiness (5)" }
  ];

  const filteredItems = checklist.filter(item =>
    selectedCategory === "all" || item.category === selectedCategory
  );

  const handleToggleItem = (itemId) => {
    const item = checklist.find(c => c.id === itemId);
    const newStatus = item.status === "completed" ? "pending" : "completed";
    const updated = StorageService.updateChecklistItem(itemId, newStatus);
    setChecklist(updated);

    if (newStatus === "completed" && completedCount + 1 === totalCount) {
      try {
        confetti({ particleCount: 80, spread: 80 });
      } catch {}
    }
  };

  const handleCopyChecklist = () => {
    const text = checklist
      .map((item, idx) => `[${item.status === "completed" ? "X" : " "}] ${idx + 1}. ${item.title} (${item.category})\n   - ${item.description}`)
      .join("\n\n");

    navigator.clipboard.writeText(`GO-LIVE LAUNCH CHECKLIST (${completedCount}/${totalCount} Completed)\n\n` + text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="launch-checklist-view fade-in">
      {/* 1. TOP HERO HEADER */}
      <div className="checklist-hero-card">
        <div className="checklist-hero-left">
          <div className="checklist-icon-tile">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <div className="checklist-badge-row">
              <span className="badge badge-lime">Section 15 Specification</span>
              <span className="badge badge-lavender">20-Point Verification</span>
              <span className="badge badge-cream">Production Gate</span>
            </div>
            <h1 className="checklist-title">Go-Live Launch Checklist (Section 15)</h1>
            <p className="checklist-subtitle">
              Interactive readiness audit covering Core Learning, Assessment Engine, Teacher Administration, and Production Security.
            </p>
          </div>
        </div>

        {/* Counter Widget */}
        <div className="checklist-counter-card">
          <div className="counter-fraction">
            <span className="counter-curr">{completedCount}</span>
            <span className="counter-divider">/</span>
            <span className="counter-total">{totalCount}</span>
          </div>
          <div className="counter-progress-bar">
            <div className="counter-progress-fill" style={{ width: `${percentage}%` }} />
          </div>
          <span className="counter-sub-pct">{percentage}% Production Ready</span>
        </div>
      </div>

      {/* 2. FILTER & ACTION BAR */}
      <div className="checklist-filter-bar">
        <div className="checklist-category-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button className="pill-btn pill-btn-white" onClick={handleCopyChecklist}>
          {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
          <span>{copied ? "Copied Checklist!" : "Copy Checklist"}</span>
        </button>
      </div>

      {/* 3. CHECKLIST ITEMS GRID */}
      <div className="checklist-items-grid">
        {filteredItems.map((item, idx) => {
          const isDone = item.status === "completed";
          return (
            <div
              key={item.id}
              className={`checklist-item-card ${isDone ? "item-completed" : "item-pending"}`}
              onClick={() => handleToggleItem(item.id)}
            >
              <div className="item-checkbox-col">
                <button
                  className={`check-toggle-btn ${isDone ? "checked" : ""}`}
                  aria-label={`Toggle ${item.title}`}
                >
                  {isDone ? <CheckCircle2 size={22} className="check-icon-active" /> : <Circle size={22} />}
                </button>
              </div>

              <div className="item-text-col">
                <div className="item-meta-row">
                  <span className="badge badge-navy badge-sm">{item.category}</span>
                  {item.critical && <span className="badge badge-lavender badge-sm">Critical Gate</span>}
                </div>
                <h3 className={`item-title ${isDone ? "strikethrough" : ""}`}>{item.title}</h3>
                <p className="item-desc">{item.description}</p>
              </div>

              <div className="item-status-pill">
                <span className={`status-tag ${isDone ? "tag-completed" : "tag-pending"}`}>
                  {isDone ? "Ready" : "Pending"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
