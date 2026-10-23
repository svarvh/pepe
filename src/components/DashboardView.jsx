import React from "react";
import {
  BookOpen,
  Target,
  ArrowRight,
  FileText,
  ListFilter,
  Atom,
  Leaf,
  ChevronRight
} from "lucide-react";
import { StorageService } from "../services/storage";

export default function DashboardView({
  user,
  statistics,
  onNavigate,
  onStartReadingTopic,
  onStartPracticeTopic
}) {
  // Retrieve recent practice sessions or fallback to reference topics
  const recentSessions = (
    typeof StorageService?.getPracticeSessions === "function"
      ? StorageService.getPracticeSessions()
      : typeof StorageService?.getSessions === "function"
      ? StorageService.getSessions()
      : []
  ) || [];

  // Curated fallback topics matching reference screenshot
  const defaultRecent = [
    {
      id: "motion-laws",
      title: "Motion & Laws",
      subject: "Physics",
      grade: "Class 11",
      iconType: "physics",
      categoryId: "class_11",
      subjectId: "phys_11"
    },
    {
      id: "cell-biology",
      title: "Cell Biology",
      subject: "Biology",
      grade: "NEET",
      iconType: "biology",
      categoryId: "neet",
      subjectId: "bio_12"
    }
  ];

  // Map recent topics for display
  const displayRecent = (Array.isArray(recentSessions) && recentSessions.length >= 2)
    ? recentSessions.slice(0, 2).map((s, idx) => ({
        id: s?.id || `sess-${idx}`,
        title: s?.topic || (idx === 0 ? "Motion & Laws" : "Cell Biology"),
        subject: s?.subjectName || (idx === 0 ? "Physics" : "Biology"),
        grade: s?.chapter || (idx === 0 ? "Class 11" : "NEET"),
        iconType: (s?.subjectName || "").toLowerCase().includes("bio") ? "biology" : "physics",
        categoryId: s?.categoryId || (idx === 0 ? "class_11" : "neet"),
        subjectId: s?.subjectId
      }))
    : defaultRecent;

  const handleContinueRecent = (item) => {
    if (onStartReadingTopic) {
      onStartReadingTopic(item);
    } else {
      onNavigate("topic-reading");
    }
  };

  return (
    <div className="minimal-dashboard-container fade-in">
      {/* 1. Main Welcome Section */}
      <section className="dashboard-welcome-section">
        <span className="learning-space-eyebrow">YOUR LEARNING SPACE</span>
        <h1 className="learning-space-heading">
          What would you like to do <span className="highlight-green-text">today?</span>
        </h1>
        <p className="learning-space-subtitle">
          Choose a path and learn at your own pace.
        </p>
      </section>

      {/* 2. Two Main Feature Cards (Option A: Topic Reading & Option B: Question Practice) */}
      <section className="feature-cards-grid">
        {/* CARD A: TOPIC READING */}
        <div
          id="card-topic-reading"
          className="feature-action-card card-reading"
          onClick={() => onNavigate("topic-reading")}
        >
          <div className="card-top-layout">
            <div className="card-top-left">
              <div className="feature-icon-box">
                <BookOpen size={24} strokeWidth={2.2} color="#07865B" />
              </div>
              <span className="feature-status-badge">LEARN</span>
            </div>

            {/* Subtle Illustration of Study Notes & Video Player */}
            <div className="card-illustration-box">
              <svg
                width="150"
                height="110"
                viewBox="0 0 160 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="illustration-svg"
              >
                {/* Soft background glow */}
                <ellipse cx="90" cy="65" rx="58" ry="46" fill="#E9F9F0" fillOpacity="0.8" />
                <circle cx="130" cy="38" r="14" fill="#D2F4E2" fillOpacity="0.6" />

                {/* Back document sheet */}
                <g transform="rotate(-6 65 30)">
                  <rect x="36" y="22" width="62" height="74" rx="7" fill="#FFFFFF" stroke="#D3EADB" strokeWidth="1.5" />
                  <line x1="44" y1="36" x2="80" y2="36" stroke="#D3EADB" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="44" y1="46" x2="88" y2="46" stroke="#E2F1E8" strokeWidth="2" strokeLinecap="round" />
                  <line x1="44" y1="54" x2="74" y2="54" stroke="#E2F1E8" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Front document sheet */}
                <g transform="rotate(4 85 45)">
                  <rect x="58" y="24" width="70" height="80" rx="8" fill="#FFFFFF" stroke="#C2E4D0" strokeWidth="1.6" filter="drop-shadow(0px 4px 12px rgba(7, 134, 91, 0.08))" />
                  <line x1="68" y1="38" x2="108" y2="38" stroke="#07865B" strokeWidth="2.8" strokeLinecap="round" />
                  <line x1="68" y1="48" x2="118" y2="48" stroke="#D5EBE0" strokeWidth="2" strokeLinecap="round" />

                  {/* Picture thumbnail */}
                  <rect x="68" y="58" width="24" height="20" rx="4" fill="#E9F9F0" stroke="#C8E8D5" strokeWidth="1" />
                  <path d="M70 74L76 68L81 72L86 66L90 74H70Z" fill="#A8DFBF" />

                  {/* Play video badge */}
                  <circle cx="106" cy="68" r="12" fill="#07865B" />
                  <polygon points="103,63 111,68 103,73" fill="#FFFFFF" />
                </g>

                {/* Floating green sparkles & squiggles */}
                <path d="M26 44C29 41 33 46 36 43" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
                <path d="M142 62C145 66 148 64 150 68" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <h2 className="feature-title">Topic Reading</h2>
          <p className="feature-description">
            Understand concepts, revise notes, and explore lessons.
          </p>

          <div className="feature-info-bar">
            <FileText size={16} color="#07865B" strokeWidth={2.2} />
            <span>Notes, formulas & videos</span>
          </div>

          <button
            id="btn-explore-topics"
            type="button"
            className="feature-submit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("topic-reading");
            }}
          >
            <span>Explore topics</span>
            <ArrowRight size={17} strokeWidth={2.4} />
          </button>
        </div>

        {/* CARD B: QUESTION PRACTICE */}
        <div
          id="card-question-practice"
          className="feature-action-card card-practice"
          onClick={() => onNavigate("question-practice")}
        >
          <div className="card-top-layout">
            <div className="card-top-left">
              {/* Concentric circles / target icon */}
              <div className="feature-icon-box">
                <Target size={24} strokeWidth={2.2} color="#07865B" />
              </div>
              <span className="feature-status-badge">PRACTICE</span>
            </div>

            {/* Subtle Illustration of Quiz Sheet with checkmark */}
            <div className="card-illustration-box">
              <svg
                width="150"
                height="110"
                viewBox="0 0 160 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="illustration-svg"
              >
                {/* Soft background glow */}
                <ellipse cx="88" cy="62" rx="56" ry="46" fill="#E9F9F0" fillOpacity="0.8" />
                <circle cx="134" cy="36" r="16" fill="#D2F4E2" fillOpacity="0.6" />

                {/* Quiz document sheet */}
                <g transform="rotate(2 82 48)">
                  <rect x="52" y="20" width="76" height="84" rx="8" fill="#FFFFFF" stroke="#C2E4D0" strokeWidth="1.6" filter="drop-shadow(0px 4px 12px rgba(7, 134, 91, 0.08))" />

                  {/* Letter Q icon header */}
                  <text x="64" y="42" fill="#07865B" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">
                    Q
                  </text>
                  <line x1="80" y1="36" x2="116" y2="36" stroke="#D3EADB" strokeWidth="2.4" strokeLinecap="round" />

                  {/* Option A (unselected) */}
                  <circle cx="68" cy="54" r="3.5" fill="#E2F1E8" stroke="#A7D7BC" strokeWidth="1.5" />
                  <line x1="78" y1="54" x2="114" y2="54" stroke="#E5ECE8" strokeWidth="2" strokeLinecap="round" />

                  {/* Option B (SELECTED - Green highlighted with bar) */}
                  <circle cx="68" cy="66" r="4.2" fill="#07865B" />
                  <circle cx="68" cy="66" r="2" fill="#FFFFFF" />
                  <rect x="76" y="62" width="38" height="8" rx="4" fill="#34D399" fillOpacity="0.65" />

                  {/* Option C (unselected) */}
                  <circle cx="68" cy="78" r="3.5" fill="#E2F1E8" stroke="#A7D7BC" strokeWidth="1.5" />
                  <line x1="78" y1="78" x2="108" y2="78" stroke="#E5ECE8" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Green Checkmark Badge on top right */}
                <rect x="114" y="16" width="22" height="22" rx="7" fill="#07865B" />
                <path d="M120 27L123.5 30.5L130 23.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Floating green sparkles & squiggles */}
                <path d="M28 50C31 47 34 52 38 49" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
                <path d="M140 76C143 80 146 78 148 82" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <h2 className="feature-title">Question Practice</h2>
          <p className="feature-description">
            Test your knowledge with questions tailored to your goals.
          </p>

          <div className="feature-info-bar">
            <ListFilter size={16} color="#07865B" strokeWidth={2.2} />
            <span>Choose topic · Set difficulty · Get solutions</span>
          </div>

          <button
            id="btn-start-practicing"
            type="button"
            className="feature-submit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("question-practice");
            }}
          >
            <span>Start practicing</span>
            <ArrowRight size={17} strokeWidth={2.4} />
          </button>
        </div>
      </section>

      {/* 3. Recent Learning Section ("Pick up where you left off") */}
      <section className="recent-learning-section">
        <div className="recent-header-row">
          <h3 className="recent-title">Pick up where you left off</h3>
          <button
            type="button"
            id="btn-recent-view-all"
            className="recent-view-all-link"
            onClick={() => onNavigate("topic-reading")}
          >
            <span>View all</span>
            <ArrowRight size={15} strokeWidth={2.2} />
          </button>
        </div>

        <div className="recent-cards-grid">
          {displayRecent.map((item) => (
            <div
              key={item.id}
              className="recent-topic-card"
              onClick={() => handleContinueRecent(item)}
              title={`Continue learning ${item.title}`}
            >
              <div className="recent-card-left">
                <div className="recent-icon-square">
                  {item.iconType === "biology" ? (
                    <Leaf size={22} color="#07865B" strokeWidth={2.2} />
                  ) : (
                    <Atom size={22} color="#07865B" strokeWidth={2.2} />
                  )}
                </div>
                <div className="recent-text-col">
                  <h4 className="recent-topic-name">{item.title}</h4>
                  <span className="recent-topic-sub">
                    {item.subject} · {item.grade}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="recent-continue-action"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContinueRecent(item);
                }}
              >
                <span>Continue</span>
                <ArrowRight size={15} strokeWidth={2.2} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
