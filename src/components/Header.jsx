import React, { useState } from "react";
import {
  Search,
  Bell,
  X,
  ArrowUpRight,
  Sparkles,
  ChevronDown,
  GraduationCap,
  Menu
} from "lucide-react";
import { StorageService } from "../services/storage";
import { AuthService } from "../services/authService";

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
  const currentLearningPathId = user?.selectedLearningPath || activeCourse || StorageService.getActiveCourse();
  const currentCourse = StorageService.getCourseById(currentLearningPathId) || courses[0];
  const displayLabel = user?.selectedLearningPath
    ? (currentCourse.shortName || currentCourse.name)
    : (currentCourse?.name || "Select Class / Exam");
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
    { id: 3, title: "New Solved PYQ Added", desc: "CBSE & NEET 2024 solutions published", time: "1d ago", unread: false }
  ];

  const handleSelectCourse = (courseId) => {
    StorageService.setActiveCourse(courseId);
    if (user) {
      AuthService.updateStudentLearningPath(courseId);
    }
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
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: "#07865B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <GraduationCap size={18} strokeWidth={2.4} color="#ffffff" />
          </div>
          <span className="mobile-brand-title" style={{ color: "#17221F", fontWeight: 800 }}>
            Caplen
          </span>
        </div>
      </div>

      {/* 1. Global Class / Exam Selector Pill matching screenshot */}
      <div className="header-course-switcher-wrapper">
        <button
          className="header-course-pill-btn"
          id="btn-switch-course"
          onClick={() => setShowCourseMenu(!showCourseMenu)}
          title="Switch current class or competitive exam"
        >
          <GraduationCap size={16} strokeWidth={2.2} color="#17221F" />
          <span className="course-pill-label">{displayLabel}</span>
          <ChevronDown size={14} strokeWidth={2.2} color="#66736D" />
        </button>

        {showCourseMenu && (
          <div className="course-dropdown-popover fade-in">
            <div className="course-dropdown-header">
              <span>Select Class or Exam Track</span>
            </div>
            
            <button
              className="course-dropdown-item change-path-cta-btn"
              onClick={() => {
                setShowCourseMenu(false);
                if (onNavigate) onNavigate("select-learning-path");
              }}
              style={{
                backgroundColor: "#F0FAF4",
                borderBottom: "1px solid #E1EFE7",
                marginBottom: 4
              }}
            >
              <div className="course-item-title-row">
                <strong style={{ color: "#07865B" }}>✦ Open Full Selection Page</strong>
                <span className="badge badge-sm" style={{ background: "#07865B", color: "#FFFFFF" }}>New</span>
              </div>
              <span className="course-item-desc" style={{ color: "#075B43" }}>
                Visual cards for Class 9–12, JEE & NEET
              </span>
            </button>

            {courses.map((c) => (
              <button
                key={c.id}
                className={`course-dropdown-item ${c.id === currentCourse.id ? "active" : ""}`}
                onClick={() => handleSelectCourse(c.id)}
              >
                <div className="course-item-title-row">
                  <strong>{c.name}</strong>
                  {c.badge && <span className="badge badge-sm">{c.badge}</span>}
                </div>
                <span className="course-item-desc">{c.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Global Search Bar matching screenshot */}
      <div className={`header-search-container ${isMobileSearchExpanded ? "mobile-expanded" : ""}`}>
        <div className="search-input-wrapper">
          <Search size={17} strokeWidth={2.2} className="search-icon" color="#66736D" />
          <input
            type="text"
            id="global-search-input"
            className="search-input"
            placeholder="Search topics, notes, formulas..."
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

        {/* Multi-Index Search Dropdown */}
        {searchQuery.trim().length > 1 && (
          <div className="search-results-dropdown fade-in">
            {matchingTerms.length > 0 && (
              <div className="search-results-section">
                <span className="search-section-label">
                  <Sparkles size={13} style={{ marginRight: 4 }} />
                  Scientific Terminology ({matchingTerms.length})
                </span>
                {matchingTerms.map((term) => (
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

            {matchingQuestions.length > 0 && (
              <div className="search-results-section">
                <span className="search-section-label">Practice Questions ({matchingQuestions.length})</span>
                {matchingQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="search-result-item"
                    onClick={() => {
                      setSearchQuery("");
                      setIsMobileSearchExpanded(false);
                      onNavigate("question-practice");
                    }}
                  >
                    <div className="result-text-col">
                      <span className="result-title">{q.text}</span>
                      <span className="result-meta">{q.topic || q.unit} • {q.marks || 4} Marks</span>
                    </div>
                    <ArrowUpRight size={14} className="result-arrow" />
                  </div>
                ))}
              </div>
            )}

            {matchingPapers.length > 0 && (
              <div className="search-results-section">
                <span className="search-section-label">Papers & Notes ({matchingPapers.length})</span>
                {matchingPapers.map((p) => (
                  <div
                    key={p.id}
                    className="search-result-item"
                    onClick={() => {
                      setSearchQuery("");
                      setIsMobileSearchExpanded(false);
                      onNavigate("topic-reading");
                    }}
                  >
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

      {/* 3. Header Actions (Notification Bell & User Avatar with Chevron) */}
      <div className="header-actions">
        {/* Notification Bell */}
        <div className="notification-wrapper">
          <button
            className="header-icon-btn notification-btn"
            id="btn-notifications"
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={19} strokeWidth={2} color="#17221F" />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div className="notifications-popover fade-in">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <span className="badge badge-navy">1 New</span>
              </div>
              <div className="notifications-list">
                {notifications.map((n) => (
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

        {/* User Avatar with ChevronDown */}
        <div className="header-user-wrapper">
          <button
            className="user-avatar-btn"
            id="user-profile-menu-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
              alt={user?.fullName || "Student Avatar"}
              className="user-avatar-img"
            />
            <ChevronDown size={14} strokeWidth={2.2} color="#66736D" className="avatar-chevron" />
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown-menu fade-in">
              <div className="profile-menu-header">
                <strong>{user?.fullName || "Student"}</strong>
                <span>{user?.email || "student@caplen.edu"}</span>
                <span className="badge badge-lime" style={{ marginTop: 6 }}>
                  {user?.targetExam || "Class 11 & 12"}
                </span>
              </div>
              <div className="profile-menu-divider" />
              <button
                className="profile-menu-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate("settings");
                }}
              >
                Settings & Preferences
              </button>
              <button
                className="profile-menu-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate("analytics");
                }}
              >
                My Progress
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
