import React, { useState } from "react";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Play,
  Bookmark,
  Share2,
  Download,
  AlertTriangle,
  Layers,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import confetti from "canvas-confetti";
import { StorageService } from "../services/storage";

export default function InstantResultView({ resultData, onNavigate, onRetryMistakes, onOpenNotesForTopic }) {
  // If no result passed, use latest saved result or default 24/30 demo
  const result = resultData || StorageService.getLatestTestResult();
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'solutions', 'weaknesses'
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [savedMistakes, setSavedMistakes] = useState({});

  // Trigger celebration confetti on mount
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  if (!result) {
    return (
      <div className="empty-state-card fade-in">
        <Trophy size={48} className="empty-icon" />
        <h3>No Test Results Available</h3>
        <p>Complete a practice session or custom test to view instant analytics and solutions.</p>
        <button className="pill-btn pill-btn-lime" onClick={() => onNavigate("test-builder")}>
          Build a Custom Test
        </button>
      </div>
    );
  }

  const toggleQuestionExpand = (idx) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleSaveToMistakes = (question, userAns) => {
    StorageService.addMistake(question.id, {
      mistakeType: "Conceptual Confusion",
      userChoice: userAns,
      correctChoice: question.correctAnswer
    });
    setSavedMistakes(prev => ({ ...prev, [question.id]: true }));
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="instant-result-view fade-in">
      {/* 1. TOP RESULT HERO HEADER */}
      <div className="result-hero-banner">
        <div className="result-hero-left">
          <div className="result-trophy-badge">
            <Trophy size={28} />
          </div>
          <div>
            <div className="result-pill-row">
              <span className="badge badge-lime">Instant Evaluation Engine</span>
              <span className="badge badge-lavender">Verified Marking Scheme</span>
            </div>
            <h1 className="result-hero-title">{result.testTitle}</h1>
            <p className="result-hero-meta">
              Submitted on {new Date(result.submittedAt).toLocaleDateString()} • {result.courseId}
            </p>
          </div>
        </div>

        <div className="result-hero-actions">
          <button className="pill-btn pill-btn-white" onClick={handlePrintReport}>
            <Download size={16} />
            <span>Download Scorecard PDF</span>
          </button>
          <button
            className="pill-btn pill-btn-lime"
            onClick={() => onNavigate("test-builder")}
          >
            <span>Take Another Test</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 2. THREE HERO SCORE CARDS (Matching Section 4 of Roadmap Exactly) */}
      <div className="instant-score-cards-row">
        {/* Score Card 1: Main Score */}
        <div className="instant-metric-card metric-score-hero">
          <div className="metric-header-lbl">Score</div>
          <div className="metric-huge-number">
            {result.score}/{result.totalQuestions}
          </div>
          <div className="metric-sub-highlight">
            <Sparkles size={16} />
            <span>{result.accuracyPercentage}% accuracy score</span>
          </div>
        </div>

        {/* Score Card 2: Correct Answers */}
        <div className="instant-metric-card metric-correct">
          <div className="metric-header-lbl">Correct answers</div>
          <div className="metric-huge-number text-success">
            {result.correctCount}
          </div>
          <div className="metric-sub-text">
            Out of {result.totalQuestions} questions
          </div>
        </div>

        {/* Score Card 3: Incorrect */}
        <div className="instant-metric-card metric-incorrect">
          <div className="metric-header-lbl">Incorrect</div>
          <div className="metric-huge-number text-danger">
            {result.incorrectCount}
          </div>
          <div className="metric-sub-text text-link" onClick={() => setActiveTab("solutions")}>
            Review the solutions &rarr;
          </div>
        </div>

        {/* Score Card 4: Unattempted */}
        <div className="instant-metric-card metric-unattempted">
          <div className="metric-header-lbl">Unattempted</div>
          <div className="metric-huge-number text-muted">
            {result.unattemptedCount}
          </div>
          <div className="metric-sub-text">
            Check time management (~{result.avgTimePerQuestion}s / Q)
          </div>
        </div>
      </div>

      {/* 3. TABS: Overview & Topic Breakdown vs Step-by-Step Solutions */}
      <div className="result-nav-tabs">
        <button
          className={`result-tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Performance Breakdown & Weak Topics
        </button>
        <button
          className={`result-tab-btn ${activeTab === "solutions" ? "active" : ""}`}
          onClick={() => setActiveTab("solutions")}
        >
          Detailed Step-by-Step Solutions ({result.questionsBreakdown?.length || result.totalQuestions})
        </button>
      </div>

      {/* 4. TAB 1: OVERVIEW & TOPIC ACCURACY */}
      {activeTab === "overview" && (
        <div className="result-overview-grid fade-in">
          {/* Topic-Wise Accuracy Section (Matching Section 4 Screenshot) */}
          <div className="result-card topic-accuracy-card">
            <div className="result-card-header">
              <Layers size={20} />
              <h3>Topic-wise Accuracy Breakdown</h3>
            </div>
            <p className="card-hint-text">
              Accuracy across foundational concepts, application problems, and terminology recall.
            </p>

            <div className="topic-bars-list">
              {(result.topicAccuracy || [
                { name: "Concepts", accuracy: 90 },
                { name: "Applications", accuracy: 70 },
                { name: "Terminology", accuracy: 60 }
              ]).map((t, idx) => (
                <div key={idx} className="topic-progress-row">
                  <div className="topic-name-col">
                    <span className="topic-bar-title">{t.name}</span>
                    <span className="topic-bar-pct">{t.accuracy}%</span>
                  </div>
                  <div className="topic-bar-track">
                    <div
                      className={`topic-bar-fill ${t.accuracy >= 80 ? "fill-lime" : t.accuracy >= 65 ? "fill-lavender" : "fill-cream"}`}
                      style={{ width: `${t.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="disclaimer-note">
              Illustrative analysis based on real-time question responses and syllabus mapping.
            </p>
          </div>

          {/* Actionable Improvement Plan & Next Steps */}
          <div className="result-card improvement-plan-card">
            <div className="result-card-header">
              <Sparkles size={20} />
              <h3>Personalized Improvement Plan</h3>
            </div>

            <div className="improvement-items-list">
              {(result.recommendations || []).map((rec, rIdx) => (
                <div key={rIdx} className="improvement-rec-item">
                  <div className="rec-num-badge">0{rIdx + 1}</div>
                  <div className="rec-content">
                    <p className="rec-text">{rec}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="improvement-actions-row">
              <button
                className="pill-btn pill-btn-outline"
                onClick={() => onNavigate("smart-notes")}
              >
                <BookOpen size={16} />
                <span>Open Notes for Weak Topics</span>
              </button>

              <button
                className="pill-btn pill-btn-lavender"
                onClick={() => onNavigate("revision")}
              >
                <RotateCcw size={16} />
                <span>Open Mistake Notebook</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 2: DETAILED STEP-BY-STEP SOLUTION REVIEW */}
      {activeTab === "solutions" && (
        <div className="result-solutions-section fade-in">
          <div className="solutions-header-bar">
            <h3>Question-by-Question Solution Review</h3>
            <span className="solutions-header-sub">
              Click any question to view its detailed step-by-step explanation, NCERT citation, and common misconceptions.
            </span>
          </div>

          <div className="solutions-accordion-list">
            {(result.questionsBreakdown || []).map((item, idx) => {
              const q = item.question;
              const isCorrect = item.isCorrect;
              const isUnattempted = item.isUnattempted;
              const isExpanded = expandedQuestions[idx] !== false; // default open

              return (
                <div
                  key={idx}
                  className={`solution-item-card ${isCorrect ? "card-correct" : isUnattempted ? "card-unattempted" : "card-incorrect"}`}
                >
                  {/* Item Accordion Header */}
                  <div
                    className="solution-item-header"
                    onClick={() => toggleQuestionExpand(idx)}
                  >
                    <div className="item-header-left">
                      <div className="status-icon-pill">
                        {isCorrect ? (
                          <CheckCircle2 size={18} className="text-success" />
                        ) : isUnattempted ? (
                          <HelpCircle size={18} className="text-muted" />
                        ) : (
                          <XCircle size={18} className="text-danger" />
                        )}
                        <span className="item-q-label">Question {idx + 1}</span>
                      </div>
                      <span className="item-topic-tag">{q.topic || "Topic"}</span>
                      <span className="item-time-spent">
                        <Clock size={13} /> {item.timeSpent}s spent
                      </span>
                    </div>

                    <div className="item-header-right">
                      <span className={`badge ${isCorrect ? "badge-lime" : isUnattempted ? "badge-cream" : "badge-lavender"}`}>
                        {isCorrect ? "+4 Marks" : isUnattempted ? "0 Marks" : "-1 Mark"}
                      </span>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="solution-item-body">
                      {/* Question Text */}
                      <p className="solution-q-text">{q.text}</p>

                      {/* User's Choice vs Correct Answer */}
                      <div className="solution-answers-comparison">
                        <div className="ans-box user-box">
                          <span className="ans-label">Your Response:</span>
                          <span className={`ans-val ${isCorrect ? "text-success" : "text-danger"}`}>
                            {isUnattempted ? "Unattempted (Skipped)" : Array.isArray(item.userAnswer) ? item.userAnswer.join(", ") : String(item.userAnswer)}
                          </span>
                        </div>
                        <div className="ans-box correct-box">
                          <span className="ans-label">Correct Answer:</span>
                          <span className="ans-val text-success">
                            {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(", ") : String(q.correctAnswer || q.correctNumericAnswer)}
                          </span>
                        </div>
                      </div>

                      {/* Step-by-Step Explanation */}
                      <div className="solution-explanation-box">
                        <div className="explanation-title">
                          <Sparkles size={16} />
                          <h4>Step-by-Step Explanation & Marking Scheme</h4>
                        </div>
                        <p className="explanation-text">{q.explanation}</p>
                      </div>

                      {/* Misconception Box */}
                      {q.misconception && (
                        <div className="solution-misconception-box">
                          <AlertTriangle size={16} />
                          <div>
                            <strong>Common Student Misconception:</strong>
                            <p>{q.misconception}</p>
                          </div>
                        </div>
                      )}

                      {/* NCERT Reference & Source */}
                      {q.ncertRef && (
                        <div className="solution-ref-line">
                          <BookOpen size={14} />
                          <span>Official Reference: <strong>{q.ncertRef}</strong></span>
                        </div>
                      )}

                      {/* Action buttons inside item */}
                      <div className="solution-item-actions">
                        {!isCorrect && (
                          <button
                            className={`pill-btn pill-btn-sm ${savedMistakes[q.id] ? "pill-btn-outline" : "pill-btn-lavender"}`}
                            onClick={() => handleSaveToMistakes(q, item.userAnswer)}
                            disabled={savedMistakes[q.id]}
                          >
                            <Bookmark size={13} />
                            <span>{savedMistakes[q.id] ? "Saved in Mistake Notebook" : "Save to Mistake Notebook"}</span>
                          </button>
                        )}

                        <button
                          className="pill-btn pill-btn-outline pill-btn-sm"
                          onClick={() => onNavigate("smart-notes")}
                        >
                          <BookOpen size={13} />
                          <span>Review in Smart Notes</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
