import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Video,
  FileText,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Search,
  Sparkles,
  Clock,
  Target,
  Download,
  ExternalLink,
  Layers,
  Bookmark,
  Check,
  Compass,
  Stethoscope,
  GraduationCap,
  Play,
  RotateCcw,
  HelpCircle,
  Lightbulb
} from "lucide-react";
import {
  STUDENT_CATEGORIES,
  getStudentCategoryById,
  getSubjectsForCategory,
  getTopicNotes,
  getTopicVideo
} from "../data/learningCategories";
import { StorageService } from "../services/storage";

// Icon mapping helper
const CATEGORY_ICONS = {
  iit: Compass,
  neet: Stethoscope,
  class_12: GraduationCap,
  class_11: Layers,
  class_10: BookOpen,
  class_9: BookOpen
};

export default function TopicReadingView({
  initialCategoryId = "iit",
  initialTopicId = null,
  onNavigate,
  onStartPracticeWithTopic,
  onOpenTermDrawer
}) {
  // Step 1: Learning Category
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId || "iit");

  // Step 2: Learning Format: 'text' (Read via Text) vs 'video' (Learn via Video)
  const [learningFormat, setLearningFormat] = useState("text");

  // Step 3: Progressive Hierarchy (Subject -> Chapter -> Topic)
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId);

  // Sync category and topic when initial props change
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategoryId(initialCategoryId);
      setSelectedSubjectId(null);
      setSelectedChapterId(null);
      setSelectedTopicId(initialTopicId || null);
    }
  }, [initialCategoryId, initialTopicId]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [completedNotes, setCompletedNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("caplen_completed_notes");
      return saved ? JSON.parse(saved) : ["topic-jee-rot", "topic-bio-evolution"];
    } catch {
      return ["topic-jee-rot"];
    }
  });

  // Current category data
  const currentCategory = useMemo(() => {
    return getStudentCategoryById(selectedCategoryId);
  }, [selectedCategoryId]);

  const subjects = useMemo(() => {
    return currentCategory?.subjects || [];
  }, [currentCategory]);

  // Set default subject if none selected or if category changes
  const activeSubject = useMemo(() => {
    if (!subjects.length) return null;
    return subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  }, [subjects, selectedSubjectId]);

  const chapters = useMemo(() => {
    return activeSubject?.chapters || [];
  }, [activeSubject]);

  const activeChapter = useMemo(() => {
    if (!chapters.length) return null;
    return chapters.find((c) => c.id === selectedChapterId) || chapters[0];
  }, [chapters, selectedChapterId]);

  const topics = useMemo(() => {
    return activeChapter?.topics || [];
  }, [activeChapter]);

  // Active topic object
  const activeTopic = useMemo(() => {
    if (selectedTopicId) {
      // Look across current chapter first
      for (const t of topics) {
        if (t.id === selectedTopicId) return t;
      }
      // Look across all chapters in active subject
      for (const ch of chapters) {
        const found = ch.topics.find((t) => t.id === selectedTopicId);
        if (found) return found;
      }
      // Look across all subjects in category
      for (const sub of subjects) {
        for (const ch of sub.chapters) {
          const found = ch.topics.find((t) => t.id === selectedTopicId);
          if (found) return found;
        }
      }
    }
    return topics[0] || null;
  }, [topics, chapters, subjects, selectedTopicId]);

  // Topic Notes & Video Data
  const topicNotes = useMemo(() => {
    if (!activeTopic) return null;
    return getTopicNotes(activeTopic.id);
  }, [activeTopic]);

  const topicVideo = useMemo(() => {
    if (!activeTopic) return null;
    return getTopicVideo(activeTopic.id);
  }, [activeTopic]);

  // Published Faculty PDFs / Notes for this subject or chapter
  const facultyResources = useMemo(() => {
    if (!activeSubject) return [];
    return StorageService.getPublishedFacultyResources({
      subjectId: activeSubject.id,
      chapter: activeChapter?.title
    });
  }, [activeSubject, activeChapter]);

  // Toggle note completion
  const toggleNoteCompleted = (tId) => {
    setCompletedNotes((prev) => {
      const updated = prev.includes(tId) ? prev.filter((id) => id !== tId) : [...prev, tId];
      try {
        localStorage.setItem("caplen_completed_notes", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isCurrentTopicCompleted = activeTopic && completedNotes.includes(activeTopic.id);

  // Handle Practice CTA
  const handleGoToPractice = () => {
    if (onStartPracticeWithTopic) {
      onStartPracticeWithTopic({
        categoryId: selectedCategoryId,
        subjectId: activeSubject?.id,
        subjectName: activeSubject?.name,
        chapterId: activeChapter?.id,
        chapterTitle: activeChapter?.title,
        topicId: activeTopic?.id,
        topicTitle: activeTopic?.title
      });
    } else if (onNavigate) {
      onNavigate("question-practice");
    }
  };

  return (
    <div className="topic-reading-page fade-in">
      {/* 1. Header Banner */}
      <div className="topic-reading-header">
        <div className="tr-header-content">
          <div className="tr-badge-row">
            <span className="platform-tagline-badge">
              <BookOpen size={14} className="badge-icon" /> Topic Reading & Concepts
            </span>
            <span className="exam-mode-badge">{currentCategory.badge}</span>
          </div>
          <h1 className="tr-title">Learn & Revise by Topic</h1>
          <p className="tr-subtitle">
            Choose your exam or class, choose between <strong>text notes</strong> or <strong>animated videos</strong>, and master concepts step-by-step.
          </p>
        </div>

        {/* Quick Format Switcher */}
        <div className="format-toggle-container">
          <span className="format-toggle-label">Learning Format:</span>
          <div className="format-toggle-pills" role="radiogroup" aria-label="Learning Format">
            <button
              id="format-toggle-text"
              className={`format-pill-btn ${learningFormat === "text" ? "active" : ""}`}
              onClick={() => setLearningFormat("text")}
              aria-checked={learningFormat === "text"}
              role="radio"
            >
              <BookOpen size={16} />
              <span>Read via Text</span>
            </button>
            <button
              id="format-toggle-video"
              className={`format-pill-btn ${learningFormat === "video" ? "active" : ""}`}
              onClick={() => setLearningFormat("video")}
              aria-checked={learningFormat === "video"}
              role="radio"
            >
              <Video size={16} />
              <span>Learn via Video</span>
              {topicVideo && <span className="pill-pulse-dot" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Category Selector Strip (6 Options matching diagram) */}
      <div className="category-selection-strip">
        <div className="strip-title-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "8px" }}>
          <span className="strip-label">Choose your learning category:</span>
          <button
            type="button"
            className="btn-switch-path-pill"
            id="btn-switch-learning-path"
            onClick={() => onNavigate && onNavigate("select-learning-path")}
            title="Open visual selection page for all classes and exams"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "#E9F9F0",
              color: "#07865B",
              border: "1px solid #CDEEDD",
              borderRadius: "9999px",
              padding: "3px 10px",
              fontSize: "0.76rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            <span>Change Learning Path</span>
            <ChevronRight size={13} />
          </button>
        </div>
        <div className="category-chips-scroll">
          {STUDENT_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || BookOpen;
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-select-${cat.id}`}
                className={`category-chip ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setSelectedSubjectId(null);
                  setSelectedChapterId(null);
                  setSelectedTopicId(null);
                }}
              >
                <div className="cat-chip-icon">
                  <Icon size={18} strokeWidth={isSelected ? 2.5 : 2} />
                </div>
                <div className="cat-chip-text">
                  <span className="cat-chip-name">{cat.name}</span>
                  <span className="cat-chip-sub">{cat.badge}</span>
                </div>
                {isSelected && <Check size={16} className="cat-check-icon" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Progressive Drill-Down Hierarchy (Subject -> Chapter -> Topic) */}
      <div className="drilldown-nav-bar">
        <div className="drilldown-step">
          <label className="step-label">1. Subject</label>
          <select
            id="subject-dropdown"
            className="clean-select"
            value={activeSubject?.id || ""}
            onChange={(e) => {
              setSelectedSubjectId(e.target.value);
              setSelectedChapterId(null);
              setSelectedTopicId(null);
            }}
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="drilldown-divider">
          <ChevronRight size={18} />
        </div>

        <div className="drilldown-step">
          <label className="step-label">2. Chapter</label>
          <select
            id="chapter-dropdown"
            className="clean-select"
            value={activeChapter?.id || ""}
            onChange={(e) => {
              setSelectedChapterId(e.target.value);
              setSelectedTopicId(null);
            }}
          >
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div className="drilldown-divider">
          <ChevronRight size={18} />
        </div>

        <div className="drilldown-step">
          <label className="step-label">3. Topic</label>
          <select
            id="topic-dropdown"
            className="clean-select highlight-select"
            value={activeTopic?.id || ""}
            onChange={(e) => setSelectedTopicId(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Main Content Area */}
      {activeTopic ? (
        <div className="topic-content-layout">
          {/* Main Reading / Video Panel */}
          <div className="topic-main-panel">
            {/* Topic Header Card */}
            <div className="topic-header-card">
              <div className="topic-meta-row">
                <span className="topic-breadcrumb">
                  {currentCategory.name} &gt; {activeSubject?.name} &gt; {activeChapter?.title}
                </span>
                <div className="topic-tags-cluster">
                  <span className="time-badge">
                    <Clock size={13} /> {activeTopic.estMinutes || 45} mins
                  </span>
                  <span className={`diff-pill diff-${(activeTopic.difficulty || "medium").toLowerCase()}`}>
                    {activeTopic.difficulty || "Medium"}
                  </span>
                  {activeTopic.hasVideo && (
                    <span className="video-available-pill">
                      <Video size={13} /> Animated Video Available
                    </span>
                  )}
                </div>
              </div>

              <div className="topic-title-action-row">
                <h2 className="topic-active-title">{activeTopic.title}</h2>
                <button
                  id="mark-completed-btn"
                  className={`mark-done-btn ${isCurrentTopicCompleted ? "completed" : ""}`}
                  onClick={() => toggleNoteCompleted(activeTopic.id)}
                  title="Mark this topic as revised"
                >
                  <CheckCircle2 size={16} />
                  <span>{isCurrentTopicCompleted ? "Completed" : "Mark as Revised"}</span>
                </button>
              </div>

              {/* Subtopic chips */}
              {activeTopic.subtopics && activeTopic.subtopics.length > 0 && (
                <div className="subtopics-list">
                  <span className="subtopics-label">Key Focus Areas:</span>
                  <div className="subtopic-chips-wrap">
                    {activeTopic.subtopics.map((sub, i) => (
                      <span key={i} className="subtopic-pill">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FORMAT A: READ VIA TEXT */}
            {learningFormat === "text" && (
              <div className="text-learning-view fade-in">
                {topicNotes ? (
                  <>
                    {/* 1. Core Summary Box */}
                    <div className="learning-card concept-card">
                      <div className="card-header-line">
                        <div className="card-header-icon green-icon">
                          <Lightbulb size={20} />
                        </div>
                        <div>
                          <h3 className="card-section-title">Topic Explanation & Core Principles</h3>
                          <p className="card-section-sub">Comprehensive NCERT and competitive foundation</p>
                        </div>
                      </div>
                      <div className="concept-body">
                        <p className="lead-paragraph">{topicNotes.summary}</p>
                      </div>
                    </div>

                    {/* 2. Key Concepts & Definitions */}
                    {topicNotes.keyConcepts && topicNotes.keyConcepts.length > 0 && (
                      <div className="learning-card concepts-list-card">
                        <div className="card-header-line">
                          <div className="card-header-icon blue-icon">
                            <Sparkles size={20} />
                          </div>
                          <div>
                            <h3 className="card-section-title">Important Concepts & Mechanisms</h3>
                            <p className="card-section-sub">Essential principles tested in exams</p>
                          </div>
                        </div>

                        <div className="concept-items-grid">
                          {topicNotes.keyConcepts.map((concept, index) => (
                            <div key={index} className="concept-block-item">
                              <div className="concept-bullet-num">{index + 1}</div>
                              <div className="concept-content-col">
                                <h4 className="concept-item-title">{concept.title}</h4>
                                <p className="concept-item-desc">{concept.description}</p>
                                {concept.termKey && (
                                  <button
                                    className="term-chip-link"
                                    onClick={() => onOpenTermDrawer && onOpenTermDrawer(concept.termKey)}
                                  >
                                    <span>Explore Definition: <strong>{concept.termKey}</strong></span>
                                    <ExternalLink size={12} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Formulas & Key Equations */}
                    {topicNotes.formulas && topicNotes.formulas.length > 0 && (
                      <div className="learning-card formulas-card">
                        <div className="card-header-line">
                          <div className="card-header-icon purple-icon">
                            <Target size={20} />
                          </div>
                          <div>
                            <h3 className="card-section-title">Important Formulas & Mathematical Laws</h3>
                            <p className="card-section-sub">High-yield equations for numerical problem solving</p>
                          </div>
                        </div>

                        <div className="formula-cards-grid">
                          {topicNotes.formulas.map((form, i) => (
                            <div key={i} className="formula-item-box">
                              <span className="formula-name">{form.name}</span>
                              <div className="formula-math-display">
                                <code>{form.formula}</code>
                              </div>
                              <p className="formula-note">{form.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. Common Exam Traps & Misconceptions */}
                    {topicNotes.commonPitfalls && topicNotes.commonPitfalls.length > 0 && (
                      <div className="learning-card pitfalls-card">
                        <div className="card-header-line">
                          <div className="card-header-icon amber-icon">
                            <HelpCircle size={20} />
                          </div>
                          <div>
                            <h3 className="card-section-title">Common Exam Traps & Misconceptions</h3>
                            <p className="card-section-sub">Avoid these frequent negative-marking errors</p>
                          </div>
                        </div>

                        <ul className="pitfall-list">
                          {topicNotes.commonPitfalls.map((pitfall, idx) => (
                            <li key={idx} className="pitfall-item">
                              <span className="pitfall-bullet">⚠️</span>
                              <span className="pitfall-text">{pitfall}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  /* Fallback if notes are concise */
                  <div className="learning-card concept-card">
                    <div className="card-header-line">
                      <div className="card-header-icon green-icon">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h3 className="card-section-title">{activeTopic.title}</h3>
                        <p className="card-section-sub">Curriculum syllabus outline & core principles</p>
                      </div>
                    </div>
                    <div className="concept-body">
                      <p className="lead-paragraph">
                        This topic covers foundational principles of <strong>{activeTopic.title}</strong> in{" "}
                        {activeSubject?.name}. Master each subtopic thoroughly before attempting the question practice drill.
                      </p>
                      {activeTopic.subtopics && (
                        <div className="subtopics-breakdown">
                          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "#065f46" }}>
                            Syllabus Breakdown:
                          </h4>
                          <ul style={{ paddingLeft: 20, color: "#374151", lineHeight: 1.8 }}>
                            {activeTopic.subtopics.map((st, i) => (
                              <li key={i}>{st}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Faculty-Uploaded PDFs & Study Notes (Only shown if published and exists) */}
                {facultyResources && facultyResources.length > 0 && (
                  <div className="learning-card faculty-resources-card">
                    <div className="card-header-line">
                      <div className="card-header-icon green-icon">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 className="card-section-title">Faculty Study Notes & Uploaded PDFs</h3>
                        <p className="card-section-sub">Approved study materials published by your instructors</p>
                      </div>
                    </div>

                    <div className="faculty-files-list">
                      {facultyResources.map((res) => (
                        <div key={res.id} className="faculty-file-item">
                          <div className="faculty-file-icon">
                            <FileText size={22} color="#059669" />
                          </div>
                          <div className="faculty-file-info">
                            <div className="faculty-file-title">{res.title}</div>
                            <div className="faculty-file-meta">
                              <span>By {res.authorName || "Faculty Instructor"}</span>
                              <span>•</span>
                              <span>{res.fileSize || "1.8 MB PDF"}</span>
                              {res.verified && <span className="verified-badge">✓ Verified</span>}
                            </div>
                          </div>
                          <a
                            href={res.fileUrl || "#"}
                            download={res.fileName || "faculty_notes.pdf"}
                            className="download-file-btn"
                            onClick={(e) => {
                              if (!res.fileUrl) {
                                e.preventDefault();
                                alert(`Opening ${res.title} notes viewer...`);
                              }
                            }}
                          >
                            <Download size={15} />
                            <span>Download PDF</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FORMAT B: LEARN VIA VIDEO (ANIMATED) */}
            {learningFormat === "video" && (
              <div className="video-learning-view fade-in">
                {topicVideo ? (
                  <div className="video-player-container">
                    {/* Simulated High-Res Video Screen */}
                    <div className="video-screen-mockup">
                      <div className="video-overlay-header">
                        <span className="video-badge-pill">
                          <Sparkles size={13} /> {topicVideo.badge || "Animated Visual Breakdown"}
                        </span>
                        <span className="video-duration-pill">{topicVideo.duration || "14:20"}</span>
                      </div>

                      <div className="video-center-controls">
                        <div className="play-button-large">
                          <Play size={36} fill="#ffffff" color="#ffffff" style={{ marginLeft: 4 }} />
                        </div>
                        <span className="video-title-overlay">{topicVideo.title}</span>
                      </div>

                      <div className="video-progress-bar-wrap">
                        <div className="video-scrubber-track">
                          <div className="video-scrubber-progress" style={{ width: "35%" }} />
                        </div>
                      </div>
                    </div>

                    {/* Video Timestamps & Key Moments */}
                    {topicVideo.timestamps && (
                      <div className="video-timestamps-card">
                        <h4 className="timestamps-title">
                          <Clock size={16} /> Key Timestamps & Animated Chapters
                        </h4>
                        <div className="timestamps-list">
                          {topicVideo.timestamps.map((ts, idx) => (
                            <div key={idx} className="timestamp-item">
                              <span className="time-code">{ts.time}</span>
                              <span className="time-title">{ts.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-video-available-box">
                    <Video size={48} color="#9ca3af" />
                    <h3>Animated Video Coming Soon</h3>
                    <p>Our faculty is currently producing an animated video breakdown for this topic.</p>
                    <button className="pill-btn pill-btn-primary" onClick={() => setLearningFormat("text")}>
                      <BookOpen size={16} /> Switch to Text Notes
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 5. Clear Bottom Action Bar: PROMINENT QUESTION PRACTICE BUTTON */}
            <div className="topic-reading-bottom-cta">
              <div className="cta-left-text">
                <span className="cta-heading">Ready to test what you learned?</span>
                <span className="cta-sub">Attempt curated questions from {activeTopic.title}</span>
              </div>
              <button
                id="cta-practice-topic-btn"
                className="pill-btn pill-btn-primary cta-practice-btn"
                onClick={handleGoToPractice}
              >
                <span>Practise Questions from this Topic</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Topics in Chapter Navigator */}
          <aside className="topic-side-nav">
            <div className="side-nav-card">
              <div className="side-nav-header">
                <span className="side-nav-title">Topics in this Chapter</span>
                <span className="side-nav-count">{topics.length} topics</span>
              </div>
              <div className="side-topics-list">
                {topics.map((t, idx) => {
                  const isCurrent = t.id === activeTopic.id;
                  const isDone = completedNotes.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      className={`side-topic-btn ${isCurrent ? "active" : ""}`}
                      onClick={() => setSelectedTopicId(t.id)}
                    >
                      <div className="side-topic-num">
                        {isDone ? <Check size={14} className="done-check" /> : idx + 1}
                      </div>
                      <div className="side-topic-text">
                        <span className="side-topic-title">{t.title}</span>
                        <span className="side-topic-sub">
                          {t.estMinutes || 40} mins • {t.difficulty || "Medium"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Practice Shortcut */}
            <div className="side-practice-card">
              <div className="side-practice-icon">
                <Target size={28} color="#059669" />
              </div>
              <h4 className="side-practice-title">Topic Practice Drill</h4>
              <p className="side-practice-desc">
                Jump straight into practice questions with 4-tier AI explanations.
              </p>
              <button
                id="side-start-practice-btn"
                className="pill-btn pill-btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={handleGoToPractice}
              >
                <span>Start Practice</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </aside>
        </div>
      ) : (
        <div className="empty-topic-state">
          <BookOpen size={48} color="#9ca3af" />
          <h3>Select a Topic to Start Learning</h3>
          <p>Choose your category, subject, and chapter using the dropdowns above.</p>
        </div>
      )}
    </div>
  );
}
