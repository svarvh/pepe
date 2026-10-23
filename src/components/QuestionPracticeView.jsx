import React, { useState, useMemo, useEffect } from "react";
import {
  Target,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Video,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Clock,
  Award,
  ChevronRight,
  ChevronDown,
  Layers,
  Compass,
  Stethoscope,
  GraduationCap,
  FileText,
  AlertCircle,
  Check,
  Eye,
  Sliders
} from "lucide-react";
import {
  STUDENT_CATEGORIES,
  getStudentCategoryById,
  getSubjectsForCategory,
  getQuestionsForDrill,
  getTopicVideo
} from "../data/learningCategories";
import { StorageService } from "../services/storage";

export default function QuestionPracticeView({
  initialParams = null,
  onNavigate,
  onReviewTopicNotes
}) {
  // Screen State: 'setup' | 'active' | 'summary'
  const [screenMode, setScreenMode] = useState("setup");

  // =========================================================================
  // SETUP STATE (Matches Hand-Drawn Diagram Hierarchy)
  // 1. Class / Exam
  // 2. Subject / Course
  // 3. Topic / Chapter
  // 4. Subtopic
  // 5. Question Difficulty / Format (Short, Medium, Long)
  // 6. No. of Questions for Practice
  // =========================================================================
  const [selectedClassId, setSelectedClassId] = useState(initialParams?.categoryId || "iit");
  const [selectedSubjectId, setSelectedSubjectId] = useState(initialParams?.subjectId || null);
  const [selectedChapterId, setSelectedChapterId] = useState(initialParams?.chapterId || null);
  const [selectedTopicId, setSelectedTopicId] = useState(initialParams?.topicId || null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(initialParams?.subtopic || "all");
  const [questionFormat, setQuestionFormat] = useState("all"); // 'short' | 'medium' | 'long' | 'all'
  const [questionCount, setQuestionCount] = useState(10); // 5, 10, 15, 20

  // Category & Syllabus hierarchy lookups
  const currentCategory = useMemo(() => {
    return getStudentCategoryById(selectedClassId);
  }, [selectedClassId]);

  const availableSubjects = useMemo(() => {
    return currentCategory?.subjects || [];
  }, [currentCategory]);

  const activeSubject = useMemo(() => {
    if (!availableSubjects.length) return null;
    return availableSubjects.find((s) => s.id === selectedSubjectId) || availableSubjects[0];
  }, [availableSubjects, selectedSubjectId]);

  const availableChapters = useMemo(() => {
    return activeSubject?.chapters || [];
  }, [activeSubject]);

  const activeChapter = useMemo(() => {
    if (!availableChapters.length) return null;
    return availableChapters.find((c) => c.id === selectedChapterId) || availableChapters[0];
  }, [availableChapters, selectedChapterId]);

  const availableTopics = useMemo(() => {
    return activeChapter?.topics || [];
  }, [activeChapter]);

  const activeTopic = useMemo(() => {
    if (!availableTopics.length) return null;
    return availableTopics.find((t) => t.id === selectedTopicId) || availableTopics[0];
  }, [availableTopics, selectedTopicId]);

  const availableSubtopics = useMemo(() => {
    return activeTopic?.subtopics || [];
  }, [activeTopic]);

  // When props change or category changes, sync sensible defaults
  useEffect(() => {
    if (initialParams) {
      if (initialParams.categoryId) setSelectedClassId(initialParams.categoryId);
      if (initialParams.subjectId) setSelectedSubjectId(initialParams.subjectId);
      if (initialParams.chapterId) setSelectedChapterId(initialParams.chapterId);
      if (initialParams.topicId) setSelectedTopicId(initialParams.topicId);
    }
  }, [initialParams]);

  // Check if active topic has an educational solution video
  const topicVideoData = useMemo(() => {
    if (!activeTopic) return null;
    return getTopicVideo(activeTopic.id);
  }, [activeTopic]);

  // =========================================================================
  // ACTIVE PRACTICE STATE
  // =========================================================================
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: userChoice }
  const [submittedQuestions, setSubmittedQuestions] = useState({}); // { [qId]: true }
  const [activeSolutionTab, setActiveSolutionTab] = useState("short"); // 'short' | 'medium' | 'large' | 'video'
  const [subjectiveTextAnswers, setSubjectiveTextAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer while active
  useEffect(() => {
    let timer = null;
    if (screenMode === "active") {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [screenMode]);

  // Handle Start Practice (पेपर शुरू करें)
  const handleStartPractice = () => {
    // 1. Gather curated questions from question bank
    const drillQuestions = getQuestionsForDrill({
      categoryId: selectedClassId,
      subjectId: activeSubject?.id,
      topicId: activeTopic?.id,
      subtopic: selectedSubtopic !== "all" ? selectedSubtopic : null,
      lengthType: questionFormat !== "all" ? questionFormat : null,
      count: questionCount
    });

    // 2. Also incorporate published faculty questions if available
    const publishedFacultyQs = StorageService.getPublishedFacultyQuestions({
      subjectId: activeSubject?.id
    });

    // Combine and shuffle slightly
    const combined = [...drillQuestions];
    publishedFacultyQs.forEach((fq) => {
      if (!combined.some((q) => q.id === fq.id)) {
        combined.push({
          id: fq.id,
          subjectId: fq.subjectId || activeSubject?.id,
          topicId: activeTopic?.id,
          question: fq.questionText || fq.question,
          options: fq.options || [
            { id: "A", text: "Option A" },
            { id: "B", text: "Option B" },
            { id: "C", text: "Option C" },
            { id: "D", text: "Option D" }
          ],
          correctAnswer: fq.correctAnswer || "A",
          explanation: fq.explanation || "Faculty approved model explanation.",
          marks: fq.marks || 4,
          type: fq.type || "mcq",
          source: "Faculty Approved"
        });
      }
    });

    const finalSet = combined.slice(0, questionCount);
    setQuestions(finalSet.length > 0 ? finalSet : drillQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedQuestions({});
    setSubjectiveTextAnswers({});
    setActiveSolutionTab("short");
    setElapsedSeconds(0);
    setStartTime(Date.now());
    setScreenMode("active");
  };

  const currentQ = questions[currentIndex] || null;
  const isCurrentSubmitted = currentQ && submittedQuestions[currentQ.id];
  const currentUserChoice = currentQ ? userAnswers[currentQ.id] : null;

  // Check correctness
  const isCurrentCorrect = useMemo(() => {
    if (!currentQ || !currentUserChoice) return false;
    if (currentQ.type === "long" || currentQ.type === "case_based") {
      return true; // Subjective self-assessment
    }
    return currentUserChoice === currentQ.correctAnswer;
  }, [currentQ, currentUserChoice]);

  // Handle select option
  const handleSelectOption = (optionId) => {
    if (isCurrentSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  // Handle Submit Answer for current question
  const handleSubmitAnswer = () => {
    if (!currentQ) return;
    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: true
    }));
  };

  // Next or Finish
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setActiveSolutionTab("short");
    } else {
      handleFinishSession();
    }
  };

  // Finish practice session
  const handleFinishSession = () => {
    // Calculate final metrics
    let correctCount = 0;
    let attemptedCount = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        attemptedCount += 1;
        if (ans === q.correctAnswer || q.type === "long") {
          correctCount += 1;
        }
      }
    });

    // Save session to StorageService
    StorageService.savePracticeSession({
      subjectId: activeSubject?.id,
      subjectName: activeSubject?.name,
      chapter: activeChapter?.title,
      topic: activeTopic?.title,
      totalQuestions: questions.length,
      correctCount,
      accuracy: Math.round((correctCount / questions.length) * 100) || 0,
      timeSpentMinutes: Math.max(1, Math.round(elapsedSeconds / 60))
    });

    setScreenMode("summary");
  };

  // Format MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  // =========================================================================
  // VIEW 1: SETUP SCREEN (Matches Hand-Drawn Diagram Exactly)
  // =========================================================================
  if (screenMode === "setup") {
    return (
      <div className="question-practice-setup fade-in">
        {/* Header matching diagram */}
        <div className="qp-setup-header">
          <div className="qp-badge-row">
            <span className="platform-tagline-badge">
              <Target size={14} className="badge-icon" /> Practice Platform
            </span>
            <span className="platform-motto">We make you practice</span>
          </div>
          <h1 className="qp-title">Topic Question Practice</h1>
          <p className="qp-subtitle">
            Configure your practice drill step-by-step. Select your class, subject, topic, and difficulty to begin.
          </p>
        </div>

        {/* Guided Step-by-Step Form Container */}
        <div className="qp-card-form">
          {/* Step 1: Class or Exam */}
          <div className="qp-form-row">
            <div className="qp-step-badge">1</div>
            <div className="qp-field-block">
              <label className="qp-field-label">
                Class or Exam <span className="req-star">*</span>
              </label>
              <div className="qp-class-pills-grid">
                {STUDENT_CATEGORIES.map((cat) => {
                  const isSelected = selectedClassId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      id={`setup-class-${cat.id}`}
                      className={`qp-class-pill ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        setSelectedClassId(cat.id);
                        setSelectedSubjectId(null);
                        setSelectedChapterId(null);
                        setSelectedTopicId(null);
                        setSelectedSubtopic("all");
                      }}
                    >
                      <span className="qp-class-name">{cat.name}</span>
                      <span className="qp-class-sub">{cat.badge}</span>
                      {isSelected && <Check size={14} className="qp-pill-check" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Subject */}
          <div className="qp-form-row">
            <div className="qp-step-badge">2</div>
            <div className="qp-field-block">
              <label className="qp-field-label">
                Subject / Course <span className="req-star">*</span>
              </label>
              <select
                id="setup-subject-select"
                className="clean-select qp-select-input"
                value={activeSubject?.id || ""}
                onChange={(e) => {
                  setSelectedSubjectId(e.target.value);
                  setSelectedChapterId(null);
                  setSelectedTopicId(null);
                  setSelectedSubtopic("all");
                }}
              >
                {availableSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Chapter / Topic */}
          <div className="qp-form-row">
            <div className="qp-step-badge">3</div>
            <div className="qp-field-block">
              <label className="qp-field-label">
                Topic & Chapter <span className="req-star">*</span>
              </label>
              <div className="qp-two-col-select">
                <div>
                  <span className="qp-sublabel">Chapter:</span>
                  <select
                    id="setup-chapter-select"
                    className="clean-select qp-select-input"
                    value={activeChapter?.id || ""}
                    onChange={(e) => {
                      setSelectedChapterId(e.target.value);
                      setSelectedTopicId(null);
                      setSelectedSubtopic("all");
                    }}
                  >
                    {availableChapters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="qp-sublabel">Topic:</span>
                  <select
                    id="setup-topic-select"
                    className="clean-select qp-select-input highlight-select"
                    value={activeTopic?.id || ""}
                    onChange={(e) => {
                      setSelectedTopicId(e.target.value);
                      setSelectedSubtopic("all");
                    }}
                  >
                    {availableTopics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Subtopic */}
          {availableSubtopics.length > 0 && (
            <div className="qp-form-row">
              <div className="qp-step-badge">4</div>
              <div className="qp-field-block">
                <label className="qp-field-label">Subtopic (Optional Focus)</label>
                <select
                  id="setup-subtopic-select"
                  className="clean-select qp-select-input"
                  value={selectedSubtopic}
                  onChange={(e) => setSelectedSubtopic(e.target.value)}
                >
                  <option value="all">All Subtopics in this Topic</option>
                  {availableSubtopics.map((st, i) => (
                    <option key={i} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 5: Question Difficulty / Word Format */}
          <div className="qp-form-row">
            <div className="qp-step-badge">5</div>
            <div className="qp-field-block">
              <label className="qp-field-label">
                Question Format & Difficulty <span className="req-star">*</span>
              </label>
              <div className="qp-format-buttons-row">
                <button
                  type="button"
                  id="format-short-btn"
                  className={`format-option-card ${questionFormat === "short" ? "selected" : ""}`}
                  onClick={() => setQuestionFormat("short")}
                >
                  <div className="format-card-title">Short Questions</div>
                  <div className="format-card-desc">Quick MCQs, 1-2 marks, direct recall & formulas</div>
                </button>

                <button
                  type="button"
                  id="format-medium-btn"
                  className={`format-option-card ${questionFormat === "medium" ? "selected" : ""}`}
                  onClick={() => setQuestionFormat("medium")}
                >
                  <div className="format-card-title">Medium Questions</div>
                  <div className="format-card-desc">Assertion-reason & numerical problem solving</div>
                </button>

                <button
                  type="button"
                  id="format-long-btn"
                  className={`format-option-card ${questionFormat === "long" ? "selected" : ""}`}
                  onClick={() => setQuestionFormat("long")}
                >
                  <div className="format-card-title">Long Questions</div>
                  <div className="format-card-desc">Detailed multi-step case studies & derivations</div>
                </button>

                <button
                  type="button"
                  id="format-all-btn"
                  className={`format-option-card ${questionFormat === "all" ? "selected" : ""}`}
                  onClick={() => setQuestionFormat("all")}
                >
                  <div className="format-card-title">Mixed Exam Pattern</div>
                  <div className="format-card-desc">Balanced combination of short, medium & long</div>
                </button>
              </div>
            </div>
          </div>

          {/* Step 6: No. of Questions for Practice */}
          <div className="qp-form-row">
            <div className="qp-step-badge">6</div>
            <div className="qp-field-block">
              <label className="qp-field-label">
                No. of Questions for Practice <span className="req-star">*</span>
              </label>
              <div className="count-chips-row">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    id={`count-chip-${num}`}
                    className={`count-chip ${questionCount === num ? "selected" : ""}`}
                    onClick={() => setQuestionCount(num)}
                  >
                    <span>{num} Questions</span>
                    <span className="count-est-time">~{num * 2} mins</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button: Start Practice / पेपर शुरू करें */}
          <div className="qp-submit-row">
            <button
              id="start-practice-cta-btn"
              type="button"
              className="pill-btn pill-btn-primary qp-start-action-btn"
              onClick={handleStartPractice}
            >
              <Target size={22} />
              <span className="cta-main-text">Start Practice / पेपर शुरू करें</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE PRACTICE MODE
  // =========================================================================
  if (screenMode === "active" && currentQ) {
    const isSubjective = currentQ.type === "long" || currentQ.type === "case_based";
    const hasVideoSolution = Boolean(topicVideoData);

    return (
      <div className="active-practice-container fade-in">
        {/* Top Sticky Status Bar */}
        <div className="practice-top-bar">
          <div className="practice-breadcrumb-col">
            <span className="practice-cat-crumb">
              {currentCategory.name} • {activeSubject?.name}
            </span>
            <span className="practice-topic-crumb">{activeTopic?.title}</span>
          </div>

          <div className="practice-tracker-controls">
            <div className="practice-timer-pill">
              <Clock size={16} />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
            <div className="practice-progress-pill">
              <span>
                Question <strong>{currentIndex + 1}</strong> of <strong>{questions.length}</strong>
              </span>
            </div>
            <button
              className="exit-practice-btn"
              onClick={() => {
                if (window.confirm("Exit practice session? Your current progress will be ended.")) {
                  setScreenMode("setup");
                }
              }}
            >
              Exit
            </button>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="practice-progress-track">
          <div
            className="practice-progress-fill"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question & Solution Layout */}
        <div className="practice-question-layout">
          {/* Main Question Card */}
          <div className="practice-card question-box-card">
            <div className="q-badge-row">
              <span className="q-num-badge">Q{currentIndex + 1}</span>
              <span className="q-marks-badge">{currentQ.marks || 4} Marks</span>
              {currentQ.source && <span className="q-source-badge">{currentQ.source}</span>}
              {currentQ.ncertRef && <span className="q-ncert-badge">{currentQ.ncertRef}</span>}
            </div>

            {/* Question Text */}
            <div className="question-text-content">
              <p>{currentQ.question}</p>
            </div>

            {/* Options (MCQ) or Subjective Box */}
            {!isSubjective ? (
              <div className="options-selection-grid">
                {currentQ.options &&
                  currentQ.options.map((opt) => {
                    const isSelected = currentUserChoice === opt.id;
                    const isCorrectAnswer = opt.id === currentQ.correctAnswer;

                    let optionStateClass = "";
                    if (isCurrentSubmitted) {
                      if (isCorrectAnswer) {
                        optionStateClass = "option-state-correct";
                      } else if (isSelected && !isCorrectAnswer) {
                        optionStateClass = "option-state-wrong";
                      }
                    } else if (isSelected) {
                      optionStateClass = "option-state-selected";
                    }

                    return (
                      <button
                        key={opt.id}
                        id={`option-${opt.id}`}
                        type="button"
                        className={`option-choice-card ${optionStateClass}`}
                        onClick={() => handleSelectOption(opt.id)}
                        disabled={isCurrentSubmitted}
                      >
                        <div className="option-letter-badge">{opt.id}</div>
                        <div className="option-text-body">{opt.text}</div>
                        {isCurrentSubmitted && isCorrectAnswer && (
                          <CheckCircle2 size={20} className="status-icon-correct" />
                        )}
                        {isCurrentSubmitted && isSelected && !isCorrectAnswer && (
                          <XCircle size={20} className="status-icon-wrong" />
                        )}
                      </button>
                    );
                  })}
              </div>
            ) : (
              /* Long / Subjective Question Answer Field */
              <div className="subjective-input-area">
                <label className="subjective-label">Type your explanation / derivation steps:</label>
                <textarea
                  id="subjective-answer-input"
                  className="subjective-textarea"
                  rows={4}
                  placeholder="Outline your formula, reasoning steps, or biological explanation here..."
                  value={subjectiveTextAnswers[currentQ.id] || ""}
                  onChange={(e) =>
                    setSubjectiveTextAnswers({ ...subjectiveTextAnswers, [currentQ.id]: e.target.value })
                  }
                  disabled={isCurrentSubmitted}
                />
              </div>
            )}

            {/* Submit / Next Action Bar */}
            <div className="q-action-bar">
              {!isCurrentSubmitted ? (
                <button
                  id="submit-answer-btn"
                  type="button"
                  className="pill-btn pill-btn-primary submit-ans-btn"
                  onClick={handleSubmitAnswer}
                  disabled={!isSubjective && !currentUserChoice}
                >
                  <Check size={18} />
                  <span>Submit Answer</span>
                </button>
              ) : (
                <div className="after-submit-row">
                  <div className="submission-result-tag">
                    {isCurrentCorrect ? (
                      <span className="result-correct-tag">
                        <CheckCircle2 size={18} /> Correct Answer! (+{currentQ.marks || 4} Marks)
                      </span>
                    ) : (
                      <span className="result-wrong-tag">
                        <XCircle size={18} /> Incorrect. Review the AI Solution below.
                      </span>
                    )}
                  </div>

                  <button
                    id="next-question-btn"
                    type="button"
                    className="pill-btn pill-btn-primary next-q-btn"
                    onClick={handleNextQuestion}
                  >
                    <span>{currentIndex < questions.length - 1 ? "Next Question" : "Finish Practice"}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Solution with AI (Matches Hand-Drawn Diagram: Short | Medium | Large | Video) */}
          {isCurrentSubmitted && (
            <div className="solution-ai-card fade-in">
              <div className="solution-header-bar">
                <div className="solution-title-col">
                  <div className="ai-sol-badge">
                    <Sparkles size={16} /> Solution with AI
                  </div>
                  <span className="ai-sol-subtitle">Step-by-step conceptual verification</span>
                </div>

                {/* 4 Solution Formats matching sketch */}
                <div className="solution-tabs-group" role="tablist">
                  <button
                    id="sol-tab-short"
                    role="tab"
                    aria-selected={activeSolutionTab === "short"}
                    className={`sol-tab-btn ${activeSolutionTab === "short" ? "active" : ""}`}
                    onClick={() => setActiveSolutionTab("short")}
                  >
                    Short
                  </button>

                  <button
                    id="sol-tab-medium"
                    role="tab"
                    aria-selected={activeSolutionTab === "medium"}
                    className={`sol-tab-btn ${activeSolutionTab === "medium" ? "active" : ""}`}
                    onClick={() => setActiveSolutionTab("medium")}
                  >
                    Medium
                  </button>

                  <button
                    id="sol-tab-large"
                    role="tab"
                    aria-selected={activeSolutionTab === "large"}
                    className={`sol-tab-btn ${activeSolutionTab === "large" ? "active" : ""}`}
                    onClick={() => setActiveSolutionTab("large")}
                  >
                    Large (Detailed)
                  </button>

                  {/* Video solution tab: ONLY shown if a video solution actually exists */}
                  {hasVideoSolution && (
                    <button
                      id="sol-tab-video"
                      role="tab"
                      aria-selected={activeSolutionTab === "video"}
                      className={`sol-tab-btn ${activeSolutionTab === "video" ? "active" : ""}`}
                      onClick={() => setActiveSolutionTab("video")}
                    >
                      <Video size={14} />
                      <span>Video</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Content 1: Short Solution */}
              {activeSolutionTab === "short" && (
                <div className="solution-tab-pane fade-in">
                  <div className="sol-pane-header">
                    <strong>Correct Option: {currentQ.correctAnswer}</strong>
                  </div>
                  <p className="sol-short-text">
                    {currentQ.shortExplanation ||
                      currentQ.explanation.split(". ")[0] +
                        `. Correct key is option ${currentQ.correctAnswer}.`}
                  </p>
                </div>
              )}

              {/* Tab Content 2: Medium Solution */}
              {activeSolutionTab === "medium" && (
                <div className="solution-tab-pane fade-in">
                  <div className="sol-pane-header">
                    <strong>Core Conceptual Reasoning & Mechanism</strong>
                  </div>
                  <p className="sol-medium-text">{currentQ.explanation}</p>
                  {currentQ.misconception && (
                    <div className="misconception-box">
                      <span className="misc-label">Common Student Error:</span>
                      <p className="misc-text">{currentQ.misconception}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content 3: Large / Detailed Solution */}
              {activeSolutionTab === "large" && (
                <div className="solution-tab-pane fade-in">
                  <div className="sol-pane-header">
                    <strong>Comprehensive Algebraic Derivation & Marking Scheme</strong>
                  </div>
                  <div className="sol-large-text">
                    <p style={{ marginBottom: 12 }}>{currentQ.explanation}</p>

                    <div className="derivation-step-box">
                      <h5 style={{ fontWeight: 700, color: "#065f46", marginBottom: 6 }}>
                        Step-by-Step Breakdown:
                      </h5>
                      <ol style={{ paddingLeft: 20, lineHeight: 1.8 }}>
                        <li>Identify given parameters from question prompt.</li>
                        <li>Apply fundamental governing law and algebraic equation.</li>
                        <li>Substitute standard units and compute final quantitative value.</li>
                        <li>Compare with options A, B, C, D to verify option {currentQ.correctAnswer}.</li>
                      </ol>
                    </div>

                    {currentQ.ncertRef && (
                      <div className="ncert-cite-row">
                        <span>Curriculum Reference: <strong>{currentQ.ncertRef}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Content 4: Video Solution (if exists) */}
              {activeSolutionTab === "video" && hasVideoSolution && (
                <div className="solution-tab-pane fade-in">
                  <div className="sol-video-player-box">
                    <div className="sol-video-thumb">
                      <Video size={36} color="#ffffff" />
                      <span className="sol-vid-title">{topicVideoData.title} (Solution Walkthrough)</span>
                      <span className="sol-vid-duration">{topicVideoData.duration || "12:40"}</span>
                    </div>
                    <p className="sol-vid-caption">
                      Watch faculty video walkthrough demonstrating the conceptual step-by-step breakdown.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: PRACTICE SESSION SUMMARY & RESULTS
  // =========================================================================
  if (screenMode === "summary") {
    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer || q.type === "long") {
        correctCount += 1;
      }
    });

    const totalQuestions = questions.length;
    const accuracy = Math.round((correctCount / totalQuestions) * 100) || 0;
    const incorrectCount = totalQuestions - correctCount;

    return (
      <div className="practice-summary-view fade-in">
        <div className="summary-card-main">
          {/* Top celebratory header */}
          <div className="summary-hero">
            <div className="summary-trophy-badge">
              <Award size={40} color="#059669" />
            </div>
            <h1 className="summary-title">Practice Session Complete!</h1>
            <p className="summary-sub">
              Topic: <strong>{activeTopic?.title}</strong> ({activeSubject?.name})
            </p>
          </div>

          {/* 3 Metric Tiles */}
          <div className="summary-metrics-grid">
            <div className="metric-tile tile-emerald">
              <span className="metric-val">{accuracy}%</span>
              <span className="metric-lbl">Overall Accuracy</span>
            </div>
            <div className="metric-tile tile-green">
              <span className="metric-val">{correctCount}</span>
              <span className="metric-lbl">Correct Answers</span>
            </div>
            <div className="metric-tile tile-amber">
              <span className="metric-val">{incorrectCount}</span>
              <span className="metric-lbl">Need Review</span>
            </div>
          </div>

          {/* Time spent */}
          <div className="summary-time-bar">
            <Clock size={16} />
            <span>Time Taken: {formatTime(elapsedSeconds)}</span>
          </div>

          {/* Action Buttons specifically requested in prompt:
              - Practise the same topic again
              - Review the topic before trying again
          */}
          <div className="summary-actions-cluster">
            <button
              id="practise-again-btn"
              type="button"
              className="pill-btn pill-btn-primary summary-action-btn"
              onClick={handleStartPractice}
            >
              <RotateCcw size={18} />
              <span>Practise Same Topic Again</span>
            </button>

            <button
              id="review-topic-notes-btn"
              type="button"
              className="pill-btn pill-btn-outline summary-action-btn"
              onClick={() => {
                if (onReviewTopicNotes) {
                  onReviewTopicNotes({
                    categoryId: selectedClassId,
                    subjectId: activeSubject?.id,
                    chapterId: activeChapter?.id,
                    topicId: activeTopic?.id
                  });
                } else if (onNavigate) {
                  onNavigate("topic-reading");
                }
              }}
            >
              <BookOpen size={18} />
              <span>Review Topic Notes Before Trying Again</span>
            </button>

            <button
              type="button"
              className="pill-btn pill-btn-ghost"
              onClick={() => setScreenMode("setup")}
            >
              Configure Another Topic
            </button>
          </div>

          {/* Question-by-Question Review List */}
          <div className="summary-questions-review">
            <h3 className="review-section-title">Question Breakdown & Solutions</h3>
            <div className="review-list-items">
              {questions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer || q.type === "long";
                return (
                  <div key={q.id} className="review-q-item">
                    <div className="review-q-header">
                      <div className="review-q-num">Q{idx + 1}</div>
                      <div className="review-q-status">
                        {isCorrect ? (
                          <span className="badge-correct">
                            <CheckCircle2 size={14} /> Correct
                          </span>
                        ) : (
                          <span className="badge-incorrect">
                            <XCircle size={14} /> Incorrect (You chose {userAns || "None"}, Correct: {q.correctAnswer})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="review-q-text">{q.question}</div>
                    <div className="review-sol-box">
                      <strong>AI Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
