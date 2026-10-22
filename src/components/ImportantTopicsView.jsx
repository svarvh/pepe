import React, { useState } from "react";
import {
  BookmarkCheck,
  Search,
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  X,
  FileCheck2,
  Award
} from "lucide-react";
import { StorageService } from "../services/storage";

export default function ImportantTopicsView({ onPracticeTopic, onNavigate }) {
  const standardTopics = StorageService.getTopics();
  const publishedFacultyTopics = StorageService.getPublishedFacultyTopics().map(ft => ({
    id: ft.id,
    title: ft.title,
    unit: ft.chapter || ft.subject,
    subjectId: ft.subjectId || "bio",
    priority: ft.priority || "High",
    isFacultyCurated: true,
    facultyReasoning: ft.facultyReasoning,
    status: "in_progress",
    weightage: "12-15% (Core Board)",
    overview: ft.explanation || "Curated high-yield topic designated by faculty.",
    formulas: ft.formulas || [],
    keyPoints: ft.keyPoints || [],
    estimatedHours: 2.5
  }));

  const [topics, setTopics] = useState([...publishedFacultyTopics, ...standardTopics]);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Selected topic detail drawer
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeTab, setActiveTab] = useState("notes"); // 'notes', 'formulas', 'questions'

  const filteredTopics = topics.filter(t => {
    if (selectedSubject !== "all" && t.subjectId !== selectedSubject) return false;
    if (selectedPriority !== "all" && t.priority !== selectedPriority) return false;
    if (selectedStatus !== "all" && t.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.unit.toLowerCase().includes(q) || t.overview.toLowerCase().includes(q);
    }
    return true;
  });

  const handleStatusChange = (topicId, newStatus) => {
    const updated = StorageService.updateTopicStatus(topicId, newStatus);
    setTopics(updated);
    if (activeTopic && activeTopic.id === topicId) {
      setActiveTopic({ ...activeTopic, status: newStatus });
    }
  };

  const getPriorityBadgeClass = (priority) => {
    if (priority === "High") return "badge-lime";
    if (priority === "Medium") return "badge-cream";
    return "badge-lavender";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="badge badge-lime">Completed</span>;
      case "revised":
        return <span className="badge badge-lavender">Revised</span>;
      case "in_progress":
        return <span className="badge badge-cream">In Progress</span>;
      default:
        return <span className="badge badge-navy">Not Started</span>;
    }
  };

  return (
    <div className="topics-view fade-in">
      {/* Top Header Card */}
      <div className="topics-header-card">
        <div className="topics-header-info">
          <div className="topics-icon-tile">
            <BookmarkCheck size={24} />
          </div>
          <div>
            <h2 className="section-title">Important Topics & Study Notes</h2>
            <p className="topics-desc">
              Curated high-yield topics organized by syllabus weightage, frequency in previous papers, and revision priority.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="topics-filter-bar">
        <div className="topics-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search topics, formulas, or concepts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="topics-dropdowns-row">
          <select
            className="filter-pill-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            <option value="phys">Physics</option>
            <option value="chem">Chemistry</option>
            <option value="math">Mathematics</option>
            <option value="bio">Biology</option>
          </select>

          <select
            className="filter-pill-select"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="High">High Yield</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            className="filter-pill-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="revised">Revised</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="topics-grid">
        {filteredTopics.map(topic => (
          <div
            key={topic.id}
            className="topic-card"
            onClick={() => setActiveTopic(topic)}
          >
            <div className="topic-card-top">
              <div className="topic-badges-row">
                <span className={`badge ${getPriorityBadgeClass(topic.priority)}`}>
                  {topic.priority} Yield
                </span>
                {getStatusBadge(topic.status)}
              </div>
              <span className="topic-unit-label">{topic.unit}</span>
            </div>

            <h3 className="topic-title">{topic.title}</h3>
            <p className="topic-overview-snip">{topic.overview}</p>

            <div className="topic-tested-freq">
              <Sparkles size={14} className="sparkle-gold" />
              <span>{topic.testedFrequency}</span>
            </div>

            <div className="topic-card-footer">
              <button
                className="pill-btn pill-btn-dark topic-study-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTopic(topic);
                }}
              >
                <BookOpen size={14} />
                <span>Read Notes</span>
              </button>

              <button
                className="pill-btn pill-btn-lime topic-practice-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPracticeTopic) {
                    onPracticeTopic(topic);
                  } else {
                    onNavigate("practice");
                  }
                }}
              >
                <Play size={14} />
                <span>Practice Topic</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Topic Study Drawer / Modal */}
      {activeTopic && (
        <div className="modal-backdrop fade-in">
          <div className="topic-drawer-modal">
            {/* Drawer Header */}
            <div className="topic-drawer-header">
              <div className="drawer-title-col">
                <div className="drawer-badges">
                  <span className={`badge ${getPriorityBadgeClass(activeTopic.priority)}`}>
                    {activeTopic.priority} Priority
                  </span>
                  <span className="badge badge-navy">{activeTopic.unit}</span>
                  <span className="badge badge-cream">{activeTopic.testedFrequency}</span>
                </div>
                <h2>{activeTopic.title}</h2>
              </div>

              <div className="drawer-header-actions">
                {/* Status Switcher */}
                <select
                  className="status-selector-pill"
                  value={activeTopic.status}
                  onChange={(e) => handleStatusChange(activeTopic.id, e.target.value)}
                >
                  <option value="not_started">Mark: Not Started</option>
                  <option value="in_progress">Mark: In Progress</option>
                  <option value="revised">Mark: Revised</option>
                  <option value="completed">Mark: Completed</option>
                </select>

                <button
                  className="drawer-close-btn"
                  onClick={() => setActiveTopic(null)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="topic-drawer-tabs">
              <button
                className={`drawer-tab-btn ${activeTab === "notes" ? "active" : ""}`}
                onClick={() => setActiveTab("notes")}
              >
                Revision Notes & Concepts
              </button>
              <button
                className={`drawer-tab-btn ${activeTab === "formulas" ? "active" : ""}`}
                onClick={() => setActiveTab("formulas")}
              >
                Key Formulas & Definitions
              </button>
              <button
                className={`drawer-tab-btn ${activeTab === "questions" ? "active" : ""}`}
                onClick={() => setActiveTab("questions")}
              >
                High-Yield Practice Questions
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="topic-drawer-body">
              {activeTab === "notes" && (
                <div className="drawer-tab-content fade-in">
                  <div className="note-card-box">
                    <h4 className="note-box-title">Topic Overview</h4>
                    <p>{activeTopic.overview}</p>
                  </div>

                  <div className="note-card-box">
                    <h4 className="note-box-title">Important Concepts</h4>
                    <ul className="bullet-list">
                      {activeTopic.keyConcepts.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="note-card-box highlight-box">
                    <h4 className="note-box-title">Concise Exam Revision Summary</h4>
                    <p>{activeTopic.revisionNotes}</p>
                  </div>
                </div>
              )}

              {activeTab === "formulas" && (
                <div className="drawer-tab-content fade-in">
                  <div className="formulas-grid">
                    {activeTopic.formulas.map((formula, idx) => (
                      <div key={idx} className="formula-card">
                        <span className="formula-badge">Formula {idx + 1}</span>
                        <code className="formula-code">{formula}</code>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "questions" && (
                <div className="drawer-tab-content fade-in">
                  <div className="topic-practice-cta-card">
                    <div className="topic-cta-info">
                      <h4>Practice High-Yield {activeTopic.title} Questions</h4>
                      <p>Timed session with instant explanations and analytics recording.</p>
                    </div>
                    <button
                      className="pill-btn pill-btn-lime"
                      onClick={() => {
                        setActiveTopic(null);
                        if (onPracticeTopic) {
                          onPracticeTopic(activeTopic);
                        } else {
                          onNavigate("practice");
                        }
                      }}
                    >
                      <Play size={16} />
                      <span>Start Topic Drill</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
