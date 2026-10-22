import React, { useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Layers,
  LayoutGrid,
  Box,
  Flame,
  Clock,
  CheckCircle2,
  BookOpen,
  Sparkles,
  FileText,
  BookmarkCheck,
  UploadCloud,
  PenTool,
  Target,
  ChevronRight as ChevronRightIcon
} from "lucide-react";
import { SUBJECTS_CATALOG } from "../data/mockData";

export default function DashboardView({ user, statistics, onNavigate, onStartPracticeSubject }) {
  const [selectedDate, setSelectedDate] = useState(27); // Oct 27 matching reference
  const [currentMonth, setCurrentMonth] = useState("October 2026");

  // Subject cards for the dark feature banner
  const heroSubjects = SUBJECTS_CATALOG.slice(0, 3);

  const quickActions = [
    { id: "smart-notes", label: "Smart Notes & Terms", icon: BookOpen, badge: "Module A", color: "lime" },
    { id: "videos", label: "Topic Video Lessons", icon: Sparkles, badge: "Module C", color: "lavender" },
    { id: "practice", label: "Practice Questions", icon: Target, badge: "10+ / Topic", color: "lime" },
    { id: "test-builder", label: "Custom Test Builder", icon: FileText, badge: "Module D", color: "cream" },
    { id: "results", label: "Instant Results", icon: BookmarkCheck, badge: "Section 4", color: "lavender" },
    { id: "doubt-solver", label: "AI Doubt Assistant", icon: Sparkles, badge: "NCERT", color: "lime" },
    { id: "revision", label: "Revision & Notebook", icon: PenTool, badge: "Spaced Rep", color: "cream" },
    { id: "checklist", label: "Launch Checklist", icon: UploadCloud, badge: "20/20 Ready", color: "lavender" },
  ];

  const learningJourneySteps = [
    { step: 1, title: "1. Select Course", desc: "Class 9-12 / JEE / NET", route: "dashboard", color: "lime" },
    { step: 2, title: "2. Learn Topic", desc: "Notes, terms & videos", route: "smart-notes", color: "lavender" },
    { step: 3, title: "3. Practise 10+ Qs", desc: "Hints, solutions & levels", route: "practice", color: "cream" },
    { step: 4, title: "4. Custom Test", desc: "Timed blueprint exam", route: "test-builder", color: "lime" },
    { step: 5, title: "5. Instant Results", desc: "Score & weak areas", route: "results", color: "lavender" },
    { step: 6, title: "6. Revise & Improve", desc: "Spaced rep & mistakes", route: "revision", color: "cream" }
  ];

  const recentPractices = [
    {
      id: "rec-1",
      title: "Color Theory & Optical Mechanics",
      subject: "Physics: Mechanics & Waves",
      date: "21 Oct, 2026",
      bgClass: "icon-tile-cream",
      icon: Layers
    },
    {
      id: "rec-2",
      title: "Filtering & Sorting: Organic Mechanisms",
      subject: "Organic Chemistry & Biochemistry",
      date: "21 Oct, 2026",
      bgClass: "icon-tile-lavender",
      icon: LayoutGrid
    },
    {
      id: "rec-3",
      title: "Limits & L'Hôpital Indeterminate Forms",
      subject: "Mathematics: Calculus & Limits",
      date: "19 Oct, 2026",
      bgClass: "icon-tile-lime",
      icon: Box
    }
  ];

  return (
    <div className="dashboard-view fade-in">
      {/* 1. TOP HERO SECTION (Spans full width matching reference screenshot front.webp) */}
      <div className="dashboard-hero-section">
        <div className="section-header-row">
          <h2 className="section-title">My progress</h2>
        </div>

        {/* Hero Progress Banner matching screenshot */}
        <div className="hero-progress-banner">
          <div className="hero-left-col">
            <span className="hero-greeting">Hi, {user.name}!</span>
            <h1 className="hero-headline">
              You have completed {statistics.completedThisWeek || 84} questions this week!
            </h1>
            <button
              className="pill-btn pill-btn-white hero-cta-btn"
              id="hero-see-all-btn"
              onClick={() => onNavigate("practice")}
            >
              <span>SEE ALL</span>
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* 3 Pastel Subject Cards inside Navy Banner */}
          <div className="hero-cards-row">
            {heroSubjects.map((sub) => {
              const isLime = sub.themeColor === "lime";
              const isLavender = sub.themeColor === "lavender";
              const isCream = sub.themeColor === "cream";

              return (
                <div
                  key={sub.id}
                  className={`subject-card subject-card-${sub.themeColor} ${isLime ? "card-highlight-tilt" : ""}`}
                  onClick={() => onStartPracticeSubject(sub)}
                  title={`Click to practice ${sub.name}`}
                >
                  <div className="card-top-bar">
                    <span className="card-num">{sub.cardNum}</span>
                    <button className="card-more-btn" onClick={(e) => { e.stopPropagation(); onStartPracticeSubject(sub); }}>
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <div className="card-icon-box">
                    {isLavender && <Layers size={28} strokeWidth={2} />}
                    {isCream && <LayoutGrid size={28} strokeWidth={2} />}
                    {isLime && <Box size={28} strokeWidth={2} />}
                  </div>

                  <div className="card-title-box">
                    <h3 className="card-subject-name">{sub.name}</h3>
                    <p className="card-subject-meta">
                      {sub.totalQuestions} questions | {sub.accuracy}% acc
                    </p>
                  </div>

                  {/* Dark pill progress bar */}
                  <div className="card-progress-track">
                    <div
                      className="card-progress-fill"
                      style={{ width: `${sub.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complete Student Learning Journey (Section 2 of Roadmap) */}
      <div className="learning-journey-section">
        <div className="section-header-row">
          <h2 className="section-title">The Complete Student Learning Journey</h2>
          <span className="badge badge-lime">End-to-End Learning Loop</span>
        </div>
        <div className="learning-journey-grid">
          {learningJourneySteps.map((step) => (
            <button
              key={step.step}
              className="journey-step-card"
              onClick={() => onNavigate(step.route)}
            >
              <div className="journey-step-top">
                <span className={`step-circle bg-${step.color}`}>0{step.step}</span>
                <span className="journey-arrow">&rarr;</span>
              </div>
              <h4 className="journey-step-title">{step.title}</h4>
              <p className="journey-step-desc">{step.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 2. QUICK ACTIONS BAR */}
      <div className="quick-actions-section">
        <div className="quick-actions-grid">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                id={`quick-action-${action.id}`}
                className="quick-action-card"
                onClick={() => onNavigate(action.id)}
              >
                <div className={`quick-action-icon-wrap bg-${action.color}`}>
                  <Icon size={18} strokeWidth={2.2} />
                </div>
                <div className="quick-action-text-col">
                  <span className="quick-action-label">{action.label}</span>
                  <span className="quick-action-badge">{action.badge}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TWO-COLUMN LOWER SECTION (Left: Stats + Assignments; Right: Calendar + Upcoming) */}
      <div className="dashboard-lower-grid">
        {/* Left Column: Statistics & Assignments */}
        <div className="dashboard-lower-left">
          {/* Statistics Row */}
          <div className="statistics-section">
            <h2 className="section-title">Statistics</h2>
            <div className="statistics-grid">
              {/* Stat 1 */}
              <div className="stat-card">
                <span className="stat-big-number">{statistics.coursesCompleted}</span>
                <span className="stat-label">Courses completed</span>
              </div>

              {/* Stat 2 */}
              <div className="stat-card">
                <span className="stat-big-number">{statistics.coursesInProgress}</span>
                <span className="stat-label">Courses in progress</span>
              </div>

              {/* Stat 3 with Purple Sparkline Wave */}
              <div className="stat-card stat-card-wide">
                <div className="stat-text-col">
                  <span className="stat-big-number">{statistics.hoursSpent}</span>
                  <span className="stat-label">Hours spent this week</span>
                </div>
                {/* SVG Purple Wave sparkline matching reference */}
                <div className="stat-wave-container">
                  <svg viewBox="0 0 160 55" className="stat-wave-svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#BDA3FA" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#BDA3FA" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,35 Q20,10 40,28 T80,18 T120,40 T160,20 L160,55 L0,55 Z"
                      fill="url(#waveGradient)"
                    />
                    <path
                      d="M0,35 Q20,10 40,28 T80,18 T120,40 T160,20"
                      fill="none"
                      stroke="#A583F8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Accuracy & Streak */}
              <div className="stat-card stat-card-compact">
                <div className="stat-compact-row">
                  <div>
                    <span className="stat-big-number">{statistics.overallAccuracy}%</span>
                    <span className="stat-label">Overall Accuracy</span>
                  </div>
                  <div className="streak-badge-pill">
                    <Flame size={16} className="flame-icon" />
                    <span>{statistics.streakDays}d Streak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Practicing / My Assignments Section */}
          <div className="assignments-section">
            <div className="section-header-row">
              <h2 className="section-title">My Assignments</h2>
              <button
                className="view-all-link"
                id="view-all-assignments"
                onClick={() => onNavigate("practice")}
              >
                View all
              </button>
            </div>

            <div className="assignments-list">
              {recentPractices.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="assignment-item"
                    onClick={() => onNavigate("practice")}
                  >
                    <div className="assignment-left-col">
                      <div className={`assignment-icon-tile ${item.bgClass}`}>
                        <Icon size={20} strokeWidth={2.2} />
                      </div>
                      <div className="assignment-info">
                        <h4 className="assignment-title">{item.title}</h4>
                        <span className="assignment-subject">{item.subject}</span>
                      </div>
                    </div>

                    <div className="assignment-right-col">
                      <span className="assignment-date">{item.date}</span>
                      <button className="assignment-more-btn" onClick={(e) => { e.stopPropagation(); onNavigate("practice"); }}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Calendar ON TOP, Upcoming DIRECTLY BELOW IT (Matching reference front.webp) */}
        <div className="dashboard-lower-right">
          {/* Calendar Widget matching reference screenshot */}
          <div className="calendar-card">
            <div className="calendar-header">
              <h3 className="calendar-month-title">{currentMonth}</h3>
              <div className="calendar-nav-arrows">
                <button className="cal-arrow-btn">
                  <ChevronLeft size={16} />
                </button>
                <button className="cal-arrow-btn">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="calendar-weekdays-row">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days Grid */}
            <div className="calendar-grid">
              <div className="cal-day cal-day-muted">31</div>
              <div className="cal-day">1</div>
              <div className="cal-day">2</div>
              <div className="cal-day">3</div>
              <div className="cal-day">4</div>
              <div className="cal-day">5</div>
              <div className="cal-day">6</div>

              <div className="cal-day">7</div>
              <div className="cal-day">8</div>
              <div className="cal-day">9</div>
              <div className="cal-day">10</div>
              <div className="cal-day">11</div>
              <div className="cal-day">12</div>
              <div className="cal-day">13</div>

              <div className="cal-day">14</div>
              <div className="cal-day">15</div>
              <div className="cal-day">16</div>
              <div className="cal-day">17</div>
              <div className="cal-day">18</div>
              <div className="cal-day">19</div>
              <div className="cal-day">20</div>

              <div className="cal-day">
                21
                <span className="cal-dot cal-dot-purple" />
              </div>
              <div className="cal-day">22</div>
              <div className="cal-day">23</div>
              <div className="cal-day">
                24
                <span className="cal-dot cal-dot-lime" />
              </div>
              <div className="cal-day">25</div>
              <div className="cal-day">26</div>
              {/* Active selected date matching screenshot: 27 in dark navy circle */}
              <div
                className={`cal-day ${selectedDate === 27 ? "cal-day-active" : ""}`}
                onClick={() => setSelectedDate(27)}
              >
                27
              </div>

              <div className="cal-day">
                28
                <span className="cal-dot" />
              </div>
              <div className="cal-day">29</div>
              <div className="cal-day">30</div>
              <div className="cal-day cal-day-muted">1</div>
              <div className="cal-day cal-day-muted">2</div>
              <div className="cal-day cal-day-muted">3</div>
              <div className="cal-day cal-day-muted">4</div>
            </div>
          </div>

          {/* Upcoming Section directly below Calendar */}
          <div className="upcoming-section">
            <div className="section-header-row">
              <h3 className="section-subtitle">Upcoming</h3>
              <button className="view-all-link" onClick={() => onNavigate("practice")}>
                View all
              </button>
            </div>

            {/* Upcoming Event Card matching screenshot */}
            <div
              className="upcoming-card"
              onClick={() => onNavigate("practice")}
            >
              <div className="upcoming-icon-dark">
                <Box size={20} className="icon-lime-accent" />
              </div>
              <div className="upcoming-info">
                <span className="upcoming-time">10:00 - 12:30</span>
                <h4 className="upcoming-title">3D Design Foundations: Test Level 1</h4>
              </div>
              <ChevronRightIcon size={18} className="upcoming-arrow" />
            </div>

            <div
              className="upcoming-card"
              style={{ marginTop: 12 }}
              onClick={() => onNavigate("topics")}
            >
              <div className="upcoming-icon-dark" style={{ backgroundColor: "#292840" }}>
                <Layers size={20} style={{ color: "#BDA3FA" }} />
              </div>
              <div className="upcoming-info">
                <span className="upcoming-time">Tomorrow • 14:00</span>
                <h4 className="upcoming-title">High-Yield Organic Synthesis Revision</h4>
              </div>
              <ChevronRightIcon size={18} className="upcoming-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
