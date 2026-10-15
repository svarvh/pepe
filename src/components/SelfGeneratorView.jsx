import React, { useState } from "react";
import {
  PenTool,
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Play,
  Save,
  Eye,
  AlertCircle,
  Check
} from "lucide-react";
import { SUBJECTS_CATALOG } from "../data/mockData";
import { StorageService } from "../services/storage";

export default function SelfGeneratorView({ onStartPracticeWithCustom, onNavigate }) {
  const [setTitle, setSetTitle] = useState("Custom Practice Set #1");
  const [subjectId, setSubjectId] = useState("phys");
  const [topicName, setTopicName] = useState("Selected Practice Concepts");
  const [questions, setQuestions] = useState([
    {
      id: `self-q-${Date.now()}-1`,
      type: "mcq",
      text: "What is the relationship between wavelength (λ) and frequency (f) for an electromagnetic wave propagating in a vacuum?",
      difficulty: "Medium",
      marks: 4,
      options: [
        { id: "A", text: "c = λ * f" },
        { id: "B", text: "c = λ / f" },
        { id: "C", text: "c = f / λ" },
        { id: "D", text: "c = λ² * f" }
      ],
      correctAnswer: "A",
      explanation: "In vacuum, all electromagnetic waves travel at the speed of light c (≈ 3.00 × 10⁸ m/s), governed by the wave equation c = λ * f."
    }
  ]);

  const [validationError, setValidationError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleAddQuestion = () => {
    const newQ = {
      id: `self-q-${Date.now()}-${questions.length + 1}`,
      type: "mcq",
      text: "",
      difficulty: "Medium",
      marks: 3,
      options: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" }
      ],
      correctAnswer: "A",
      explanation: ""
    };
    setQuestions([...questions, newQ]);
  };

  const handleDuplicate = (idx) => {
    const target = questions[idx];
    const cloned = {
      ...JSON.parse(JSON.stringify(target)),
      id: `self-q-${Date.now()}-${Math.random()}`
    };
    const updated = [...questions];
    updated.splice(idx + 1, 0, cloned);
    setQuestions(updated);
  };

  const handleDelete = (idx) => {
    if (questions.length <= 1) {
      alert("A question set must have at least one question.");
      return;
    }
    const updated = questions.filter((_, i) => i !== idx);
    setQuestions(updated);
  };

  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    const updated = [...questions];
    const temp = updated[idx];
    updated[idx] = updated[idx - 1];
    updated[idx - 1] = temp;
    setQuestions(updated);
  };

  const handleMoveDown = (idx) => {
    if (idx === questions.length - 1) return;
    const updated = [...questions];
    const temp = updated[idx];
    updated[idx] = updated[idx + 1];
    updated[idx + 1] = temp;
    setQuestions(updated);
  };

  const validateSet = () => {
    if (!setTitle.trim()) {
      return "Please provide a title for this question set.";
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        return `Question ${i + 1} has an empty question statement.`;
      }
      if (q.type === "mcq") {
        if (!q.options || q.options.length < 2) {
          return `Question ${i + 1} must have at least 2 answer options.`;
        }
        for (let j = 0; j < q.options.length; j++) {
          if (!q.options[j].text.trim()) {
            return `Question ${i + 1}, Option ${q.options[j].id} cannot be empty.`;
          }
        }
        if (!q.correctAnswer) {
          return `Question ${i + 1} must have a designated correct answer.`;
        }
      }
    }
    return null;
  };

  const handleSaveDraft = () => {
    const error = validateSet();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);

    const subObj = SUBJECTS_CATALOG.find(s => s.id === subjectId) || SUBJECTS_CATALOG[0];

    const customSet = {
      id: `custom-set-${Date.now()}`,
      title: setTitle,
      subject: subObj.name,
      subjectId: subObj.id,
      topic: topicName,
      questionsCount: questions.length,
      createdAt: new Date().toISOString(),
      published: true,
      questions
    };

    StorageService.saveCustomSet(customSet);
    questions.forEach(q => StorageService.addQuestion(q));

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleStartPracticing = () => {
    const error = validateSet();
    if (error) {
      setValidationError(error);
      return;
    }
    handleSaveDraft();

    if (onStartPracticeWithCustom) {
      onStartPracticeWithCustom(questions);
    } else {
      onNavigate("practice");
    }
  };

  return (
    <div className="self-generator-view fade-in">
      {/* Top Header Card */}
      <div className="self-header-card">
        <div className="self-header-left">
          <div className="self-icon-box">
            <PenTool size={24} />
          </div>
          <div>
            <h2 className="section-title">Self Question Generator & Authoring Studio</h2>
            <p className="self-desc">
              Compose custom flashcard decks, formula drills, and mock tests with full authoring control.
            </p>
          </div>
        </div>

        <div className="self-header-actions">
          <button
            className={`pill-btn ${previewMode ? "pill-btn-lime" : "pill-btn-white"}`}
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye size={15} />
            <span>{previewMode ? "Edit Mode" : "Preview Mode"}</span>
          </button>

          <button
            className="pill-btn pill-btn-white"
            onClick={handleSaveDraft}
          >
            <Save size={15} />
            <span>Publish to Library</span>
          </button>

          <button
            className="pill-btn pill-btn-dark"
            id="btn-practice-custom-set"
            onClick={handleStartPracticing}
          >
            <Play size={15} />
            <span>Practice Set Now</span>
          </button>
        </div>
      </div>

      {validationError && (
        <div className="alert-error-banner fade-in">
          <AlertCircle size={18} />
          <span>{validationError}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="alert-success-banner fade-in">
          <CheckCircle size={18} />
          <span>Question set successfully published to My Library!</span>
        </div>
      )}

      {/* Set Metadata Row */}
      <div className="self-meta-panel">
        <div className="form-group-block flex-2">
          <label className="form-label">Question Set Title</label>
          <input
            type="text"
            className="custom-input"
            value={setTitle}
            onChange={(e) => setSetTitle(e.target.value)}
            placeholder="e.g. Organic Chemistry Carbonyl Reaction Drills"
          />
        </div>

        <div className="form-group-block flex-1">
          <label className="form-label">Subject</label>
          <select
            className="custom-input"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            {SUBJECTS_CATALOG.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group-block flex-1">
          <label className="form-label">Topic / Unit</label>
          <input
            type="text"
            className="custom-input"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="e.g. Aldehydes & Ketones"
          />
        </div>
      </div>

      {/* Question Cards List */}
      <div className="self-questions-list">
        {questions.map((q, idx) => (
          <div key={q.id || idx} className="self-question-card">
            <div className="self-card-header">
              <div className="self-card-num-group">
                <span className="badge badge-navy">Q{idx + 1}</span>
                <span className="badge badge-lime">{q.difficulty}</span>
                <span className="badge badge-lavender">{q.marks} Marks</span>
              </div>

              <div className="self-card-toolbar">
                <button
                  className="icon-action-btn"
                  title="Move Up"
                  disabled={idx === 0}
                  onClick={() => handleMoveUp(idx)}
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  className="icon-action-btn"
                  title="Move Down"
                  disabled={idx === questions.length - 1}
                  onClick={() => handleMoveDown(idx)}
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  className="icon-action-btn"
                  title="Duplicate"
                  onClick={() => handleDuplicate(idx)}
                >
                  <Copy size={16} />
                </button>
                <button
                  className="icon-action-btn text-danger"
                  title="Delete"
                  onClick={() => handleDelete(idx)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="form-group-block">
              <label className="form-label">Question Statement</label>
              <textarea
                className="custom-textarea"
                rows={2}
                placeholder="Enter question text here..."
                value={q.text}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[idx].text = e.target.value;
                  setQuestions(updated);
                }}
              />
            </div>

            {/* Format, Difficulty & Marks */}
            <div className="form-row-three-col">
              <div className="form-group-block">
                <label className="form-label">Format</label>
                <select
                  className="custom-input"
                  value={q.type}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[idx].type = e.target.value;
                    setQuestions(updated);
                  }}
                >
                  <option value="mcq">Multiple Choice (MCQ)</option>
                  <option value="true_false">True / False</option>
                  <option value="short_answer">Short Answer</option>
                </select>
              </div>

              <div className="form-group-block">
                <label className="form-label">Difficulty</label>
                <select
                  className="custom-input"
                  value={q.difficulty}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[idx].difficulty = e.target.value;
                    setQuestions(updated);
                  }}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="form-group-block">
                <label className="form-label">Marks</label>
                <input
                  type="number"
                  className="custom-input"
                  value={q.marks}
                  min={1}
                  max={10}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[idx].marks = parseInt(e.target.value, 10) || 1;
                    setQuestions(updated);
                  }}
                />
              </div>
            </div>

            {/* Answer Options */}
            {q.type === "mcq" && (
              <div className="options-builder-block">
                <label className="form-label">Options (Mark radio button for the correct answer)</label>
                <div className="options-grid-inputs">
                  {q.options?.map((opt) => (
                    <div
                      key={opt.id}
                      className={`option-input-item ${opt.id === q.correctAnswer ? "active-correct-opt" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`correct-radio-${idx}`}
                        id={`opt-r-${idx}-${opt.id}`}
                        checked={opt.id === q.correctAnswer}
                        onChange={() => {
                          const updated = [...questions];
                          updated[idx].correctAnswer = opt.id;
                          setQuestions(updated);
                        }}
                      />
                      <label htmlFor={`opt-r-${idx}-${opt.id}`} className="opt-id-tag">
                        {opt.id}
                      </label>
                      <input
                        type="text"
                        className="opt-input-val"
                        placeholder={`Option ${opt.id} text...`}
                        value={opt.text}
                        onChange={(e) => {
                          const updated = [...questions];
                          const o = updated[idx].options.find(item => item.id === opt.id);
                          if (o) o.text = e.target.value;
                          setQuestions(updated);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Explanation */}
            <div className="form-group-block" style={{ marginTop: 12 }}>
              <label className="form-label">Step-by-Step Explanation & Hints</label>
              <textarea
                className="custom-textarea"
                rows={2}
                placeholder="Explain why the answer is correct..."
                value={q.explanation}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[idx].explanation = e.target.value;
                  setQuestions(updated);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Add Question Button */}
      <div className="self-bottom-add-bar">
        <button
          className="pill-btn pill-btn-lime add-q-bottom-btn"
          id="btn-add-question"
          onClick={handleAddQuestion}
        >
          <Plus size={16} />
          <span>Add Another Question</span>
        </button>
      </div>
    </div>
  );
}
