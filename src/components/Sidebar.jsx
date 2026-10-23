import React, { useEffect } from "react";
import {
  LayoutDashboard,
  Target,
  Sparkles,
  FileText,
  BookmarkCheck,
  UploadCloud,
  PenTool,
  FolderHeart,
  BarChart2,
  Settings,
  LogOut,
  X,
  BookOpen,
  Video,
  Sliders,
  Trophy,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Globe,
  GraduationCap
} from "lucide-react";

export default function Sidebar({ currentRoute, onNavigate, onLogout, onGoHome, isMobileOpen, onCloseMobile }) {
  // Streamlined student navigation strictly adhering to the 5 recommended options
  const navItems = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "topic-reading", label: "Topic Reading", icon: BookOpen, badge: "Learn" },
    { id: "question-practice", label: "Question Practice", icon: Target, badge: "Practice" },
    { id: "analytics", label: "My Progress", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileOpen) {
        onCloseMobile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleItemClick = (id) => {
    onNavigate(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop fade-in"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isMobileOpen ? "mobile-drawer-open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div
            className="brand-logo-wrap"
            onClick={onGoHome}
            style={{ cursor: "pointer" }}
            title="Return to main public homepage"
          >
            <div className="landing-logo-icon" style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0 }}>
              <GraduationCap size={22} strokeWidth={2.4} color="#ffffff" />
            </div>
            <div className="brand-text-col">
              <span className="brand-name">Caplen</span>
              <span className="brand-tagline" style={{ color: "#059669" }}>EXAM PREP</span>
            </div>
          </div>

          {/* Close button inside mobile drawer */}
          <button
            className="sidebar-close-mobile-btn"
            id="btn-close-sidebar"
            aria-label="Close Navigation Menu"
            onClick={onCloseMobile}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <div className="nav-item-icon-box">
                  <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="nav-item-label">{item.label}</span>
                {item.badge && <span className="nav-item-badge">{item.badge}</span>}
                {isActive && <div className="active-pill-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {onGoHome && (
            <button
              className="logout-btn btn-back-home"
              onClick={() => {
                if (onCloseMobile) onCloseMobile();
                onGoHome();
              }}
              style={{ marginBottom: 8 }}
            >
              <div className="logout-icon-circle">
                <Globe size={16} strokeWidth={2.2} />
              </div>
              <span>Back to Homepage</span>
            </button>
          )}

          <button
            className="logout-btn"
            id="btn-logout"
            onClick={() => {
              if (confirm("Reset current demo session and return to Dashboard?")) {
                if (onCloseMobile) onCloseMobile();
                onLogout();
              }
            }}
          >
            <div className="logout-icon-circle">
              <LogOut size={16} strokeWidth={2.2} />
            </div>
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
