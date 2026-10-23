import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import DashboardView from "./components/DashboardView";
import TopicReadingView from "./components/TopicReadingView";
import QuestionPracticeView from "./components/QuestionPracticeView";
import PracticeView from "./components/PracticeView";
import SmartNotesView from "./components/SmartNotesView";
import TopicVideosView from "./components/TopicVideosView";
import CustomTestBuilderView from "./components/CustomTestBuilderView";
import ExamScreen from "./components/ExamScreen";
import InstantResultView from "./components/InstantResultView";
import AIDoubtSolverView from "./components/AIDoubtSolverView";
import RevisionNotebookView from "./components/RevisionNotebookView";
import TerminologyDrawer from "./components/TerminologyDrawer";
import AIGeneratorView from "./components/AIGeneratorView";
import PYPPapersView from "./components/PYPPapersView";
import ImportantTopicsView from "./components/ImportantTopicsView";
import ImportQuestionsView from "./components/ImportQuestionsView";
import SelfGeneratorView from "./components/SelfGeneratorView";
import LibraryView from "./components/LibraryView";
import AnalyticsView from "./components/AnalyticsView";
import SettingsView from "./components/SettingsView";
import PublicLandingPage from "./components/PublicLandingPage";
import AuthModal from "./components/AuthModal";
import AdminPanel from "./components/AdminPanel";
import AccessDeniedView from "./components/AccessDeniedView";
import FacultyPanel from "./components/FacultyPanel";
import { StorageService } from "./services/storage";
import { AuthService, ROLES } from "./services/authService";
import "./App.css";

