import React, { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  Database,
  Sparkles,
  BookOpen,
  FileText,
  Users,
  Send,
  CheckCircle2,
  Settings,
  Search,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  X,
  RefreshCw
} from "lucide-react";
import { StorageService } from "../services/storage";
import { AuthService } from "../services/authService";
import {
  COURSES_CATALOG,
  TERMINOLOGY_DATABASE
} from "../data/edtechCurriculum";
import AdminCMSView from "./AdminCMSView";
import LaunchChecklistView from "./LaunchChecklistView";

export default function AdminPanel({
  currentUser,
  onNavigateToStudent,
  onAdminLogout
}) {
  const [activeAdminTab, setActiveAdminTab] = useState("admin-overview");
  const [questionsList, setQuestionsList] = useState([]);
  const [papersList, setPapersList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Add question modal state
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [newQuestionStem, setNewQuestionStem] = useState("");
  const [newQuestionType, setNewQuestionType] = useState("MCQ");
  const [newQuestionSubject, setNewQuestionSubject] = useState("bio_12");
  const [newQuestionDifficulty, setNewQuestionDifficulty] = useState("Medium");
  const [newQuestionOptionA, setNewQuestionOptionA] = useState("");
  const [newQuestionOptionB, setNewQuestionOptionB] = useState("");
  const [newQuestionOptionC, setNewQuestionOptionC] = useState("");
  const [newQuestionOptionD, setNewQuestionOptionD] = useState("");
  const [newQuestionCorrect, setNewQuestionCorrect] = useState("A");
  const [newQuestionExplanation, setNewQuestionExplanation] = useState("");

  // New paper modal state
  const [isAddPaperOpen, setIsAddPaperOpen] = useState(false);
  const [newPaperTitle, setNewPaperTitle] = useState("");
  const [newPaperSubject, setNewPaperSubject] = useState("CBSE Class 12 Biology");
  const [newPaperYear, setNewPaperYear] = useState("2024");
  const [newPaperQuestionsCount, setNewPaperQuestionsCount] = useState(30);

  const [notificationNotice, setNotificationNotice] = useState("");

  const refreshAdminData = useCallback(() => {
    setQuestionsList(StorageService.getQuestions());
    setPapersList(StorageService.getPapers());
    try {
      setUsersList(AuthService.getAllUsers());
    } catch {
      setUsersList([]);
    }
  }, []);

  useEffect(() => {
    refreshAdminData();
  }, [refreshAdminData]);

  const showToast = (msg) => {
    setNotificationNotice(msg);
    setTimeout(() => setNotificationNotice(""), 4000);
  };

  // Question bank operations
  const handleDeleteQuestion = (qId) => {
    if (confirm(`Are you sure you want to delete question ID: ${qId}?`)) {
      StorageService.deleteQuestion(qId);
      refreshAdminData();
      showToast(`Question ${qId} successfully deleted.`);
    }
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionStem.trim()) return;

    const newQ = {
      id: `q-custom-${Date.now()}`,
      stem: newQuestionStem,
      type: newQuestionType,
      subjectId: newQuestionSubject,
      subject: newQuestionSubject.includes("bio") ? "Biology" : newQuestionSubject.includes("chem") ? "Chemistry" : "Physics",
      difficulty: newQuestionDifficulty,
      options: [
        { id: "A", text: newQuestionOptionA || "Option A" },
        { id: "B", text: newQuestionOptionB || "Option B" },
        { id: "C", text: newQuestionOptionC || "Option C" },
        { id: "D", text: newQuestionOptionD || "Option D" }
      ],
      correctOption: newQuestionCorrect,
      explanation: newQuestionExplanation || "Verified by Academic Admin",
      tags: ["Admin Verified", "Curriculum Aligned"]
    };

    StorageService.addQuestion(newQ);
    refreshAdminData();
    setIsAddQuestionOpen(false);
    setNewQuestionStem("");
    setNewQuestionOptionA("");
    setNewQuestionOptionB("");
    setNewQuestionOptionC("");
    setNewQuestionOptionD("");
    setNewQuestionExplanation("");
    showToast("New question added to live question bank!");
  };

  // Add Paper Operation
  const handleCreatePaper = (e) => {
    e.preventDefault();
    if (!newPaperTitle.trim()) return;

    const paper = {
      id: `pyq-${Date.now()}`,
      title: newPaperTitle,
      subject: newPaperSubject,
      year: parseInt(newPaperYear, 10),
      totalMarks: 70,
      durationMinutes: 180,
      questionsCount: parseInt(newPaperQuestionsCount, 10),
      difficulty: "Medium",
      status: "Published",
      publishedAt: new Date().toISOString()
    };

    StorageService.addPaper(paper);
    refreshAdminData();
    setIsAddPaperOpen(false);
    setNewPaperTitle("");
    showToast(`Paper "${paper.title}" published to student portal.`);
  };

  // Filtered Questions
  const filteredQuestions = questionsList.filter((q) => {
    const matchesSearch =
      q.stem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || q.subjectId === filterSubject || q.subject?.toLowerCase().includes(filterSubject);
    const matchesType = filterType === "all" || q.type === filterType;
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="admin-layout-root">
      {/* 1. Admin Persistent Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand-header">
          <div className="admin-brand-icon">
            <ShieldCheck size={22} className="text-emerald" />
          </div>
          <div className="admin-brand-text">
            <span className="admin-brand-title">Caplen Admin</span>
            <span className="admin-brand-badge">CONTROL PANEL</span>
          </div>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-group-title">CORE ADMINISTRATION</div>

          <button
            onClick={() => setActiveAdminTab("admin-overview")}
            className={`admin-nav-item ${activeAdminTab === "admin-overview" ? "active" : ""}`}
          >
            <LayoutDashboard size={18} />
            <span>Admin Dashboard</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("admin-questions")}
            className={`admin-nav-item ${activeAdminTab === "admin-questions" ? "active" : ""}`}
          >
            <Database size={18} />
            <span>Question Bank</span>
            <span className="admin-count-badge">{questionsList.length}</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("admin-ai-review")}
            className={`admin-nav-item ${activeAdminTab === "admin-ai-review" ? "active" : ""}`}
          >
            <Sparkles size={18} />
            <span>AI Question Review</span>
            <span className="admin-count-badge pending">2</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("admin-syllabus")}
            className={`admin-nav-item ${activeAdminTab === "admin-syllabus" ? "active" : ""}`}
          >
            <BookOpen size={18} />
            <span>Syllabus & Notes CMS</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("admin-pyq")}
            className={`admin-nav-item ${activeAdminTab === "admin-pyq" ? "active" : ""}`}
          >
            <FileText size={18} />
            <span>Previous-Year Papers</span>
            <span className="admin-count-badge">{papersList.length}</span>
          </button>

          <div className="admin-nav-group-title">GOVERNANCE & AUDIT</div>

          <button
            onClick={() => setActiveAdminTab("admin-users")}
            className={`admin-nav-item ${activeAdminTab === "admin-users" ? "active" : ""}`}
          >
            <Users size={18} />
            <span>User Management</span>
            <span className="admin-count-badge">{usersList.length}</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("admin-publishing")}
            className={`admin-nav-item ${activeAdminTab === "admin-publishing" ? "active" : ""}`}
          >
            <Send size={18} />
            <span>Content Publishing</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("admin-readiness")}
            className={`admin-nav-item ${activeAdminTab === "admin-readiness" ? "active" : ""}`}
          >
            <CheckCircle2 size={18} />
            <span>Platform Readiness</span>
            <span className="admin-count-badge success">20/20</span>
          </button>

          <button
            onClick={() => setActiveAdminTab("admin-settings")}
            className={`admin-nav-item ${activeAdminTab === "admin-settings" ? "active" : ""}`}
          >
            <Settings size={18} />
            <span>Platform Settings</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            onClick={onNavigateToStudent}
            className="btn-switch-to-student"
            title="Preview student dashboard without logging out"
          >
            <ExternalLink size={15} />
            <span>View Student Portal</span>
          </button>

          <button
            onClick={onAdminLogout}
            className="btn-admin-logout"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Admin Main Content Area */}
      <div className="admin-content-layout">
        {/* Top Header */}
        <header className="admin-top-header">
          <div className="admin-top-left">
            <h1 className="admin-page-title">
              {activeAdminTab === "admin-overview" && "Platform Administration Dashboard"}
              {activeAdminTab === "admin-questions" && "Question Bank Management"}
              {activeAdminTab === "admin-ai-review" && "AI Question Editorial Review"}
              {activeAdminTab === "admin-syllabus" && "Syllabus Hierarchy & Study Notes"}
              {activeAdminTab === "admin-pyq" && "Previous-Year Exam Papers CMS"}
              {activeAdminTab === "admin-users" && "User Accounts & Role Governance"}
              {activeAdminTab === "admin-publishing" && "Content Publishing & Audit Trail"}
              {activeAdminTab === "admin-readiness" && "Production Go-Live Readiness"}
              {activeAdminTab === "admin-settings" && "System & AI Parameters"}
            </h1>
            <span className="admin-env-pill">RBAC Verified • Production</span>
          </div>

          <div className="admin-top-actions">
            {notificationNotice && (
              <div className="admin-toast-banner fade-in">
                <CheckCircle2 size={15} />
                <span>{notificationNotice}</span>
              </div>
            )}

            <div className="admin-profile-pill">
              <div className="admin-avatar">
                {currentUser?.name ? currentUser.name.charAt(0) : "A"}
              </div>
              <div className="admin-profile-meta">
                <span className="admin-user-name">{currentUser?.name || "Dr. Vikram Malhotra"}</span>
                <span className="admin-role-badge">Faculty Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main className="admin-viewport">
          {/* 1. Admin Overview Dashboard */}
          {activeAdminTab === "admin-overview" && (
            <div className="admin-view-fade">
              {/* Stat Cards Grid */}
              <div className="admin-stats-four-grid">
                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Total Questions in Bank</span>
                    <Database size={18} className="text-emerald" />
                  </div>
                  <div className="stat-value">{questionsList.length}</div>
                  <div className="stat-sub">Across 4 curriculum tracks</div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Curriculum Tracks</span>
                    <BookOpen size={18} className="text-emerald" />
                  </div>
                  <div className="stat-value">{COURSES_CATALOG.length}</div>
                  <div className="stat-sub">Class 9–10, 11–12, JEE, UGC-NET</div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Pending AI Drafts</span>
                    <Sparkles size={18} className="text-amber" />
                  </div>
                  <div className="stat-value">2</div>
                  <div className="stat-sub">Ready for editorial approval</div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">System Readiness</span>
                    <CheckCircle2 size={18} className="text-emerald" />
                  </div>
                  <div className="stat-value">20 / 20</div>
                  <div className="stat-sub">100% Launch criteria verified</div>
                </div>
              </div>

              {/* Quick Actions & System Info */}
              <div className="admin-dashboard-two-col">
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <h3>Administrative Quick Actions</h3>
                  </div>
                  <div className="admin-quick-grid">
                    <button
                      onClick={() => {
                        setActiveAdminTab("admin-questions");
                        setIsAddQuestionOpen(true);
                      }}
                      className="quick-action-box"
                    >
                      <Plus size={20} className="text-emerald" />
                      <strong>Add New Question</strong>
                      <span>Direct entry into live question bank</span>
                    </button>

                    <button
                      onClick={() => setActiveAdminTab("admin-ai-review")}
                      className="quick-action-box"
                    >
                      <Sparkles size={20} className="text-emerald" />
                      <strong>Review AI Drafts</strong>
                      <span>Approve or reject generated questions</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveAdminTab("admin-pyq");
                        setIsAddPaperOpen(true);
                      }}
                      className="quick-action-box"
                    >
                      <FileText size={20} className="text-emerald" />
                      <strong>Upload Past Paper</strong>
                      <span>Publish board or entrance exam papers</span>
                    </button>

                    <button
                      onClick={() => setActiveAdminTab("admin-readiness")}
                      className="quick-action-box"
                    >
                      <CheckCircle2 size={20} className="text-emerald" />
                      <strong>Verify Launch List</strong>
                      <span>Inspect 20-point release checklist</span>
                    </button>
                  </div>
                </div>

                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <h3>Recent Administrative Activity</h3>
                  </div>
                  <div className="admin-activity-list">
                    <div className="activity-item">
                      <div className="activity-dot green" />
                      <div className="activity-details">
                        <strong>AI Draft Approved: Photosynthesis Calvin Cycle</strong>
                        <span>Published to Class 11-12 NCERT Biology bank</span>
                        <small>Today at 10:45 AM by Dr. Vikram Malhotra</small>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-dot blue" />
                      <div className="activity-details">
                        <strong>New Past Paper Uploaded: CBSE Biology 2024</strong>
                        <span>30 questions with step-by-step marking schemes</span>
                        <small>Yesterday at 04:15 PM</small>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-dot purple" />
                      <div className="activity-details">
                        <strong>Terminology Updated: Disruptive Selection</strong>
                        <span>Added Hindi translation & Web Speech audio guide</span>
                        <small>Oct 21, 2026</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Question Bank Management */}
          {activeAdminTab === "admin-questions" && (
            <div className="admin-view-fade">
              {/* Question Bank Toolbar */}
              <div className="admin-toolbar-row">
                <div className="search-input-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search questions by stem, keyword, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="admin-search-field"
                  />
                </div>

                <div className="toolbar-filters">
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Subjects</option>
                    <option value="bio_12">Class 12 Biology</option>
                    <option value="chem_12">Class 12 Chemistry</option>
                    <option value="phys_12">Class 12 Physics</option>
                    <option value="bio">Biology</option>
                    <option value="chem">Chemistry</option>
                    <option value="phys">Physics</option>
                  </select>

                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Question Types</option>
                    <option value="MCQ">Single Choice (MCQ)</option>
                    <option value="Assertion-Reason">Assertion-Reason</option>
                    <option value="Numerical">Numerical</option>
                    <option value="Multiple-Select">Multiple-Select</option>
                    <option value="Match-Columns">Match Columns</option>
                  </select>

                  <button
                    onClick={() => setIsAddQuestionOpen(true)}
                    className="btn-admin-primary"
                  >
                    <Plus size={16} /> Add Question
                  </button>
                </div>
              </div>

              {/* Questions Table */}
              <div className="admin-table-card">
                <div className="table-header-info">
                  <span>Showing {filteredQuestions.length} of {questionsList.length} questions</span>
                </div>

                <div className="table-responsive">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Type</th>
                        <th>Question Stem</th>
                        <th>Difficulty</th>
                        <th>Correct Key</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuestions.map((q) => (
                        <tr key={q.id}>
                          <td><code>{q.id}</code></td>
                          <td><span className="badge-subject">{q.subject || q.subjectId}</span></td>
                          <td><span className="badge-type">{q.type || "MCQ"}</span></td>
                          <td className="stem-cell">
                            <div className="stem-snippet" title={q.stem}>
                              {q.stem}
                            </div>
                          </td>
                          <td>
                            <span className={`badge-difficulty ${q.difficulty?.toLowerCase()}`}>
                              {q.difficulty || "Medium"}
                            </span>
                          </td>
                          <td><strong>{Array.isArray(q.correctOption) ? q.correctOption.join(", ") : (q.correctOption || q.correctAnswer || "A")}</strong></td>
                          <td>
                            <div className="row-actions">
                              <button
                                onClick={() => handleDeleteQuestion(q.id)}
                                className="btn-table-action delete"
                                title="Delete Question"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. AI Question Review Queue (Integrated from AdminCMSView) */}
          {activeAdminTab === "admin-ai-review" && (
            <div className="admin-view-fade">
              <AdminCMSView onNavigate={(route) => {
                if (route === "practice") onNavigateToStudent();
              }} />
            </div>
          )}

          {/* 4. Syllabus & Notes CMS */}
          {activeAdminTab === "admin-syllabus" && (
            <div className="admin-view-fade">
              <div className="admin-two-col-grid">
                {/* Courses & Chapters */}
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <h3>Curriculum & Course Tracks</h3>
                  </div>
                  <div className="syllabus-catalog-list">
                    {COURSES_CATALOG.map((course) => (
                      <div key={course.id} className="syllabus-course-item">
                        <div className="course-item-header">
                          <div>
                            <strong>{course.name}</strong>
                            <span className="course-type-pill">{course.examType}</span>
                          </div>
                          <span className="units-count">{course.subjects?.length || 3} Subjects</span>
                        </div>
                        <p>{course.description}</p>
                        <div className="course-subjects-chips">
                          {course.subjects?.map((sub, i) => (
                            <span key={i} className="sub-chip">{sub}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terminology Database Overview */}
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <h3>Central Terminology Database ({Object.keys(TERMINOLOGY_DATABASE).length} Active Terms)</h3>
                  </div>
                  <div className="terms-cms-list">
                    {Object.values(TERMINOLOGY_DATABASE).map((term) => (
                      <div key={term.id} className="term-cms-item">
                        <div className="term-cms-top">
                          <strong>{term.term}</strong>
                          {term.hindiTerm && <span className="hindi-badge">{term.hindiTerm}</span>}
                          <span className="category-tag">{term.category}</span>
                        </div>
                        <p className="term-meaning">{term.simpleMeaning}</p>
                        <small className="term-worked">{term.workedExample}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. Previous Year Papers */}
          {activeAdminTab === "admin-pyq" && (
            <div className="admin-view-fade">
              <div className="admin-toolbar-row">
                <h3>Archived & Published Papers ({papersList.length})</h3>
                <button
                  onClick={() => setIsAddPaperOpen(true)}
                  className="btn-admin-primary"
                >
                  <Plus size={16} /> Upload New Paper
                </button>
              </div>

              <div className="admin-pyq-grid">
                {papersList.map((paper) => (
                  <div key={paper.id} className="admin-paper-card">
                    <div className="paper-card-top">
                      <span className="paper-year-badge">{paper.year}</span>
                      <span className="paper-status-badge">Published</span>
                    </div>
                    <h4>{paper.title}</h4>
                    <p className="paper-subject-text">{paper.subject}</p>
                    <div className="paper-meta-row">
                      <span>{paper.questionsCount || 30} Questions</span>
                      <span>{paper.totalMarks || 70} Marks</span>
                      <span>{paper.durationMinutes || 180} Mins</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. User Management */}
          {activeAdminTab === "admin-users" && (
            <div className="admin-view-fade">
              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <h3>Registered Platform Accounts ({usersList.length})</h3>
                  <span className="panel-note">Strict RBAC: New accounts receive student role by default.</span>
                </div>

                <div className="table-responsive">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Target Exam / Title</th>
                        <th>Registered</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((usr) => (
                        <tr key={usr.id}>
                          <td>
                            <div className="user-name-cell">
                              <div className="user-table-avatar">{usr.name.charAt(0)}</div>
                              <strong>{usr.name}</strong>
                            </div>
                          </td>
                          <td><code>{usr.email}</code></td>
                          <td>
                            <span className={`role-chip ${usr.role}`}>
                              {usr.role}
                            </span>
                          </td>
                          <td>{usr.title || usr.targetExam || "Student"}</td>
                          <td>{usr.registeredAt ? new Date(usr.registeredAt).toLocaleDateString() : "Active"}</td>
                          <td><span className="status-pill active">Active</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 7. Content Publishing & Audit */}
          {activeAdminTab === "admin-publishing" && (
            <div className="admin-view-fade">
              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <h3>Publishing Queue & Audit Changelog</h3>
                </div>

                <div className="audit-log-list">
                  <div className="audit-entry">
                    <div className="audit-badge published">PUBLISHED</div>
                    <div className="audit-content">
                      <strong>Class 12 Biology Evolution Unit: Natural Selection</strong>
                      <p>12 validated multi-format questions published to live student app.</p>
                      <small>Logged: Oct 22, 2026 • Verified by Lead Faculty Admin</small>
                    </div>
                  </div>

                  <div className="audit-entry">
                    <div className="audit-badge published">PUBLISHED</div>
                    <div className="audit-content">
                      <strong>Electrochemistry Nernst Equation Numericals</strong>
                      <p>Formula hints, logarithmic approximations, and step-by-step solutions verified.</p>
                      <small>Logged: Oct 21, 2026 • Verified by Chemistry Faculty</small>
                    </div>
                  </div>

                  <div className="audit-entry">
                    <div className="audit-badge review">IN REVIEW</div>
                    <div className="audit-content">
                      <strong>Photoelectric Effect & Work Function Practice Drills</strong>
                      <p>Draft submitted by AI Generator; awaiting manual faculty sign-off.</p>
                      <small>Logged: Today at 09:12 AM</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. Platform Readiness (Launch Checklist) */}
          {activeAdminTab === "admin-readiness" && (
            <div className="admin-view-fade">
              <LaunchChecklistView onNavigate={() => {}} />
            </div>
          )}

          {/* 9. Platform Settings */}
          {activeAdminTab === "admin-settings" && (
            <div className="admin-view-fade">
              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <h3>Platform Configuration & Exam Rules</h3>
                </div>

                <div className="admin-settings-form">
                  <div className="settings-field">
                    <label>Marking Scheme Config</label>
                    <p className="field-hint">Defines default positive and negative marks per question type.</p>
                    <div className="rules-preview-box">
                      <div><strong>JEE Advanced:</strong> +4 Correct, -1 Incorrect, 0 Unattempted</div>
                      <div><strong>CBSE Class 12:</strong> +1 Correct, 0 Negative (Board pattern)</div>
                      <div><strong>UGC-NET Paper 1:</strong> +2 Correct, 0 Negative</div>
                    </div>
                  </div>

                  <div className="settings-field">
                    <label>AI Question Generation Engine</label>
                    <p className="field-hint">Strictly grounded in NCERT and standard textbook corpora.</p>
                    <select className="admin-select" defaultValue="gemini-1.5-pro">
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended for STEM)</option>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash (Low Latency)</option>
                      <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                    </select>
                  </div>

                  <div className="settings-field">
                    <label>System Cache & Local Storage</label>
                    <p className="field-hint">Resetting will restore initial factory seed questions and curriculum.</p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Reset local questions and test storage to default?")) {
                          StorageService.resetAll();
                          refreshAdminData();
                          showToast("Storage reset to factory defaults.");
                        }
                      }}
                      className="btn-admin-danger"
                    >
                      <RefreshCw size={15} /> Reset Local Cache to Factory Seeds
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Question Modal */}
      {isAddQuestionOpen && (
        <div className="admin-modal-overlay fade-in" onClick={() => setIsAddQuestionOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Add Question to Live Bank</h3>
              <button onClick={() => setIsAddQuestionOpen(false)} className="close-btn">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="admin-modal-form">
              <div className="form-group">
                <label>Question Stem / Text</label>
                <textarea
                  required
                  rows={3}
                  value={newQuestionStem}
                  onChange={(e) => setNewQuestionStem(e.target.value)}
                  placeholder="Enter the complete question problem statement..."
                  className="admin-textarea"
                />
              </div>

              <div className="form-row-three">
                <div className="form-group">
                  <label>Subject</label>
                  <select
                    value={newQuestionSubject}
                    onChange={(e) => setNewQuestionSubject(e.target.value)}
                    className="admin-select"
                  >
                    <option value="bio_12">Class 12 Biology</option>
                    <option value="chem_12">Class 12 Chemistry</option>
                    <option value="phys_12">Class 12 Physics</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Question Format</label>
                  <select
                    value={newQuestionType}
                    onChange={(e) => setNewQuestionType(e.target.value)}
                    className="admin-select"
                  >
                    <option value="MCQ">Single Choice (MCQ)</option>
                    <option value="Assertion-Reason">Assertion-Reason</option>
                    <option value="Numerical">Numerical</option>
                    <option value="Multiple-Select">Multiple-Select</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Difficulty</label>
                  <select
                    value={newQuestionDifficulty}
                    onChange={(e) => setNewQuestionDifficulty(e.target.value)}
                    className="admin-select"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Option A</label>
                <input
                  type="text"
                  required
                  value={newQuestionOptionA}
                  onChange={(e) => setNewQuestionOptionA(e.target.value)}
                  placeholder="Option A text"
                  className="admin-input"
                />
              </div>

              <div className="form-group">
                <label>Option B</label>
                <input
                  type="text"
                  required
                  value={newQuestionOptionB}
                  onChange={(e) => setNewQuestionOptionB(e.target.value)}
                  placeholder="Option B text"
                  className="admin-input"
                />
              </div>

              <div className="form-group">
                <label>Option C</label>
                <input
                  type="text"
                  required
                  value={newQuestionOptionC}
                  onChange={(e) => setNewQuestionOptionC(e.target.value)}
                  placeholder="Option C text"
                  className="admin-input"
                />
              </div>

              <div className="form-group">
                <label>Option D</label>
                <input
                  type="text"
                  required
                  value={newQuestionOptionD}
                  onChange={(e) => setNewQuestionOptionD(e.target.value)}
                  placeholder="Option D text"
                  className="admin-input"
                />
              </div>

              <div className="form-row-two">
                <div className="form-group">
                  <label>Correct Answer Key</label>
                  <select
                    value={newQuestionCorrect}
                    onChange={(e) => setNewQuestionCorrect(e.target.value)}
                    className="admin-select"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Verified NCERT Explanation</label>
                  <input
                    type="text"
                    required
                    value={newQuestionExplanation}
                    onChange={(e) => setNewQuestionExplanation(e.target.value)}
                    placeholder="Provide step-by-step reasoning..."
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsAddQuestionOpen(false)}
                  className="btn-admin-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Save to Live Question Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Paper Modal */}
      {isAddPaperOpen && (
        <div className="admin-modal-overlay fade-in" onClick={() => setIsAddPaperOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Publish Previous-Year Exam Paper</h3>
              <button onClick={() => setIsAddPaperOpen(false)} className="close-btn">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePaper} className="admin-modal-form">
              <div className="form-group">
                <label>Paper Title</label>
                <input
                  type="text"
                  required
                  value={newPaperTitle}
                  onChange={(e) => setNewPaperTitle(e.target.value)}
                  placeholder="e.g. CBSE Class 12 Biology Board Exam 2024 (Set 1)"
                  className="admin-input"
                />
              </div>

              <div className="form-row-three">
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    required
                    value={newPaperSubject}
                    onChange={(e) => setNewPaperSubject(e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="form-group">
                  <label>Exam Year</label>
                  <input
                    type="number"
                    required
                    value={newPaperYear}
                    onChange={(e) => setNewPaperYear(e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="form-group">
                  <label>Questions Count</label>
                  <input
                    type="number"
                    required
                    value={newPaperQuestionsCount}
                    onChange={(e) => setNewPaperQuestionsCount(e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsAddPaperOpen(false)}
                  className="btn-admin-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Publish Exam Paper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
