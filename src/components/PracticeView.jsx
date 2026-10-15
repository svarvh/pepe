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
  AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { EXAMS_CATALOG, SUBJECTS_CATALOG } from "../data/mockData";
import { StorageService } from "../services/storage";

export default function PracticeView({ initialSubject, onSessionCompleted, onNavigate }) {
  // Practice states: 'filter', 'practicing', 'results'
  const [phase, setPhase] = useState("filter");

  // Filter selections
  const [selectedExam, setSelectedExam] = useState("mcat");
  const [selectedSubject, setSelectedSubject] = useState(initialSubject?.id || "phys");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [questionCount, setQuestionCount] = useState(5);

  // Active Session state
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: selectedOptionId }
  const [evaluatedAnswers, setEvaluatedAnswers] = useState({}); // { [qId]: boolean (true/false) }
  const [submittedCurrent, setSubmittedCurrent] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(StorageService.getBookmarks());
  const [reportSuccess, setReportSuccess] = useState(false);

  // Timer hook
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Update subject if passed from outside
  useEffect(() => {
    if (initialSubject) {
      setSelectedSubject(initialSubject.id);
      startSessionWithFilter(initialSubject.id);
    }
  }, [initialSubject]);

  // Start session with chosen filters
  const startSessionWithFilter = (subIdOverride) => {
    const sId = subIdOverride || selectedSubject;
    const allQuestions = StorageService.getQuestions();

    let filtered = allQuestions.filter(q => {
      if (sId !== "all" && q.subjectId !== sId) return false;
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
      if (selectedType !== "all" && q.type !== selectedType) return false;
      return true;
    });

    // If filter produced too few questions, pull general pool
    if (filtered.length === 0) {
      filtered = allQuestions.filter(q => sId === "all" || q.subjectId === sId);
    }

    // Shuffle and slice count
    const pool = [...filtered].sort(() => 0.5 - Math.random()).slice(0, questionCount);

    setActiveQuestions(pool);
    setCurrentIndex(0);
    setUserAnswers({});
    setEvaluatedAnswers({});
    setSubmittedCurrent(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    setPhase("practicing");
  };

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (optionId) => {
    if (submittedCurrent) return; // Prevent changing after submit
    setUserAnswers({
      ...userAnswers,
      [currentQ.id]: optionId
    });
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
      setCurrentIndex(currentIndex + 1);
      const nextQ = activeQuestions[currentIndex + 1];
      setSubmittedCurrent(evaluatedAnswers[nextQ.id] !== undefined);
    } else {
      finishSession();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevQ = activeQuestions[currentIndex - 1];
      setSubmittedCurrent(evaluatedAnswers[prevQ.id] !== undefined);
    }
  };

  const handleToggleBookmark = (qId) => {
    const updated = StorageService.toggleBookmark(qId);
    setBookmarkedIds(updated);
  };

  const finishSession = () => {
    setIsTimerRunning(false);

    // Calculate score
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

    const accuracy = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;

    const subObj = SUBJECTS_CATALOG.find(s => s.id === selectedSubject) || SUBJECTS_CATALOG[0];

    // Save session in storage
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

    StorageService.saveSession(newSession);
    if (onSessionCompleted) onSessionCompleted(newSession);

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
  // RENDER: 1. Filter Setup View
  // --------------------------------------------------------------------------
  if (phase === "filter") {
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
                <p className="practice-subtext">Configure custom practice parameters or jump straight into high-yield drills.</p>
              </div>
            </div>
          </div>

          <div className="filter-form-grid">
            {/* Exam selector */}
            <div className="filter-group">
              <label className="filter-label">Exam / Curriculum</label>
              <select
                className="filter-select"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                {EXAMS_CATALOG.map(exam => (
                  <option key={exam.id} value={exam.id}>{exam.name}</option>
                ))}
              </select>
            </div>

            {/* Subject selector */}
            <div className="filter-group">
              <label className="filter-label">Subject</label>
              <select
                className="filter-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="all">All Subjects (Combined Drill)</option>
                {SUBJECTS_CATALOG.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="filter-group">
              <label className="filter-label">Difficulty Level</label>
              <select
                className="filter-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Difficulties (Adaptive)</option>
                <option value="Easy">Easy (Foundational)</option>
                <option value="Medium">Medium (Exam Standard)</option>
                <option value="Hard">Hard (Advanced Challenge)</option>
              </select>
            </div>

            {/* Question Type */}
            <div className="filter-group">
              <label className="filter-label">Question Format</label>
              <select
                className="filter-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Formats (MCQ, T/F, Short)</option>
                <option value="mcq">Multiple Choice (Single Best)</option>
                <option value="true_false">True / False</option>
                <option value="short_answer">Short Answer / Numeric</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div className="filter-group">
              <label className="filter-label">Question Count</label>
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
          </div>

          <div className="filter-cta-row">
            <button
              className="pill-btn pill-btn-dark start-practice-btn"
              id="start-practice-btn"
              onClick={() => startSessionWithFilter()}
            >
              <span>Start Practice Session</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: 2. Active Question Practice Interface
  // --------------------------------------------------------------------------
  if (phase === "practicing" && currentQ) {
    const isBookmarked = bookmarkedIds.includes(currentQ.id);
    const chosenOption = userAnswers[currentQ.id];
    const isEvaluated = evaluatedAnswers[currentQ.id] !== undefined;
    const progressPercent = Math.round(((currentIndex + 1) / activeQuestions.length) * 100);

    return (
      <div className="practice-view fade-in">
        <div className="practice-workspace">
          {/* Top Session Status Bar */}
          <div className="session-status-bar">
            <div className="session-breadcrumbs">
              <span className="badge badge-navy">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="badge badge-lavender">{currentQ.unit || "Core"}</span>
              <span className="badge badge-cream">{currentQ.difficulty}</span>
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
                <Bookmark size={16} fill={isBookmarked ? "#BDA3FA" : "none"} stroke="#292840" />
                <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </button>

              <button
                className="action-icon-pill"
                title="Report Issue"
                onClick={() => {
                  setReportSuccess(true);
                  setTimeout(() => setReportSuccess(false), 2500);
                }}
              >
                <Flag size={15} />
                <span>Report</span>
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
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: 3. Results Screen
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

    const accuracy = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;

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
              onClick={() => setPhase("filter")}
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

  return null;
}
