import React, { useEffect } from "react";
import {
  Home,
  Target,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  X,
  Globe,
  PenTool
} from "lucide-react";

export default function Sidebar({ currentRoute, onNavigate, onLogout, onGoHome, isMobileOpen, onCloseMobile }) {
  // Streamlined student navigation strictly matching the reference design
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "topic-reading", label: "Topic Reading", icon: BookOpen },
    { id: "question-practice", label: "Question Practice", icon: Target },
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
        {/* Brand Header matching reference screenshot */}
        <div className="sidebar-brand">
          <div
            className="brand-logo-wrap"
            onClick={onGoHome}
            style={{ cursor: "pointer" }}
            title="Return to main public homepage"
          >
            {/* Green rounded logo square with pen symbol */}
            <div
              className="sidebar-brand-badge"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#07865B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.5 3.5C17.3284 2.67157 18.6716 2.67157 19.5 3.5C20.3284 4.32843 20.3284 5.67157 19.5 6.5L8.5 17.5L4 19L5.5 14.5L16.5 3.5Z"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M14.5 5.5L18.5 9.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="brand-text-col">
              <span className="brand-name" style={{ color: "#17221F", fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.1 }}>
                Caplen
              </span>
              <span className="brand-tagline" style={{ color: "#66736D", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em" }}>
                EXAM PREP
              </span>
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

        {/* Navigation List strictly matching reference image */}
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
                  <Icon size={19} strokeWidth={isActive ? 2.4 : 2} />
                </div>
                <span className="nav-item-label">{item.label}</span>
                {isActive && <div className="active-pill-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Back to Homepage & Logout */}
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
                <Globe size={16} strokeWidth={2} />
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
              <LogOut size={16} strokeWidth={2} />
            </div>
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
