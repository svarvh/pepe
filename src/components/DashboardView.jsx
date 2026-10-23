import React from "react";
import {
  BookOpen,
  Target,
  ArrowRight,
  Flame,
  Award,
  Clock,
  Sparkles,
  Video,
  FileText,
  Compass,
  Stethoscope,
  GraduationCap,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function DashboardView({
  user,
  statistics,
  onNavigate,
  onStartReadingTopic,
  onStartPracticeTopic
}) {
  const userName = user?.name || "Student";
  const completedThisWeek = statistics?.completedThisWeek || 84;
  const streakDays = statistics?.streakDays || 5;
  const accuracy = statistics?.accuracy || 88;

  // Curated quick resume topics
  const recentTopics = [
    {
      id: "topic-jee-rot",
      categoryId: "iit",
      categoryName: "IIT / JEE",
      subjectId: "jee_phys",
      subjectName: "Physics",
      title: "Pure Rolling & Angular Momentum",
      hasVideo: true,
      difficulty: "Hard"
    },
    {
      id: "topic-bio-evolution",
      categoryId: "neet",
      categoryName: "Medical / NEET",
      subjectId: "bio_12",
      subjectName: "Biology",
      title: "Mechanism of Natural Selection",
      hasVideo: true,
      difficulty: "Medium"
    },
    {
      id: "topic-math10-roots",
      categoryId: "class_10",
      categoryName: "Class 10",
      subjectId: "math_10",
      subjectName: "Mathematics",
      title: "Discriminant & Nature of Roots",
      hasVideo: true,
      difficulty: "Medium"
    }
  ];

  return (
    <div className="simple-student-dashboard fade-in">
      {/* 1. Welcoming Header */}
      <div className="dashboard-simple-hero">
        <div className="hero-simple-left">
          <div className="brand-badge-pill">
            <span className="brand-dot-pulse" />
            <span>Practice Platform • We make you practice</span>
          </div>
          <h1 className="hero-greeting-title">
            Welcome back, <span className="highlight-name">{userName}</span> 👋
          </h1>
          <p className="hero-greeting-sub">
            Choose what you want to focus on today. Select <strong>Topic Reading</strong> to master concepts, or <strong>Question Practice</strong> to test your skills.
          </p>
        </div>

        {/* Minimal Study Streak Card */}
        <div className="hero-stats-card">
          <div className="stat-pill-item">
            <div className="stat-icon-wrap icon-flame">
              <Flame size={18} />
            </div>
            <div className="stat-text-col">
              <span className="stat-number">{streakDays} Days</span>
              <span className="stat-label">Study Streak</span>
            </div>
          </div>

          <div className="stat-divider-vertical" />

          <div className="stat-pill-item">
            <div className="stat-icon-wrap icon-target">
              <Target size={18} />
            </div>
            <div className="stat-text-col">
              <span className="stat-number">{completedThisWeek} Qs</span>
              <span className="stat-label">This Week</span>
            </div>
          </div>

          <div className="stat-divider-vertical" />

          <div className="stat-pill-item">
            <div className="stat-icon-wrap icon-award">
              <Award size={18} />
            </div>
            <div className="stat-text-col">
              <span className="stat-number">{accuracy}%</span>
              <span className="stat-label">Avg Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE TWO MAIN OPTIONS (Prominent Cards in Green-and-White Theme) */}
      <div className="two-options-section">
        <div className="section-title-line">
          <span className="two-options-heading">Select Your Learning Mode</span>
          <span className="two-options-sub">Two simple pathways to prepare effectively</span>
        </div>

        <div className="two-options-grid">
          {/* OPTION A: TOPIC READING */}
          <div
            id="card-topic-reading"
            className="main-choice-card choice-reading-card"
            onClick={() => onNavigate("topic-reading")}
          >
            <div className="choice-card-top">
              <div className="choice-icon-badge icon-badge-green">
                <BookOpen size={32} strokeWidth={2.2} />
              </div>
              <span className="choice-letter-badge">Option A</span>
            </div>

            <div className="choice-card-body">
              <h2 className="choice-title">Topic Reading</h2>
              <p className="choice-description">
                For students who want to learn or revise a topic. Read written explanations, formulas, important concepts, faculty study notes, and watch animated videos.
              </p>

              <div className="choice-features-list">
                <div className="feature-pill">
                  <CheckCircle2 size={14} className="feature-check" />
                  <span>Read via Text (Notes & Formulas)</span>
                </div>
                <div className="feature-pill">
                  <Video size={14} className="feature-check" />
                  <span>Learn via Video (Animated Lessons)</span>
                </div>
                <div className="feature-pill">
                  <FileText size={14} className="feature-check" />
                  <span>Faculty Uploaded PDFs</span>
                </div>
              </div>
            </div>

            <div className="choice-card-bottom">
              <button
                id="btn-choose-topic-reading"
                type="button"
                className="pill-btn pill-btn-primary choice-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("topic-reading");
                }}
              >
                <span>Start Topic Reading</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* OPTION B: QUESTION PRACTICE */}
          <div
            id="card-question-practice"
            className="main-choice-card choice-practice-card"
            onClick={() => onNavigate("question-practice")}
          >
            <div className="choice-card-top">
              <div className="choice-icon-badge icon-badge-emerald">
                <Target size={32} strokeWidth={2.2} />
              </div>
              <span className="choice-letter-badge">Option B</span>
            </div>

            <div className="choice-card-body">
              <h2 className="choice-title">Question Practice</h2>
              <p className="choice-description">
                For students who want to test their knowledge. Practice curated questions with instant answer evaluation and 4-tier AI solutions (Short, Medium, Large & Video).
              </p>

              <div className="choice-features-list">
                <div className="feature-pill">
                  <CheckCircle2 size={14} className="feature-check" />
                  <span>Short, Medium & Long Questions</span>
                </div>
                <div className="feature-pill">
                  <Sparkles size={14} className="feature-check" />
                  <span>4-Tier AI Solutions (Step-by-Step)</span>
                </div>
                <div className="feature-pill">
                  <Award size={14} className="feature-check" />
                  <span>Detailed Accuracy & Session Review</span>
                </div>
              </div>
            </div>

            <div className="choice-card-bottom">
              <button
                id="btn-choose-question-practice"
                type="button"
                className="pill-btn pill-btn-primary choice-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("question-practice");
                }}
              >
                <span>Start Question Practice</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT TOPICS (Clean quick-resume strip) */}
      <div className="recent-topics-strip-section">
        <div className="recent-strip-header">
          <div>
            <h3 className="recent-strip-title">Recent Topics & Quick Resume</h3>
            <p className="recent-strip-sub">Jump right back into high-yield curriculum units</p>
          </div>
          <button
            type="button"
            className="view-all-link-btn"
            onClick={() => onNavigate("topic-reading")}
          >
            <span>Explore All Topics</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="recent-cards-row">
          {recentTopics.map((item) => (
            <div key={item.id} className="recent-mini-card">
              <div className="mini-card-category-row">
                <span className="mini-cat-tag">{item.categoryName}</span>
                <span className="mini-sub-tag">{item.subjectName}</span>
              </div>
              <h4 className="mini-card-title">{item.title}</h4>
              <div className="mini-card-actions">
                <button
                  type="button"
                  className="mini-btn-read"
                  onClick={() => {
                    if (onStartReadingTopic) {
                      onStartReadingTopic(item);
                    } else {
                      onNavigate("topic-reading");
                    }
                  }}
                >
                  <BookOpen size={14} />
                  <span>Read Notes</span>
                </button>
                <button
                  type="button"
                  className="mini-btn-practice"
                  onClick={() => {
                    if (onStartPracticeTopic) {
                      onStartPracticeTopic(item);
                    } else {
                      onNavigate("question-practice");
                    }
                  }}
                >
                  <Target size={14} />
                  <span>Practise Qs</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
