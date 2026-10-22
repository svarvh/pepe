import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  Database,
  Sparkles,
  BookOpen,
  Layers,
  Users,
  Send,
  Settings,
  Search,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Printer,
  ExternalLink,
  LogOut,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Clock,
  Award,
  ShieldCheck,
  Filter,
  FileCheck,
  X,
  FileCode,
  Tag,
  BookMarked,
  Sliders,
  HelpCircle
} from "lucide-react";
import { StorageService } from "../services/storage";
import { AuthService, ROLES } from "../services/authService";
import { AIService } from "../services/aiService";
import { DocumentParser } from "../services/documentParser";

export default function FacultyPanel({ currentUser, onNavigateToStudent, onFacultyLogout }) {
  // Navigation tab state (11 core sections)
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'materials', 'upload', 'ai-gen', 'questions', 'builder', 'import-paper', 'topics', 'classes', 'published', 'settings'

  // Data collections from StorageService
  const [resources, setResources] = useState([]);
  const [papers, setPapers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState({});

  // Toast / Banner notices
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // 'success' | 'warning' | 'error'

  const showToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 4500);
  };

  // Reload data from storage
  const refreshFacultyData = useCallback(() => {
    setResources(StorageService.getFacultyResources());
    setPapers(StorageService.getFacultyPapers());
    setTopics(StorageService.getFacultyTopics());
    setQuestions(StorageService.getFacultyQuestions());
    setClasses(StorageService.getFacultyClasses());
    setStats(StorageService.getFacultyStats());
  }, []);

  useEffect(() => {
    refreshFacultyData();
  }, [refreshFacultyData]);

  // =========================================================================
  // 1. PDF PREVIEW MODAL STATE
  // =========================================================================
  const [previewResource, setPreviewResource] = useState(null);

  // =========================================================================
  // 2. UPLOAD RESOURCE FORM STATE
  // =========================================================================
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadClass, setUploadClass] = useState("Class 12");
  const [uploadBoard, setUploadBoard] = useState("CBSE");
  const [uploadSubject, setUploadSubject] = useState("Biology");
  const [uploadChapter, setUploadChapter] = useState("");
  const [uploadTopic, setUploadTopic] = useState("");
  const [uploadType, setUploadType] = useState("Comprehensive Notes");
  const [uploadStatus, setUploadStatus] = useState("draft");
  const [uploadSelectedClasses, setUploadSelectedClasses] = useState(["Class 12 - Section A (Medical / NEET Prep)"]);
  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadFileSize, setUploadFileSize] = useState("");
  const [uploadExtractedText, setUploadExtractedText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleSimulatedFileUpload = (file) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(15);
    setUploadFileName(file.name);
    setUploadFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);

    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          setIsUploading(false);
          // Extract text simulation
          const sampleText = `Extracted Text from ${file.name}:
Chapter Summary & High-Yield Examination Points:
1. Fundamental Axioms and Laws in ${uploadSubject}.
2. Mathematical formulations, dimensional analysis, and experimental conditions.
3. Observed phenomena: Rate changes, dynamic equilibria, and allele distributions.
4. Historical and empirical verification according to standard curriculum guidelines.`;
          setUploadExtractedText(sampleText);
          if (!uploadTitle) {
            setUploadTitle(file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "));
          }
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleSaveResource = (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      showToast("Please enter a resource title.", "warning");
      return;
    }

    const newRes = {
      id: `fac-res-${Date.now()}`,
      title: uploadTitle,
      description: uploadDesc || "Faculty-authored study guide and reference.",
      classGrade: uploadClass,
      board: uploadBoard,
      subject: uploadSubject,
      subjectId: uploadSubject.toLowerCase().includes("bio") ? "bio_12" : uploadSubject.toLowerCase().includes("chem") ? "chem_12" : "phys_12",
      chapter: uploadChapter || "General Chapter",
      topic: uploadTopic || "Curriculum Focus",
      resourceType: uploadType,
      status: uploadStatus,
      visibility: uploadStatus === "published" ? "public_classes" : "private",
      targetClasses: uploadSelectedClasses,
      fileName: uploadFileName || `${uploadTitle.replace(/\s+/g, "_")}.pdf`,
      fileSize: uploadFileSize || "2.4 MB",
      fileType: "application/pdf",
      pageCount: Math.floor(Math.random() * 10) + 8,
      extractedText: uploadExtractedText || `Verified study material authored by ${currentUser?.name || "Faculty"}. Covers ${uploadSubject} - ${uploadChapter}.`,
      ownerId: currentUser?.id || "usr_faculty_01",
      ownerName: currentUser?.name || "Prof. Sunita Rao",
      ownerTitle: currentUser?.title || "Senior Faculty",
      version: 1
    };

    StorageService.saveFacultyResource(newRes);
    refreshFacultyData();
    showToast(`Resource "${uploadTitle}" saved as ${uploadStatus.toUpperCase()}!`);

    // Reset upload fields
    setUploadTitle("");
    setUploadDesc("");
    setUploadChapter("");
    setUploadTopic("");
    setUploadFileName("");
    setUploadExtractedText("");
    setUploadProgress(0);
    setActiveTab("materials");
  };

  const handleDeleteResource = (id) => {
    if (confirm("Are you sure you want to delete this resource? Students will no longer have access.")) {
      StorageService.deleteFacultyResource(id);
      refreshFacultyData();
      showToast("Resource removed successfully.");
    }
  };

  const handleToggleResourcePublish = (res) => {
    const nextStatus = res.status === "published" ? "draft" : "published";
    StorageService.saveFacultyResource({ ...res, status: nextStatus });
    refreshFacultyData();
    showToast(`"${res.title}" is now ${nextStatus.toUpperCase()}!`);
  };

  // =========================================================================
  // 3. AI QUESTION GENERATOR FROM FACULTY PDFS
  // =========================================================================
  const [selectedPdfId, setSelectedPdfId] = useState("");
  const selectedPdf = useMemo(() => resources.find(r => r.id === selectedPdfId) || resources[0] || null, [resources, selectedPdfId]);

  const [aiGenChapter, setAiGenChapter] = useState("");
  const [aiGenTopic, setAiGenTopic] = useState("");
  const [aiGenCount, setAiGenCount] = useState(3);
  const [aiGenType, setAiGenType] = useState("mcq"); // 'mcq', 'true_false', 'short_answer', 'long_answer', 'fill_blank'
  const [aiGenDifficulty, setAiGenDifficulty] = useState("Medium");
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [generatedDrafts, setGeneratedDrafts] = useState([]);

  // Auto-fill topic/chapter when PDF changes
  useEffect(() => {
    if (selectedPdf) {
      setAiGenChapter(selectedPdf.chapter || "");
      setAiGenTopic(selectedPdf.topic || "");
    }
  }, [selectedPdf]);

  const handleGenerateQuestionsFromPdf = async () => {
    if (!selectedPdf) {
      showToast("Please select an uploaded document first.", "warning");
      return;
    }

    setIsGeneratingQuestions(true);
    try {
      const res = await AIService.generateQuestions({
        subject: selectedPdf.subject,
        topic: aiGenTopic || selectedPdf.topic || selectedPdf.title,
        sourceText: selectedPdf.extractedText,
        numQuestions: aiGenCount,
        difficulty: aiGenDifficulty,
        format: aiGenType,
        includeExplanations: true
      });

      // Augment each question with faculty provenance
      const formattedDrafts = (res.questions || []).map((q, idx) => ({
        id: `fac-ai-${Date.now()}-${idx}`,
        stem: q.text || q.stem,
        type: aiGenType,
        subjectId: selectedPdf.subjectId,
        subject: selectedPdf.subject,
        chapter: aiGenChapter || selectedPdf.chapter,
        topic: aiGenTopic || selectedPdf.topic,
        difficulty: aiGenDifficulty,
        options: q.options || [],
        correctOption: q.correctAnswer || "A",
        explanation: q.explanation || `Grounded in ${selectedPdf.fileName}, section: ${aiGenTopic}`,
        marks: aiGenType === "long_answer" ? 5 : aiGenType === "short_answer" ? 3 : 1,
        source: "AI Generated From Faculty Material",
        pageRef: `${selectedPdf.fileName} (Page ${Math.floor(Math.random() * 5) + 1})`,
        approvalStatus: "draft",
        ownerId: currentUser?.id || "usr_faculty_01",
        ownerName: currentUser?.name || "Prof. Sunita Rao"
      }));

      setGeneratedDrafts(formattedDrafts);
      showToast(`Generated ${formattedDrafts.length} questions grounded in ${selectedPdf.fileName}!`);
    } catch (err) {
      showToast("Error generating questions. Please try again.", "error");
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleApproveDraftQuestion = (draft) => {
    const approvedQ = {
      ...draft,
      approvalStatus: "approved"
    };
    StorageService.saveFacultyQuestion(approvedQ);
    setGeneratedDrafts(prev => prev.filter(q => q.id !== draft.id));
    refreshFacultyData();
    showToast(`Question approved and saved to Question Bank with source tag: "${approvedQ.source}"!`);
  };

  const handleRejectDraftQuestion = (draftId) => {
    setGeneratedDrafts(prev => prev.filter(q => q.id !== draftId));
    showToast("Question rejected.", "warning");
  };

  const handleEditDraftQuestion = (draftId, field, val) => {
    setGeneratedDrafts(prev => prev.map(q => q.id === draftId ? { ...q, [field]: val } : q));
  };

  // =========================================================================
  // 4. QUESTION PAPER BUILDER STATE
  // =========================================================================
  const [paperBuilderId, setPaperBuilderId] = useState(null);
  const [paperTitle, setPaperTitle] = useState("");
  const [paperClass, setPaperClass] = useState("Class 12");
  const [paperSubject, setPaperSubject] = useState("Biology");
  const [paperExamType, setPaperExamType] = useState("Unit Test");
  const [paperDuration, setPaperDuration] = useState(60);
  const [paperMaxMarks, setPaperMaxMarks] = useState(25);
  const [paperInstructions, setPaperInstructions] = useState([
    "All questions are compulsory.",
    "Section A contains objective questions of 1 mark each.",
    "Section B contains short reasoning questions of 2-3 marks each.",
    "Section C contains derivations & numericals."
  ]);
  const [paperSections, setPaperSections] = useState([
    { id: "sec_a", name: "Section A: Multiple Choice Questions", marksPerQuestion: 1, instructions: "Choose the correct response." },
    { id: "sec_b", name: "Section B: Conceptual Reasoning", marksPerQuestion: 2, instructions: "Answer concisely in 30-40 words." },
    { id: "sec_c", name: "Section C: Long Answer & Derivations", marksPerQuestion: 5, instructions: "Show complete algebraic steps." }
  ]);
  const [paperQuestions, setPaperQuestions] = useState([]);
  const [paperStatus, setPaperStatus] = useState("draft");
  const [paperTargetClasses, setPaperTargetClasses] = useState(["Class 12 - Section A (Medical / NEET Prep)"]);

  // Question Selector Modal for Paper Builder
  const [isBankPickerOpen, setIsBankPickerOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [showAnswerKeyInPrint, setShowAnswerKeyInPrint] = useState(false);

  // Calculate total marks currently in paper
  const totalMarksCalculated = useMemo(() => {
    return paperQuestions.reduce((acc, q) => acc + (parseInt(q.marks, 10) || 1), 0);
  }, [paperQuestions]);

  const handleAddQuestionToPaper = (q) => {
    if (paperQuestions.some(existing => existing.id === q.id)) {
      showToast("Question already added to this paper.", "warning");
      return;
    }
    const newEntry = {
      ...q,
      sectionId: paperSections[0]?.id || "sec_a",
      marks: q.marks || 1
    };
    setPaperQuestions(prev => [...prev, newEntry]);
    showToast(`Added to paper! Total marks: ${totalMarksCalculated + (q.marks || 1)} / ${paperMaxMarks}`);
  };

  const handleRemoveQuestionFromPaper = (qId) => {
    setPaperQuestions(prev => prev.filter(q => q.id !== qId));
  };

  const handleMoveQuestion = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= paperQuestions.length) return;
    const reordered = [...paperQuestions];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);
    setPaperQuestions(reordered);
  };

  const handleSavePaper = (statusToSet = "draft") => {
    if (!paperTitle.trim()) {
      showToast("Please provide an examination paper title.", "warning");
      return;
    }

    if (paperQuestions.length === 0) {
      showToast("Please add at least one question to the paper.", "warning");
      return;
    }

    // Check marks mismatch warning
    if (statusToSet === "published" && totalMarksCalculated !== parseInt(paperMaxMarks, 10)) {
      const confirmPublish = confirm(
        `Warning: Total marks allocated (${totalMarksCalculated}) do not equal the configured Maximum Marks (${paperMaxMarks}). Do you still wish to publish to students?`
      );
      if (!confirmPublish) return;
    }

    const paperObj = {
      id: paperBuilderId || `fac-paper-${Date.now()}`,
      title: paperTitle,
      classGrade: paperClass,
      subject: paperSubject,
      subjectId: paperSubject.toLowerCase().includes("bio") ? "bio_12" : paperSubject.toLowerCase().includes("chem") ? "chem_12" : "phys_12",
      examType: paperExamType,
      durationMinutes: parseInt(paperDuration, 10),
      maxMarks: parseInt(paperMaxMarks, 10),
      instructions: paperInstructions,
      sections: paperSections,
      questions: paperQuestions,
      totalMarksCalculated,
      status: statusToSet,
      targetClasses: paperTargetClasses,
      ownerId: currentUser?.id || "usr_faculty_01",
      ownerName: currentUser?.name || "Prof. Sunita Rao"
    };

    StorageService.saveFacultyPaper(paperObj);
    refreshFacultyData();
    showToast(`Question Paper "${paperTitle}" saved as ${statusToSet.toUpperCase()}!`);
    setActiveTab("published");
  };

  const handleLoadPaperForEditing = (paper) => {
    setPaperBuilderId(paper.id);
    setPaperTitle(paper.title);
    setPaperClass(paper.classGrade || "Class 12");
    setPaperSubject(paper.subject || "Biology");
    setPaperExamType(paper.examType || "Pre-Board");
    setPaperDuration(paper.durationMinutes || 90);
    setPaperMaxMarks(paper.maxMarks || 35);
    setPaperInstructions(paper.instructions || ["All questions are compulsory."]);
    setPaperSections(paper.sections || [
      { id: "sec_a", name: "Section A: Multiple Choice Questions", marksPerQuestion: 1, instructions: "Choose correct option." }
    ]);
    setPaperQuestions(paper.questions || []);
    setPaperStatus(paper.status || "draft");
    setPaperTargetClasses(paper.targetClasses || ["Class 12 - Section A (Medical / NEET Prep)"]);
    setActiveTab("builder");
  };

  // =========================================================================
  // 5. IMPORT EXISTING QUESTION PAPER
  // =========================================================================
  const [importPaperText, setImportPaperText] = useState("");
  const [importedParsedQuestions, setImportedParsedQuestions] = useState([]);
  const [isImportParsing, setIsImportParsing] = useState(false);

  const handleParseImportPaper = () => {
    if (!importPaperText.trim()) {
      showToast("Please paste question paper text or upload a document.", "warning");
      return;
    }

    setIsImportParsing(true);
    setTimeout(() => {
      const parsed = DocumentParser.parseText(importPaperText);
      if (parsed.questions && parsed.questions.length > 0) {
        const enriched = parsed.questions.map((q, idx) => ({
          ...q,
          id: `fac-imp-${Date.now()}-${idx}`,
          source: "Imported From PDF",
          approvalStatus: "draft",
          marks: q.marks || 1,
          subject: "Science",
          subjectId: "bio_12"
        }));
        setImportedParsedQuestions(enriched);
        showToast(`Successfully extracted ${enriched.length} questions from document!`);
      } else {
        showToast(parsed.error || "Could not detect questions. Please verify format.", "warning");
      }
      setIsImportParsing(false);
    }, 600);
  };

  const handleImportAllToBank = () => {
    if (importedParsedQuestions.length === 0) return;
    importedParsedQuestions.forEach(q => {
      StorageService.saveFacultyQuestion({ ...q, approvalStatus: "approved" });
    });
    refreshFacultyData();
    showToast(`Imported ${importedParsedQuestions.length} questions to Question Bank!`);
    setImportedParsedQuestions([]);
    setImportPaperText("");
    setActiveTab("questions");
  };

  // =========================================================================
  // 6. IMPORTANT TOPICS MANAGER
  // =========================================================================
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicClass, setNewTopicClass] = useState("Class 12");
  const [newTopicSubject, setNewTopicSubject] = useState("Biology");
  const [newTopicChapter, setNewTopicChapter] = useState("");
  const [newTopicPriority, setNewTopicPriority] = useState("High");
  const [newTopicReason, setNewTopicReason] = useState("");
  const [newTopicExplanation, setNewTopicExplanation] = useState("");
  const [newTopicFormulas, setNewTopicFormulas] = useState("");
  const [newTopicKeyPoints, setNewTopicKeyPoints] = useState("");
  const [newTopicStatus, setNewTopicStatus] = useState("published");

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) {
      showToast("Please provide topic title.", "warning");
      return;
    }

    const topicObj = {
      id: `fac-top-${Date.now()}`,
      title: newTopicTitle,
      classGrade: newTopicClass,
      subject: newTopicSubject,
      subjectId: newTopicSubject.toLowerCase().includes("bio") ? "bio_12" : newTopicSubject.toLowerCase().includes("chem") ? "chem_12" : "phys_12",
      chapter: newTopicChapter || "Core Unit",
      priority: newTopicPriority,
      facultyReasoning: newTopicReason || "Designated as high examination priority by faculty review.",
      explanation: newTopicExplanation,
      formulas: newTopicFormulas ? newTopicFormulas.split("\n").filter(Boolean) : [],
      keyPoints: newTopicKeyPoints ? newTopicKeyPoints.split("\n").filter(Boolean) : [],
      status: newTopicStatus,
      targetClasses: ["Class 12 - Section A (Medical / NEET Prep)"],
      ownerId: currentUser?.id || "usr_faculty_01",
      ownerName: currentUser?.name || "Prof. Sunita Rao"
    };

    StorageService.saveFacultyTopic(topicObj);
    refreshFacultyData();
    showToast(`Topic "${newTopicTitle}" saved!`);
    setIsAddTopicModalOpen(false);
    setNewTopicTitle("");
    setNewTopicExplanation("");
    setNewTopicFormulas("");
    setNewTopicKeyPoints("");
  };

  const handleDeleteTopic = (id) => {
    if (confirm("Delete this important topic?")) {
      StorageService.deleteFacultyTopic(id);
      refreshFacultyData();
      showToast("Important topic deleted.");
    }
  };

  const handleToggleTopicPublish = (topic) => {
    const nextStatus = topic.status === "published" ? "draft" : "published";
    StorageService.saveFacultyTopic({ ...topic, status: nextStatus });
    refreshFacultyData();
    showToast(`Topic status updated to ${nextStatus.toUpperCase()}!`);
  };

  // =========================================================================
  // 7. QUESTION BANK FILTERS
  // =========================================================================
  const [bankSearch, setBankSearch] = useState("");
  const [bankSourceFilter, setBankSourceFilter] = useState("all");
  const [bankSubjectFilter, setBankSubjectFilter] = useState("all");

  const filteredBankQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchSearch =
        (q.stem || q.text || "").toLowerCase().includes(bankSearch.toLowerCase()) ||
        (q.explanation || "").toLowerCase().includes(bankSearch.toLowerCase()) ||
        (q.chapter || "").toLowerCase().includes(bankSearch.toLowerCase());
      const matchSource = bankSourceFilter === "all" || q.source === bankSourceFilter;
      const matchSub = bankSubjectFilter === "all" || q.subject?.toLowerCase().includes(bankSubjectFilter.toLowerCase());
      return matchSearch && matchSource && matchSub;
    });
  }, [questions, bankSearch, bankSourceFilter, bankSubjectFilter]);

  return (
    <div className="admin-layout-root faculty-portal-theme">
      {/* 1. FACULTY SIDEBAR (Emerald & White Professional Theme) */}
      <aside className="admin-sidebar faculty-sidebar">
        <div className="admin-brand-header">
          <div className="admin-brand-icon faculty-logo">
            <BookOpen size={22} className="text-emerald" />
          </div>
          <div className="admin-brand-text">
            <span className="admin-brand-title">Caplen Faculty</span>
            <span className="admin-brand-badge faculty">INSTRUCTOR PORTAL</span>
          </div>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-group-title">TEACHING WORKSPACE</div>

          <button
            onClick={() => setActiveTab("overview")}
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("materials")}
            className={`admin-nav-item ${activeTab === "materials" ? "active" : ""}`}
          >
            <FileText size={18} />
            <span>My Study Materials</span>
            <span className="admin-count-badge">{resources.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            className={`admin-nav-item ${activeTab === "upload" ? "active" : ""}`}
          >
            <UploadCloud size={18} />
            <span>Upload PDFs & Notes</span>
          </button>

          <button
            onClick={() => setActiveTab("ai-gen")}
            className={`admin-nav-item ${activeTab === "ai-gen" ? "active" : ""}`}
          >
            <Sparkles size={18} />
            <span>AI Question Generator</span>
            <span className="admin-count-badge pulse">AI</span>
          </button>

          <div className="admin-nav-group-title">EXAMS & ASSESSMENT</div>

          <button
            onClick={() => setActiveTab("questions")}
            className={`admin-nav-item ${activeTab === "questions" ? "active" : ""}`}
          >
            <Database size={18} />
            <span>Question Bank</span>
            <span className="admin-count-badge">{questions.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("builder")}
            className={`admin-nav-item ${activeTab === "builder" ? "active" : ""}`}
          >
            <Layers size={18} />
            <span>Question Paper Builder</span>
            {paperQuestions.length > 0 && (
              <span className="admin-count-badge pending">{paperQuestions.length} Qs</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("import-paper")}
            className={`admin-nav-item ${activeTab === "import-paper" ? "active" : ""}`}
          >
            <FileCode size={18} />
            <span>Import Existing Papers</span>
          </button>

          <div className="admin-nav-group-title">CURRICULUM & STUDENTS</div>

          <button
            onClick={() => setActiveTab("topics")}
            className={`admin-nav-item ${activeTab === "topics" ? "active" : ""}`}
          >
            <BookMarked size={18} />
            <span>Important Topics</span>
            <span className="admin-count-badge">{topics.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("classes")}
            className={`admin-nav-item ${activeTab === "classes" ? "active" : ""}`}
          >
            <Users size={18} />
            <span>My Classes & Subjects</span>
            <span className="admin-count-badge">{classes.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("published")}
            className={`admin-nav-item ${activeTab === "published" ? "active" : ""}`}
          >
            <Send size={18} />
            <span>Published & Drafts</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
          >
            <Settings size={18} />
            <span>Faculty Settings</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <button
            onClick={onNavigateToStudent}
            className="btn-switch-to-student"
            title="Inspect student dashboard view"
          >
            <ExternalLink size={15} />
            <span>View Student Portal</span>
          </button>

          <button
            onClick={onFacultyLogout}
            className="btn-admin-logout"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. FACULTY MAIN CONTENT LAYOUT */}
      <div className="admin-content-layout">
        {/* Top Header */}
        <header className="admin-top-header faculty-top-header">
          <div className="admin-top-left">
            <h1 className="admin-page-title">
              {activeTab === "overview" && "Faculty Management Overview"}
              {activeTab === "materials" && "My Educational Study Materials"}
              {activeTab === "upload" && "Upload Study Notes & PDF Resources"}
              {activeTab === "ai-gen" && "AI Question Generator (From Uploaded PDFs)"}
              {activeTab === "questions" && "Faculty Question Bank Repository"}
              {activeTab === "builder" && "Examination Question Paper Builder"}
              {activeTab === "import-paper" && "Import Existing Question Papers"}
              {activeTab === "topics" && "Important Topics & High-Yield Guides"}
              {activeTab === "classes" && "My Assigned Classes & Student Groups"}
              {activeTab === "published" && "Published Curriculum & Review Queue"}
              {activeTab === "settings" && "Faculty Profile & AI Configurations"}
            </h1>
            <span className="admin-env-pill faculty-pill">Verified Educator • Academic Session 2026-27</span>
          </div>

          <div className="admin-top-actions">
            {toastMessage && (
              <div className={`admin-toast-banner ${toastType} fade-in`}>
                <CheckCircle2 size={15} />
                <span>{toastMessage}</span>
              </div>
            )}

            <div className="admin-profile-pill faculty-pill">
              <div className="admin-avatar faculty-avatar">
                {currentUser?.name ? currentUser.name.charAt(0) : "S"}
              </div>
              <div className="admin-profile-meta">
                <span className="admin-user-name">{currentUser?.name || "Prof. Sunita Rao"}</span>
                <span className="admin-role-badge faculty">Senior Faculty</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="admin-viewport">
          {/* ===============================================================
              TAB 1: DASHBOARD OVERVIEW
             =============================================================== */}
          {activeTab === "overview" && (
            <div className="admin-view-fade">
              {/* Actual Database Statistics Summary Cards */}
              <div className="admin-stats-four-grid faculty-stats-grid">
                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Uploaded Study Materials</span>
                    <FileText size={18} className="text-emerald" />
                  </div>
                  <div className="stat-value">{stats.totalResources || resources.length}</div>
                  <div className="stat-sub">
                    <span className="text-emerald font-semibold">{stats.publishedResources || 0} Published</span> • {stats.draftResources || 0} Drafts
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Question Papers Created</span>
                    <Layers size={18} className="text-emerald" />
                  </div>
                  <div className="stat-value">{stats.totalPapers || papers.length}</div>
                  <div className="stat-sub">
                    <span className="text-emerald font-semibold">{stats.publishedPapers || 0} Published</span> • {stats.draftPapers || 0} Drafts
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Questions in Bank</span>
                    <Database size={18} className="text-emerald" />
                  </div>
                  <div className="stat-value">{stats.totalQuestions || questions.length}</div>
                  <div className="stat-sub">
                    {stats.questionSources?.facultyCreated || 0} Faculty Created • {stats.questionSources?.aiFromFaculty || 0} AI Grounded
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="stat-card-top">
                    <span className="stat-label">Assigned Students</span>
                    <Users size={18} className="text-emerald" />
                  </div>
                  <div className="stat-value">{stats.totalStudents || 161}</div>
                  <div className="stat-sub">Across {stats.totalClasses || classes.length} active classes</div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="admin-dashboard-two-col">
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <h3>Teaching & Material Quick Actions</h3>
                  </div>
                  <div className="admin-quick-grid">
                    <button onClick={() => setActiveTab("upload")} className="quick-action-box">
                      <UploadCloud size={20} className="text-emerald" />
                      <strong>Upload Study PDF</strong>
                      <span>Add class notes, guides, or formulas</span>
                    </button>

                    <button onClick={() => setActiveTab("ai-gen")} className="quick-action-box">
                      <Sparkles size={20} className="text-emerald" />
                      <strong>Generate Questions from PDF</strong>
                      <span>AI questions grounded in your document</span>
                    </button>

                    <button
                      onClick={() => {
                        setPaperBuilderId(null);
                        setPaperTitle("New Assessment " + new Date().toLocaleDateString());
                        setPaperQuestions([]);
                        setActiveTab("builder");
                      }}
                      className="quick-action-box"
                    >
                      <Layers size={20} className="text-emerald" />
                      <strong>Build Question Paper</strong>
                      <span>Combine faculty & AI questions</span>
                    </button>

                    <button onClick={() => setActiveTab("topics")} className="quick-action-box">
                      <BookMarked size={20} className="text-emerald" />
                      <strong>Curate Important Topics</strong>
                      <span>Highlight high-yield exam chapters</span>
                    </button>
                  </div>
                </div>

                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <h3>Curriculum Grounding & Content Status</h3>
                  </div>
                  <div className="admin-activity-list">
                    <div className="activity-item">
                      <div className="activity-dot green" />
                      <div className="activity-details">
                        <strong>Class 12 Biology: Evolution Notes Live</strong>
                        <span>Published to Class 12 - Section A (42 Students)</span>
                        <small>18 pages • Grounded NCERT chapter reference</small>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-dot blue" />
                      <div className="activity-details">
                        <strong>Chemical Kinetics Rate Laws PDF uploaded</strong>
                        <span>Integrated derivations and Arrhenius numericals</span>
                        <small>Accessible for AI Question Generation</small>
                      </div>
                    </div>

                    <div className="activity-item">
                      <div className="activity-dot amber" />
                      <div className="activity-details">
                        <strong>Molecular Inheritance Draft Handout</strong>
                        <span>Saved as private draft (hidden from students)</span>
                        <small>Version 1 • Awaiting faculty review</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 2: MY STUDY MATERIALS & PDFS
             =============================================================== */}
          {activeTab === "materials" && (
            <div className="admin-view-fade">
              <div className="admin-toolbar-row">
                <div className="toolbar-left-info">
                  <h3>Educational Resources & Documents ({resources.length})</h3>
                  <p className="toolbar-sub">Manage uploaded notes, guides, and syllabus documents with draft/publish controls.</p>
                </div>
                <button onClick={() => setActiveTab("upload")} className="btn-admin-primary">
                  <UploadCloud size={16} /> Upload New Material
                </button>
              </div>

              <div className="faculty-materials-grid">
                {resources.map((res) => (
                  <div key={res.id} className="faculty-material-card">
                    <div className="material-card-top">
                      <div className="material-badges">
                        <span className="badge-class">{res.classGrade}</span>
                        <span className="badge-subject">{res.subject}</span>
                        <span className={`status-pill ${res.status}`}>
                          {res.status === "published" ? "Published" : "Draft (Private)"}
                        </span>
                      </div>
                      <span className="material-version">v{res.version || 1}</span>
                    </div>

                    <h4 className="material-title">{res.title}</h4>
                    <p className="material-desc">{res.description}</p>

                    <div className="material-meta-row">
                      <span className="meta-item"><FileText size={14} /> {res.fileName}</span>
                      <span className="meta-item">{res.fileSize} • {res.pageCount} Pages</span>
                    </div>

                    <div className="material-target-classes">
                      <small>Assigned to:</small>
                      <div className="target-chip-wrap">
                        {res.targetClasses?.map((tc, idx) => (
                          <span key={idx} className="target-chip">{tc}</span>
                        ))}
                      </div>
                    </div>

                    <div className="material-card-actions">
                      <button
                        onClick={() => setPreviewResource(res)}
                        className="btn-card-action"
                        title="Preview document"
                      >
                        <Eye size={15} /> Preview
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPdfId(res.id);
                          setActiveTab("ai-gen");
                        }}
                        className="btn-card-action ai-action"
                        title="Generate questions from this PDF"
                      >
                        <Sparkles size={15} /> Generate Questions
                      </button>

                      <button
                        onClick={() => handleToggleResourcePublish(res)}
                        className={`btn-card-action ${res.status === "published" ? "unpublish" : "publish"}`}
                      >
                        <Send size={15} />
                        {res.status === "published" ? "Unpublish" : "Publish to Class"}
                      </button>

                      <button
                        onClick={() => handleDeleteResource(res.id)}
                        className="btn-card-action delete"
                        title="Delete resource"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 3: UPLOAD STUDY MATERIALS & PDFS
             =============================================================== */}
          {activeTab === "upload" && (
            <div className="admin-view-fade">
              <div className="admin-panel-card upload-form-card">
                <div className="panel-card-header">
                  <div>
                    <h3>Upload Study Notes, Documents & PDFs</h3>
                    <p className="panel-note">Drag and drop syllabus notes or examination materials. Readable text is extracted for AI question generation.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveResource} className="faculty-form">
                  {/* Drag and Drop Zone */}
                  <div
                    className={`dropzone-box ${isDragOver ? "dragover" : ""} ${uploadFileName ? "has-file" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleSimulatedFileUpload(e.dataTransfer.files[0]);
                      }
                    }}
                  >
                    <UploadCloud size={40} className="dropzone-icon text-emerald" />
                    <div className="dropzone-text">
                      <strong>Drag and drop PDF, DOCX, or TXT file here</strong>
                      <span>or click to browse from device (Max 25 MB)</span>
                    </div>

                    <input
                      type="file"
                      id="faculty-file-input"
                      accept=".pdf,.docx,.txt,.csv"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleSimulatedFileUpload(e.target.files[0]);
                        }
                      }}
                      className="dropzone-hidden-input"
                    />

                    <label htmlFor="faculty-file-input" className="btn-select-file">
                      Browse Files
                    </label>

                    {isUploading && (
                      <div className="upload-progress-wrap">
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
                        </div>
                        <span>Extracting readable document text: {uploadProgress}%</span>
                      </div>
                    )}

                    {uploadFileName && !isUploading && (
                      <div className="uploaded-file-banner">
                        <CheckCircle2 size={16} className="text-emerald" />
                        <strong>{uploadFileName}</strong>
                        <span>({uploadFileSize}) — Text extracted successfully!</span>
                      </div>
                    )}
                  </div>

                  {/* Resource Metadata Form Fields */}
                  <div className="form-fields-grid">
                    <div className="form-group full-width">
                      <label>Resource Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Class 12 Biology: Evolution & Population Genetics Notes"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        className="admin-input-field"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Resource Description & Syllabus Scope</label>
                      <textarea
                        rows={2}
                        placeholder="Summarize key chapters, formulas, or derivations included in this resource..."
                        value={uploadDesc}
                        onChange={(e) => setUploadDesc(e.target.value)}
                        className="admin-textarea-field"
                      />
                    </div>

                    <div className="form-group">
                      <label>Class / Grade</label>
                      <select
                        value={uploadClass}
                        onChange={(e) => setUploadClass(e.target.value)}
                        className="admin-select"
                      >
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                        <option value="Repeater / Entrance">Repeater / Entrance Track</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Board / Curriculum</label>
                      <select
                        value={uploadBoard}
                        onChange={(e) => setUploadBoard(e.target.value)}
                        className="admin-select"
                      >
                        <option value="CBSE">CBSE (NCERT Aligned)</option>
                        <option value="State Board">State Board</option>
                        <option value="ICSE / ISC">ICSE / ISC</option>
                        <option value="Competitive (NEET/JEE)">Competitive (NEET/JEE)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Subject</label>
                      <select
                        value={uploadSubject}
                        onChange={(e) => setUploadSubject(e.target.value)}
                        className="admin-select"
                      >
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="Mathematics">Mathematics</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Resource Type</label>
                      <select
                        value={uploadType}
                        onChange={(e) => setUploadType(e.target.value)}
                        className="admin-select"
                      >
                        <option value="Comprehensive Notes">Comprehensive Notes</option>
                        <option value="Formula & Derivation Sheet">Formula & Derivation Sheet</option>
                        <option value="Revision Guide">Revision Guide</option>
                        <option value="Specimen Paper">Specimen Paper</option>
                        <option value="Worked Numericals">Worked Numericals</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Chapter Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Chapter 7: Evolution"
                        value={uploadChapter}
                        onChange={(e) => setUploadChapter(e.target.value)}
                        className="admin-input-field"
                      />
                    </div>

                    <div className="form-group">
                      <label>Topic / Subtopic</label>
                      <input
                        type="text"
                        placeholder="e.g. Natural Selection & Hardy-Weinberg"
                        value={uploadTopic}
                        onChange={(e) => setUploadTopic(e.target.value)}
                        className="admin-input-field"
                      />
                    </div>

                    <div className="form-group">
                      <label>Publication Status</label>
                      <select
                        value={uploadStatus}
                        onChange={(e) => setUploadStatus(e.target.value)}
                        className="admin-select"
                      >
                        <option value="draft">Save as Draft (Private to Faculty)</option>
                        <option value="published">Publish Immediately to Students</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Assign to Classes</label>
                      <select
                        multiple
                        value={uploadSelectedClasses}
                        onChange={(e) => {
                          const options = Array.from(e.target.selectedOptions, opt => opt.value);
                          setUploadSelectedClasses(options);
                        }}
                        className="admin-select multi-select"
                      >
                        {classes.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      <small className="field-hint">Hold Ctrl/Cmd to select multiple classes</small>
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button
                      type="button"
                      onClick={() => setActiveTab("materials")}
                      className="btn-outline-neutral"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn-admin-primary"
                    >
                      <Check size={16} /> Save Study Material
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 4: AI QUESTION GENERATOR FROM FACULTY PDFS
             =============================================================== */}
          {activeTab === "ai-gen" && (
            <div className="admin-view-fade">
              <div className="admin-dashboard-two-col">
                {/* Generation Parameters Panel */}
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <div>
                      <h3>Generate Questions from Uploaded PDF</h3>
                      <p className="panel-note">AI extracts statements and concepts directly from your document to form exam-ready questions.</p>
                    </div>
                  </div>

                  <div className="ai-gen-form">
                    <div className="form-group">
                      <label>Select Grounding PDF Document *</label>
                      <select
                        value={selectedPdf?.id || ""}
                        onChange={(e) => setSelectedPdfId(e.target.value)}
                        className="admin-select"
                      >
                        {resources.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.title} ({r.fileName})
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedPdf && (
                      <div className="selected-pdf-meta-box">
                        <div className="pdf-meta-line">
                          <strong>Source File:</strong> {selectedPdf.fileName} ({selectedPdf.pageCount} Pages)
                        </div>
                        <div className="pdf-meta-line">
                          <strong>Subject:</strong> {selectedPdf.subject} • <strong>Chapter:</strong> {selectedPdf.chapter}
                        </div>
                        <p className="pdf-preview-snippet">
                          "{selectedPdf.extractedText?.slice(0, 160)}..."
                        </p>
                      </div>
                    )}

                    <div className="form-group">
                      <label>Focus Chapter / Topic / Section</label>
                      <input
                        type="text"
                        placeholder="e.g. Industrial Melanism & Natural Selection"
                        value={aiGenTopic}
                        onChange={(e) => setAiGenTopic(e.target.value)}
                        className="admin-input-field"
                      />
                    </div>

                    <div className="form-row-two">
                      <div className="form-group">
                        <label>Question Type</label>
                        <select
                          value={aiGenType}
                          onChange={(e) => setAiGenType(e.target.value)}
                          className="admin-select"
                        >
                          <option value="mcq">Multiple-Choice (MCQ)</option>
                          <option value="true_false">True / False</option>
                          <option value="short_answer">Short-Answer (2-3 Marks)</option>
                          <option value="long_answer">Long-Answer (5 Marks)</option>
                          <option value="fill_blank">Fill-in-the-Blanks</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Difficulty</label>
                        <select
                          value={aiGenDifficulty}
                          onChange={(e) => setAiGenDifficulty(e.target.value)}
                          className="admin-select"
                        >
                          <option value="Easy">Easy (Foundational)</option>
                          <option value="Medium">Medium (Board Standard)</option>
                          <option value="Hard">Hard (Competitive / JEE / NEET)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Number of Questions</label>
                      <select
                        value={aiGenCount}
                        onChange={(e) => setAiGenCount(parseInt(e.target.value, 10))}
                        className="admin-select"
                      >
                        <option value={1}>1 Question</option>
                        <option value={3}>3 Questions</option>
                        <option value={5}>5 Questions</option>
                        <option value={10}>10 Questions</option>
                      </select>
                    </div>

                    <button
                      onClick={handleGenerateQuestionsFromPdf}
                      disabled={isGeneratingQuestions}
                      className="btn-admin-primary full-width"
                    >
                      {isGeneratingQuestions ? (
                        <>
                          <RefreshCw size={16} className="spin" />
                          <span>Generating Grounded Questions...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span>Generate Grounded Questions from PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Generated Drafts Review Interface */}
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <div>
                      <h3>Editorial Review Queue ({generatedDrafts.length})</h3>
                      <p className="panel-note">Review, edit, and approve before adding to Question Bank or Paper Builder.</p>
                    </div>
                  </div>

                  {generatedDrafts.length === 0 ? (
                    <div className="empty-review-box">
                      <Sparkles size={36} className="text-slate-400" />
                      <h4>No generated questions in queue</h4>
                      <p>Select a document on the left and tap "Generate Grounded Questions" to start creating curriculum-grounded items.</p>
                    </div>
                  ) : (
                    <div className="draft-questions-list">
                      {generatedDrafts.map((draft, idx) => (
                        <div key={draft.id} className="draft-question-item">
                          <div className="draft-item-header">
                            <span className="source-badge ai-grounded">
                              <Sparkles size={12} /> AI Generated From Faculty Material
                            </span>
                            <span className="page-ref-badge">{draft.pageRef}</span>
                          </div>

                          <div className="draft-edit-field">
                            <label>Question Stem:</label>
                            <textarea
                              rows={2}
                              value={draft.stem}
                              onChange={(e) => handleEditDraftQuestion(draft.id, "stem", e.target.value)}
                              className="admin-textarea-field"
                            />
                          </div>

                          {draft.options && draft.options.length > 0 && (
                            <div className="draft-options-grid">
                              {draft.options.map((opt, oIdx) => (
                                <div key={oIdx} className="draft-opt-row">
                                  <strong>{opt.id})</strong>
                                  <input
                                    type="text"
                                    value={opt.text}
                                    onChange={(e) => {
                                      const newOpts = [...draft.options];
                                      newOpts[oIdx] = { ...opt, text: e.target.value };
                                      handleEditDraftQuestion(draft.id, "options", newOpts);
                                    }}
                                    className="admin-input-field small"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="draft-answer-row">
                            <div>
                              <label>Correct Key:</label>
                              <input
                                type="text"
                                value={draft.correctOption}
                                onChange={(e) => handleEditDraftQuestion(draft.id, "correctOption", e.target.value)}
                                className="admin-input-field key-input"
                              />
                            </div>
                            <div>
                              <label>Marks:</label>
                              <input
                                type="number"
                                value={draft.marks}
                                onChange={(e) => handleEditDraftQuestion(draft.id, "marks", parseInt(e.target.value, 10))}
                                className="admin-input-field marks-input"
                              />
                            </div>
                          </div>

                          <div className="draft-edit-field">
                            <label>Explanation & Marking Scheme:</label>
                            <input
                              type="text"
                              value={draft.explanation}
                              onChange={(e) => handleEditDraftQuestion(draft.id, "explanation", e.target.value)}
                              className="admin-input-field"
                            />
                          </div>

                          <div className="draft-actions-bar">
                            <button
                              onClick={() => handleApproveDraftQuestion(draft)}
                              className="btn-approve"
                            >
                              <CheckCircle2 size={15} /> Approve & Save to Bank
                            </button>

                            <button
                              onClick={() => {
                                handleAddQuestionToPaper(draft);
                                handleApproveDraftQuestion(draft);
                              }}
                              className="btn-add-paper"
                            >
                              <Plus size={15} /> Add to Paper Builder
                            </button>

                            <button
                              onClick={() => handleRejectDraftQuestion(draft.id)}
                              className="btn-reject"
                            >
                              <X size={15} /> Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 5: FACULTY QUESTION BANK
             =============================================================== */}
          {activeTab === "questions" && (
            <div className="admin-view-fade">
              {/* Question Bank Toolbar with 4 Core Source Labels */}
              <div className="admin-toolbar-row">
                <div className="search-input-wrap">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search question stems, concepts, or page refs..."
                    value={bankSearch}
                    onChange={(e) => setBankSearch(e.target.value)}
                    className="admin-search-field"
                  />
                </div>

                <div className="toolbar-filters">
                  <select
                    value={bankSourceFilter}
                    onChange={(e) => setBankSourceFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Question Sources</option>
                    <option value="Faculty Created">Faculty Created</option>
                    <option value="Imported From PDF">Imported From PDF</option>
                    <option value="AI Generated">AI Generated</option>
                    <option value="AI Generated From Faculty Material">AI Generated From Faculty Material</option>
                  </select>

                  <select
                    value={bankSubjectFilter}
                    onChange={(e) => setBankSubjectFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Subjects</option>
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>
              </div>

              {/* Question Bank Table */}
              <div className="admin-table-card">
                <div className="table-header-info">
                  <span>Showing {filteredBankQuestions.length} of {questions.length} questions in faculty bank</span>
                </div>

                <div className="table-responsive">
                  <table className="admin-data-table faculty-table">
                    <thead>
                      <tr>
                        <th>Source Provenance</th>
                        <th>Subject & Chapter</th>
                        <th>Type</th>
                        <th>Question Stem</th>
                        <th>Marks</th>
                        <th>Correct Key</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBankQuestions.map((q) => {
                        const isAiFaculty = q.source === "AI Generated From Faculty Material";
                        const isFaculty = q.source === "Faculty Created";
                        const isImported = q.source === "Imported From PDF";

                        return (
                          <tr key={q.id}>
                            <td>
                              <span className={`source-chip ${isAiFaculty ? "ai-fac" : isFaculty ? "faculty" : isImported ? "imported" : "ai"}`}>
                                {q.source}
                              </span>
                              {q.pageRef && <small className="source-ref">{q.pageRef}</small>}
                            </td>
                            <td>
                              <strong>{q.subject}</strong>
                              <small>{q.chapter || "Core Unit"}</small>
                            </td>
                            <td><span className="badge-type">{q.type}</span></td>
                            <td className="stem-cell">
                              <div className="stem-snippet" title={q.stem || q.text}>
                                {q.stem || q.text}
                              </div>
                            </td>
                            <td><strong>{q.marks || 1} M</strong></td>
                            <td><code>{q.correctOption || q.correctAnswer || "A"}</code></td>
                            <td>
                              <div className="row-actions">
                                <button
                                  onClick={() => handleAddQuestionToPaper(q)}
                                  className="btn-table-action add-paper"
                                  title="Add to Question Paper Builder"
                                >
                                  <Plus size={15} /> Add to Paper
                                </button>
                                <button
                                  onClick={() => {
                                    StorageService.deleteFacultyQuestion(q.id);
                                    refreshFacultyData();
                                    showToast("Question deleted from bank.");
                                  }}
                                  className="btn-table-action delete"
                                  title="Delete question"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 6: QUESTION PAPER BUILDER
             =============================================================== */}
          {activeTab === "builder" && (
            <div className="admin-view-fade">
              {/* Paper Configuration Header */}
              <div className="admin-panel-card paper-builder-config">
                <div className="panel-card-header">
                  <div>
                    <h3>Examination Paper Configuration</h3>
                    <p className="panel-note">Build authentic examination papers combining faculty questions and AI-generated items.</p>
                  </div>
                  <div className="paper-marks-indicator">
                    <div className="marks-badge-counter">
                      <span>Total Marks:</span>
                      <strong className={totalMarksCalculated === parseInt(paperMaxMarks, 10) ? "match" : "mismatch"}>
                        {totalMarksCalculated} / {paperMaxMarks}
                      </strong>
                    </div>
                    {totalMarksCalculated !== parseInt(paperMaxMarks, 10) && (
                      <span className="marks-warning">Marks mismatch</span>
                    )}
                  </div>
                </div>

                <div className="paper-form-grid">
                  <div className="form-group">
                    <label>Paper Title *</label>
                    <input
                      type="text"
                      value={paperTitle}
                      onChange={(e) => setPaperTitle(e.target.value)}
                      placeholder="e.g. Class 12 Pre-Board Chemistry Comprehensive Examination"
                      className="admin-input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <select
                      value={paperSubject}
                      onChange={(e) => setPaperSubject(e.target.value)}
                      className="admin-select"
                    >
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Physics">Physics</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Exam Type</label>
                    <select
                      value={paperExamType}
                      onChange={(e) => setPaperExamType(e.target.value)}
                      className="admin-select"
                    >
                      <option value="Unit Test">Unit Test</option>
                      <option value="Mid-Term Assessment">Mid-Term Assessment</option>
                      <option value="Pre-Board Examination">Pre-Board Examination</option>
                      <option value="Mock Entrance Test">Mock Entrance Test</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Duration (Minutes)</label>
                    <input
                      type="number"
                      value={paperDuration}
                      onChange={(e) => setPaperDuration(e.target.value)}
                      className="admin-input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label>Maximum Marks</label>
                    <input
                      type="number"
                      value={paperMaxMarks}
                      onChange={(e) => setPaperMaxMarks(e.target.value)}
                      className="admin-input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label>Class Grade</label>
                    <select
                      value={paperClass}
                      onChange={(e) => setPaperClass(e.target.value)}
                      className="admin-select"
                    >
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>
                </div>

                {/* Toolbar for Paper Builder */}
                <div className="paper-builder-actions-bar">
                  <div className="left-actions">
                    <button
                      onClick={() => setIsBankPickerOpen(true)}
                      className="btn-admin-primary"
                    >
                      <Plus size={16} /> Import from Question Bank ({questions.length} Available)
                    </button>

                    <button
                      onClick={() => {
                        setSelectedPdfId(resources[0]?.id || "");
                        setActiveTab("ai-gen");
                      }}
                      className="btn-outline-neutral"
                    >
                      <Sparkles size={16} /> Generate More Questions via AI
                    </button>
                  </div>

                  <div className="right-actions">
                    <button
                      onClick={() => setIsPrintPreviewOpen(true)}
                      className="btn-outline-neutral"
                      title="Preview printable PDF paper"
                    >
                      <Printer size={16} /> Preview & Export PDF
                    </button>

                    <button
                      onClick={() => handleSavePaper("draft")}
                      className="btn-outline-neutral"
                    >
                      Save Draft
                    </button>

                    <button
                      onClick={() => handleSavePaper("published")}
                      className="btn-admin-primary"
                    >
                      <Send size={16} /> Publish to Classes
                    </button>
                  </div>
                </div>
              </div>

              {/* Questions List in Paper Builder */}
              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <h3>Questions in this Paper ({paperQuestions.length} Questions)</h3>
                  <span className="panel-note">Reorder, edit marks, or modify options before publishing.</span>
                </div>

                {paperQuestions.length === 0 ? (
                  <div className="empty-paper-box">
                    <FileText size={36} className="text-slate-400" />
                    <h4>No questions added yet</h4>
                    <p>Click "Import from Question Bank" or generate questions using AI to populate this assessment.</p>
                  </div>
                ) : (
                  <div className="paper-questions-drag-list">
                    {paperQuestions.map((q, qIdx) => (
                      <div key={q.id} className="paper-q-card">
                        <div className="paper-q-header">
                          <div className="paper-q-num">Q{qIdx + 1}</div>
                          <span className={`source-chip small ${q.source?.includes("AI") ? "ai" : "faculty"}`}>
                            {q.source}
                          </span>
                          <span className="paper-q-type">{q.type}</span>

                          <div className="paper-q-reorder">
                            <button
                              disabled={qIdx === 0}
                              onClick={() => handleMoveQuestion(qIdx, -1)}
                              className="btn-reorder"
                              title="Move question up"
                            >
                              <ChevronUp size={16} />
                            </button>
                            <button
                              disabled={qIdx === paperQuestions.length - 1}
                              onClick={() => handleMoveQuestion(qIdx, 1)}
                              className="btn-reorder"
                              title="Move question down"
                            >
                              <ChevronDown size={16} />
                            </button>
                          </div>

                          <div className="paper-q-marks-field">
                            <label>Marks:</label>
                            <input
                              type="number"
                              value={q.marks || 1}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10) || 1;
                                setPaperQuestions(prev => prev.map((item, i) => i === qIdx ? { ...item, marks: val } : item));
                              }}
                              className="marks-input-sm"
                            />
                          </div>

                          <button
                            onClick={() => handleRemoveQuestionFromPaper(q.id)}
                            className="btn-remove-q"
                            title="Remove from paper"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="paper-q-stem">
                          <textarea
                            rows={2}
                            value={q.stem || q.text}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPaperQuestions(prev => prev.map((item, i) => i === qIdx ? { ...item, stem: val } : item));
                            }}
                            className="admin-textarea-field q-stem-edit"
                          />
                        </div>

                        {q.options && q.options.length > 0 && (
                          <div className="paper-q-options">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="paper-opt-item">
                                <strong>{opt.id})</strong> {opt.text}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="paper-q-footer">
                          <span><strong>Key:</strong> {q.correctOption || q.correctAnswer || "A"}</span>
                          {q.pageRef && <span className="text-slate-500"><strong>Ref:</strong> {q.pageRef}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 7: IMPORT EXISTING QUESTION PAPERS
             =============================================================== */}
          {activeTab === "import-paper" && (
            <div className="admin-view-fade">
              <div className="admin-dashboard-two-col">
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <div>
                      <h3>Paste or Upload Question Paper</h3>
                      <p className="panel-note">Extract questions, multiple-choice options, and answer keys automatically.</p>
                    </div>
                  </div>

                  <div className="import-paper-form">
                    <textarea
                      rows={12}
                      placeholder={`Paste exam paper text here. Example format:
1. Which cell organelle synthesizes ATP via oxidative phosphorylation?
A) Nucleus
B) Mitochondria
C) Golgi apparatus
D) Vacuole
Answer: B
Explanation: Mitochondria are the primary ATP sites.

2. State the first law of thermodynamics.`}
                      value={importPaperText}
                      onChange={(e) => setImportPaperText(e.target.value)}
                      className="admin-textarea-field import-box"
                    />

                    <div className="import-btn-row">
                      <button
                        onClick={handleParseImportPaper}
                        disabled={isImportParsing}
                        className="btn-admin-primary"
                      >
                        {isImportParsing ? "Extracting Questions..." : "Extract Questions from Paper"}
                      </button>

                      <button
                        onClick={() => {
                          setImportPaperText(DocumentParser.getSampleTemplate());
                        }}
                        className="btn-outline-neutral"
                      >
                        Load Sample Format
                      </button>
                    </div>
                  </div>
                </div>

                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <div>
                      <h3>Extracted Questions Review ({importedParsedQuestions.length})</h3>
                      <p className="panel-note">Verify extracted stems and keys before saving to your bank.</p>
                    </div>
                    {importedParsedQuestions.length > 0 && (
                      <button onClick={handleImportAllToBank} className="btn-admin-primary">
                        <CheckCircle2 size={16} /> Import All to Question Bank
                      </button>
                    )}
                  </div>

                  {importedParsedQuestions.length === 0 ? (
                    <div className="empty-review-box">
                      <FileCode size={36} className="text-slate-400" />
                      <h4>No parsed questions yet</h4>
                      <p>Paste your question paper on the left to extract questions, options, and answer keys.</p>
                    </div>
                  ) : (
                    <div className="draft-questions-list">
                      {importedParsedQuestions.map((q, idx) => (
                        <div key={q.id} className="draft-question-item">
                          <div className="draft-item-header">
                            <span className="source-badge imported">Imported From PDF</span>
                            <span className="badge-type">{q.type}</span>
                          </div>
                          <strong>Q{idx + 1}. {q.text}</strong>
                          {q.options && q.options.length > 0 && (
                            <ul className="mini-opt-list">
                              {q.options.map((opt, oI) => (
                                <li key={oI}>{opt.id}) {opt.text}</li>
                              ))}
                            </ul>
                          )}
                          <div className="answer-key-pill">
                            Correct Answer: <strong>{q.correctAnswer}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 8: IMPORTANT TOPICS & STUDY GUIDES
             =============================================================== */}
          {activeTab === "topics" && (
            <div className="admin-view-fade">
              <div className="admin-toolbar-row">
                <div className="toolbar-left-info">
                  <h3>Curated Important Topics ({topics.length})</h3>
                  <p className="toolbar-sub">Designate high-yield topics with priority indicators and faculty revision notes.</p>
                </div>

                <button onClick={() => setIsAddTopicModalOpen(true)} className="btn-admin-primary">
                  <Plus size={16} /> Add Important Topic
                </button>
              </div>

              <div className="faculty-topics-grid">
                {topics.map((topic) => (
                  <div key={topic.id} className="faculty-topic-card">
                    <div className="topic-card-top">
                      <span className={`priority-pill ${topic.priority?.toLowerCase()}`}>
                        {topic.priority} Priority
                      </span>
                      <span className={`status-pill ${topic.status}`}>
                        {topic.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>

                    <h4>{topic.title}</h4>
                    <span className="topic-subject-tag">{topic.subject} • {topic.chapter}</span>

                    <p className="topic-reasoning">
                      <strong>Faculty Note:</strong> {topic.facultyReasoning}
                    </p>

                    <p className="topic-summary-snippet">
                      {topic.explanation}
                    </p>

                    {topic.formulas && topic.formulas.length > 0 && (
                      <div className="topic-formula-box">
                        <strong>Key Formulas:</strong>
                        <ul>
                          {topic.formulas.map((f, fIdx) => (
                            <li key={fIdx}><code>{f}</code></li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="topic-card-actions">
                      <button
                        onClick={() => handleToggleTopicPublish(topic)}
                        className={`btn-card-action ${topic.status === "published" ? "unpublish" : "publish"}`}
                      >
                        <Send size={15} />
                        {topic.status === "published" ? "Unpublish" : "Publish to Students"}
                      </button>

                      <button
                        onClick={() => handleDeleteTopic(topic.id)}
                        className="btn-card-action delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 9: MY CLASSES & SUBJECTS
             =============================================================== */}
          {activeTab === "classes" && (
            <div className="admin-view-fade">
              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <div>
                    <h3>Assigned Classes & Academic Batches ({classes.length})</h3>
                    <p className="panel-note">Resources and question papers published to these classes appear in students' dashboards.</p>
                  </div>
                </div>

                <div className="classes-grid">
                  {classes.map((cls) => (
                    <div key={cls.id} className="faculty-class-card">
                      <div className="class-card-icon">
                        <Users size={24} className="text-emerald" />
                      </div>
                      <h4>{cls.name}</h4>
                      <p className="class-subject">{cls.subject} • {cls.board}</p>
                      <div className="class-metrics-row">
                        <span><strong>{cls.studentCount}</strong> Students Enrolled</span>
                        <span className="status-pill active">Active Batch</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 10: PUBLISHED CONTENT & DRAFTS REVIEW
             =============================================================== */}
          {activeTab === "published" && (
            <div className="admin-view-fade">
              <div className="admin-two-col-grid">
                {/* Published Column */}
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <div>
                      <h3>Published to Students (Live in Student Portal)</h3>
                      <p className="panel-note">These materials are visible to enrolled students.</p>
                    </div>
                  </div>

                  <div className="audit-log-list">
                    {resources.filter(r => r.status === "published").map(r => (
                      <div key={r.id} className="audit-entry">
                        <div className="audit-badge published">PUBLISHED</div>
                        <div className="audit-content">
                          <strong>{r.title}</strong>
                          <p>{r.subject} • {r.classGrade} • {r.fileName}</p>
                          <small>Assigned to: {r.targetClasses?.join(", ")}</small>
                        </div>
                      </div>
                    ))}

                    {papers.filter(p => p.status === "published").map(p => (
                      <div key={p.id} className="audit-entry">
                        <div className="audit-badge published">PAPER LIVE</div>
                        <div className="audit-content">
                          <strong>{p.title}</strong>
                          <p>{p.subject} • {p.maxMarks} Marks • {p.durationMinutes} Mins</p>
                          <small>{p.questions?.length} Questions • {p.examType}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drafts Column */}
                <div className="admin-panel-card">
                  <div className="panel-card-header">
                    <div>
                      <h3>Drafts & Pending Reviews (Private to Faculty)</h3>
                      <p className="panel-note">Drafts are strictly hidden from student dashboards.</p>
                    </div>
                  </div>

                  <div className="audit-log-list">
                    {resources.filter(r => r.status === "draft").map(r => (
                      <div key={r.id} className="audit-entry">
                        <div className="audit-badge review">DRAFT</div>
                        <div className="audit-content">
                          <strong>{r.title}</strong>
                          <p>{r.subject} • {r.fileName}</p>
                          <button
                            onClick={() => handleToggleResourcePublish(r)}
                            className="btn-mini-publish"
                          >
                            Publish Now
                          </button>
                        </div>
                      </div>
                    ))}

                    {papers.filter(p => p.status === "draft").map(p => (
                      <div key={p.id} className="audit-entry">
                        <div className="audit-badge review">DRAFT PAPER</div>
                        <div className="audit-content">
                          <strong>{p.title}</strong>
                          <p>{p.subject} • {p.questions?.length} Questions</p>
                          <button
                            onClick={() => handleLoadPaperForEditing(p)}
                            className="btn-mini-publish"
                          >
                            Edit in Builder
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 11: FACULTY SETTINGS
             =============================================================== */}
          {activeTab === "settings" && (
            <div className="admin-view-fade">
              <div className="admin-panel-card">
                <div className="panel-card-header">
                  <div>
                    <h3>Faculty Profile & System Settings</h3>
                    <p className="panel-note">Manage educator credentials, default syllabus grounding, and AI configurations.</p>
                  </div>
                </div>

                <div className="faculty-settings-grid">
                  <div className="settings-field">
                    <label>Instructor Name</label>
                    <input
                      type="text"
                      defaultValue={currentUser?.name || "Prof. Sunita Rao"}
                      className="admin-input-field"
                    />
                  </div>

                  <div className="settings-field">
                    <label>Academic Title & Designation</label>
                    <input
                      type="text"
                      defaultValue={currentUser?.title || "Senior HOD Sciences"}
                      className="admin-input-field"
                    />
                  </div>

                  <div className="settings-field">
                    <label>Department</label>
                    <input
                      type="text"
                      defaultValue="Department of Biological & Chemical Sciences"
                      className="admin-input-field"
                    />
                  </div>

                  <div className="settings-field">
                    <label>Assigned Subjects</label>
                    <input
                      type="text"
                      defaultValue="Biology, Chemistry, Environmental Sciences"
                      className="admin-input-field"
                    />
                  </div>

                  <div className="settings-field">
                    <label>AI Question Generation Model</label>
                    <select className="admin-select" defaultValue="gemini-1.5-pro">
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended for STEM)</option>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                      <option value="gpt-4o">OpenAI GPT-4o</option>
                      <option value="demo">High-Fidelity Demo Heuristic Engine</option>
                    </select>
                  </div>

                  <div className="settings-field">
                    <label>Publishing Permissions</label>
                    <div className="permission-status-box">
                      <ShieldCheck size={18} className="text-emerald" />
                      <span>Direct Publishing Authorized: Your materials and question papers publish immediately without mandatory admin pre-moderation.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===================================================================
          MODAL 1: QUESTION BANK PICKER FOR PAPER BUILDER
         =================================================================== */}
      {isBankPickerOpen && (
        <div className="auth-modal-overlay fade-in" onClick={() => setIsBankPickerOpen(false)}>
          <div className="auth-modal-card bank-picker-card" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <div className="auth-brand-chip">
                <Database size={18} className="text-emerald" />
                <span>Select Questions from Bank ({questions.length})</span>
              </div>
              <button onClick={() => setIsBankPickerOpen(false)} className="auth-close-btn">
                <X size={18} />
              </button>
            </div>

            <div className="bank-picker-list">
              {questions.map((q) => {
                const isAlreadyInPaper = paperQuestions.some(item => item.id === q.id);
                return (
                  <div key={q.id} className={`picker-q-item ${isAlreadyInPaper ? "added" : ""}`}>
                    <div className="picker-q-header">
                      <span className="source-chip small">{q.source}</span>
                      <span className="badge-type">{q.type}</span>
                      <strong>{q.marks || 1} Marks</strong>
                    </div>
                    <p className="picker-q-stem">{q.stem || q.text}</p>
                    <button
                      disabled={isAlreadyInPaper}
                      onClick={() => handleAddQuestionToPaper(q)}
                      className={`btn-picker-add ${isAlreadyInPaper ? "disabled" : ""}`}
                    >
                      {isAlreadyInPaper ? "Already Added" : "+ Add to Paper"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: PRINTABLE PDF EXPORT PREVIEW
         =================================================================== */}
      {isPrintPreviewOpen && (
        <div className="auth-modal-overlay fade-in" onClick={() => setIsPrintPreviewOpen(false)}>
          <div className="auth-modal-card print-preview-card" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header no-print">
              <div className="auth-brand-chip">
                <Printer size={18} className="text-emerald" />
                <span>Official Examination Paper Preview</span>
              </div>
              <div className="print-modal-actions">
                <button
                  onClick={() => setShowAnswerKeyInPrint(!showAnswerKeyInPrint)}
                  className="btn-outline-neutral"
                >
                  {showAnswerKeyInPrint ? "Hide Answer Key" : "Show Answer Key"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-admin-primary"
                >
                  <Printer size={16} /> Print / Save as PDF
                </button>
                <button onClick={() => setIsPrintPreviewOpen(false)} className="auth-close-btn">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Authentic Printable Paper Layout */}
            <div className="printable-paper-sheet">
              <div className="paper-header-block">
                <h2 className="exam-school-title">CAPLEN ACADEMIC PREPARATION INSTITUTE</h2>
                <h3 className="exam-paper-heading">{paperTitle || "ANNUAL COMPREHENSIVE ASSESSMENT"}</h3>
                <div className="exam-meta-grid">
                  <span><strong>Subject:</strong> {paperSubject}</span>
                  <span><strong>Class:</strong> {paperClass}</span>
                  <span><strong>Time Allowed:</strong> {paperDuration} Minutes</span>
                  <span><strong>Maximum Marks:</strong> {paperMaxMarks}</span>
                </div>
              </div>

              <div className="exam-instructions-box">
                <h4>General Instructions:</h4>
                <ol>
                  {paperInstructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ol>
              </div>

              <div className="exam-questions-flow">
                {paperQuestions.map((q, qIndex) => (
                  <div key={q.id} className="exam-q-row">
                    <div className="exam-q-text">
                      <span className="q-num">Q{qIndex + 1}.</span>
                      <span>{q.stem || q.text}</span>
                    </div>
                    <span className="exam-q-marks">[{q.marks || 1}]</span>

                    {q.options && q.options.length > 0 && (
                      <div className="exam-options-four">
                        {q.options.map(opt => (
                          <div key={opt.id} className="opt-column">
                            ({opt.id}) {opt.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {showAnswerKeyInPrint && (
                <div className="paper-answer-key-section">
                  <h3>OFFICIAL FACULTY ANSWER KEY & MARKING SCHEME</h3>
                  <table className="marking-scheme-table">
                    <thead>
                      <tr>
                        <th>Q#</th>
                        <th>Correct Key / Answer</th>
                        <th>Marks</th>
                        <th>Explanation & Derivation Steps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paperQuestions.map((q, i) => (
                        <tr key={q.id}>
                          <td><strong>Q{i + 1}</strong></td>
                          <td><code>{q.correctOption || q.correctAnswer || "A"}</code></td>
                          <td>{q.marks || 1} M</td>
                          <td>{q.explanation || "Standard curriculum reasoning."}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: IN-BROWSER PDF VIEWER MODAL
         =================================================================== */}
      {previewResource && (
        <div className="auth-modal-overlay fade-in" onClick={() => setPreviewResource(null)}>
          <div className="auth-modal-card pdf-viewer-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <div className="auth-brand-chip">
                <FileText size={18} className="text-emerald" />
                <span>{previewResource.title}</span>
              </div>
              <button onClick={() => setPreviewResource(null)} className="auth-close-btn">
                <X size={18} />
              </button>
            </div>

            <div className="pdf-viewer-body">
              <div className="pdf-viewer-header-info">
                <span><strong>Author:</strong> {previewResource.ownerName}</span>
                <span><strong>Class:</strong> {previewResource.classGrade} ({previewResource.subject})</span>
                <span><strong>Pages:</strong> {previewResource.pageCount}</span>
                <span className={`status-pill ${previewResource.status}`}>{previewResource.status}</span>
              </div>

              <div className="pdf-viewer-content-box">
                <pre>{previewResource.extractedText}</pre>
              </div>

              <div className="pdf-viewer-footer">
                <button
                  onClick={() => {
                    const blob = new Blob([previewResource.extractedText], { type: "text/plain;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = previewResource.fileName || "study_material.txt";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="btn-admin-primary"
                >
                  <Download size={15} /> Download Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 4: ADD IMPORTANT TOPIC MODAL
         =================================================================== */}
      {isAddTopicModalOpen && (
        <div className="auth-modal-overlay fade-in" onClick={() => setIsAddTopicModalOpen(false)}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <div className="auth-brand-chip">
                <BookMarked size={18} className="text-emerald" />
                <span>Curate New Important Topic</span>
              </div>
              <button onClick={() => setIsAddTopicModalOpen(false)} className="auth-close-btn">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="faculty-form">
              <div className="form-group">
                <label>Topic Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hardy-Weinberg Principle & Mathematical Allele Dynamics"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  className="admin-input-field"
                />
              </div>

              <div className="form-row-two">
                <div className="form-group">
                  <label>Class</label>
                  <select
                    value={newTopicClass}
                    onChange={(e) => setNewTopicClass(e.target.value)}
                    className="admin-select"
                  >
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select
                    value={newTopicSubject}
                    onChange={(e) => setNewTopicSubject(e.target.value)}
                    className="admin-select"
                  >
                    <option value="Biology">Biology</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>
              </div>

              <div className="form-row-two">
                <div className="form-group">
                  <label>Chapter Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Chapter 7: Evolution"
                    value={newTopicChapter}
                    onChange={(e) => setNewTopicChapter(e.target.value)}
                    className="admin-input-field"
                  />
                </div>

                <div className="form-group">
                  <label>Faculty Priority Level *</label>
                  <select
                    value={newTopicPriority}
                    onChange={(e) => setNewTopicPriority(e.target.value)}
                    className="admin-select"
                  >
                    <option value="High">High Priority (Exam Crucial)</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority / Reference</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Faculty Reasoning Note</label>
                <input
                  type="text"
                  placeholder="e.g. Mandatory 3-mark numerical in CBSE board every year since 2018."
                  value={newTopicReason}
                  onChange={(e) => setNewTopicReason(e.target.value)}
                  className="admin-input-field"
                />
              </div>

              <div className="form-group">
                <label>Key Formulas (One per line)</label>
                <textarea
                  rows={2}
                  placeholder={`p + q = 1\np² + 2pq + q² = 1`}
                  value={newTopicFormulas}
                  onChange={(e) => setNewTopicFormulas(e.target.value)}
                  className="admin-textarea-field"
                />
              </div>

              <div className="form-group">
                <label>Explanation & Core Revision Points</label>
                <textarea
                  rows={3}
                  placeholder="Describe key concepts, common student misconceptions, and shortcuts..."
                  value={newTopicExplanation}
                  onChange={(e) => setNewTopicExplanation(e.target.value)}
                  className="admin-textarea-field"
                />
              </div>

              <div className="form-actions-row">
                <button
                  type="button"
                  onClick={() => setIsAddTopicModalOpen(false)}
                  className="btn-outline-neutral"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  <Check size={16} /> Save Important Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
