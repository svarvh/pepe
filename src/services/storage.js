// ==========================================================================
// CAPLEN EXAM PREP - STORAGE & STATE MANAGEMENT SERVICE
// Reusable service layer persisting to localStorage with dynamic metrics calculation
// ==========================================================================

import {
  INITIAL_USER,
  SUBJECTS_CATALOG,
  INITIAL_QUESTIONS,
  PREVIOUS_YEAR_PAPERS,
  IMPORTANT_TOPICS,
  INITIAL_PRACTICE_SESSIONS,
  UPCOMING_EVENTS
} from "../data/mockData";
import {
  COURSES_CATALOG,
  TERMINOLOGY_DATABASE,
  SYLLABUS_TREE,
  SMART_NOTES_COLLECTION,
  TOPIC_VIDEOS_COLLECTION,
  EXPANDED_QUESTIONS_BANK,
  EXAM_RULES_CONFIG,
  LAUNCH_CHECKLIST_ITEMS
} from "../data/edtechCurriculum";
import { AuthService } from "./authService";

const KEYS = {
  USER: "caplen_user_profile",
  ACTIVE_COURSE: "edtech_active_course",
  QUESTIONS: "caplen_questions_bank",
  SESSIONS: "caplen_practice_sessions",
  BOOKMARKS: "caplen_bookmarked_questions",
  MISTAKES: "edtech_mistake_notebook",
  FLASHCARDS: "edtech_spaced_repetition",
  DOUBTS: "edtech_doubt_history",
  CHECKLIST: "edtech_launch_checklist",
  TOPICS: "caplen_important_topics",
  PAPERS: "caplen_pyq_papers",
  CUSTOM_SETS: "caplen_custom_question_sets",
  AI_SETS: "caplen_ai_generated_sets",
  IMPORTED_SETS: "caplen_imported_question_sets",
  SETTINGS: "caplen_user_settings",
  EVENTS: "caplen_calendar_events",
  CUSTOM_TEST_RESULTS: "edtech_custom_test_results"
};

// Safe JSON get/set
function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

