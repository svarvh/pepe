import React, { useState } from "react";
import {
  Sliders,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator,
  FileText,
  AlertCircle,
  HelpCircle,
  Bookmark,
  Layers,
  Award,
  Play
} from "lucide-react";
import { StorageService } from "../services/storage";

export default function CustomTestBuilderView({ onLaunchTest, onNavigate }) {
  const activeCourse = StorageService.getActiveCourse();

  // Test Builder State matching Section 3 Module D of roadmap
  const [selectedCourse, setSelectedCourse] = useState(
    activeCourse === "jee" ? "IIT-JEE Main" :
    activeCourse === "ugc_net" ? "UGC-NET" :
    activeCourse === "class9_10" ? "Class 10" : "Class 12"
  );
  const [selectedSubject, setSelectedSubject] = useState("Biology");
  const [testScope, setTestScope] = useState("Topic-wise test");
  const [numQuestions, setNumQuestions] = useState(30);
  const [difficulty, setDifficulty] = useState("Mixed difficulty");
  const [questionFormat, setQuestionFormat] = useState("MCQ + Assertion–Reason");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [includePYQs, setIncludePYQs] = useState(true);
  const [showBlueprint, setShowBlueprint] = useState(true);

  // Available options
  const courseOptions = [
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
    "IIT-JEE Main",
    "IIT-JEE Advanced",
    "UGC-NET"
  ];

  const scopeOptions = [
    "Topic-wise test",
    "Subtopic-wise test",
    "Chapter-wise test",
    "Subject-wise test",
    "Board practice test",
    "Full-length mock test"
  ];

  const questionCountOptions = [10, 30, 50, 100];

  const difficultyOptions = ["Easy", "Medium", "Hard", "Mixed difficulty"];

  const formatOptions = [
    "MCQ + Assertion–Reason",
    "MCQ Only",
    "Numerical + MCQ (JEE Standard)",
    "Comprehensive (MCQ, Assertion-Reason, Match)",
    "Board Descriptive & Rubric Practice"
  ];

  const durationOptions = [
    { label: "15 minutes", value: 15 },
    { label: "30 minutes", value: 30 },
    { label: "45 minutes", value: 45 },
    { label: "60 minutes", value: 60 },
    { label: "Exam-specific duration (180 min)", value: 180 }
  ];

  // Dynamic Blueprint Calculation based on user parameters
  const calculateBlueprint = () => {
    const isJEE = selectedCourse.includes("JEE");
    const isNET = selectedCourse.includes("NET");
    const isBoard = selectedCourse.includes("Class") && testScope.includes("Board");

    let marksPerCorrect = isJEE ? 4 : isNET ? 2 : 1;
    let negativeMarks = isJEE ? 1 : isNET ? 0 : 0.25;
    if (isBoard) {
      negativeMarks = 0;
    }

    const totalMarks = numQuestions * marksPerCorrect;
    const timePerQuestionSeconds = Math.round((durationMinutes * 60) / numQuestions);

    let distribution = [];
    if (questionFormat.includes("Assertion")) {
      const assertionCount = Math.max(2, Math.round(numQuestions * 0.2));
      const mcqCount = numQuestions - assertionCount;
      distribution = [
        { type: "Single-Choice MCQs", count: mcqCount, marks: mcqCount * marksPerCorrect },
        { type: "Assertion-Reason Questions", count: assertionCount, marks: assertionCount * marksPerCorrect }
      ];
    } else if (isJEE && questionFormat.includes("Numerical")) {
      const numCount = Math.round(numQuestions * 0.3);
      const mcqCount = numQuestions - numCount;
      distribution = [
        { type: "Single Correct MCQs", count: mcqCount, marks: mcqCount * 4 },
        { type: "Integer / Numerical Value Questions", count: numCount, marks: numCount * 4 }
      ];
    } else {
      distribution = [
        { type: "Objective Assessment Questions", count: numQuestions, marks: totalMarks }
      ];
    }

    return {
      marksPerCorrect,
      negativeMarks,
      totalMarks,
      timePerQuestionSeconds,
      distribution
    };
  };

  const blueprint = calculateBlueprint();

  // Launch test handler
  const handleLaunch = () => {
    const allQuestions = StorageService.getQuestions();
    // Filter questions matching scope and count
    let pool = [...allQuestions];
    if (difficulty !== "Mixed difficulty") {
      pool = pool.filter(q => q.difficulty === difficulty);
    }
    // Take requested count or default
    const testQuestions = pool.slice(0, numQuestions);

    const testConfig = {
      testTitle: `${selectedCourse}: ${selectedSubject} (${testScope})`,
      course: selectedCourse,
      subject: selectedSubject,
      scope: testScope,
      numQuestions: testQuestions.length,
      difficulty,
      format: questionFormat,
      durationMinutes,
      marksPerCorrect: blueprint.marksPerCorrect,
      negativeMarks: blueprint.negativeMarks,
      totalMarks: testQuestions.length * blueprint.marksPerCorrect,
      questions: testQuestions
    };

    if (onLaunchTest) {
      onLaunchTest(testConfig);
    }
  };

  return (
    <div className="custom-test-builder-view fade-in">
      {/* 1. TOP HEADER */}
      <div className="test-builder-hero-card">
        <div className="builder-hero-left">
          <div className="builder-icon-tile">
            <Sliders size={26} />
          </div>
          <div>
            <div className="builder-pill-row">
              <span className="badge badge-lime">Custom Assessment Studio</span>
              <span className="badge badge-lavender">Instant Result Production</span>
              <span className="badge badge-cream">Official Marking Schemes</span>
            </div>
            <h1 className="builder-title">Custom Test Builder (Module D)</h1>
            <p className="builder-subtitle">
              Design customized assessments tailored to your exact revision needs—from 15-minute quick topic drills to full-length timed mock examinations.
            </p>
          </div>
        </div>
      </div>

      {/* 2. TWO-COLUMN BUILDER: Configuration Controls + Live Blueprint Preview */}
      <div className="test-builder-grid">
        {/* Left Column: Form Controls */}
        <div className="builder-controls-col">
          {/* 1. Course / Examination */}
          <div className="builder-section-card">
            <label className="builder-field-label">1. Course / Examination</label>
            <div className="builder-chips-wrap">
              {courseOptions.map((c) => (
                <button
                  key={c}
                  className={`builder-chip-btn ${selectedCourse === c ? "active" : ""}`}
                  onClick={() => setSelectedCourse(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Subject Selection */}
          <div className="builder-section-card">
            <label className="builder-field-label">2. Subject</label>
            <div className="builder-chips-wrap">
              {["Biology", "Chemistry", "Physics", "Mathematics", "Paper 1 (Research & Teaching)"].map((s) => (
                <button
                  key={s}
                  className={`builder-chip-btn ${selectedSubject === s ? "active" : ""}`}
                  onClick={() => setSelectedSubject(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Test Scope */}
          <div className="builder-section-card">
            <label className="builder-field-label">3. Test Scope</label>
            <div className="builder-chips-wrap">
              {scopeOptions.map((sc) => (
                <button
                  key={sc}
                  className={`builder-chip-btn ${testScope === sc ? "active" : ""}`}
                  onClick={() => setTestScope(sc)}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Number of Questions */}
          <div className="builder-section-card">
            <div className="label-with-badge">
              <label className="builder-field-label">4. Number of Questions</label>
              <span className="badge badge-lime">{numQuestions} Questions</span>
            </div>
            <div className="builder-chips-wrap">
              {questionCountOptions.map((cnt) => (
                <button
                  key={cnt}
                  className={`builder-chip-btn chip-num ${numQuestions === cnt ? "active" : ""}`}
                  onClick={() => setNumQuestions(cnt)}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Difficulty Level */}
          <div className="builder-section-card">
            <label className="builder-field-label">5. Difficulty Level</label>
            <div className="builder-chips-wrap">
              {difficultyOptions.map((diff) => (
                <button
                  key={diff}
                  className={`builder-chip-btn ${difficulty === diff ? "active" : ""}`}
                  onClick={() => setDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Question Format */}
          <div className="builder-section-card">
            <label className="builder-field-label">6. Question Format</label>
            <div className="builder-chips-wrap">
              {formatOptions.map((fmt) => (
                <button
                  key={fmt}
                  className={`builder-chip-btn ${questionFormat === fmt ? "active" : ""}`}
                  onClick={() => setQuestionFormat(fmt)}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* 7. Duration */}
          <div className="builder-section-card">
            <label className="builder-field-label">7. Duration</label>
            <div className="builder-chips-wrap">
              {durationOptions.map((d) => (
                <button
                  key={d.value}
                  className={`builder-chip-btn ${durationMinutes === d.value ? "active" : ""}`}
                  onClick={() => setDurationMinutes(d.value)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle PYQs */}
          <div className="builder-toggle-row">
            <label className="toggle-switch-label">
              <input
                type="checkbox"
                checked={includePYQs}
                onChange={(e) => setIncludePYQs(e.target.checked)}
              />
              <span className="toggle-text">Prioritize Real Previous Year Questions (PYQs 2020–2024)</span>
            </label>
          </div>
        </div>

        {/* Right Column: Live Test Blueprint Preview (Sample test configuration from roadmap) */}
        <div className="builder-blueprint-col">
          <div className="blueprint-sticky-card">
            <div className="blueprint-card-header">
              <Sparkles size={20} />
              <div>
                <h3 className="blueprint-title">Sample Test Blueprint Preview</h3>
                <span className="blueprint-subtitle">Dynamic exam rules configuration</span>
              </div>
            </div>

            {/* Config Summary Pill Table */}
            <div className="blueprint-meta-table">
              <div className="blueprint-meta-row">
                <span className="meta-key">Examination Target:</span>
                <span className="meta-val highlight">{selectedCourse}</span>
              </div>
              <div className="blueprint-meta-row">
                <span className="meta-key">Subject & Scope:</span>
                <span className="meta-val">{selectedSubject} • {testScope}</span>
              </div>
              <div className="blueprint-meta-row">
                <span className="meta-key">Total Questions:</span>
                <span className="meta-val">{numQuestions} Questions</span>
              </div>
              <div className="blueprint-meta-row">
                <span className="meta-key">Difficulty:</span>
                <span className="meta-val">{difficulty}</span>
              </div>
              <div className="blueprint-meta-row">
                <span className="meta-key">Marking Rules:</span>
                <span className="meta-val">+{blueprint.marksPerCorrect} / -{blueprint.negativeMarks}</span>
              </div>
              <div className="blueprint-meta-row">
                <span className="meta-key">Maximum Score:</span>
                <span className="meta-val font-bold">{blueprint.totalMarks} Marks</span>
              </div>
              <div className="blueprint-meta-row">
                <span className="meta-key">Duration & Pace:</span>
                <span className="meta-val">{durationMinutes} mins (~{blueprint.timePerQuestionSeconds}s / Q)</span>
              </div>
            </div>

            {/* Questions Distribution Breakdown */}
            <div className="blueprint-dist-box">
              <h4 className="dist-title">Question Breakdown</h4>
              {blueprint.distribution.map((dist, dIdx) => (
                <div key={dIdx} className="dist-row">
                  <span className="dist-type">{dist.type}</span>
                  <span className="dist-count">{dist.count} Q ({dist.marks} Marks)</span>
                </div>
              ))}
            </div>

            {/* Notice Callout */}
            <div className="blueprint-notice-box">
              <ShieldCheck size={16} />
              <p>
                Objectively scored questions produce results immediately upon submission. Auto-submits when countdown timer reaches zero.
              </p>
            </div>

            {/* CTA Launch Buttons */}
            <div className="blueprint-action-wrap">
              <button
                className="pill-btn pill-btn-lime pill-btn-lg w-full"
                id="btn-launch-custom-test"
                onClick={handleLaunch}
              >
                <Play size={18} />
                <span>Launch Test Now ({numQuestions} Q)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
