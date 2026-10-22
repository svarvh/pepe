import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Languages,
  Sparkles,
  ArrowRight,
  Bookmark,
  Share2,
  CheckCircle,
  Clock,
  Search,
  ChevronRight,
  Layers,
  HelpCircle,
  FileText,
  Sliders,
  ExternalLink,
  Target
} from "lucide-react";
import { StorageService } from "../services/storage";
import TerminologyDrawer from "./TerminologyDrawer";

export default function SmartNotesView({ onNavigate, onStartPracticeWithTopic, onOpenVideoForTopic }) {
  const activeCourse = StorageService.getActiveCourse();
  const [selectedCourse, setSelectedCourse] = useState(activeCourse);
  const courses = StorageService.getCourses();
  const syllabusTree = StorageService.getSyllabusTree(selectedCourse);

  // Selected hierarchy
  const initialSubject = syllabusTree.subjects?.[0] || null;
  const [selectedSubjectId, setSelectedSubjectId] = useState(initialSubject?.id || "");
  const currentSubject = syllabusTree.subjects?.find(s => s.id === selectedSubjectId) || syllabusTree.subjects?.[0];

  const initialChapter = currentSubject?.chapters?.[0] || null;
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapter?.id || "");
  const currentChapter = currentSubject?.chapters?.find(c => c.id === selectedChapterId) || currentSubject?.chapters?.[0];

  const initialTopic = currentChapter?.topics?.[0] || null;
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopic?.id || "topic-bio-evolution");
  const currentTopic = currentChapter?.topics?.find(t => t.id === selectedTopicId) || currentChapter?.topics?.[0] || initialTopic;

  // Reading Options
  const [language, setLanguage] = useState("en"); // 'en' or 'hi'
  const [isTTSActive, setIsTTSActive] = useState(false);
  const [fontSize, setFontSize] = useState("medium"); // 'small', 'medium', 'large'
  const [noteSearch, setNoteSearch] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Active Terminology Modal
  const [activeTermId, setActiveTermId] = useState(null);

  // Sync course when prop changes
  useEffect(() => {
    const tree = StorageService.getSyllabusTree(selectedCourse);
    const firstSub = tree.subjects?.[0];
    const firstChap = firstSub?.chapters?.[0];
    const firstTop = firstChap?.topics?.[0];
    setSelectedSubjectId(firstSub?.id || "");
    setSelectedChapterId(firstChap?.id || "");
    setSelectedTopicId(firstTop?.id || "topic-bio-evolution");
  }, [selectedCourse]);

  // Load Note Data
  const noteData = StorageService.getSmartNote(selectedTopicId) || StorageService.getSmartNote("topic-bio-evolution");

  // TTS audio reader using Web Speech API
  const handleToggleTTS = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isTTSActive) {
      window.speechSynthesis.cancel();
      setIsTTSActive(false);
    } else {
      window.speechSynthesis.cancel();
      const contentToRead = language === "hi" && noteData.contentHi
        ? `${noteData.title}. ${noteData.contentHi.replace(/\[\[(.*?)\]\]/g, "$1")}`
        : `${noteData.title}. ${noteData.contentEn.replace(/\[\[(.*?)\]\]/g, "$1")}`;

      // Clean markdown tags for clear speech
      const cleanedText = contentToRead.replace(/[#*`$>_]/g, "").slice(0, 1000);
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = 0.95;
      utterance.lang = language === "hi" ? "hi-IN" : "en-US";

      utterance.onend = () => setIsTTSActive(false);
      utterance.onerror = () => setIsTTSActive(false);

      window.speechSynthesis.speak(utterance);
      setIsTTSActive(true);
    }
  };

  // Helper to render text with interactive [[term-id]] tags
  const renderInteractiveContent = (rawText) => {
    if (!rawText) return null;

    // Split text by [[term-id]]
    const parts = rawText.split(/(\[\[[a-zA-Z0-9_-]+\]\])/g);

    return parts.map((part, index) => {
      const match = part.match(/^\[\[([a-zA-Z0-9_-]+)\]\]$/);
      if (match) {
        const termId = match[1];
        const termObj = StorageService.getTerminology(termId);
        const displayName = termObj
          ? (language === "hi" && termObj.hindiTerm ? termObj.hindiTerm : termObj.term)
          : termId.replace("-", " ");

        return (
          <button
            key={`term-${index}-${termId}`}
            className="smart-term-badge"
            onClick={() => setActiveTermId(termId)}
            title={`Tap to explore scientific term: ${displayName}`}
          >
            <Sparkles size={13} className="term-badge-icon" />
            <span>{displayName}</span>
          </button>
        );
      }

      // Format basic markdown headers and bullet points
      const lines = part.split("\n");
      return (
        <span key={`text-${index}`}>
          {lines.map((line, lIdx) => {
            if (line.startsWith("### ")) {
              return (
                <h3 key={lIdx} className="note-subheading">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("## ")) {
              return (
                <h2 key={lIdx} className="note-heading">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("* ") || line.startsWith("- ")) {
              return (
                <div key={lIdx} className="note-bullet-line">
                  <span className="bullet-dot">•</span>
                  <span>{line.replace(/^[* -] /, "")}</span>
                </div>
              );
            }
            if (line.startsWith("> ")) {
              return (
                <blockquote key={lIdx} className="note-callout-quote">
                  {line.replace("> ", "")}
                </blockquote>
              );
            }
            return (
              <React.Fragment key={lIdx}>
                {line}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </span>
      );
    });
  };

  const handleStartPracticingTopic = () => {
    const allQuestions = StorageService.getQuestions();
    const matched = allQuestions.filter(q =>
      q.topicId === selectedTopicId ||
      q.topic?.toLowerCase().includes(currentTopic?.title?.toLowerCase() || "")
    );
    if (onStartPracticeWithTopic) {
      onStartPracticeWithTopic(matched.length > 0 ? matched : null);
    } else {
      onNavigate("practice");
    }
  };

  return (
    <div className="smart-notes-view fade-in">
      {/* 1. TOP HEADER & COURSE SELECTOR BAR */}
      <div className="notes-hero-card">
        <div className="notes-hero-content">
          <div className="notes-badge-row">
            <span className="badge badge-lime">NCERT + Competitive Learning</span>
            <span className="badge badge-lavender">Bilingual (English / हिन्दी)</span>
            <span className="badge badge-cream">Interactive Terminology</span>
          </div>

          <h1 className="notes-main-title">
            Smart Notes & Concept Knowledge Engine
          </h1>
          <p className="notes-main-desc">
            Complete structured theory with clickable scientific terminology, verified formulas, NCERT references, and synchronized topic videos.
          </p>

          {/* Course Tabs */}
          <div className="notes-course-pills">
            {courses.map((c) => (
              <button
                key={c.id}
                className={`course-pill-tab ${selectedCourse === c.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedCourse(c.id);
                  StorageService.setActiveCourse(c.id);
                }}
              >
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN LAYOUT: Hierarchy Tree Sidebar + Active Note Reader */}
      <div className="notes-split-layout">
        {/* Left Column: Syllabus Hierarchy Selector */}
        <div className="notes-hierarchy-panel">
          <div className="hierarchy-panel-header">
            <Layers size={18} />
            <h3>Syllabus Hierarchy</h3>
          </div>

          {/* Subject Selector */}
          <div className="hierarchy-group">
            <label className="hierarchy-label">Subject</label>
            <select
              className="hierarchy-select"
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                const sub = syllabusTree.subjects?.find(s => s.id === e.target.value);
                setSelectedChapterId(sub?.chapters?.[0]?.id || "");
                setSelectedTopicId(sub?.chapters?.[0]?.topics?.[0]?.id || "");
              }}
            >
              {syllabusTree.subjects?.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Selector */}
          <div className="hierarchy-group">
            <label className="hierarchy-label">Chapter</label>
            <select
              className="hierarchy-select"
              value={selectedChapterId}
              onChange={(e) => {
                setSelectedChapterId(e.target.value);
                const ch = currentSubject?.chapters?.find(c => c.id === e.target.value);
                setSelectedTopicId(ch?.topics?.[0]?.id || "");
              }}
            >
              {currentSubject?.chapters?.map((chap) => (
                <option key={chap.id} value={chap.id}>
                  Ch {chap.number}: {chap.title}
                </option>
              ))}
            </select>
          </div>

          {/* Topics List in Chapter */}
          <div className="hierarchy-topics-list">
            <label className="hierarchy-label">Topics in this Chapter</label>
            {currentChapter?.topics?.map((top) => {
              const isSelected = top.id === selectedTopicId;
              return (
                <button
                  key={top.id}
                  className={`hierarchy-topic-item ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedTopicId(top.id)}
                >
                  <div className="topic-item-left">
                    <span className="topic-dot"></span>
                    <span className="topic-item-title">{top.title}</span>
                  </div>
                  <ChevronRight size={15} />
                </button>
              );
            })}
          </div>

          {/* Central Terminology Glossary Quick Launch */}
          <div className="hierarchy-glossary-box">
            <div className="glossary-box-header">
              <Sparkles size={16} />
              <h4>Central Terminology</h4>
            </div>
            <p className="glossary-box-desc">
              Every underlined term in the notes is clickable with live definitions and Hindi translations.
            </p>
            <div className="glossary-quick-terms">
              {Object.values(StorageService.getAllTerminology()).slice(0, 5).map((term) => (
                <button
                  key={term.id}
                  className="glossary-mini-chip"
                  onClick={() => setActiveTermId(term.id)}
                >
                  {term.term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Note Reader Content */}
        <div className="notes-reader-container">
          {/* Note Controls Top Bar */}
          <div className="notes-reader-toolbar">
            <div className="toolbar-left-meta">
              <span className="badge badge-navy">
                {currentChapter?.ncertChapterRef || "NCERT Aligned"}
              </span>
              <span className="badge badge-lavender">
                <Clock size={13} style={{ marginRight: 4 }} />
                {noteData.readingTimeMinutes} min read
              </span>
              <span className="badge badge-cream">
                {noteData.ncertPageRange}
              </span>
            </div>

            <div className="toolbar-right-actions">
              {/* Bilingual Switcher */}
              <button
                className={`toolbar-pill-btn ${language === "hi" ? "active-lime" : ""}`}
                onClick={() => setLanguage(prev => prev === "en" ? "hi" : "en")}
                title="Switch between English and Hindi translation"
              >
                <Languages size={16} />
                <span>{language === "en" ? "हिन्दी अनुवाद" : "English"}</span>
              </button>

              {/* Text-To-Speech Listen Button */}
              <button
                className={`toolbar-pill-btn ${isTTSActive ? "btn-pulse-active" : ""}`}
                onClick={handleToggleTTS}
                title="Listen to note audio narration"
              >
                {isTTSActive ? <VolumeX size={16} /> : <Volume2 size={16} />}
                <span>{isTTSActive ? "Stop Audio" : "Listen (TTS)"}</span>
              </button>

              {/* Bookmark note */}
              <button
                className={`icon-circle-btn ${isBookmarked ? "active" : ""}`}
                onClick={() => setIsBookmarked(!isBookmarked)}
                title="Bookmark this note"
              >
                <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Note Title & Overview Hero */}
          <div className="note-article-header">
            <div className="note-breadcrumb">
              <span>{currentSubject?.name}</span> / <span>{currentChapter?.title}</span>
            </div>
            <h1 className="note-article-title">{noteData.title}</h1>
            <p className="note-summary-text">{noteData.summary}</p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="note-action-cards-grid">
            <button
              className="note-action-card card-video"
              onClick={() => {
                if (onOpenVideoForTopic) onOpenVideoForTopic(selectedTopicId);
                else onNavigate("videos");
              }}
            >
              <div className="action-card-icon">
                <Play size={20} />
              </div>
              <div className="action-card-text">
                <span className="action-card-title">Watch Topic Video Lesson</span>
                <span className="action-card-subtitle">With chapter markers & transcripts</span>
              </div>
              <ArrowRight size={16} />
            </button>

            <button
              className="note-action-card card-practice"
              onClick={handleStartPracticingTopic}
            >
              <div className="action-card-icon">
                <Target size={20} />
              </div>
              <div className="action-card-text">
                <span className="action-card-title">Practise Topic Questions</span>
                <span className="action-card-subtitle">10+ validated multi-format questions</span>
              </div>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Note Body Text with Clickable Terminology */}
          <article className="note-body-content">
            {language === "hi" && noteData.contentHi ? (
              <div className="bilingual-section hindi-content">
                <div className="hindi-badge-bar">
                  <Languages size={15} />
                  <span>प्रमाणित हिन्दी माध्यम अनुवाद (NCERT आधारित):</span>
                </div>
                {renderInteractiveContent(noteData.contentHi)}
              </div>
            ) : (
              renderInteractiveContent(noteData.contentEn)
            )}
          </article>

          {/* Diagrams & Visual Learning Section */}
          {noteData.diagrams && noteData.diagrams.length > 0 && (
            <div className="note-diagrams-section">
              <h3 className="section-subtitle">Visual Diagrams & Representations</h3>
              <div className="note-diagrams-grid">
                {noteData.diagrams.map((diag, dIdx) => (
                  <div key={dIdx} className="note-diagram-card">
                    <img src={diag.url} alt={diag.caption} className="diagram-image" />
                    <p className="diagram-caption">{diag.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Worked Examples & Derivations */}
          {noteData.workedExamples && noteData.workedExamples.length > 0 && (
            <div className="note-examples-section">
              <h3 className="section-subtitle">Step-by-Step Worked Problem Examples</h3>
              {noteData.workedExamples.map((ex, eIdx) => (
                <div key={eIdx} className="note-worked-example-card">
                  <div className="example-header">
                    <Sparkles size={16} />
                    <h4>{ex.title}</h4>
                  </div>
                  <div className="example-problem">
                    <strong>Problem:</strong> {ex.problem}
                  </div>
                  <div className="example-solution">
                    <strong>Solution:</strong>
                    <pre>{ex.solution}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Competitive Exam Shortcuts & Traps */}
          {noteData.shortcuts && noteData.shortcuts.length > 0 && (
            <div className="note-shortcuts-card">
              <div className="shortcuts-header">
                <Sparkles size={18} />
                <h4>Competitive Exam Shortcuts & Common Traps</h4>
              </div>
              <ul className="shortcuts-list">
                {noteData.shortcuts.map((sc, sIdx) => (
                  <li key={sIdx}>{sc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="notes-reader-footer">
            <button
              className="pill-btn pill-btn-outline"
              onClick={() => onNavigate("test-builder")}
            >
              <span>Build Custom Test on this Topic</span>
            </button>

            <button
              className="pill-btn pill-btn-lime"
              onClick={handleStartPracticingTopic}
            >
              <span>Practise 10+ Topic Questions</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. CENTRAL TERMINOLOGY DRAWER MODAL */}
      {activeTermId && (
        <TerminologyDrawer
          termId={activeTermId}
          onClose={() => setActiveTermId(null)}
          onNavigateToNotes={() => setActiveTermId(null)}
          onPracticeTerm={(term) => {
            setActiveTermId(null);
            handleStartPracticingTopic();
          }}
        />
      )}
    </div>
  );
}