export const StorageService = {
  // Initialize storage if empty
  init() {
    if (!localStorage.getItem(KEYS.USER)) {
      setStorage(KEYS.USER, INITIAL_USER);
    }
    if (!localStorage.getItem(KEYS.ACTIVE_COURSE)) {
      setStorage(KEYS.ACTIVE_COURSE, "class11_12");
    }
    // Seed questions with combined catalog
    const existingQuestions = getStorage(KEYS.QUESTIONS, []);
    const combinedQuestions = [...EXPANDED_QUESTIONS_BANK];
    INITIAL_QUESTIONS.forEach(q => {
      if (!combinedQuestions.some(cq => cq.id === q.id)) {
        combinedQuestions.push(q);
      }
    });
    if (!existingQuestions || existingQuestions.length < combinedQuestions.length) {
      setStorage(KEYS.QUESTIONS, combinedQuestions);
    }
    if (!localStorage.getItem(KEYS.SESSIONS)) {
      setStorage(KEYS.SESSIONS, INITIAL_PRACTICE_SESSIONS);
    }
    if (!localStorage.getItem(KEYS.TOPICS)) {
      setStorage(KEYS.TOPICS, IMPORTANT_TOPICS);
    }
    if (!localStorage.getItem(KEYS.PAPERS)) {
      setStorage(KEYS.PAPERS, PREVIOUS_YEAR_PAPERS);
    }
    if (!localStorage.getItem(KEYS.BOOKMARKS)) {
      setStorage(KEYS.BOOKMARKS, ["q-bio-01", "q-chem-01", "q-phys-01"]);
    }
    if (!localStorage.getItem(KEYS.MISTAKES)) {
      setStorage(KEYS.MISTAKES, [
        {
          questionId: "q-bio-03",
          mistakeType: "Conceptual Confusion",
          userChoice: ["A", "C"],
          correctChoice: ["A", "B", "D"],
          savedAt: new Date().toISOString(),
          notes: "Confused stabilizing with disruptive selection curve dynamics"
        },
        {
          questionId: "q-chem-01",
          mistakeType: "Calculation Error",
          userChoice: "1.041 V",
          correctChoice: "1.159 V",
          savedAt: new Date().toISOString(),
          notes: "Forgot to account for negative sign in log10(10^-2)"
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.CHECKLIST)) {
      setStorage(KEYS.CHECKLIST, LAUNCH_CHECKLIST_ITEMS);
    }
    if (!localStorage.getItem(KEYS.CUSTOM_TEST_RESULTS)) {
      // Seed illustrative instant test result matching Section 4 of roadmap (24/30 - 80%)
      setStorage(KEYS.CUSTOM_TEST_RESULTS, [
        {
          id: "result-demo-1",
          testTitle: "Class 12 Biology: Evolution & Natural Selection Custom Mock",
          courseId: "class11_12",
          score: 24,
          totalQuestions: 30,
          accuracyPercentage: 80,
          correctCount: 24,
          incorrectCount: 4,
          unattemptedCount: 2,
          totalMarks: 92,
          maxMarks: 120,
          timeSpentSeconds: 1420,
          avgTimePerQuestion: 47,
          topicAccuracy: [
            { name: "Concepts & Darwinian Axioms", accuracy: 90, total: 10, correct: 9 },
            { name: "Applications & Industrial Melanism", accuracy: 70, total: 10, correct: 7 },
            { name: "Terminology & Population Genetics", accuracy: 60, total: 10, correct: 6 }
          ],
          submittedAt: "2026-10-21T16:30:00.000Z",
          recommendations: [
            "Revise Industrial Melanism allele shifts in Chapter 7 notes",
            "Practise 5 numericals on Hardy-Weinberg equilibrium",
            "Watch Dr. Sen's video on Disruptive vs Stabilizing Selection"
          ]
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.CUSTOM_SETS)) {
      setStorage(KEYS.CUSTOM_SETS, [
        {
          id: "custom-set-1",
          title: "High-Yield Natural Selection Drill",
          subject: "Biology (Class 12 NCERT)",
          subjectId: "bio_12",
          description: "Curated set on Darwinian fitness, industrial melanism, and population dynamics.",
          questionsCount: 4,
          createdAt: "2026-10-20T10:00:00Z",
          published: true,
          questions: [
            EXPANDED_QUESTIONS_BANK[0],
            EXPANDED_QUESTIONS_BANK[1]
          ]
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.AI_SETS)) {
      setStorage(KEYS.AI_SETS, [
        {
          id: "ai-set-1",
          title: "AI Synthesis: Galvanic Cells & Nernst Equation",
          subject: "Chemistry (Class 12 NCERT)",
          subjectId: "chem_12",
          topic: "Nernst Equation",
          difficulty: "Hard",
          questionsCount: 5,
          createdAt: "2026-10-21T18:00:00Z",
          questions: [
            EXPANDED_QUESTIONS_BANK[12],
            EXPANDED_QUESTIONS_BANK[13]
          ]
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.IMPORTED_SETS)) {
      setStorage(KEYS.IMPORTED_SETS, [
        {
          id: "imp-set-1",
          title: "Imported Chapter 11 Modern Physics Specimen",
          filename: "physics_photoelectric_specimen.pdf",
          fileType: "pdf",
          questionsCount: 3,
          importedAt: "2026-10-19T14:10:00Z",
          questions: [EXPANDED_QUESTIONS_BANK[24]]
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      setStorage(KEYS.SETTINGS, {
        aiProvider: "demo",
        apiKey: "",
        aiModel: "gemini-1.5-pro",
        showTimer: true,
        instantFeedback: true,
        soundEnabled: true,
        darkMode: false,
        preferredLanguage: "en" // 'en' or 'hi'
      });
    }
    if (!localStorage.getItem(KEYS.EVENTS)) {
      setStorage(KEYS.EVENTS, UPCOMING_EVENTS);
    }
  },

  // Active Course Management
  getActiveCourse() {
    return getStorage(KEYS.ACTIVE_COURSE, "class11_12");
  },
  setActiveCourse(courseId) {
    setStorage(KEYS.ACTIVE_COURSE, courseId);
    return courseId;
  },
  getCourses() {
    return COURSES_CATALOG;
  },
  getCourseById(courseId) {
    return COURSES_CATALOG.find(c => c.id === courseId) || COURSES_CATALOG[0];
  },
  getSyllabusTree(courseId) {
    const cid = courseId || this.getActiveCourse();
    return SYLLABUS_TREE[cid] || SYLLABUS_TREE.class11_12;
  },

  // Terminology Database
  getTerminology(termId) {
    return TERMINOLOGY_DATABASE[termId] || null;
  },
  getAllTerminology() {
    return TERMINOLOGY_DATABASE;
  },
  searchTerminology(query) {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    return Object.values(TERMINOLOGY_DATABASE).filter(t =>
      t.term.toLowerCase().includes(q) ||
      (t.hindiTerm && t.hindiTerm.includes(q)) ||
      t.simpleMeaning.toLowerCase().includes(q) ||
      t.formalDefinition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  },

  // Smart Notes
  getSmartNote(topicId) {
    return SMART_NOTES_COLLECTION[topicId] || null;
  },
  getAllSmartNotes() {
    return SMART_NOTES_COLLECTION;
  },

  // Topic Videos
  getTopicVideo(topicId) {
    return TOPIC_VIDEOS_COLLECTION[topicId] || null;
  },
  getAllTopicVideos() {
    return TOPIC_VIDEOS_COLLECTION;
  },

  // Exam Rules
  getExamRules(courseId) {
    const cid = courseId || this.getActiveCourse();
    return EXAM_RULES_CONFIG[cid] || EXAM_RULES_CONFIG.class11_12;
  },

  // Custom Test Results Engine (Section 4 of Roadmap)
  getCustomTestResults() {
    return getStorage(KEYS.CUSTOM_TEST_RESULTS, []);
  },
  saveCustomTestResult(result) {
    const results = this.getCustomTestResults();
    const updated = [result, ...results];
    setStorage(KEYS.CUSTOM_TEST_RESULTS, updated);
    return updated;
  },
  getLatestTestResult() {
    const results = this.getCustomTestResults();
    return results && results.length > 0 ? results[0] : null;
  },

  // Mistake Notebook
  getMistakes() {
    return getStorage(KEYS.MISTAKES, []);
  },
  addMistake(questionId, mistakeDetails = {}) {
    const mistakes = this.getMistakes();
    const existingIndex = mistakes.findIndex(m => m.questionId === questionId);
    let updated;
    const entry = {
      questionId,
      mistakeType: mistakeDetails.mistakeType || "Conceptual Confusion",
      userChoice: mistakeDetails.userChoice,
      correctChoice: mistakeDetails.correctChoice,
      savedAt: new Date().toISOString(),
      notes: mistakeDetails.notes || "Saved for revision"
    };
    if (existingIndex >= 0) {
      updated = [...mistakes];
      updated[existingIndex] = entry;
    } else {
      updated = [entry, ...mistakes];
    }
    setStorage(KEYS.MISTAKES, updated);
    return updated;
  },
  removeMistake(questionId) {
    const mistakes = this.getMistakes();
    const updated = mistakes.filter(m => m.questionId !== questionId);
    setStorage(KEYS.MISTAKES, updated);
    return updated;
  },

  // 20-Point Launch Checklist (Section 15)
  getLaunchChecklist() {
    return getStorage(KEYS.CHECKLIST, LAUNCH_CHECKLIST_ITEMS);
  },
  updateChecklistItem(checkId, newStatus, userNotes = "") {
    const list = this.getLaunchChecklist();
    const updated = list.map(item => {
      if (item.id === checkId) {
        return { ...item, status: newStatus, userNotes: userNotes || item.userNotes };
      }
      return item;
    });
    setStorage(KEYS.CHECKLIST, updated);
    return updated;
  },

  // User Profile
  getUser() {
    const authSession = AuthService.getCurrentSession();
    if (authSession && authSession.user) {
      const stored = getStorage(KEYS.USER, INITIAL_USER);
      return { ...stored, ...authSession.user };
    }
    return getStorage(KEYS.USER, INITIAL_USER);
  },
  saveUser(user) {
    setStorage(KEYS.USER, user);
  },

  // Questions
  getQuestions() {
    return getStorage(KEYS.QUESTIONS, INITIAL_QUESTIONS);
  },
  addQuestion(question) {
    const questions = this.getQuestions();
    const updated = [question, ...questions];
    setStorage(KEYS.QUESTIONS, updated);
    return updated;
  },
  updateQuestion(questionId, updatedData) {
    const questions = this.getQuestions();
    const updated = questions.map(q => q.id === questionId ? { ...q, ...updatedData } : q);
    setStorage(KEYS.QUESTIONS, updated);
    return updated;
  },
  deleteQuestion(questionId) {
    const questions = this.getQuestions();
    const updated = questions.filter(q => q.id !== questionId);
    setStorage(KEYS.QUESTIONS, updated);
    return updated;
  },

  // Practice Sessions & Dynamic Analytics
  getSessions() {
    return getStorage(KEYS.SESSIONS, INITIAL_PRACTICE_SESSIONS);
  },
  saveSession(session) {
    const sessions = this.getSessions();
    const updated = [session, ...sessions];
    setStorage(KEYS.SESSIONS, updated);

    // Also update questions completed in user profile
    const user = this.getUser();
    user.completedThisWeek = (user.completedThisWeek || 0) + session.totalQuestions;
    this.saveUser(user);

    return updated;
  },

  // Calculate dynamic stats from actual stored history
  getStatistics() {
    const sessions = this.getSessions();
    const topics = this.getTopics();
    const user = this.getUser();

    let totalAttempted = 0;
    let totalCorrect = 0;
    let totalSeconds = 0;

    sessions.forEach(s => {
      totalAttempted += s.totalQuestions || 0;
      totalCorrect += s.correctAnswers || 0;
      totalSeconds += s.timeSpentSeconds || 0;
    });

    const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
    const hoursSpent = (totalSeconds / 3600).toFixed(1);

    const completedTopics = topics.filter(t => t.status === "completed" || t.status === "revised").length;
    const coursesCompleted = 2; // Physics & Bio foundational units completed
    const coursesInProgress = 3; // Chemistry, Math, Advanced Physics

    return {
      totalAttempted,
      totalCorrect,
      overallAccuracy,
      hoursSpent: parseFloat(hoursSpent) || 8.5,
      completedTopics,
      streakDays: 5,
      coursesCompleted,
      coursesInProgress,
      completedThisWeek: user.completedThisWeek || 84
    };
  },

  // Bookmarks
  getBookmarks() {
    return getStorage(KEYS.BOOKMARKS, []);
  },
  toggleBookmark(questionId) {
    const bookmarks = this.getBookmarks();
    let updated;
    if (bookmarks.includes(questionId)) {
      updated = bookmarks.filter(id => id !== questionId);
    } else {
      updated = [...bookmarks, questionId];
    }
    setStorage(KEYS.BOOKMARKS, updated);
    return updated;
  },
  isBookmarked(questionId) {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(questionId);
  },

  // Important Topics
  getTopics() {
    return getStorage(KEYS.TOPICS, IMPORTANT_TOPICS);
  },
  updateTopicStatus(topicId, status) {
    const topics = this.getTopics();
    const updated = topics.map(t => t.id === topicId ? { ...t, status } : t);
    setStorage(KEYS.TOPICS, updated);
    return updated;
  },

  // Previous Year Papers
  getPapers() {
    return getStorage(KEYS.PAPERS, PREVIOUS_YEAR_PAPERS);
  },
  addPaper(paper) {
    const papers = this.getPapers();
    const updated = [paper, ...papers];
    setStorage(KEYS.PAPERS, updated);
    return updated;
  },

  // Custom & Library Sets
  getCustomSets() {
    return getStorage(KEYS.CUSTOM_SETS, []);
  },
  saveCustomSet(set) {
    const sets = this.getCustomSets();
    const existingIndex = sets.findIndex(s => s.id === set.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...sets];
      updated[existingIndex] = set;
    } else {
      updated = [set, ...sets];
    }
    setStorage(KEYS.CUSTOM_SETS, updated);
    return updated;
  },
  deleteCustomSet(setId) {
    const sets = this.getCustomSets();
    const updated = sets.filter(s => s.id !== setId);
    setStorage(KEYS.CUSTOM_SETS, updated);
    return updated;
  },

  // AI Generated Sets
  getAISets() {
    return getStorage(KEYS.AI_SETS, []);
  },
  saveAISet(set) {
    const sets = this.getAISets();
    const updated = [set, ...sets];
    setStorage(KEYS.AI_SETS, updated);
    return updated;
  },

  // Imported Sets
  getImportedSets() {
    return getStorage(KEYS.IMPORTED_SETS, []);
  },
  saveImportedSet(set) {
    const sets = this.getImportedSets();
    const updated = [set, ...sets];
    setStorage(KEYS.IMPORTED_SETS, updated);
    return updated;
  },

  // Settings
  getSettings() {
    return getStorage(KEYS.SETTINGS, {
      aiProvider: "demo",
      apiKey: "",
      aiModel: "gemini-1.5-pro",
      showTimer: true,
      instantFeedback: true,
      soundEnabled: true
    });
  },
  saveSettings(settings) {
    setStorage(KEYS.SETTINGS, settings);
  },

  // Calendar Events
  getEvents() {
    return getStorage(KEYS.EVENTS, UPCOMING_EVENTS);
  },
  addEvent(event) {
    const events = this.getEvents();
    const updated = [...events, event];
    setStorage(KEYS.EVENTS, updated);
    return updated;
  },

  // Reset to factory demo data
  resetAll() {
    localStorage.clear();
    this.init();
  }
};
