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
  X
} from "lucide-react";

export default function Sidebar({ currentRoute, onNavigate, onLogout, isMobileOpen, onCloseMobile }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "practice", label: "Practice Questions", icon: Target },
    { id: "ai-generator", label: "Question Generator", icon: Sparkles },
    { id: "pyq", label: "Previous Year Papers", icon: FileText },
    { id: "topics", label: "Important Topics", icon: BookmarkCheck },
    { id: "import", label: "Import Questions", icon: UploadCloud },
    { id: "self-generator", label: "Self Question Generator", icon: PenTool },
    { id: "library", label: "My Library", icon: FolderHeart },
    { id: "analytics", label: "Performance Analytics", icon: BarChart2 },
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
          <div className="brand-logo-wrap">
            <svg className="brand-logo-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="10" fill="#292840" />
              <path
                d="M18 9C13.0294 9 9 13.0294 9 18C9 22.9706 13.0294 27 18 27C21.9864 27 25.3377 24.4109 26.5 20.8"
                stroke="#E7FA4B"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M18 13.5C15.5147 13.5 13.5 15.5147 13.5 18C13.5 20.4853 15.5147 22.5 18 22.5C19.7891 22.5 21.3262 21.4554 22.02 19.95"
                stroke="#BDA3FA"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="brand-text-col">
              <span className="brand-name">Caplen</span>
              <span className="brand-tagline">EXAM PREP</span>
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
                {isActive && <div className="active-pill-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
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
