import React, { useState } from "react";
import {
  Sparkles,
  Play,
  BookmarkPlus,
  Download,
  Edit2,
  RefreshCw,
  Check,
  AlertCircle,
  Cpu,
  Layers,
  Save,
  CheckCircle2
} from "lucide-react";
import { SUBJECTS_CATALOG } from "../data/mockData";
import { AIService } from "../services/aiService";
import { StorageService } from "../services/storage";

export default function AIGeneratorView({ onStartPracticeSet, onNavigate }) {
  const [subject, setSubject] = useState("Physics: Mechanics & Waves");
  const [topic, setTopic] = useState("Doppler Effect & Resonance");
  const [sourceText, setSourceText] = useState("");
  const [numQuestions, setNumQuestions] = useState(4);
  const [difficulty, setDifficulty] = useState("Medium");
  const [format, setFormat] = useState("mcq");
  const [includeExplanations, setIncludeExplanations] = useState(true);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSet, setGeneratedSet] = useState(null);
  const [activeProvider, setActiveProvider] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSavedSuccess(false);
    try {
      const result = await AIService.generateQuestions({
        subject,
        topic,
        sourceText,
        numQuestions,
        difficulty,
        format,
        includeExplanations
      });

      setGeneratedSet(result.questions);
      setActiveProvider(result.provider);
    } catch (err) {
      alert(`Generation error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateSingle = async (idx) => {
    try {
      const res = await AIService.generateQuestions({
        subject,
        topic,
        sourceText,
        numQuestions: 1,
        difficulty,
        format,
        includeExplanations
      });
      if (res.questions && res.questions[0]) {
        const updated = [...generatedSet];
        updated[idx] = res.questions[0];
        setGeneratedSet(updated);
      }
    } catch (err) {
      alert("Failed to regenerate question.");
    }
  };

  const handleSaveToLibrary = () => {
    if (!generatedSet || generatedSet.length === 0) return;

    const newSet = {
      id: `ai-set-${Date.now()}`,
      title: `AI Set: ${topic || subject}`,
      subject,
      topic,
      difficulty,
      createdAt: new Date().toISOString(),
      questionsCount: generatedSet.length,
      questions: generatedSet
    };

    StorageService.saveAISet(newSet);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportJSON = () => {
    if (!generatedSet) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(generatedSet, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ai_questions_${topic.replace(/\s+/g, "_")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleStartPracticing = () => {
    if (!generatedSet || generatedSet.length === 0) return;
    // Add these questions to storage pool and trigger practice
    generatedSet.forEach(q => StorageService.addQuestion(q));
    if (onStartPracticeSet) {
      onStartPracticeSet(generatedSet);
    } else {
      onNavigate("practice");
    }
  };

  return (
    <div className="ai-generator-view fade-in">
      {/* Top Banner */}
      <div className="generator-top-card">
        <div className="generator-header-info">
          <div className="generator-icon-wrap">
            <Sparkles size={24} className="sparkle-gold" />
          </div>
          <div>
            <h2 className="section-title">AI Question Generator</h2>
            <p className="generator-desc">
              Generate custom exam-grade practice questions from topics, textbook excerpts, or lecture notes.
            </p>
          </div>
        </div>

        <div className="ai-engine-badge">
          <Cpu size={14} />
          <span>Configured Provider: {StorageService.getSettings().aiProvider === "demo" ? "Curated Demo Engine" : StorageService.getSettings().aiProvider.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="generator-grid">
        <div className="generator-controls-card">
          <h3 className="card-subtitle">Generation Parameters</h3>

          <div className="form-group-block">
            <label className="form-label">Subject</label>
            <select
              className="custom-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {SUBJECTS_CATALOG.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group-block">
            <label className="form-label">Topic or Chapter</label>
            <input
              type="text"
              className="custom-input"
              value={topic}
              placeholder="e.g. Bernoulli Principle, Chirality, L'Hôpital"
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="form-group-block">
            <label className="form-label">Source Text or Syllabus Excerpt (Optional)</label>
            <textarea
              className="custom-textarea"
              rows={3}
              placeholder="Paste lecture notes, formula sheets, or textbook passages to extract questions from..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          <div className="form-row-two-col">
            <div className="form-group-block">
              <label className="form-label">Difficulty</label>
              <select
                className="custom-input"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Easy (Foundational)</option>
                <option value="Medium">Medium (Exam Standard)</option>
                <option value="Hard">Hard (High Difficulty)</option>
              </select>
            </div>

            <div className="form-group-block">
              <label className="form-label">Format</label>
              <select
                className="custom-input"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="true_false">True / False</option>
                <option value="short_answer">Short Answer</option>
              </select>
            </div>
          </div>

          <div className="form-group-block">
            <label className="form-label">Number of Questions ({numQuestions})</label>
            <div className="count-pill-selector">
              {[3, 4, 5, 8].map(cnt => (
                <button
                  key={cnt}
                  type="button"
                  className={`count-pill ${numQuestions === cnt ? "active" : ""}`}
                  onClick={() => setNumQuestions(cnt)}
                >
                  {cnt} Questions
                </button>
              ))}
            </div>
          </div>

          <div className="form-checkbox-row">
            <input
              type="checkbox"
              id="include-exp"
              checked={includeExplanations}
              onChange={(e) => setIncludeExplanations(e.target.checked)}
            />
            <label htmlFor="include-exp">Include verified step-by-step solutions</label>
          </div>

          <button
            className="pill-btn pill-btn-dark generate-submit-btn"
            id="btn-generate-ai"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={16} className="spin-icon" />
                <span>Synthesizing Questions...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate Questions</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Questions Output Preview */}
        <div className="generator-results-col">
          {!generatedSet && !isGenerating && (
            <div className="generator-empty-state">
              <Layers size={44} className="empty-icon-muted" />
              <h3>Ready to Generate Questions</h3>
              <p>Configure parameters on the left and click "Generate Questions" to review the interactive set.</p>
            </div>
          )}

          {isGenerating && (
            <div className="generator-loading-state">
              <div className="loading-spinner" />
              <h3>Analyzing curriculum and generating questions...</h3>
              <p>Formulating distractors, validating correct keys, and composing detailed explanations.</p>
            </div>
          )}

          {generatedSet && !isGenerating && (
            <div className="generated-set-panel fade-in">
              <div className="generated-panel-header">
                <div>
                  <div className="provider-tag">
                    <CheckCircle2 size={14} /> Generated by {activeProvider}
                  </div>
                  <h3 className="generated-set-title">
                    {topic || subject} ({generatedSet.length} Questions)
                  </h3>
                </div>

                <div className="generated-header-actions">
                  <button
                    className="pill-btn pill-btn-lime"
                    id="btn-practice-generated"
                    onClick={handleStartPracticing}
                  >
                    <Play size={15} />
                    <span>Practice Now</span>
                  </button>

                  <button
                    className="pill-btn pill-btn-white"
                    onClick={handleSaveToLibrary}
                    title="Save to My Library"
                  >
                    <BookmarkPlus size={15} />
                    <span>Save</span>
                  </button>

                  <button
                    className="pill-btn pill-btn-white"
                    onClick={handleExportJSON}
                    title="Export as JSON"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>

              {savedSuccess && (
                <div className="alert-success-banner fade-in">
                  <Check size={16} /> Question set successfully saved to My Library!
                </div>
              )}

              {/* List of Generated Questions */}
              <div className="generated-questions-list">
                {generatedSet.map((q, idx) => (
                  <div key={q.id || idx} className="generated-q-card">
                    <div className="q-card-header">
                      <div className="q-badge-row">
                        <span className="badge badge-navy">Q{idx + 1}</span>
                        <span className="badge badge-cream">{q.difficulty}</span>
                        <span className="badge badge-lavender">{q.type.toUpperCase()}</span>
                      </div>

                      <div className="q-item-actions">
                        <button
                          className="subtle-icon-action"
                          title="Regenerate this question"
                          onClick={() => handleRegenerateSingle(idx)}
                        >
                          <RefreshCw size={14} />
                        </button>
                        <button
                          className="subtle-icon-action"
                          title="Edit question text"
                          onClick={() => {
                            setEditingIndex(editingIndex === idx ? null : idx);
                            setEditText(q.text);
                          }}
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>
                    </div>

                    {editingIndex === idx ? (
                      <div className="edit-inline-box">
                        <textarea
                          className="custom-textarea"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <button
                          className="pill-btn pill-btn-dark pill-btn-sm"
                          onClick={() => {
                            const updated = [...generatedSet];
                            updated[idx].text = editText;
                            setGeneratedSet(updated);
                            setEditingIndex(null);
                          }}
                        >
                          <Save size={13} /> Save Edit
                        </button>
                      </div>
                    ) : (
                      <p className="q-card-statement">{q.text}</p>
                    )}

                    {/* MCQ Options preview */}
                    {q.options && q.options.length > 0 && (
                      <div className="q-card-options-preview">
                        {q.options.map(opt => (
                          <div
                            key={opt.id}
                            className={`q-preview-option ${opt.id === q.correctAnswer ? "correct-key" : ""}`}
                          >
                            <span className="opt-key">{opt.id}.</span>
                            <span>{opt.text}</span>
                            {opt.id === q.correctAnswer && (
                              <span className="correct-tag">Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {q.explanation && (
                      <div className="q-card-solution-preview">
                        <strong>Solution:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
