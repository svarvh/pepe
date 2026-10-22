import React, { useState } from "react";
import {
  FileText,
  Search,
  Download,
  Eye,
  Play,
  Printer,
  ZoomIn,
  ZoomOut,
  X,
  CheckCircle,
  Plus,
  BookOpen,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Key
} from "lucide-react";
import { StorageService } from "../services/storage";

export default function PYPPapersView({ onStartPracticeWithPaper, onNavigate }) {
  const standardPapers = StorageService.getPapers();
  const publishedFacultyPapers = StorageService.getPublishedFacultyPapers().map(fp => ({
    id: fp.id,
    title: fp.title,
    exam: fp.classGrade || "Class 12",
    examId: fp.subjectId || "chem_12",
    board: "Faculty Prepared Assessment",
    subject: fp.subject,
    subjectId: fp.subjectId,
    year: "2026",
    paperType: fp.examType || "Faculty Pre-Board Examination",
    pages: Math.ceil((fp.questions?.length || 10) / 3),
    questionsCount: fp.questions?.length || 10,
    duration: `${fp.durationMinutes || 90} mins`,
    solved: true,
    hasAnswerKey: true,
    isFacultyCreated: true,
    ownerName: fp.ownerName || "Prof. Sunita Rao",
    downloadUrl: "#",
    summary: `Official assessment compiled by ${fp.ownerName || "Prof. Sunita Rao"}. Max Marks: ${fp.maxMarks}. Features combination of faculty problems and AI-grounded practice.`
  }));

  const [papers, setPapers] = useState([...publishedFacultyPapers, ...standardPapers]);
  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // In-browser viewer modal
  const [activePaper, setActivePaper] = useState(null);
  const [viewerPage, setViewerPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showSolutionKey, setShowSolutionKey] = useState(false);

  // Add Paper Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newExam, setNewExam] = useState("MCAT");
  const [newSubject, setNewSubject] = useState("Physics");
  const [newYear, setNewYear] = useState("2024");
  const [newPaperType, setNewPaperType] = useState("Official Solved Paper");

  // Filtering
  const filteredPapers = papers.filter(p => {
    if (examFilter !== "all" && p.exam !== examFilter) return false;
    if (subjectFilter !== "all" && !p.subject.toLowerCase().includes(subjectFilter.toLowerCase())) return false;
    if (yearFilter !== "all" && p.year !== yearFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.board.toLowerCase().includes(q) || p.subject.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenViewer = (paper) => {
    setActivePaper(paper);
    setViewerPage(1);
    setZoomLevel(100);
    setShowSolutionKey(false);
  };

  const handleAddPaperSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert("Please enter a paper title");
      return;
    }

    const created = {
      id: `pyp-custom-${Date.now()}`,
      title: newTitle,
      exam: newExam,
      examId: newExam.toLowerCase(),
      board: "User Uploaded Archive",
      subject: newSubject,
      subjectId: newSubject.toLowerCase(),
      year: newYear,
      paperType: newPaperType,
      pages: 12,
      questionsCount: 30,
      duration: "90 mins",
      solved: true,
      hasAnswerKey: true,
      downloadUrl: "#",
      summary: `User imported official previous-year assessment for ${newExam} ${newYear}.`
    };

    const updated = StorageService.addPaper(created);
    setPapers(updated);
    setShowAddModal(false);
    setNewTitle("");
    alert("New paper added to the repository!");
  };

  const handleDownloadSimulated = (paper) => {
    const textData = `CAPLEN EXAM PREP - PREVIOUS YEAR PAPER REPOSITORY\nTitle: ${paper.title}\nExam: ${paper.exam} | Year: ${paper.year}\nBoard: ${paper.board}\nSubject: ${paper.subject}\n\nSummary:\n${paper.summary}\n\n[Official Solved Solutions included in the Caplen in-browser viewer.]`;
    const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${paper.exam}_${paper.year}_${paper.subject.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pyq-view fade-in">
      {/* Top Header */}
      <div className="pyq-header-card">
        <div className="pyq-header-left">
          <div className="pyq-icon-box">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="section-title">Previous Year Question Papers</h2>
            <p className="pyq-subtext">
              Search authentic previous-year question papers, official answer keys, and model solutions.
            </p>
          </div>
        </div>

        <button
          className="pill-btn pill-btn-dark add-paper-btn"
          id="btn-add-paper"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          <span>Upload Paper</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="pyq-filter-bar">
        <div className="pyq-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search papers by keyword, board, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="pyq-filters-row">
          <select
            className="filter-pill-select"
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
          >
            <option value="all">All Exams</option>
            <option value="MCAT">MCAT</option>
            <option value="SAT">SAT</option>
            <option value="JEE Advanced">JEE Advanced</option>
            <option value="GRE">GRE</option>
            <option value="CBSE Class 12">CBSE Class 12</option>
          </select>

          <select
            className="filter-pill-select"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select
            className="filter-pill-select"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="all">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
      </div>

      {/* Paper Cards Grid */}
      <div className="pyq-grid">
        {filteredPapers.map(paper => (
          <div key={paper.id} className="pyq-paper-card">
            <div className="paper-card-top">
              <div className="paper-tags">
                <span className="badge badge-navy">{paper.exam}</span>
                <span className="badge badge-lime">{paper.year}</span>
                <span className="badge badge-cream">{paper.paperType}</span>
              </div>
              <span className="paper-board-label">{paper.board}</span>
            </div>

            <h3 className="paper-card-title">{paper.title}</h3>
            <p className="paper-card-summary">{paper.summary}</p>

            <div className="paper-meta-specs">
              <span>{paper.pages} Pages</span>
              <span>•</span>
              <span>{paper.questionsCount} Questions</span>
              <span>•</span>
              <span>{paper.duration}</span>
            </div>

            <div className="paper-card-actions">
              <button
                className="pill-btn pill-btn-dark view-paper-btn"
                onClick={() => handleOpenViewer(paper)}
              >
                <Eye size={15} />
                <span>View Paper</span>
              </button>

              <button
                className="pill-btn pill-btn-lime practice-paper-btn"
                title="Practice as a timed mock test"
                onClick={() => {
                  if (onStartPracticeWithPaper) {
                    onStartPracticeWithPaper(paper);
                  } else {
                    onNavigate("practice");
                  }
                }}
              >
                <Play size={15} />
                <span>Practice Test</span>
              </button>

              <button
                className="icon-only-btn"
                title="Download archive file"
                onClick={() => handleDownloadSimulated(paper)}
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* In-Browser Paper Viewer Modal */}
      {activePaper && (
        <div className="modal-backdrop fade-in">
          <div className="paper-viewer-modal">
            {/* Viewer Toolbar */}
            <div className="viewer-toolbar">
              <div className="viewer-title-col">
                <span className="badge badge-lime">{activePaper.year} Official</span>
                <h3 className="viewer-paper-title">{activePaper.title}</h3>
              </div>

              <div className="viewer-controls">
                <div className="viewer-page-nav">
                  <button
                    className="viewer-btn-sm"
                    disabled={viewerPage <= 1}
                    onClick={() => setViewerPage(viewerPage - 1)}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="page-indicator">Page {viewerPage} of 4</span>
                  <button
                    className="viewer-btn-sm"
                    disabled={viewerPage >= 4}
                    onClick={() => setViewerPage(viewerPage + 1)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="viewer-zoom-controls">
                  <button
                    className="viewer-btn-sm"
                    onClick={() => setZoomLevel(Math.max(zoomLevel - 15, 70))}
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="zoom-text">{zoomLevel}%</span>
                  <button
                    className="viewer-btn-sm"
                    onClick={() => setZoomLevel(Math.min(zoomLevel + 15, 140))}
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>

                <button
                  className={`pill-btn ${showSolutionKey ? "pill-btn-lime" : "pill-btn-white"}`}
                  onClick={() => setShowSolutionKey(!showSolutionKey)}
                >
                  <Key size={14} />
                  <span>Solutions Drawer</span>
                </button>

                <button
                  className="viewer-btn-sm"
                  title="Print paper"
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                </button>

                <button
                  className="viewer-btn-sm"
                  title="Download"
                  onClick={() => handleDownloadSimulated(activePaper)}
                >
                  <Download size={16} />
                </button>

                <button
                  className="viewer-btn-close"
                  onClick={() => setActivePaper(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Viewer Workspace */}
            <div className="viewer-workspace">
              {/* Main Document Canvas */}
              <div className="viewer-document-container" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}>
                <div className="paper-page-sheet">
                  <div className="sheet-header">
                    <div className="sheet-watermark">{activePaper.board} • CONFIDENTIAL EXAMINATION</div>
                    <div className="sheet-exam-info">
                      <h2>{activePaper.exam} — SECTION ASSESSMENT</h2>
                      <p>Subject: {activePaper.subject} | Paper Code: {activePaper.year}-A | Duration: {activePaper.duration}</p>
                    </div>
                  </div>

                  <div className="sheet-divider" />

                  {/* Simulated Authentic Exam Questions on Page */}
                  <div className="sheet-questions-body">
                    <div className="exam-question-block">
                      <span className="q-number">Q{viewerPage * 3 - 2}.</span>
                      <div className="q-content">
                        <p className="q-text">
                          A 50.0 mL aliquot of 0.100 M acetic acid (CH3COOH, Ka = 1.8 × 10⁻⁵) is titrated with 0.100 M NaOH. Calculate the pH of the solution after the addition of 25.0 mL of the titrant at 25°C.
                        </p>
                        <div className="exam-options-grid">
                          <span>(A) 3.87</span>
                          <span>(B) 4.74</span>
                          <span>(C) 5.12</span>
                          <span>(D) 7.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="exam-question-block">
                      <span className="q-number">Q{viewerPage * 3 - 1}.</span>
                      <div className="q-content">
                        <p className="q-text">
                          In an elastic collision between two spherical bodies of equal mass on a frictionless surface, if one body was initially at rest, what is the angle between their post-collision velocity vectors?
                        </p>
                        <div className="exam-options-grid">
                          <span>(A) 45°</span>
                          <span>(B) 60°</span>
                          <span>(C) 90°</span>
                          <span>(D) 180°</span>
                        </div>
                      </div>
                    </div>

                    <div className="exam-question-block">
                      <span className="q-number">Q{viewerPage * 3}.</span>
                      <div className="q-content">
                        <p className="q-text">
                          Which enzyme relieves torsional strain ahead of the replication fork by inducing transient single- or double-strand breaks in eukaryotic DNA?
                        </p>
                        <div className="exam-options-grid">
                          <span>(A) Topoisomerase (Gyrase)</span>
                          <span>(B) DNA Helicase</span>
                          <span>(C) Single-Stranded Binding Protein</span>
                          <span>(D) DNA Polymerase delta</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sheet-footer">
                    <span>Page {viewerPage} of 4</span>
                    <span>DO NOT WRITE IN MARGINS</span>
                  </div>
                </div>
              </div>

              {/* Verified Solution Key Side Drawer */}
              {showSolutionKey && (
                <div className="viewer-solution-drawer fade-in">
                  <div className="drawer-header">
                    <h4>Official Answer Key & Hints</h4>
                    <button className="subtle-close-btn" onClick={() => setShowSolutionKey(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  <div className="drawer-content">
                    <div className="solution-item">
                      <strong>Q{viewerPage * 3 - 2}: (B) 4.74</strong>
                      <p>At 25.0 mL, exactly half of the acetic acid is neutralized. By Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]) = pKa + log(1) = pKa = -log10(1.8 × 10⁻⁵) = 4.74.</p>
                    </div>
                    <div className="solution-item">
                      <strong>Q{viewerPage * 3 - 1}: (C) 90°</strong>
                      <p>By simultaneous conservation of kinetic energy and linear momentum for identical masses, v1 · v2 = 0, proving perpendicular separation (90°).</p>
                    </div>
                    <div className="solution-item">
                      <strong>Q{viewerPage * 3}: (A) Topoisomerase</strong>
                      <p>Topoisomerase relaxes positive supercoils created by helicase unwinding.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Paper Modal */}
      {showAddModal && (
        <div className="modal-backdrop fade-in">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Upload Previous Year Question Paper</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddPaperSubmit} className="modal-body-form">
              <div className="form-group-block">
                <label className="form-label">Paper Title</label>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="e.g. MCAT Physical Sciences 2024 Solved Paper"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-two-col">
                <div className="form-group-block">
                  <label className="form-label">Exam</label>
                  <select
                    className="custom-input"
                    value={newExam}
                    onChange={(e) => setNewExam(e.target.value)}
                  >
                    <option value="MCAT">MCAT</option>
                    <option value="SAT">SAT</option>
                    <option value="JEE Advanced">JEE Advanced</option>
                    <option value="GRE">GRE</option>
                    <option value="CBSE Class 12">CBSE Class 12</option>
                  </select>
                </div>

                <div className="form-group-block">
                  <label className="form-label">Examination Year</label>
                  <input
                    type="text"
                    className="custom-input"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-two-col">
                <div className="form-group-block">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="custom-input"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                  />
                </div>

                <div className="form-group-block">
                  <label className="form-label">Paper Type</label>
                  <select
                    className="custom-input"
                    value={newPaperType}
                    onChange={(e) => setNewPaperType(e.target.value)}
                  >
                    <option value="Official Solved Paper">Official Solved Paper</option>
                    <option value="Model Paper">Model Paper</option>
                    <option value="Board Exam Paper">Board Exam Paper</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer-row">
                <button
                  type="button"
                  className="pill-btn pill-btn-white"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="pill-btn pill-btn-dark"
                >
                  Save & Publish Paper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
