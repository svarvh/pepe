import React, { useState } from "react";
import {
  Search,
  Mail,
  Bell,
  X,
  ArrowUpRight,
  BookOpen,
  FileText,
  Menu,
  Sparkles,
  Layers,
  Video,
  ChevronDown,
  GraduationCap
} from "lucide-react";
import { StorageService } from "../services/storage";

export default function Header({
  user,
  onNavigate,
  onOpenMobileMenu,
  onSelectTerm,
  activeCourse,
  onCourseChange,
  onLogout,
  onGoHome
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCourseMenu, setShowCourseMenu] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  const courses = StorageService.getCourses();
  const currentCourse = StorageService.getCourseById(activeCourse || StorageService.getActiveCourse());
  const allQuestions = StorageService.getQuestions();
  const allPapers = StorageService.getPapers();
  const allTerms = StorageService.getAllTerminology();

  // Search across 1. Glossary Terms
  const matchingTerms = searchQuery.trim().length > 1
    ? Object.values(allTerms).filter(t =>
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.hindiTerm && t.hindiTerm.includes(searchQuery)) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  // Search across 2. Questions
  const matchingQuestions = searchQuery.trim().length > 1
    ? allQuestions.filter(q =>
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.unit?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  // Search across 3. Papers & Notes
  const matchingPapers = searchQuery.trim().length > 1
    ? allPapers.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subject.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 2)
    : [];

  const notifications = [
    { id: 1, title: "Exam Scheduled", desc: "IIT-JEE Mechanics Full Mock Test starts at 3:00 PM", time: "10m ago", unread: true },
    { id: 2, title: "Weekly Goal Met!", desc: "You have completed 84 practice questions this week", time: "1h ago", unread: false },
    { id: 3, title: "New Solved PYQ Added", desc: "UGC-NET Paper 1 & CBSE 2024 solutions published", time: "1d ago", unread: false }
  ];

  const handleSelectCourse = (courseId) => {
    StorageService.setActiveCourse(courseId);
    if (onCourseChange) onCourseChange(courseId);
    setShowCourseMenu(false);
  };

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
          <div className="landing-logo-icon" style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0 }}>
            <GraduationCap size={18} strokeWidth={2.4} color="#ffffff" />
          </div>
          <span className="mobile-brand-title">Caplen</span>
        </div>
      </div>

      {/* Global Course Switcher Pill */}
      <div className="header-course-switcher-wrapper">
        <button
          className="header-course-pill-btn"
          id="btn-switch-course"
          onClick={() => setShowCourseMenu(!showCourseMenu)}
        >
          <GraduationCap size={16} />
          <span className="course-pill-label">{currentCourse.name}</span>
          <ChevronDown size={14} />
        </button>

        {showCourseMenu && (
          <div className="course-dropdown-popover fade-in">
            <div className="course-dropdown-header">
              <span>Switch Curriculum Track</span>
            </div>
            {courses.map((c) => (
              <button
                key={c.id}
                className={`course-dropdown-item ${c.id === currentCourse.id ? "active" : ""}`}
                onClick={() => handleSelectCourse(c.id)}
              >
                <div className="course-item-title-row">
                  <strong>{c.name}</strong>
                  <span className="badge badge-navy badge-sm">{c.badge}</span>
                </div>
                <span className="course-item-desc">{c.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Global Search Bar (Module A Search Engine) */}
      <div className={`header-search-container ${isMobileSearchExpanded ? "mobile-expanded" : ""}`}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            id="global-search-input"
            className="search-input"
            placeholder="Search scientific terms, notes, PYQs, formulas..."
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

        {/* Global Multi-Index Search Dropdown */}
        {searchQuery.trim().length > 1 && (
          <div className="search-results-dropdown fade-in">
            {/* 1. Scientific & Technical Terminology */}
            {matchingTerms.length > 0 && (
              <div className="search-results-section">
                <span className="search-section-label">
                  <Sparkles size={13} style={{ marginRight: 4 }} />
                  Scientific Terminology ({matchingTerms.length})
                </span>
                {matchingTerms.map(term => (
                  <div
                    key={term.id}
                    className="search-result-item term-item"
                    onClick={() => {
                      setSearchQuery("");
                      setIsMobileSearchExpanded(false);
                      if (onSelectTerm) onSelectTerm(term.id);
                    }}
                  >
                    <Sparkles size={15} className="result-icon-lime" />
                    <div className="result-text-col">
                      <span className="result-title">
                        {term.term} {term.hindiTerm && `(${term.hindiTerm})`}
                      </span>
                      <span className="result-meta">{term.category} • Tap for instant definition</span>
                    </div>
                    <ArrowUpRight size={14} className="result-arrow" />
                  </div>
                ))}
              </div>
            )}

            {/* 2. Questions */}
            <div className="search-results-section">
              <span className="search-section-label">Practice Questions ({matchingQuestions.length})</span>
              {matchingQuestions.length === 0 && matchingTerms.length === 0 ? (
                <div className="search-empty">No exact match found. Try another concept.</div>
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

            {/* 3. Previous Year Papers */}
            {matchingPapers.length > 0 && (
              <div className="search-results-section">
                <span className="search-section-label">Exam Papers ({matchingPapers.length})</span>
                {matchingPapers.map(p => (
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
                ))}
              </div>
            )}
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
                className="profile-menu-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onGoHome) onGoHome();
                }}
              >
                View Public Landing Page
              </button>
              <button
                className="profile-menu-item text-danger"
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onLogout) onLogout();
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
