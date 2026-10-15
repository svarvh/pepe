import React from "react";
import {
  LayoutDashboard,
  Target,
  Sparkles,
  FolderHeart,
  Menu
} from "lucide-react";

export default function BottomNav({ currentRoute, onNavigate, onOpenMenu }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "practice", label: "Practice", icon: Target },
    { id: "ai-generator", label: "Generate", icon: Sparkles },
    { id: "library", label: "Library", icon: FolderHeart },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentRoute === tab.id;
        return (
          <button
            key={tab.id}
            id={`bottom-nav-${tab.id}`}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            onClick={() => onNavigate(tab.id)}
            aria-label={tab.label}
          >
            <div className="bottom-nav-icon-wrap">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <div className="bottom-nav-active-dot" />}
            </div>
            <span className="bottom-nav-label">{tab.label}</span>
          </button>
        );
      })}

      {/* Menu / More Button */}
      <button
        id="bottom-nav-menu"
        className="bottom-nav-item"
        onClick={onOpenMenu}
        aria-label="Open Full Navigation Menu"
      >
        <div className="bottom-nav-icon-wrap">
          <Menu size={20} strokeWidth={2} />
        </div>
        <span className="bottom-nav-label">More</span>
      </button>
    </nav>
  );
}
