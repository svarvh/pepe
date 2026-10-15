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

const KEYS = {
  USER: "caplen_user_profile",
  QUESTIONS: "caplen_questions_bank",
  SESSIONS: "caplen_practice_sessions",
  BOOKMARKS: "caplen_bookmarked_questions",
  TOPICS: "caplen_important_topics",
  PAPERS: "caplen_pyq_papers",
  CUSTOM_SETS: "caplen_custom_question_sets",
  AI_SETS: "caplen_ai_generated_sets",
  IMPORTED_SETS: "caplen_imported_question_sets",
  SETTINGS: "caplen_user_settings",
  EVENTS: "caplen_calendar_events"
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
    if (!localStorage.getItem(KEYS.QUESTIONS)) {
      setStorage(KEYS.QUESTIONS, INITIAL_QUESTIONS);
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
      setStorage(KEYS.BOOKMARKS, ["q-phys-01", "q-chem-02"]);
    }
    if (!localStorage.getItem(KEYS.CUSTOM_SETS)) {
      setStorage(KEYS.CUSTOM_SETS, [
        {
          id: "custom-set-1",
          title: "My High-Yield Organic Synthesis Drill",
          subject: "Organic Chemistry",
          subjectId: "chem",
          description: "Curated personal set focusing on SN1/SN2 inversion and stereocenter identification.",
          questionsCount: 4,
          createdAt: "2026-10-20T10:00:00Z",
          published: true,
          questions: [
            INITIAL_QUESTIONS[4],
            INITIAL_QUESTIONS[5]
          ]
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.AI_SETS)) {
      setStorage(KEYS.AI_SETS, [
        {
          id: "ai-set-1",
          title: "AI Synthesis: Fluid Dynamics & Bernoulli Mechanics",
          subject: "Physics: Mechanics & Waves",
          subjectId: "phys",
          topic: "Bernoulli's Principle",
          difficulty: "Medium",
          questionsCount: 5,
          createdAt: "2026-10-21T18:00:00Z",
          questions: [
            INITIAL_QUESTIONS[2],
            INITIAL_QUESTIONS[0]
          ]
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.IMPORTED_SETS)) {
      setStorage(KEYS.IMPORTED_SETS, [
        {
          id: "imp-set-1",
          title: "Imported Chapter 4 Quiz (Lecture Notes PDF)",
          filename: "physics_lecture_week4.pdf",
          fileType: "pdf",
          questionsCount: 3,
          importedAt: "2026-10-19T14:10:00Z",
          questions: [INITIAL_QUESTIONS[1]]
        }
      ]);
    }
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      setStorage(KEYS.SETTINGS, {
        aiProvider: "demo", // 'demo', 'openai', 'gemini', 'anthropic'
        apiKey: "",
        aiModel: "gemini-1.5-pro",
        showTimer: true,
        instantFeedback: true,
        soundEnabled: true,
        darkMode: false
      });
    }
    if (!localStorage.getItem(KEYS.EVENTS)) {
      setStorage(KEYS.EVENTS, UPCOMING_EVENTS);
    }
  },

  // User Profile
  getUser() {
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
