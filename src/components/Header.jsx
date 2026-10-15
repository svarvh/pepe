import React, { useState } from "react";
import { Search, Mail, Bell, X, ArrowUpRight, BookOpen, FileText, Menu } from "lucide-react";
import { StorageService } from "../services/storage";

export default function Header({ user, onNavigate, onOpenMobileMenu }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  const allQuestions = StorageService.getQuestions();
  const allPapers = StorageService.getPapers();

  // Live matching search results
  const matchingQuestions = searchQuery.trim().length > 1
    ? allQuestions.filter(q =>
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.unit?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const matchingPapers = searchQuery.trim().length > 1
    ? allPapers.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subject.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const notifications = [
    { id: 1, title: "Mock Test Scheduled", desc: "3D Spatial Mechanics mock test starts in 2 hours", time: "10m ago", unread: true },
    { id: 2, title: "Weekly Goal Met!", desc: "You have completed 84 questions this week", time: "1h ago", unread: false },
    { id: 3, title: "New Solved PYQ Paper", desc: "JEE Advanced 2024 Paper 1 solutions uploaded", time: "1d ago", unread: false }
  ];

  return (
    <header className="app-header">
      {/* Mobile Top Left: Hamburger Button & Logo */}
      <div className="header-mobile-left">
        <button
          className="mobile-hamburger-btn"
          id="btn-open-mobile-menu"
          aria-label="Open Navigation Menu"
          onClick={onOpenMobileMenu}
        >
          <Menu size={22} strokeWidth={2.2} />
        </button>

        <div className="header-mobile-brand" onClick={() => onNavigate("dashboard")}>
          <svg className="mobile-brand-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="9" fill="#292840" />
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
          <span className="mobile-brand-title">Caplen</span>
        </div>
      </div>

      {/* Search Bar matching screenshot */}
      <div className={`header-search-container ${isMobileSearchExpanded ? "mobile-expanded" : ""}`}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            id="global-search-input"
            className="search-input"
            placeholder="Search exam, topic, question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsMobileSearchExpanded(true)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery("")}>
              <X size={15} />
            </button>
          )}
          {isMobileSearchExpanded && (
            <button
              className="search-mobile-close"
              onClick={() => {
                setIsMobileSearchExpanded(false);
                setSearchQuery("");
              }}
            >
              Cancel
            </button>
          )}
        </div>

        {/* Live Search Quick Results Modal */}
        {searchQuery.trim().length > 1 && (
          <div className="search-results-dropdown fade-in">
            <div className="search-results-section">
              <span className="search-section-label">Questions ({matchingQuestions.length})</span>
              {matchingQuestions.length === 0 ? (
                <div className="search-empty">No matching questions</div>
              ) : (
                matchingQuestions.map(q => (
                  <div
                    key={q.id}
                    className="search-result-item"
                    onClick={() => {
                      setSearchQuery("");
                      setIsMobileSearchExpanded(false);
                      onNavigate("practice");
                    }}
                  >
                    <BookOpen size={15} className="result-icon-lavender" />
                    <div className="result-text-col">
                      <span className="result-title">{q.text}</span>
                      <span className="result-meta">{q.topic} • {q.difficulty}</span>
                    </div>
                    <ArrowUpRight size={14} className="result-arrow" />
                  </div>
                ))
              )}
            </div>

            <div className="search-results-section">
              <span className="search-section-label">Previous Year Papers ({matchingPapers.length})</span>
              {matchingPapers.length === 0 ? (
                <div className="search-empty">No matching papers</div>
              ) : (
                matchingPapers.map(p => (
                  <div
                    key={p.id}
                    className="search-result-item"
                    onClick={() => {
                      setSearchQuery("");
                      setIsMobileSearchExpanded(false);
                      onNavigate("pyq");
                    }}
                  >
                    <FileText size={15} className="result-icon-cream" />
                    <div className="result-text-col">
                      <span className="result-title">{p.title}</span>
                      <span className="result-meta">{p.year} • {p.subject}</span>
                    </div>
                    <ArrowUpRight size={14} className="result-arrow" />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Header Actions (Envelope, Bell, Avatar matching screenshot) */}
      <div className="header-actions">
        <button
          className="header-icon-btn header-mail-btn"
          title="Study Reminders & Messages"
          onClick={() => alert("All study reminders and mentor feedbacks are synced.")}
        >
          <Mail size={19} strokeWidth={1.8} />
        </button>

        <div className="notification-wrapper">
          <button
            className="header-icon-btn notification-btn"
            id="btn-notifications"
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={19} strokeWidth={1.8} />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div className="notifications-popover fade-in">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <span className="badge badge-navy">1 New</span>
              </div>
              <div className="notifications-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notification-item ${n.unread ? "unread" : ""}`}>
                    <div className="notification-dot-small" />
                    <div className="notification-content">
                      <span className="notification-item-title">{n.title}</span>
                      <span className="notification-item-desc">{n.desc}</span>
                      <span className="notification-item-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="header-user-wrapper">
          <button
            className="user-avatar-btn"
            id="user-profile-menu-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              src={user.avatar}
              alt={user.fullName}
              className="user-avatar-img"
            />
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown-menu fade-in">
              <div className="profile-menu-header">
                <strong>{user.fullName}</strong>
                <span>{user.email}</span>
                <span className="badge badge-lime" style={{ marginTop: 6 }}>{user.targetExam}</span>
              </div>
              <div className="profile-menu-divider" />
              <button
                className="profile-menu-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate("settings");
                }}
              >
                Settings & API Config
              </button>
              <button
                className="profile-menu-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate("analytics");
                }}
              >
                Performance Analytics
              </button>
              <button
                className="profile-menu-item text-danger"
                onClick={() => {
                  setShowProfileMenu(false);
                  if (confirm("Reset demo data to initial state?")) {
                    StorageService.resetAll();
                    window.location.reload();
                  }
                }}
              >
                Reset Demo Data
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
