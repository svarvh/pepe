import React, { useState } from "react";
import {
  ShieldAlert,
  FolderTree,
  FileText,
  CheckCircle2,
  XCircle,
  Plus,
  Sparkles,
  Search,
  UploadCloud,
  Layers,
  Edit3,
  Trash2,
  ArrowRight,
  Eye,
  Check,
  Award
} from "lucide-react";
import { StorageService } from "../services/storage";

export default function AdminCMSView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("approvals"); // 'approvals', 'notes', 'questions', 'batches'
  const [questions, setQuestions] = useState(StorageService.getQuestions());
  const [searchQuery, setSearchQuery] = useState("");

  // Simulated AI Drafts awaiting Subject Expert & Editor Approval (Section 6 Publishing Workflow)
  const [aiDrafts, setAiDrafts] = useState([
    {
      id: "draft-101",
      topic: "Hardy-Weinberg Genetic Equilibrium",
      subject: "Biology Class 12 NCERT",
      type: "mcq",
      difficulty: "Hard",
      author: "AI Question Generator v2.4",
      accuracyScore: 98,
      status: "pending_review",
      text: "If a population in Hardy-Weinberg equilibrium has 36% individuals homozygous for the recessive allele, what is the frequency of the dominant allele A?",
      options: [
        { id: "A", text: "0.40" },
        { id: "B", text: "0.60" },
        { id: "C", text: "0.36" },
        { id: "D", text: "0.48" }
      ],
      correctAnswer: "A",
      explanation: "q² = 0.36, so q = 0.60. Since p + q = 1, p = 1 - 0.60 = 0.40.",
      markingScheme: "+4 for correct, -1 for incorrect"
    },
    {
      id: "draft-102",
      topic: "Galvanic Cells & Nernst Equation",
      subject: "Chemistry Class 12 NCERT",
      type: "assertion_reason",
      difficulty: "Medium",
      author: "AI Question Generator v2.4",
      accuracyScore: 95,
      status: "pending_review",
      text: "Assertion (A): Cell potential E_cell decreases as the galvanic cell discharges.\nReason (R): As the reaction proceeds, the reaction quotient Q approaches the equilibrium constant K_c.",
      options: [
        { id: "A", text: "Both (A) and (R) are true and (R) is correct explanation of (A)" },
        { id: "B", text: "Both (A) and (R) are true but (R) is NOT correct explanation" },
        { id: "C", text: "(A) is true but (R) is false" },
        { id: "D", text: "(A) is false but (R) is true" }
      ],
      correctAnswer: "A",
      explanation: "By the Nernst equation, as Q increases toward K_c, E_cell decreases until it reaches 0 at equilibrium.",
      markingScheme: "+4 for correct, -1 for incorrect"
    }
  ]);

  const handleApproveDraft = (draftId) => {
    const draft = aiDrafts.find(d => d.id === draftId);
    if (!draft) return;

    // Add to verified questions bank
    const approvedQ = {
      ...draft,
      id: `q-verified-${Date.now()}`,
      source: "Verified by Subject Expert & Editor",
      examYear: "2026 Curriculum"
    };

    StorageService.addQuestion(approvedQ);
    setAiDrafts(prev => prev.filter(d => d.id !== draftId));
    setQuestions(StorageService.getQuestions());
    alert(`Question on "${draft.topic}" approved and published to student question bank!`);
  };

  const handleRejectDraft = (draftId) => {
    setAiDrafts(prev => prev.filter(d => d.id !== draftId));
  };

  return (
    <div className="admin-cms-view fade-in">
      {/* 1. HERO CARD */}
      <div className="admin-hero-card">
        <div className="admin-hero-left">
          <div className="admin-icon-tile">
            <ShieldAlert size={26} />
          </div>
          <div>
            <div className="admin-pill-row">
              <span className="badge badge-lime">Teacher & Administration CMS</span>
              <span className="badge badge-lavender">Publishing Workflow</span>
              <span className="badge badge-cream">Curriculum Quality Audit</span>
            </div>
            <h1 className="admin-title">Admin & Content Management Panel (Section 6)</h1>
            <p className="admin-subtitle">
              Manage syllabus hierarchies, review and approve AI-generated question drafts, attach validated marking schemes, and publish versioned educational notes.
            </p>
          </div>
        </div>
      </div>

      {/* 2. ADMIN CMS TABS */}
      <div className="admin-tabs-bar">
        <button
          className={`adm-tab-btn ${activeTab === "approvals" ? "active" : ""}`}
          onClick={() => setActiveTab("approvals")}
        >
          <Sparkles size={16} />
          <span>AI Question Drafts Review ({aiDrafts.length})</span>
        </button>
        <button
          className={`adm-tab-btn ${activeTab === "questions" ? "active" : ""}`}
          onClick={() => setActiveTab("questions")}
        >
          <FileText size={16} />
          <span>Question Bank Registry ({questions.length})</span>
        </button>
        <button
          className={`adm-tab-btn ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          <FolderTree size={16} />
          <span>Syllabus & Notes Manager</span>
        </button>
      </div>

      {/* 3. TAB 1: AI DRAFT APPROVAL WORKFLOW */}
      {activeTab === "approvals" && (
        <div className="admin-approvals-content fade-in">
          {/* Publishing Workflow Steps Bar */}
          <div className="workflow-steps-banner">
            <div className="workflow-step active">
              <span className="step-circle">1</span>
              <span>AI / Teacher Draft</span>
            </div>
            <div className="workflow-connector"></div>
            <div className="workflow-step current">
              <span className="step-circle">2</span>
              <span>Subject Expert Check</span>
            </div>
            <div className="workflow-connector"></div>
            <div className="workflow-step">
              <span className="step-circle">3</span>
              <span>Editor Verification</span>
            </div>
            <div className="workflow-connector"></div>
            <div className="workflow-step">
              <span className="step-circle">4</span>
              <span>Published to Students</span>
            </div>
          </div>

          {aiDrafts.length === 0 ? (
            <div className="empty-state-card">
              <CheckCircle2 size={42} className="text-success" />
              <h3>All Question Drafts Approved!</h3>
              <p>No questions currently pending expert review.</p>
            </div>
          ) : (
            <div className="drafts-cards-list">
              {aiDrafts.map((draft) => (
                <div key={draft.id} className="draft-review-card">
                  <div className="draft-card-header">
                    <div className="draft-header-meta">
                      <span className="badge badge-lavender">{draft.subject}</span>
                      <span className="badge badge-lime">{draft.topic}</span>
                      <span className="badge badge-cream">AI Confidence: {draft.accuracyScore}%</span>
                    </div>
                    <span className="draft-author-tag">Author: {draft.author}</span>
                  </div>

                  <h3 className="draft-question-text">{draft.text}</h3>

                  <div className="draft-options-grid">
                    {draft.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`draft-option-pill ${opt.id === draft.correctAnswer ? "correct-pill" : ""}`}
                      >
                        <strong>{opt.id}:</strong> {opt.text}
                        {opt.id === draft.correctAnswer && <span className="correct-tag">✓ Approved Key</span>}
                      </div>
                    ))}
                  </div>

                  <div className="draft-explanation-box">
                    <strong>Step-by-step Solution:</strong>
                    <p>{draft.explanation}</p>
                    <small>Marking Rules: {draft.markingScheme}</small>
                  </div>

                  {/* Approval Actions */}
                  <div className="draft-actions-bar">
                    <button
                      className="pill-btn pill-btn-outline pill-btn-sm"
                      onClick={() => handleRejectDraft(draft.id)}
                    >
                      <XCircle size={15} />
                      <span>Reject Draft</span>
                    </button>

                    <button
                      className="pill-btn pill-btn-lime pill-btn-sm"
                      onClick={() => handleApproveDraft(draft.id)}
                    >
                      <Check size={15} />
                      <span>Approve & Publish to Question Bank</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. TAB 2: QUESTION BANK REGISTRY */}
      {activeTab === "questions" && (
        <div className="admin-questions-content fade-in">
          <div className="registry-search-bar">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search across 40+ validated questions by topic, statement, or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="questions-registry-table">
            <div className="table-header-row">
              <span className="col-q">Question Statement</span>
              <span className="col-topic">Topic & Subject</span>
              <span className="col-type">Format</span>
              <span className="col-diff">Difficulty</span>
              <span className="col-status">Status</span>
            </div>

            <div className="table-body-rows">
              {questions
                .filter(q =>
                  !searchQuery ||
                  q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  q.topic?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 15)
                .map((q) => (
                  <div key={q.id} className="table-row-item">
                    <span className="col-q">{q.text.slice(0, 75)}...</span>
                    <span className="col-topic">{q.topic || "Topic"}</span>
                    <span className="col-type">{q.type}</span>
                    <span className="col-diff">
                      <span className={`badge ${q.difficulty === "Hard" ? "badge-lavender" : "badge-lime"}`}>
                        {q.difficulty}
                      </span>
                    </span>
                    <span className="col-status">
                      <span className="badge badge-navy">Published</span>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: SYLLABUS & NOTES MANAGER */}
      {activeTab === "notes" && (
        <div className="admin-notes-content fade-in">
          <div className="notes-manager-banner">
            <div>
              <h3>Syllabus Versioning & Notes Manager</h3>
              <p>NCERT 2026 Academic Syllabus mapped with clickable scientific terms and video links.</p>
            </div>
            <button className="pill-btn pill-btn-lime" onClick={() => onNavigate("smart-notes")}>
              <span>Open Live Notes Reader</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="notes-modules-grid">
            {[
              { title: "Evolution & Natural Selection", course: "Class 12 Biology", topics: 4, questions: 12, terms: 5, status: "Published" },
              { title: "Electrochemistry & Nernst Equation", course: "Class 12 Chemistry", topics: 3, questions: 12, terms: 4, status: "Published" },
              { title: "Photoelectric Effect & Quantum Physics", course: "Class 12 Physics", topics: 3, questions: 10, terms: 3, status: "Published" },
              { title: "Research Aptitude & Positivism", course: "UGC-NET Paper 1", topics: 4, questions: 10, terms: 4, status: "Published" }
            ].map((mod, idx) => (
              <div key={idx} className="module-card">
                <span className="badge badge-lavender">{mod.course}</span>
                <h4>{mod.title}</h4>
                <div className="module-stats-row">
                  <span>{mod.topics} Topics</span> • <span>{mod.questions} Questions</span> • <span>{mod.terms} Terms</span>
                </div>
                <div className="module-status-line">
                  <CheckCircle2 size={14} className="text-success" />
                  <span>Version 2026.1 (Active)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
