import React, { useState } from "react";
import {
  X,
  Volume2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Target,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Share2
} from "lucide-react";
import { StorageService } from "../services/storage";

export default function TerminologyDrawer({ termId, onClose, onNavigateToNotes, onPracticeTerm }) {
  const [activeTab, setActiveTab] = useState("meaning"); // 'meaning', 'example', 'practice'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // 'en' or 'hi'

  const term = StorageService.getTerminology(termId);

  if (!term) return null;

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = selectedLanguage === "hi" && term.hindiExplanation
        ? `${term.hindiTerm}. ${term.hindiExplanation}`
        : `${term.term}. ${term.simpleMeaning}`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = selectedLanguage === "hi" ? "hi-IN" : "en-US";
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="term-drawer-backdrop fade-in" onClick={onClose}>
      <div className="term-drawer-sheet slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="term-drawer-header">
          <div className="term-badge-row">
            <span className="badge badge-lavender">{term.category}</span>
            <span className="badge badge-navy">{term.ncertRef || "NCERT Aligned"}</span>
            <button
              className={`term-lang-toggle ${selectedLanguage === "hi" ? "active" : ""}`}
              onClick={() => setSelectedLanguage(prev => prev === "en" ? "hi" : "en")}
              title="Toggle Hindi/English definition"
            >
              {selectedLanguage === "en" ? "हिन्दी में देखें" : "View in English"}
            </button>
          </div>

          <div className="term-title-action-row">
            <div className="term-title-block">
              <h2 className="term-primary-name">
                {selectedLanguage === "hi" && term.hindiTerm ? term.hindiTerm : term.term}
              </h2>
              {term.hindiTerm && selectedLanguage === "en" && (
                <span className="term-secondary-hindi">({term.hindiTerm})</span>
              )}
              {term.pronunciation && (
                <span className="term-phonetics">/{term.pronunciation}/</span>
              )}
            </div>

            <div className="term-header-actions">
              <button
                className={`icon-circle-btn ${isSpeaking ? "btn-pulse-active" : ""}`}
                onClick={handleSpeak}
                title="Listen to pronunciation"
                aria-label="Listen to pronunciation"
              >
                <Volume2 size={18} />
              </button>
              <button
                className="icon-circle-btn"
                onClick={onClose}
                aria-label="Close term quick view"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="term-drawer-tabs">
          <button
            className={`term-tab-btn ${activeTab === "meaning" ? "active" : ""}`}
            onClick={() => setActiveTab("meaning")}
          >
            Definition & Meaning
          </button>
          <button
            className={`term-tab-btn ${activeTab === "example" ? "active" : ""}`}
            onClick={() => setActiveTab("example")}
          >
            Example & Formula
          </button>
          <button
            className={`term-tab-btn ${activeTab === "practice" ? "active" : ""}`}
            onClick={() => setActiveTab("practice")}
          >
            Related Questions ({term.practiceQuestionIds?.length || 0})
          </button>
        </div>

        {/* Tab 1: Meaning & Definition */}
        {activeTab === "meaning" && (
          <div className="term-tab-content fade-in">
            {/* Simple Meaning Hero Box */}
            <div className="term-simple-meaning-card">
              <div className="term-simple-label">
                <Sparkles size={16} />
                <span>Simple Meaning (सरल अर्थ):</span>
              </div>
              <p className="term-simple-text">
                {selectedLanguage === "hi" && term.hindiExplanation
                  ? term.hindiExplanation
                  : term.simpleMeaning}
              </p>
            </div>

            {/* Formal Definition */}
            <div className="term-section-block">
              <h4 className="term-section-title">Formal Scientific Definition</h4>
              <p className="term-formal-text">{term.formalDefinition}</p>
            </div>

            {/* Related Terms Chips */}
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className="term-section-block">
                <h4 className="term-section-title">Related Concepts in Syllabus</h4>
                <div className="term-related-chips-row">
                  {term.relatedTerms.map((relId) => {
                    const relTerm = StorageService.getTerminology(relId);
                    return (
                      <span key={relId} className="term-chip">
                        {relTerm ? relTerm.term : relId.replace("-", " ")}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Example & Formula/Diagram */}
        {activeTab === "example" && (
          <div className="term-tab-content fade-in">
            <div className="term-example-card">
              <h4 className="term-section-title">Real-World Scientific Example</h4>
              <p className="term-example-text">{term.example}</p>
            </div>

            {term.formulaOrDiagram && (
              <div className="term-formula-card">
                <h4 className="term-section-title">Key Equation / Relationship</h4>
                <div className="term-formula-display">
                  <code>{term.formulaOrDiagram}</code>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Practice Questions */}
        {activeTab === "practice" && (
          <div className="term-tab-content fade-in">
            <div className="term-practice-intro">
              <p>Reinforce your understanding of <strong>{term.term}</strong> with instant practice questions:</p>
            </div>

            <div className="term-questions-list">
              {term.practiceQuestionIds && term.practiceQuestionIds.map((qId, idx) => (
                <div key={qId} className="term-question-item">
                  <div className="term-q-num">Q{idx + 1}</div>
                  <div className="term-q-info">
                    <span className="term-q-title">Practice Question #{qId}</span>
                    <span className="term-q-meta">Difficulty: Standard Exam Level</span>
                  </div>
                  <button
                    className="pill-btn pill-btn-lime pill-btn-sm"
                    onClick={() => {
                      if (onPracticeTerm) onPracticeTerm(term);
                      if (onClose) onClose();
                    }}
                  >
                    <span>Solve Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drawer Bottom Action Bar */}
        <div className="term-drawer-footer">
          <button
            className="pill-btn pill-btn-outline"
            onClick={() => {
              if (onNavigateToNotes) onNavigateToNotes();
              if (onClose) onClose();
            }}
          >
            <BookOpen size={16} />
            <span>Read Complete Chapter Notes</span>
          </button>

          <button
            className="pill-btn pill-btn-lime"
            onClick={() => {
              if (onPracticeTerm) onPracticeTerm(term);
              if (onClose) onClose();
            }}
          >
            <Target size={16} />
            <span>Practise Topic Questions</span>
          </button>
        </div>
      </div>
    </div>
  );
}
