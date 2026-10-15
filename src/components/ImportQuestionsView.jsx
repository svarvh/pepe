import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertTriangle,
  Play,
  Save,
  Trash2,
  Plus,
  Edit3,
  Copy,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { DocumentParser } from "../services/documentParser";
import { StorageService } from "../services/storage";

export default function ImportQuestionsView({ onStartPracticeWithImported, onNavigate }) {
  const [activeTab, setActiveTab] = useState("paste"); // 'paste' or 'upload'
  const [pastedContent, setPastedContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseError, setParseError] = useState(null);
  const [extractedQuestions, setExtractedQuestions] = useState(null);
  const [setName, setSetName] = useState("Imported Question Set 1");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLoadSample = () => {
    setPastedContent(DocumentParser.getSampleTemplate());
  };

  const handleParseText = () => {
    setParseError(null);
    setIsProcessing(true);

    try {
      const result = DocumentParser.parseText(pastedContent);
      if (result.error) {
        setParseError(result.error);
        setExtractedQuestions(null);
      } else {
        setExtractedQuestions(result.questions);
      }
    } catch (err) {
      setParseError(`Extraction failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setParseError("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    setParseError(null);
    setIsProcessing(true);
    setSetName(`Imported: ${file.name.replace(/\.[^/.]+$/, "")}`);

    const reader = new FileReader();

    if (file.name.endsWith(".csv")) {
      reader.onload = (evt) => {
        const text = evt.target.result;
        const result = DocumentParser.parseCSV(text);
        if (result.error) {
          setParseError(result.error);
        } else {
          setExtractedQuestions(result.questions);
        }
        setIsProcessing(false);
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".txt") || file.name.endsWith(".pdf") || file.name.endsWith(".docx")) {
      reader.onload = (evt) => {
        const text = evt.target.result;
        const result = DocumentParser.parseText(text);
        if (result.error) {
          // If binary or empty
          setParseError(`Text extraction from "${file.name}" completed. If options are missing, please use standard format: '1. Question, A) Option 1, Answer: A'.`);
        } else {
          setExtractedQuestions(result.questions);
        }
        setIsProcessing(false);
      };
      reader.readAsText(file);
    } else {
      setParseError("Unsupported file type. Please upload a .txt, .csv, .pdf, or .docx document.");
      setIsProcessing(false);
    }
  };

  // Editing in preview
  const handleUpdateQuestionText = (index, newText) => {
    const updated = [...extractedQuestions];
    updated[index].text = newText;
    setExtractedQuestions(updated);
  };

  const handleUpdateCorrectAnswer = (index, optionId) => {
    const updated = [...extractedQuestions];
    updated[index].correctAnswer = optionId;
    setExtractedQuestions(updated);
  };

  const handleDeleteQuestion = (index) => {
    const updated = extractedQuestions.filter((_, i) => i !== index);
    setExtractedQuestions(updated);
  };

  const handleSaveToLibrary = () => {
    if (!extractedQuestions || extractedQuestions.length === 0) return;

    const importedSet = {
      id: `imported-set-${Date.now()}`,
      title: setName || "Imported Practice Set",
      questionsCount: extractedQuestions.length,
      importedAt: new Date().toISOString(),
      questions: extractedQuestions
    };

    StorageService.saveImportedSet(importedSet);
    // Also add to global bank
    extractedQuestions.forEach(q => StorageService.addQuestion(q));

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleStartPracticing = () => {
    if (!extractedQuestions || extractedQuestions.length === 0) return;
    extractedQuestions.forEach(q => StorageService.addQuestion(q));
    if (onStartPracticeWithImported) {
      onStartPracticeWithImported(extractedQuestions);
    } else {
      onNavigate("practice");
    }
  };

  return (
    <div className="import-view fade-in">
      {/* Top Header Card */}
      <div className="import-header-card">
        <div className="import-header-left">
          <div className="import-icon-box">
            <UploadCloud size={24} />
          </div>
          <div>
            <h2 className="section-title">Import Questions & Study Material</h2>
            <p className="import-desc">
              Import past exams, question sheets, lecture notes, or CSV/PDF files into your practice library.
            </p>
          </div>
        </div>

        <button
          className="pill-btn pill-btn-white sample-btn"
          onClick={handleLoadSample}
        >
          <Sparkles size={15} />
          <span>Load Sample Format</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="import-tabs-row">
        <button
          className={`import-tab-btn ${activeTab === "paste" ? "active" : ""}`}
          onClick={() => setActiveTab("paste")}
        >
          Paste Questions Text
        </button>
        <button
          className={`import-tab-btn ${activeTab === "upload" ? "active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          Upload Document (PDF, CSV, TXT)
        </button>
      </div>

      {/* Input Stage */}
      {!extractedQuestions && (
        <div className="import-input-panel">
          {activeTab === "paste" ? (
            <div className="paste-area-box">
              <textarea
                className="paste-textarea"
                rows={10}
                placeholder="Paste question text here. Example:&#10;1. What is the fundamental unit of charge?&#10;A) 1.602 x 10^-19 C&#10;B) 9.109 x 10^-31 kg&#10;C) 3.00 x 10^8 m/s&#10;D) 6.626 x 10^-34 J·s&#10;Answer: A&#10;Explanation: Millikan oil-drop experiments established elementary electron charge."
                value={pastedContent}
                onChange={(e) => setPastedContent(e.target.value)}
              />

              <div className="paste-bottom-bar">
                <span className="char-count">{pastedContent.length} characters</span>
                <button
                  className="pill-btn pill-btn-dark parse-btn"
                  id="btn-extract-questions"
                  onClick={handleParseText}
                  disabled={!pastedContent.trim() || isProcessing}
                >
                  <span>{isProcessing ? "Extracting..." : "Parse & Extract Questions"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="file-dropzone-box">
              <input
                type="file"
                id="file-upload-input"
                className="file-hidden-input"
                accept=".txt,.csv,.pdf,.docx"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload-input" className="file-dropzone-label">
                <UploadCloud size={40} className="dropzone-icon" />
                <span className="dropzone-title">Click to upload or drag & drop</span>
                <span className="dropzone-subtitle">Supported formats: PDF, DOCX, TXT, CSV (Max 5MB)</span>
              </label>
            </div>
          )}

          {parseError && (
            <div className="alert-error-banner fade-in">
              <AlertTriangle size={18} />
              <span>{parseError}</span>
            </div>
          )}
        </div>
      )}

      {/* Extracted Questions Preview & Editor Stage */}
      {extractedQuestions && (
        <div className="import-preview-panel fade-in">
          <div className="preview-top-bar">
            <div className="preview-title-col">
              <div className="badge badge-lime">
                {extractedQuestions.length} Questions Detected
              </div>
              <input
                type="text"
                className="set-name-input"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
              />
            </div>

            <div className="preview-actions">
              <button
                className="pill-btn pill-btn-white"
                onClick={() => setExtractedQuestions(null)}
              >
                Re-import
              </button>

              <button
                className="pill-btn pill-btn-white"
                onClick={handleSaveToLibrary}
              >
                <Save size={15} />
                <span>Save to Library</span>
              </button>

              <button
                className="pill-btn pill-btn-dark"
                id="btn-practice-imported"
                onClick={handleStartPracticing}
              >
                <Play size={15} />
                <span>Start Practice Drill</span>
              </button>
            </div>
          </div>

          {saveSuccess && (
            <div className="alert-success-banner fade-in">
              <CheckCircle size={18} />
              <span>Question set successfully added to My Library and active question pool!</span>
            </div>
          )}

          {/* Editable Question Cards */}
          <div className="extracted-questions-list">
            {extractedQuestions.map((q, idx) => (
              <div key={q.id || idx} className="extracted-question-card">
                <div className="card-top-row">
                  <span className="badge badge-navy">Q{idx + 1}</span>
                  <button
                    className="delete-q-btn"
                    title="Remove question"
                    onClick={() => handleDeleteQuestion(idx)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="form-group-block">
                  <label className="form-label">Question Statement</label>
                  <textarea
                    className="custom-textarea"
                    rows={2}
                    value={q.text}
                    onChange={(e) => handleUpdateQuestionText(idx, e.target.value)}
                  />
                </div>

                {/* Option selector with radio to mark correct answer */}
                <div className="options-selection-box">
                  <label className="form-label">Options (Select radio button for the correct answer):</label>
                  <div className="options-input-grid">
                    {q.options?.map((opt) => (
                      <div
                        key={opt.id}
                        className={`option-edit-row ${opt.id === q.correctAnswer ? "is-correct-row" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`correct-key-${idx}`}
                          id={`radio-${idx}-${opt.id}`}
                          checked={opt.id === q.correctAnswer}
                          onChange={() => handleUpdateCorrectAnswer(idx, opt.id)}
                        />
                        <label htmlFor={`radio-${idx}-${opt.id}`} className="opt-letter-label">
                          {opt.id}
                        </label>
                        <input
                          type="text"
                          className="opt-text-field"
                          value={opt.text}
                          onChange={(e) => {
                            const updated = [...extractedQuestions];
                            const o = updated[idx].options.find(item => item.id === opt.id);
                            if (o) o.text = e.target.value;
                            setExtractedQuestions(updated);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group-block" style={{ marginTop: 12 }}>
                  <label className="form-label">Explanation</label>
                  <input
                    type="text"
                    className="custom-input"
                    value={q.explanation || ""}
                    onChange={(e) => {
                      const updated = [...extractedQuestions];
                      updated[idx].explanation = e.target.value;
                      setExtractedQuestions(updated);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