export default function App() {
  // Top-level architectural view: 'public' | 'student' | 'faculty' | 'admin' | 'access-denied'
  const [topLevelView, setTopLevelView] = useState("public");
  const [attemptedDeniedRoute, setAttemptedDeniedRoute] = useState("admin"); // 'admin' | 'faculty'

  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const [authRedirectMessage, setAuthRedirectMessage] = useState("");

  // Student application route
  const [currentRoute, setCurrentRoute] = useState("dashboard");
  const [user, setUser] = useState(StorageService.getUser());
  const [statistics, setStatistics] = useState(StorageService.getStatistics());
  const [activeCourse, setActiveCourse] = useState(StorageService.getActiveCourse());
  const [practiceSubject, setPracticeSubject] = useState(null);
  const [practiceQuestions, setPracticeQuestions] = useState(null);
  const [readingTopicConfig, setReadingTopicConfig] = useState(null);
  const [practiceTopicConfig, setPracticeTopicConfig] = useState(null);
  const [selectedTopicVideo, setSelectedTopicVideo] = useState("topic-bio-evolution");
  const [activeExamConfig, setActiveExamConfig] = useState(null);
  const [latestExamResult, setLatestExamResult] = useState(StorageService.getLatestTestResult());
  const [globalTermId, setGlobalTermId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync routing from URL
  const syncRouteFromLocation = useCallback(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const session = AuthService.getCurrentSession();
    const activeUsr = session ? session.user : null;
    setCurrentUser(activeUsr);

    if (path.startsWith("/admin") || hash === "#admin") {
      if (!activeUsr) {
        setTopLevelView("public");
        setAuthModalMode("admin-login");
        setAuthRedirectMessage("Administrator sign-in required to access the admin portal.");
        setIsAuthModalOpen(true);
      } else if (activeUsr.role !== ROLES.ADMIN) {
        setAttemptedDeniedRoute("admin");
        setTopLevelView("access-denied");
      } else {
        setTopLevelView("admin");
      }
      return;
    }

    if (path.startsWith("/faculty") || hash === "#faculty") {
      if (!activeUsr) {
        setTopLevelView("public");
        setAuthModalMode("faculty-login");
        setAuthRedirectMessage("Faculty sign-in required to access the faculty panel.");
        setIsAuthModalOpen(true);
      } else if (activeUsr.role !== ROLES.FACULTY && activeUsr.role !== ROLES.ADMIN) {
        setAttemptedDeniedRoute("faculty");
        setTopLevelView("access-denied");
      } else {
        setTopLevelView("faculty");
      }
      return;
    }

    if (path.startsWith("/login") || hash === "#login") {
      setTopLevelView("public");
      setAuthModalMode("login");
      setIsAuthModalOpen(true);
      return;
    }

    if (path.startsWith("/register") || hash === "#register") {
      setTopLevelView("public");
      setAuthModalMode("register");
      setIsAuthModalOpen(true);
      return;
    }

    if (path.startsWith("/app") || path.startsWith("/dashboard") || path.startsWith("/student") || hash === "#app" || hash === "#dashboard" || hash === "#student") {
      if (!activeUsr) {
        // Auto-login default demo student so /dashboard is immediately accessible
        const autoRes = AuthService.login("student@caplen.edu", "student123");
        if (autoRes.success) {
          setCurrentUser(autoRes.user);
          setTopLevelView("student");
          setCurrentRoute("dashboard");
          return;
        }
        setTopLevelView("public");
        setAuthModalMode("login");
        setAuthRedirectMessage("Please sign in or create an account to access the learning dashboard.");
        setIsAuthModalOpen(true);
      } else if (activeUsr.role === ROLES.ADMIN) {
        setTopLevelView("admin");
      } else if (activeUsr.role === ROLES.FACULTY) {
        setTopLevelView("faculty");
      } else {
        setTopLevelView("student");
        setCurrentRoute("dashboard");
      }
      return;
    }

    // Default root path (/ or /home): The main website URL ALWAYS shows the Public Landing Homepage that we created!
    setTopLevelView("public");
  }, []);

  // Initialize storage, auth, and routing
  useEffect(() => {
    StorageService.init();
    AuthService.init();
    refreshMetrics();
    syncRouteFromLocation();

    const handlePopState = () => {
      syncRouteFromLocation();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [syncRouteFromLocation]);

  const refreshMetrics = () => {
    const usr = StorageService.getUser();
    setUser(usr);
    setCurrentUser(AuthService.getCurrentUser());
    setStatistics(StorageService.getStatistics());
    setActiveCourse(StorageService.getActiveCourse());
    setLatestExamResult(StorageService.getLatestTestResult());
  };

  // Auth Actions
  const handleOpenAuth = (mode = "login", redirectMsg = "") => {
    setAuthModalMode(mode);
    setAuthRedirectMessage(redirectMsg);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser, role) => {
    setIsAuthModalOpen(false);
    setCurrentUser(authenticatedUser);
    refreshMetrics();

    if (role === ROLES.ADMIN) {
      setTopLevelView("admin");
      window.history.pushState({}, "", "/admin");
    } else if (role === ROLES.FACULTY) {
      setTopLevelView("faculty");
      window.history.pushState({}, "", "/faculty");
    } else {
      setTopLevelView("student");
      setCurrentRoute("dashboard");
      window.history.pushState({}, "", "/dashboard");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setTopLevelView("public");
    window.history.pushState({}, "", "/");
    refreshMetrics();
  };

  const handleGoToDashboard = () => {
    if (!currentUser) {
      const autoRes = AuthService.login("student@caplen.edu", "student123");
      if (autoRes.success) {
        setCurrentUser(autoRes.user);
        refreshMetrics();
        setTopLevelView("student");
        setCurrentRoute("dashboard");
        window.history.pushState({}, "", "/dashboard");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      handleOpenAuth("login");
      return;
    }
    setTopLevelView("student");
    setCurrentRoute("dashboard");
    window.history.pushState({}, "", "/dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToFaculty = () => {
    const check = AuthService.verifyFacultyAccess();
    if (!check.authorized) {
      if (!currentUser) {
        handleOpenAuth("faculty-login", "Faculty credentials required to enter /faculty.");
      } else {
        setAttemptedDeniedRoute("faculty");
        setTopLevelView("access-denied");
      }
      return;
    }
    setTopLevelView("faculty");
    window.history.pushState({}, "", "/faculty");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToAdmin = () => {
    const check = AuthService.verifyAdminAccess();
    if (!check.authorized) {
      if (!currentUser) {
        handleOpenAuth("admin-login", "Administrator credentials required to enter /admin.");
      } else {
        setAttemptedDeniedRoute("admin");
        setTopLevelView("access-denied");
      }
      return;
    }
    setTopLevelView("admin");
    window.history.pushState({}, "", "/admin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToPublic = () => {
    setTopLevelView("public");
    window.history.pushState({}, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Student Navigation inside Student Application
  const handleNavigate = (route) => {
    // If student clicks admin link or attempts admin navigation
    if (route === "admin") {
      const check = AuthService.verifyAdminAccess();
      if (!check.authorized) {
        setTopLevelView("access-denied");
        window.history.pushState({}, "", "/admin");
        return;
      }
      setTopLevelView("admin");
      window.history.pushState({}, "", "/admin");
      return;
    }

    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    if (route !== "exam") {
      setActiveExamConfig(null);
    }
    if (route === "practice") {
      setPracticeSubject(null);
      setPracticeQuestions(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCourseChange = (courseId) => {
    StorageService.setActiveCourse(courseId);
    setActiveCourse(courseId);
    refreshMetrics();
  };

  const handleStartTopicReading = (config) => {
    setReadingTopicConfig(config);
    setCurrentRoute("topic-reading");
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartTopicPractice = (config) => {
    setPracticeTopicConfig(config);
    setCurrentRoute("question-practice");
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartPracticeSubject = (subject) => {
    setPracticeSubject(subject);
    setPracticeQuestions(null);
    setCurrentRoute("practice");
    setIsMobileMenuOpen(false);
  };

  const handleStartPracticeWithSet = (questionSet) => {
    setPracticeSubject(null);
    setPracticeQuestions(questionSet);
    setCurrentRoute("practice");
    setIsMobileMenuOpen(false);
  };

  const handleLaunchTest = (testConfig) => {
    setActiveExamConfig(testConfig);
    setCurrentRoute("exam");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinishExam = (resultPayload) => {
    StorageService.saveCustomTestResult(resultPayload);
    setLatestExamResult(resultPayload);
    setActiveExamConfig(null);
    setCurrentRoute("results");
    refreshMetrics();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenVideo = (topicId) => {
    setSelectedTopicVideo(topicId || "topic-bio-evolution");
    setCurrentRoute("videos");
  };

  const handleSessionCompleted = () => {
    refreshMetrics();
  };

  return (
    <div className="caplen-app-wrapper">
      {/* 1. PUBLIC LANDING PAGE (First Page Visitors See) */}
      {topLevelView === "public" && (
        <PublicLandingPage
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onNavigateToCourse={(courseId) => {
            StorageService.setActiveCourse(courseId);
            setActiveCourse(courseId);
            if (currentUser) {
              setTopLevelView("student");
              setCurrentRoute("smart-notes");
            } else {
              handleOpenAuth("register");
            }
          }}
          onGoToDashboard={handleGoToDashboard}
          onGoToFaculty={handleGoToFaculty}
          onGoToAdmin={handleGoToAdmin}
        />
      )}

      {/* 2. ACCESS DENIED SCREEN (When Unauthorized user attempts /admin or /faculty) */}
      {topLevelView === "access-denied" && (
        <AccessDeniedView
          currentUser={currentUser}
          attemptedRoute={attemptedDeniedRoute}
          onReturnToDashboard={() => {
            setTopLevelView("student");
            window.history.pushState({}, "", "/dashboard");
          }}
          onSwitchToAdmin={() => {
            handleOpenAuth("admin-login", "Sign in with administrator credentials to access /admin.");
          }}
          onSwitchToFaculty={() => {
            handleOpenAuth("faculty-login", "Sign in with faculty instructor credentials to access /faculty.");
          }}
        />
      )}

      {/* 3. DEDICATED FACULTY PANEL (Professional Workspace for Teachers) */}
      {topLevelView === "faculty" && (
        <FacultyPanel
          currentUser={currentUser}
          onNavigateToStudent={() => {
            setTopLevelView("student");
            window.history.pushState({}, "", "/dashboard");
          }}
          onNavigateToHome={handleGoToPublic}
          onFacultyLogout={handleLogout}
        />
      )}

      {/* 4. DEDICATED ADMIN PANEL (Distinct Layout for Authorized Admins) */}
      {topLevelView === "admin" && (
        <AdminPanel
          currentUser={currentUser}
          onNavigateToStudent={() => {
            setTopLevelView("student");
            window.history.pushState({}, "", "/dashboard");
          }}
          onNavigateToHome={handleGoToPublic}
          onNavigateToFaculty={handleGoToFaculty}
          onAdminLogout={handleLogout}
        />
      )}

      {/* 5. STUDENT APPLICATION (Authenticated Student Dashboard & Learning Views) */}
      {topLevelView === "student" && (
        <div className="app-container">
          {/* Student Sidebar (NO Admin CMS, NO Launch Checklist) */}
          <Sidebar
            currentRoute={currentRoute}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onGoHome={handleGoToPublic}
            isMobileOpen={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
          />

          {/* Student Main Layout */}
          <main className="main-content-layout">
            <Header
              user={user}
              activeCourse={activeCourse}
              onCourseChange={handleCourseChange}
              onNavigate={handleNavigate}
              onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
              onSelectTerm={(termId) => setGlobalTermId(termId)}
              onLogout={handleLogout}
              onGoHome={handleGoToPublic}
            />

            <div className="route-content-viewport">
              {currentRoute === "dashboard" && (
                <DashboardView
                  user={user}
                  statistics={statistics}
                  onNavigate={handleNavigate}
                  onStartReadingTopic={handleStartTopicReading}
                  onStartPracticeTopic={handleStartTopicPractice}
                />
              )}

              {currentRoute === "topic-reading" && (
                <TopicReadingView
                  initialCategoryId={readingTopicConfig?.categoryId || "iit"}
                  initialTopicId={readingTopicConfig?.id || readingTopicConfig?.topicId || null}
                  onNavigate={handleNavigate}
                  onStartPracticeWithTopic={handleStartTopicPractice}
                  onOpenTermDrawer={(termId) => setGlobalTermId(termId)}
                />
              )}

              {currentRoute === "question-practice" && (
                <QuestionPracticeView
                  initialParams={practiceTopicConfig}
                  onNavigate={handleNavigate}
                  onReviewTopicNotes={handleStartTopicReading}
                />
              )}

              {currentRoute === "smart-notes" && (
                <SmartNotesView
                  onNavigate={handleNavigate}
                  onStartPracticeWithTopic={handleStartPracticeWithSet}
                  onOpenVideoForTopic={handleOpenVideo}
                />
              )}

              {currentRoute === "videos" && (
                <TopicVideosView
                  initialTopicId={selectedTopicVideo}
                  onNavigate={handleNavigate}
                  onPracticeTopic={handleStartPracticeSubject}
                />
              )}

              {currentRoute === "practice" && (
                <PracticeView
                  initialSubject={practiceSubject}
                  initialQuestions={practiceQuestions}
                  onSessionCompleted={handleSessionCompleted}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "test-builder" && (
                <CustomTestBuilderView
                  onLaunchTest={handleLaunchTest}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "exam" && activeExamConfig && (
                <ExamScreen
                  testConfig={activeExamConfig}
                  onFinishExam={handleFinishExam}
                  onCancelExam={() => setCurrentRoute("test-builder")}
                />
              )}

              {currentRoute === "results" && (
                <InstantResultView
                  resultData={latestExamResult}
                  onNavigate={handleNavigate}
                  onRetryMistakes={handleStartPracticeWithSet}
                />
              )}

              {currentRoute === "doubt-solver" && (
                <AIDoubtSolverView
                  onNavigate={handleNavigate}
                  onPracticeTopic={handleStartPracticeSubject}
                />
              )}

              {currentRoute === "revision" && (
                <RevisionNotebookView
                  onNavigate={handleNavigate}
                  onStartPracticeWithMistakes={handleStartPracticeWithSet}
                />
              )}

              {currentRoute === "pyq" && (
                <PYPPapersView
                  onStartPracticeWithPaper={(paper) => {
                    setPracticeSubject({ id: paper.subjectId, name: paper.subject });
                    setCurrentRoute("practice");
                  }}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "ai-generator" && (
                <AIGeneratorView
                  onStartPracticeSet={handleStartPracticeWithSet}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "topics" && (
                <ImportantTopicsView
                  onPracticeTopic={(topic) => {
                    setPracticeSubject({ id: topic.subjectId, name: topic.unit });
                    setCurrentRoute("practice");
                  }}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "import" && (
                <ImportQuestionsView
                  onStartPracticeWithImported={handleStartPracticeWithSet}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "self-generator" && (
                <SelfGeneratorView
                  onStartPracticeWithCustom={handleStartPracticeWithSet}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "library" && (
                <LibraryView
                  onStartPracticeWithCustom={handleStartPracticeWithSet}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "analytics" && (
                <AnalyticsView
                  onStartPracticeWeakTopics={handleStartPracticeWithSet}
                  onNavigate={handleNavigate}
                />
              )}

              {currentRoute === "settings" && (
                <SettingsView
                  user={user}
                  onUserUpdate={(updatedUser) => {
                    setUser(updatedUser);
                    refreshMetrics();
                  }}
                />
              )}
            </div>

            {/* Global Terminology Drawer */}
            {globalTermId && (
              <TerminologyDrawer
                termId={globalTermId}
                onClose={() => setGlobalTermId(null)}
                onNavigateToNotes={() => {
                  setGlobalTermId(null);
                  setCurrentRoute("smart-notes");
                }}
                onPracticeTerm={() => {
                  setGlobalTermId(null);
                  setCurrentRoute("practice");
                }}
              />
            )}

            {/* Mobile Bottom Navigation */}
            <BottomNav
              currentRoute={currentRoute}
              onNavigate={handleNavigate}
              onOpenMenu={() => setIsMobileMenuOpen(true)}
            />
          </main>
        </div>
      )}

      {/* Global Authentication Modal (Accessible from Landing Page, Header, or Protected Redirects) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        redirectMessage={authRedirectMessage}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthRedirectMessage("");
        }}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
