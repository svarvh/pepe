import React, { useState } from "react";
import {
  RotateCcw,
  Sparkles,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Target,
  Layers,
  Award,
  ChevronRight,
  Flame,
  Trash2
} from "lucide-react";
import { StorageService } from "../services/storage";
import TerminologyDrawer from "./TerminologyDrawer";

export default function RevisionNotebookView({ onNavigate, onStartPracticeWithMistakes }) {
  const [activeTab, setActiveTab] = useState("mistakes"); // 'mistakes', 'flashcards', 'formulas'
  const [mistakes, setMistakes] = useState(StorageService.getMistakes());
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTermId, setActiveTermId] = useState(null);

  const allQuestions = StorageService.getQuestions();
  const allTerms = Object.values(StorageService.getAllTerminology());

  // Flashcards deck generated from Central Terminology
  const flashcard = allTerms[currentFlashcardIndex] || allTerms[0];

  const handleNextCard = (rating) => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentFlashcardIndex((prev) => (prev + 1) % allTerms.length);
    }, 200);
  };

  const handleRemoveMistake = (qId) => {
    const updated = StorageService.removeMistake(qId);
    setMistakes(updated);
  };

  const handleRetryAllMistakes = () => {
    const mistakeQIds = mistakes.map(m => m.questionId);
    const matched = allQuestions.filter(q => mistakeQIds.includes(q.id));
    if (matched.length > 0 && onStartPracticeWithMistakes) {
      onStartPracticeWithMistakes(matched);
    } else {
      onNavigate("practice");
    }
  };

  return (
    <div className="revision-notebook-view fade-in">
      {/* 1. TOP HERO HEADER */}
      <div className="revision-hero-card">
        <div className="revision-hero-left">
          <div className="revision-icon-tile">
            <RotateCcw size={26} />
          </div>
          <div>
            <div className="revision-pill-row">
              <span className="badge badge-lime">Spaced Repetition Engine</span>
              <span className="badge badge-lavender">Mistake Notebook</span>
              <span className="badge badge-cream">High-Yield Formulae</span>
            </div>
            <h1 className="revision-title">Digital Notebook & Adaptive Revision (Module E)</h1>
            <p className="revision-subtitle">
              Turn your past examination mistakes into mastery through spaced repetition flashcards, formula cheat-sheets, and targeted retry drills.
            </p>
          </div>
        </div>

        {/* Action Header Button */}
        <div className="revision-hero-actions">
          <button
            className="pill-btn pill-btn-lime"
            onClick={handleRetryAllMistakes}
            disabled={mistakes.length === 0}
          >
            <RotateCcw size={16} />
            <span>Retry All Saved Mistakes ({mistakes.length})</span>
          </button>
        </div>
      </div>

      {/* 2. REVISION VIEW TABS */}
      <div className="revision-tabs-bar">
        <button
          className={`rev-tab-btn ${activeTab === "mistakes" ? "active" : ""}`}
          onClick={() => setActiveTab("mistakes")}
        >
          <Bookmark size={16} />
          <span>Saved Mistake Notebook ({mistakes.length})</span>
        </button>
        <button
          className={`rev-tab-btn ${activeTab === "flashcards" ? "active" : ""}`}
          onClick={() => setActiveTab("flashcards")}
        >
          <Sparkles size={16} />
          <span>Spaced Repetition Flashcards ({allTerms.length})</span>
        </button>
        <button
          className={`rev-tab-btn ${activeTab === "formulas" ? "active" : ""}`}
          onClick={() => setActiveTab("formulas")}
        >
          <Layers size={16} />
          <span>Formula & Definition Cheat-Sheets</span>
        </button>
      </div>

      {/* 3. TAB 1: MISTAKE NOTEBOOK */}
      {activeTab === "mistakes" && (
        <div className="mistakes-tab-content fade-in">
          {mistakes.length === 0 ? (
            <div className="empty-state-card">
              <CheckCircle2 size={42} className="text-success" />
              <h3>Your Mistake Notebook is Clean!</h3>
              <p>Whenever you answer a question incorrectly during a custom test or practice session, save it here to review.</p>
            </div>
          ) : (
            <div className="mistakes-cards-list">
              {mistakes.map((m, idx) => {
                const questionObj = allQuestions.find(q => q.id === m.questionId);
                return (
                  <div key={idx} className="mistake-entry-card">
                    <div className="mistake-card-top">
                      <div className="mistake-badge-wrap">
                        <span className="badge badge-lavender">{m.mistakeType}</span>
                        <span className="badge badge-navy">{questionObj?.topic || "Topic"}</span>
                        <span className="badge badge-cream">Saved on {new Date(m.savedAt).toLocaleDateString()}</span>
                      </div>
                      <button
                        className="mistake-remove-btn"
                        onClick={() => handleRemoveMistake(m.questionId)}
                        title="Remove from notebook"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <h4 className="mistake-q-statement">
                      {questionObj ? questionObj.text : `Question ID: ${m.questionId}`}
                    </h4>

                    {m.notes && (
                      <div className="mistake-user-note">
                        <strong>My Note:</strong> {m.notes}
                      </div>
                    )}

                    {questionObj && (
                      <div className="mistake-solution-preview">
                        <strong>Verified Correct Answer:</strong>{" "}
                        <span className="text-success">
                          {Array.isArray(questionObj.correctAnswer) ? questionObj.correctAnswer.join(", ") : String(questionObj.correctAnswer || questionObj.correctNumericAnswer)}
                        </span>
                        <p className="mistake-exp-text">{questionObj.explanation}</p>
                      </div>
                    )}

                    <div className="mistake-card-footer">
                      <button
                        className="pill-btn pill-btn-outline pill-btn-sm"
                        onClick={() => onNavigate("smart-notes")}
                      >
                        <BookOpen size={14} />
                        <span>Review in Smart Notes</span>
                      </button>

                      <button
                        className="pill-btn pill-btn-lime pill-btn-sm"
                        onClick={() => {
                          if (questionObj && onStartPracticeWithMistakes) {
                            onStartPracticeWithMistakes([questionObj]);
                          } else {
                            onNavigate("practice");
                          }
                        }}
                      >
                        <Target size={14} />
                        <span>Practise This Question Now</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. TAB 2: SPACED REPETITION FLASHCARDS */}
      {activeTab === "flashcards" && (
        <div className="flashcards-tab-content fade-in">
          <div className="flashcard-deck-header">
            <span>Card {currentFlashcardIndex + 1} of {allTerms.length}</span>
            <span className="badge badge-navy">{flashcard.category}</span>
          </div>

          {/* Interactive Flip Card */}
          <div
            className={`flashcard-3d-box ${isFlipped ? "flipped" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of Card */}
            <div className="flashcard-face flashcard-front">
              <div className="card-hint-top">Tap to reveal scientific definition & Hindi meaning</div>
              <h2 className="flashcard-term-name">{flashcard.term}</h2>
              {flashcard.pronunciation && (
                <span className="flashcard-phonetic">/{flashcard.pronunciation}/</span>
              )}
              <div className="flashcard-click-prompt">
                <Sparkles size={16} />
                <span>Click Card to Flip</span>
              </div>
            </div>

            {/* Back of Card */}
            <div className="flashcard-face flashcard-back">
              <div className="card-hint-top">Scientific Definition & Translation</div>
              <p className="card-simple-def">{flashcard.simpleMeaning}</p>
              {flashcard.hindiExplanation && (
                <div className="card-hindi-box">
                  <strong>हिन्दी:</strong> {flashcard.hindiExplanation}
                </div>
              )}
              {flashcard.formulaOrDiagram && (
                <div className="card-formula-box">
                  <code>{flashcard.formulaOrDiagram}</code>
                </div>
              )}
            </div>
          </div>

          {/* Spaced Repetition Rating Controls */}
          <div className="spaced-rep-ratings-bar">
            <span className="rating-guide-lbl">How well did you recall this concept?</span>
            <div className="rating-buttons-row">
              <button
                className="rate-btn btn-again"
                onClick={() => handleNextCard("again")}
              >
                <span>Again</span>
                <span className="interval-sub">&lt; 1 min</span>
              </button>
              <button
                className="rate-btn btn-hard"
                onClick={() => handleNextCard("hard")}
              >
                <span>Hard</span>
                <span className="interval-sub">12 hours</span>
              </button>
              <button
                className="rate-btn btn-good"
                onClick={() => handleNextCard("good")}
              >
                <span>Good</span>
                <span className="interval-sub">2 days</span>
              </button>
              <button
                className="rate-btn btn-easy"
                onClick={() => handleNextCard("easy")}
              >
                <span>Easy</span>
                <span className="interval-sub">5 days</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: FORMULA CHEAT-SHEETS */}
      {activeTab === "formulas" && (
        <div className="formulas-tab-content fade-in">
          <div className="formula-sheets-grid">
            {[
              {
                title: "Nernst Equation & Electrochemistry",
                subject: "Chemistry Class 12",
                formula: "E_cell = E°_cell - (0.0591 / n) · log10(Q) at 298 K",
                notes: "Intensive property: multiplying coefficients does NOT change E°_cell. Doubling doubles ΔG°."
              },
              {
                title: "Einstein's Photoelectric Equation",
                subject: "Physics Class 12",
                formula: "h·ν = Φ₀ + K_max = h·ν₀ + e·V₀",
                notes: "Slope of V₀ vs ν graph is universal constant h/e for ALL metals. Independent of intensity."
              },
              {
                title: "Hardy-Weinberg Genetic Equilibrium",
                subject: "Biology Class 12",
                formula: "p + q = 1,  p² + 2pq + q² = 1",
                notes: "p = dominant allele freq, q = recessive allele freq, 2pq = heterozygous genotype frequency."
              },
              {
                title: "Type I vs Type II Error Relationships",
                subject: "UGC-NET Paper 1",
                formula: "α = P(Reject H₀ | H₀ true),  β = P(Fail to reject H₀ | H₀ false)",
                notes: "Level of significance α is typically 0.05. Decreasing α increases β."
              }
            ].map((f, fIdx) => (
              <div key={fIdx} className="formula-sheet-card">
                <span className="badge badge-lavender">{f.subject}</span>
                <h4 className="formula-title">{f.title}</h4>
                <div className="formula-equation-display">
                  <code>{f.formula}</code>
                </div>
                <p className="formula-notes">{f.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Central Terminology Drawer */}
      {activeTermId && (
        <TerminologyDrawer
          termId={activeTermId}
          onClose={() => setActiveTermId(null)}
          onNavigateToNotes={() => {
            setActiveTermId(null);
            onNavigate("smart-notes");
          }}
          onPracticeTerm={() => {
            setActiveTermId(null);
            onNavigate("practice");
          }}
        />
      )}
    </div>
  );
}
