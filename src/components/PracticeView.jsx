import React, { useState, useEffect } from "react";
import {
  Bookmark,
  Flag,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Trophy,
  Filter,
  Check,
  Award,
  AlertCircle,
  SlidersHorizontal,
  RefreshCw,
  Target
} from "lucide-react";
import confetti from "canvas-confetti";
import { EXAMS_CATALOG, SUBJECTS_CATALOG, INITIAL_QUESTIONS } from "../data/mockData";
import { StorageService } from "../services/storage";

export default function PracticeView({ initialSubject, initialQuestions, onSessionCompleted, onNavigate }) {
  // Practice states: 'practicing', 'filter', 'results'
  const [phase, setPhase] = useState("practicing");

  // Filter selections
  const [selectedExam, setSelectedExam] = useState("mcat");
  const [selectedSubject, setSelectedSubject] = useState(initialSubject?.id || "all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [questionCount, setQuestionCount] = useState(5);

  // Active Session state - initialize with default questions so it never renders blank or undefined
  const [activeQuestions, setActiveQuestions] = useState(() => {
    try {
      const stored = StorageService.getQuestions();
      return (stored && stored.length > 0) ? stored.slice(0, 5) : INITIAL_QUESTIONS.slice(0, 5);
    } catch (e) {
      return INITIAL_QUESTIONS.slice(0, 5);
    }
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [evaluatedAnswers, setEvaluatedAnswers] = useState({});
  const [submittedCurrent, setSubmittedCurrent] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Load initial bookmarks safely
  useEffect(() => {
    try {
      setBookmarkedIds(StorageService.getBookmarks() || []);
    } catch (e) {
      setBookmarkedIds([]);
    }
  }, []);

  // Timer hook
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && phase === "practicing") {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, phase]);

  // Load questions on mount or when initialSubject/initialQuestions changes
  useEffect(() => {
    if (initialQuestions && Array.isArray(initialQuestions) && initialQuestions.length > 0) {
      loadCustomQuestionPool(initialQuestions);
    } else if (initialSubject) {
      const sId = typeof initialSubject === "object" ? initialSubject.id : initialSubject;
      setSelectedSubject(sId || "all");
      startSessionWithFilter(sId);
    } else {
      // Default: start practice immediately with high-yield questions
      startSessionWithFilter("all");
    }
  }, [initialSubject, initialQuestions]);

  const loadCustomQuestionPool = (questionsList) => {
    setActiveQuestions(questionsList);
    setCurrentIndex(0);
    setUserAnswers({});
    setEvaluatedAnswers({});
    setSubmittedCurrent(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    setPhase("practicing");
  };

  // Start session with chosen filters - with 100% guarantee that questions exist
  const startSessionWithFilter = (subIdOverride) => {
    const sId = subIdOverride !== undefined ? subIdOverride : selectedSubject;
    let allQuestions = [];
    try {
      allQuestions = StorageService.getQuestions();
    } catch (e) {
      allQuestions = INITIAL_QUESTIONS;
    }
    if (!allQuestions || allQuestions.length === 0) {
      allQuestions = INITIAL_QUESTIONS;
    }

    let filtered = allQuestions.filter(q => {
      if (sId && sId !== "all" && q.subjectId !== sId) return false;
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
      if (selectedType !== "all" && q.type !== selectedType) return false;
      return true;
    });

    // If filter produced too few questions, pull general pool
    if (filtered.length === 0) {
      filtered = allQuestions.filter(q => sId === "all" || q.subjectId === sId);
    }
    // If still empty, fall back to entire initial questions bank
    if (filtered.length === 0) {
      filtered = INITIAL_QUESTIONS;
    }

    const count = Math.min(questionCount || 5, filtered.length);
    const pool = [...filtered].sort(() => 0.5 - Math.random()).slice(0, count);

    setActiveQuestions(pool);
    setCurrentIndex(0);
    setUserAnswers({});
    setEvaluatedAnswers({});
    setSubmittedCurrent(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    setPhase("practicing");
    setShowFilterModal(false);
  };

  // Guaranteed safe current question fallback
  const currentQ = (activeQuestions && activeQuestions.length > 0)
    ? activeQuestions[currentIndex] || activeQuestions[0]
    : INITIAL_QUESTIONS[0];

  const handleSelectOption = (optionId) => {
    if (submittedCurrent || !currentQ) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleSubmitAnswer = () => {
    if (!currentQ || submittedCurrent) return;

    const chosen = userAnswers[currentQ.id];
    if (chosen === undefined) {
      alert("Please select an answer option before submitting.");
      return;
    }

    const isCorrect = String(chosen).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
    
    setEvaluatedAnswers(prev => ({
      ...prev,
      [currentQ.id]: isCorrect
    }));
    setSubmittedCurrent(true);
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      const nextQ = activeQuestions[nextIdx];
      setSubmittedCurrent(nextQ && evaluatedAnswers[nextQ.id] !== undefined);
    } else {
      finishSession();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const prevQ = activeQuestions[prevIdx];
      setSubmittedCurrent(prevQ && evaluatedAnswers[prevQ.id] !== undefined);
    }
  };

  const handleToggleBookmark = (qId) => {
    try {
      const updated = StorageService.toggleBookmark(qId);
      setBookmarkedIds(updated);
    } catch (e) {
      // safe fallback
    }
  };

  const finishSession = () => {
    setIsTimerRunning(false);

    let correctCount = 0;
    const missedList = [];
    const topicMap = {};

    activeQuestions.forEach(q => {
      const isCorrect = evaluatedAnswers[q.id];
      if (isCorrect) {
        correctCount++;
      } else {
        missedList.push(q);
      }

      const tName = q.topic || "Core Concept";
      if (!topicMap[tName]) {
        topicMap[tName] = { correct: 0, total: 0 };
      }
      topicMap[tName].total++;
      if (isCorrect) topicMap[tName].correct++;
    });

    const totalCount = activeQuestions.length || 1;
    const accuracy = Math.round((correctCount / totalCount) * 100);
    const subObj = SUBJECTS_CATALOG.find(s => s.id === selectedSubject) || SUBJECTS_CATALOG[0];

    const newSession = {
      id: `sess-${Date.now()}`,
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      title: `${subObj.name} Practice Session`,
      subjectId: subObj.id,
      subjectName: subObj.name,
      totalQuestions: activeQuestions.length,
      correctAnswers: correctCount,
      accuracy,
      timeSpentSeconds: elapsedSeconds,
      topicBreakdown: Object.keys(topicMap).map(k => ({
        topic: k,
        correct: topicMap[k].correct,
        total: topicMap[k].total
      })),
      missedQuestionIds: missedList.map(q => q.id)
    };

    try {
      StorageService.saveSession(newSession);
      if (onSessionCompleted) onSessionCompleted(newSession);
    } catch (e) {
      console.error("Failed saving session:", e);
    }

    if (accuracy >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }

    setPhase("results");
  };

  const handleRetryMissed = () => {
    const missed = activeQuestions.filter(q => !evaluatedAnswers[q.id]);
    if (missed.length === 0) {
      alert("Great job! You answered all questions correctly in this drill.");
      return;
    }
    setActiveQuestions(missed);
    setCurrentIndex(0);
    setUserAnswers({});
    setEvaluatedAnswers({});
    setSubmittedCurrent(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    setPhase("practicing");
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? "0" : ""}${rem}`;
  };

  // --------------------------------------------------------------------------
  // RENDER: Active Question Practice Interface (Default & Primary View)
  // --------------------------------------------------------------------------
  if (phase === "practicing" && currentQ) {
    const isBookmarked = bookmarkedIds.includes(currentQ.id);
    const chosenOption = userAnswers[currentQ.id];
    const totalQCount = Math.max(activeQuestions.length, 1);
    const progressPercent = Math.round(((currentIndex + 1) / totalQCount) * 100);

    return (
      <div className="practice-view fade-in">
        <div className="practice-workspace">
          {/* Top Session Status Bar */}
          <div className="session-status-bar">
            <div className="session-breadcrumbs">
              <span className="badge badge-navy">
                Question {currentIndex + 1} of {totalQCount}
              </span>
              <span className="badge badge-lavender">{currentQ.unit || "Core"}</span>
              <span className="badge badge-cream">{currentQ.difficulty || "Medium"}</span>
              {currentQ.pyqReference && (
                <span className="badge badge-lime">{currentQ.pyqReference}</span>
              )}
            </div>

            <div className="session-actions-top">
              <div className="timer-badge">
                <Clock size={15} />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>

              <button
                className={`action-icon-pill ${isBookmarked ? "bookmarked" : ""}`}
                title="Bookmark Question"
                onClick={() => handleToggleBookmark(currentQ.id)}
              >
                <Bookmark size={16} fill={isBookmarked ? "#10b981" : "none"} stroke="#064e3b" />
                <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </button>

              <button
                className="action-icon-pill"
                title="Filter / Topic Selector"
                onClick={() => setShowFilterModal(true)}
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
              </button>

              <button
                className="finish-btn-subtle"
                onClick={() => {
                  if (confirm("End current practice session and review results?")) {
                    finishSession();
                  }
                }}
              >
                Finish Session
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="practice-progress-bar-track">
            <div
              className="practice-progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {reportSuccess && (
            <div className="report-alert-banner fade-in">
              <Check size={16} /> Question feedback logged for review by content team.
            </div>
          )}

          {/* Main Question Card */}
          <div className="practice-question-card">
            <div className="question-header">
              <h3 className="question-stem-text">{currentQ.text}</h3>
            </div>

            {/* Answer Options */}
            {currentQ.type === "short_answer" ? (
              <div className="short-answer-input-box">
                <label className="input-label">Enter your numeric or short answer:</label>
                <input
                  type="text"
                  className="short-input-field"
                  placeholder="e.g. 0, 42, or answer key"
                  value={chosenOption || ""}
                  disabled={submittedCurrent}
                  onChange={(e) => handleSelectOption(e.target.value)}
                />
              </div>
            ) : (
              <div className="options-list-grid">
                {currentQ.options?.map((opt) => {
                  const isSelected = chosenOption === opt.id;
                  const isCorrect = String(opt.id) === String(currentQ.correctAnswer);

                  let optionClass = "practice-option-item";
                  if (isSelected) optionClass += " option-selected";

                  if (submittedCurrent) {
                    if (isCorrect) {
                      optionClass += " option-correct";
                    } else if (isSelected && !isCorrect) {
                      optionClass += " option-incorrect";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      className={optionClass}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={submittedCurrent}
                    >
                      <div className="option-letter-badge">{opt.id}</div>
                      <div className="option-text-wrap">{opt.text}</div>
                      {submittedCurrent && isCorrect && (
                        <CheckCircle size={18} className="option-feedback-icon correct" />
                      )}
                      {submittedCurrent && isSelected && !isCorrect && (
                        <XCircle size={18} className="option-feedback-icon incorrect" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Action Bar */}
            <div className="practice-card-bottom-actions">
              <div className="nav-buttons-left">
                <button
                  className="nav-arrow-btn"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>
              </div>

              <div className="nav-buttons-right">
                {!submittedCurrent ? (
                  <button
                    className="pill-btn pill-btn-dark submit-answer-btn"
                    id="submit-answer-btn"
                    onClick={handleSubmitAnswer}
                  >
                    <span>Submit Answer</span>
                  </button>
                ) : (
                  <button
                    className="pill-btn pill-btn-lime next-question-btn"
                    id="next-question-btn"
                    onClick={handleNext}
                  >
                    <span>{currentIndex === activeQuestions.length - 1 ? "Complete & View Results" : "Next Question"}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Step-by-Step Explanation Banner (Displayed after submit) */}
            {submittedCurrent && (
              <div className="explanation-drawer fade-in">
                <div className="explanation-header">
                  <Sparkles size={18} className="sparkle-icon" />
                  <h4>Verified Explanation & Solution</h4>
                </div>
                <div className="explanation-body">
                  <p>{currentQ.explanation}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filter Configuration Modal */}
        {showFilterModal && (
          <div className="modal-backdrop fade-in" onClick={() => setShowFilterModal(false)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Configure Practice Drill</h3>
                <button className="modal-close-btn" onClick={() => setShowFilterModal(false)}>×</button>
              </div>

              <div className="modal-body-form">
                <div className="form-group-block">
                  <label className="form-label">Subject</label>
                  <select
                    className="filter-select"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="all">All Subjects (Combined Practice)</option>
                    {SUBJECTS_CATALOG.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-block">
                  <label className="form-label">Difficulty</label>
                  <select
                    className="filter-select"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="form-group-block">
                  <label className="form-label">Question Count</label>
                  <div className="count-pill-selector">
                    {[5, 10, 15, 20].map(cnt => (
                      <button
                        key={cnt}
                        type="button"
                        className={`count-pill ${questionCount === cnt ? "active" : ""}`}
                        onClick={() => setQuestionCount(cnt)}
                      >
                        {cnt} Qs
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-footer-row">
                  <button
                    className="pill-btn pill-btn-white"
                    onClick={() => setShowFilterModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="pill-btn pill-btn-dark"
                    onClick={() => startSessionWithFilter()}
                  >
                    Apply & Start Drill
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: Results Screen
  // --------------------------------------------------------------------------
  if (phase === "results") {
    let correctCount = 0;
    const missedList = [];

    activeQuestions.forEach(q => {
      if (evaluatedAnswers[q.id]) {
        correctCount++;
      } else {
        missedList.push(q);
      }
    });

    const totalCount = activeQuestions.length || 1;
    const accuracy = Math.round((correctCount / totalCount) * 100);

    return (
      <div className="practice-view fade-in">
        <div className="results-card">
          <div className="results-hero">
            <div className="results-trophy-wrap">
              <Trophy size={42} strokeWidth={1.8} className="trophy-icon" />
            </div>
            <h2 className="results-title">Practice Session Completed!</h2>
            <p className="results-subtitle">Your responses have been recorded in your performance analytics.</p>

            <div className="results-metrics-row">
              <div className="metric-box">
                <span className="metric-big-num">{accuracy}%</span>
                <span className="metric-label">Accuracy</span>
              </div>
              <div className="metric-box">
                <span className="metric-big-num">{correctCount} / {activeQuestions.length}</span>
                <span className="metric-label">Correct Answers</span>
              </div>
              <div className="metric-box">
                <span className="metric-big-num">{formatTime(elapsedSeconds)}</span>
                <span className="metric-label">Time Taken</span>
              </div>
            </div>
          </div>

          {/* Missed Questions & Review */}
          <div className="results-breakdown-section">
            <div className="results-subheading-row">
              <h3>Review Questions ({missedList.length} Missed)</h3>
              {missedList.length > 0 && (
                <button
                  className="pill-btn pill-btn-lime retry-btn"
                  onClick={handleRetryMissed}
                >
                  <RotateCcw size={15} />
                  <span>Retry Missed Questions</span>
                </button>
              )}
            </div>

            {missedList.length === 0 ? (
              <div className="perfect-score-banner">
                <CheckCircle size={22} className="perfect-icon" />
                <span>Flawless performance! You answered every question correctly.</span>
              </div>
            ) : (
              <div className="missed-questions-list">
                {missedList.map((q, idx) => (
                  <div key={q.id} className="missed-q-item">
                    <div className="missed-q-top">
                      <span className="badge badge-navy">Q{idx + 1}</span>
                      <span className="missed-q-topic">{q.topic}</span>
                      <span className="badge badge-cream">{q.difficulty}</span>
                    </div>
                    <p className="missed-q-text">{q.text}</p>
                    <div className="missed-q-solution">
                      <strong>Correct Answer: {q.correctAnswer}</strong>
                      <p>{q.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="results-footer-actions">
            <button
              className="pill-btn pill-btn-dark"
              onClick={() => startSessionWithFilter("all")}
            >
              Start Another Practice Drill
            </button>
            <button
              className="pill-btn pill-btn-white"
              onClick={() => onNavigate("dashboard")}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: If somehow state was interrupted, render a clean instant-start drill card
  return (
    <div className="practice-view fade-in">
      <div className="practice-filter-card">
        <div className="filter-card-header">
          <div className="filter-header-left">
            <div className="practice-badge-icon">
              <Target size={24} strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="practice-headline">Question Practice Studio</h2>
              <p className="practice-subtext">Click below to start your personalized practice session.</p>
            </div>
          </div>
        </div>
        <div className="filter-cta-row">
          <button
            className="pill-btn pill-btn-dark start-practice-btn"
            id="start-practice-btn"
            onClick={() => startSessionWithFilter("all")}
          >
            <span>Start Practice Drill Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
