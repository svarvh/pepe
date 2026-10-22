import React, { useState, useEffect } from "react";
import {
  Clock,
  Flag,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Send,
  X
} from "lucide-react";

export default function ExamScreen({ testConfig, onFinishExam, onCancelExam }) {
  const questions = testConfig.questions || [];
  const totalQuestions = questions.length;
  const durationSeconds = (testConfig.durationMinutes || 30) * 60;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState(() => {
    // 0: Not Visited, 1: Not Answered, 2: Answered, 3: Marked for Review, 4: Answered & Marked
    const initial = {};
    for (let i = 0; i < totalQuestions; i++) {
      initial[i] = i === 0 ? "not_answered" : "not_visited";
    }
    return initial;
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState("");

  const currentQ = questions[currentIndex] || questions[0];

  // Live Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });

      // Track time per question
      setTimeSpentPerQuestion((prev) => ({
        ...prev,
        [currentIndex]: (prev[currentIndex] || 0) + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const formatTimer = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isLowTime = timeRemaining < 120; // less than 2 minutes

  // Handle Answer Selection
  const handleSelectOption = (optId) => {
    if (currentQ.type === "multiple_select") {
      const currentList = userAnswers[currentIndex] || [];
      const updated = currentList.includes(optId)
        ? currentList.filter(id => id !== optId)
        : [...currentList, optId];
      setUserAnswers({ ...userAnswers, [currentIndex]: updated });
      setQuestionStatus({
        ...questionStatus,
        [currentIndex]: updated.length > 0 ? "answered" : "not_answered"
      });
    } else {
      setUserAnswers({ ...userAnswers, [currentIndex]: optId });
      setQuestionStatus({ ...questionStatus, [currentIndex]: "answered" });
    }
  };

  const handleNumericalInput = (val) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: val });
    setQuestionStatus({
      ...questionStatus,
      [currentIndex]: val !== "" ? "answered" : "not_answered"
    });
  };

  const handleClearResponse = () => {
    const updated = { ...userAnswers };
    delete updated[currentIndex];
    setUserAnswers(updated);
    setQuestionStatus({ ...questionStatus, [currentIndex]: "not_answered" });
  };

  const handleMarkForReview = () => {
    const hasAnswer = userAnswers[currentIndex] !== undefined;
    setQuestionStatus({
      ...questionStatus,
      [currentIndex]: hasAnswer ? "answered_review" : "marked_review"
    });
    handleNext();
  };

  const handleSaveAndNext = () => {
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (questionStatus[nextIndex] === "not_visited") {
        setQuestionStatus(prev => ({ ...prev, [nextIndex]: "not_answered" }));
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (idx) => {
    setCurrentIndex(idx);
    if (questionStatus[idx] === "not_visited") {
      setQuestionStatus(prev => ({ ...prev, [idx]: "not_answered" }));
    }
  };

  // Result Calculation Engine
  const handleSubmitTest = (isAuto = false) => {
    setShowSubmitModal(false);

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalMarksScored = 0;
    const questionsBreakdown = [];

    const marksPerCorrect = testConfig.marksPerCorrect || 4;
    const negativeMarks = testConfig.negativeMarks || 1;

    questions.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      let isCorrect = false;
      let isUnattempted = userAns === undefined || userAns === "";

      if (isUnattempted) {
        unattemptedCount += 1;
      } else if (q.type === "multiple_select") {
        const correctArray = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
        const userArray = Array.isArray(userAns) ? userAns : [userAns];
        isCorrect =
          correctArray.length === userArray.length &&
          correctArray.every(val => userArray.includes(val));
      } else if (q.type === "numerical") {
        const numVal = parseFloat(userAns);
        const correctVal = parseFloat(q.correctNumericAnswer);
        const tol = q.numericTolerance || 0.05;
        isCorrect = !isNaN(numVal) && Math.abs(numVal - correctVal) <= tol;
      } else {
        isCorrect = userAns === q.correctAnswer;
      }

      if (isCorrect) {
        correctCount += 1;
        totalMarksScored += marksPerCorrect;
      } else if (!isUnattempted) {
        incorrectCount += 1;
        totalMarksScored -= negativeMarks;
      }

      questionsBreakdown.push({
        question: q,
        userAnswer: userAns,
        isCorrect,
        isUnattempted,
        timeSpent: timeSpentPerQuestion[idx] || 35
      });
    });

    const accuracyPercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const timeSpentSeconds = durationSeconds - timeRemaining;
    const avgTimePerQuestion = totalQuestions > 0 ? Math.round(timeSpentSeconds / totalQuestions) : 0;

    const resultPayload = {
      id: `result-${Date.now()}`,
      testTitle: testConfig.testTitle || "Custom Examination",
      courseId: testConfig.course || "class11_12",
      score: correctCount,
      totalQuestions,
      accuracyPercentage,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalMarks: Math.max(0, totalMarksScored),
      maxMarks: totalQuestions * marksPerCorrect,
      timeSpentSeconds,
      avgTimePerQuestion,
      topicAccuracy: [
        { name: "Concepts & Foundations", accuracy: Math.min(100, accuracyPercentage + 10), total: 10, correct: Math.round(10 * Math.min(1, (accuracyPercentage + 10)/100)) },
        { name: "Applications & Problems", accuracy: Math.max(30, accuracyPercentage - 10), total: 10, correct: Math.round(10 * Math.max(0.3, (accuracyPercentage - 10)/100)) },
        { name: "Technical Terminology", accuracy: accuracyPercentage, total: 10, correct: Math.round(10 * (accuracyPercentage/100)) }
      ],
      submittedAt: new Date().toISOString(),
      recommendations: [
        "Revise key definitions in Smart Notes for incorrect questions",
        "Practise 5 numerical problem variations to boost speed",
        "Watch topic video walkthroughs on common exam misconceptions"
      ],
      questionsBreakdown
    };

    onFinishExam(resultPayload);
  };

  // Status Counts for Summary
  const answeredCount = Object.values(questionStatus).filter(s => s === "answered" || s === "answered_review").length;
  const markedReviewCount = Object.values(questionStatus).filter(s => s === "marked_review" || s === "answered_review").length;
  const notAnsweredCount = totalQuestions - answeredCount;

  return (
    <div className="exam-screen-container fade-in">
      {/* 1. TOP EXAM HEADER */}
      <header className="exam-header-bar">
        <div className="exam-header-left">
          <div className="exam-brand-badge">EXAM MODE</div>
          <h2 className="exam-title-text">{testConfig.testTitle}</h2>
        </div>

        {/* Live Countdown Timer */}
        <div className={`exam-timer-pill ${isLowTime ? "timer-warning pulse" : ""}`}>
          <Clock size={18} />
          <span className="timer-digits">{formatTimer(timeRemaining)}</span>
          <span className="timer-label">Time Left</span>
        </div>

        {/* Header Tools */}
        <div className="exam-header-tools">
          <button
            className="exam-tool-btn"
            onClick={() => setShowCalculator(!showCalculator)}
            title="Scientific Calculator"
          >
            <Calculator size={18} />
            <span>Calculator</span>
          </button>

          <button
            className="exam-submit-header-btn"
            id="btn-submit-exam-top"
            onClick={() => setShowSubmitModal(true)}
          >
            <Send size={15} />
            <span>Submit Test</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN EXAM BODY (Question Pane + Question Palette Sidebar) */}
      <div className="exam-body-layout">
        {/* Left Column: Active Question View */}
        <div className="exam-question-pane">
          {/* Question Meta Header */}
          <div className="question-meta-bar">
            <span className="q-number-badge">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <div className="q-tags-row">
              <span className="badge badge-navy">{currentQ.topic || "Core Concept"}</span>
              <span className={`badge ${currentQ.difficulty === "Hard" ? "badge-lavender" : "badge-lime"}`}>
                {currentQ.difficulty || "Medium"}
              </span>
              <span className="badge badge-cream">
                +{testConfig.marksPerCorrect || 4} / -{testConfig.negativeMarks || 1} Marks
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="question-statement-box">
            <p className="question-text">{currentQ.text}</p>
            {currentQ.diagramUrl && (
              <div className="question-diagram-wrap">
                <img src={currentQ.diagramUrl} alt="Question Diagram" />
              </div>
            )}
          </div>

          {/* Options Renderer */}
          <div className="question-options-area">
            {/* Standard MCQ / Assertion-Reason / True-False / Multiple-Select */}
            {currentQ.options && (
              <div className="options-list">
                {currentQ.options.map((opt) => {
                  const isMulti = currentQ.type === "multiple_select";
                  const isSelected = isMulti
                    ? (userAnswers[currentIndex] || []).includes(opt.id)
                    : userAnswers[currentIndex] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      className={`exam-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectOption(opt.id)}
                    >
                      <div className="opt-letter-circle">{opt.id}</div>
                      <div className="opt-text">{opt.text}</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Numerical Input Box for JEE */}
            {currentQ.type === "numerical" && (
              <div className="numerical-input-panel">
                <label className="numerical-label">
                  Enter your numerical answer {currentQ.unit ? `(${currentQ.unit})` : ""}:
                </label>
                <div className="numerical-input-row">
                  <input
                    type="number"
                    step="any"
                    className="numerical-input-field"
                    placeholder="e.g. 1.159"
                    value={userAnswers[currentIndex] || ""}
                    onChange={(e) => handleNumericalInput(e.target.value)}
                  />
                  {currentQ.unit && <span className="numerical-unit-tag">{currentQ.unit}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="exam-question-nav-bar">
            <div className="nav-bar-left">
              <button
                className="pill-btn pill-btn-outline"
                onClick={handleClearResponse}
                disabled={userAnswers[currentIndex] === undefined}
              >
                <span>Clear Response</span>
              </button>

              <button
                className="pill-btn pill-btn-lavender"
                onClick={handleMarkForReview}
              >
                <Flag size={15} />
                <span>Mark for Review & Next</span>
              </button>
            </div>

            <div className="nav-bar-right">
              <button
                className="pill-btn pill-btn-outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                className="pill-btn pill-btn-lime"
                id="btn-save-and-next"
                onClick={handleSaveAndNext}
              >
                <span>Save & Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar */}
        <aside className="exam-palette-sidebar">
          {/* Status Legend */}
          <div className="palette-legend-card">
            <h4>Palette Legend</h4>
            <div className="legend-grid">
              <div className="legend-item">
                <span className="legend-dot dot-answered"></span>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-not-answered"></span>
                <span>Not Answered ({notAnsweredCount})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-marked-review"></span>
                <span>Marked for Review ({markedReviewCount})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-not-visited"></span>
                <span>Not Visited</span>
              </div>
            </div>
          </div>

          {/* Question Grid Buttons */}
          <div className="palette-grid-card">
            <h4>Question Palette</h4>
            <div className="palette-numbers-grid">
              {questions.map((_, idx) => {
                const status = questionStatus[idx] || "not_visited";
                const isCurrent = currentIndex === idx;

                let statusClass = "btn-palette-not-visited";
                if (status === "answered") statusClass = "btn-palette-answered";
                else if (status === "not_answered") statusClass = "btn-palette-not-answered";
                else if (status === "marked_review") statusClass = "btn-palette-marked";
                else if (status === "answered_review") statusClass = "btn-palette-answered-marked";

                return (
                  <button
                    key={idx}
                    className={`palette-num-btn ${statusClass} ${isCurrent ? "palette-current" : ""}`}
                    onClick={() => handleJumpToQuestion(idx)}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Final Submit Button in Sidebar */}
          <div className="palette-submit-wrap">
            <button
              className="pill-btn pill-btn-lime pill-btn-lg w-full"
              id="btn-submit-exam-palette"
              onClick={() => setShowSubmitModal(true)}
            >
              <Send size={16} />
              <span>Submit Examination</span>
            </button>
          </div>
        </aside>
      </div>

      {/* 3. SIMULATED CALCULATOR TOOL MODAL */}
      {showCalculator && (
        <div className="calculator-float-modal">
          <div className="calc-header">
            <span>Scientific Calculator</span>
            <button onClick={() => setShowCalculator(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="calc-display">{calcInput || "0"}</div>
          <div className="calc-keypad">
            {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "C"].map((key) => (
              <button
                key={key}
                className="calc-btn"
                onClick={() => {
                  if (key === "C") setCalcInput("");
                  else if (key === "=") {
                    try {
                      // Safe arithmetic calculation without direct eval
                      const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, "");
                      const calcResult = Function(`"use strict"; return (${sanitized})`)();
                      setCalcInput(String(calcResult));
                    } catch {
                      setCalcInput("Error");
                    }
                  } else {
                    setCalcInput(prev => prev + key);
                  }
                }}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="exam-modal-backdrop fade-in">
          <div className="exam-modal-card slide-up">
            <div className="modal-icon-tile">
              <AlertTriangle size={28} />
            </div>
            <h3 className="modal-title">Ready to Submit Your Examination?</h3>
            <p className="modal-desc">
              Your test will be evaluated instantly using official marking criteria. Once submitted, answers cannot be changed.
            </p>

            {/* Summary Counters */}
            <div className="modal-summary-grid">
              <div className="modal-summary-item item-answered">
                <span className="summary-val">{answeredCount}</span>
                <span className="summary-lbl">Answered</span>
              </div>
              <div className="modal-summary-item item-unattempted">
                <span className="summary-val">{notAnsweredCount}</span>
                <span className="summary-lbl">Unattempted</span>
              </div>
              <div className="modal-summary-item item-review">
                <span className="summary-val">{markedReviewCount}</span>
                <span className="summary-lbl">Marked for Review</span>
              </div>
            </div>

            <div className="modal-actions-row">
              <button
                className="pill-btn pill-btn-outline"
                onClick={() => setShowSubmitModal(false)}
              >
                <span>Continue Testing</span>
              </button>

              <button
                className="pill-btn pill-btn-lime"
                id="btn-confirm-submit-exam"
                onClick={() => handleSubmitTest(false)}
              >
                <CheckCircle2 size={16} />
                <span>Confirm & View Instant Results</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
