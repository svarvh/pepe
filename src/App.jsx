import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import DashboardView from "./components/DashboardView";
import PracticeView from "./components/PracticeView";
import SmartNotesView from "./components/SmartNotesView";
import TopicVideosView from "./components/TopicVideosView";
import CustomTestBuilderView from "./components/CustomTestBuilderView";
import ExamScreen from "./components/ExamScreen";
import InstantResultView from "./components/InstantResultView";
import AIDoubtSolverView from "./components/AIDoubtSolverView";
import RevisionNotebookView from "./components/RevisionNotebookView";
import AdminCMSView from "./components/AdminCMSView";
import LaunchChecklistView from "./components/LaunchChecklistView";
import TerminologyDrawer from "./components/TerminologyDrawer";
import AIGeneratorView from "./components/AIGeneratorView";
import PYPPapersView from "./components/PYPPapersView";
import ImportantTopicsView from "./components/ImportantTopicsView";
import ImportQuestionsView from "./components/ImportQuestionsView";
import SelfGeneratorView from "./components/SelfGeneratorView";
import LibraryView from "./components/LibraryView";
import AnalyticsView from "./components/AnalyticsView";
import SettingsView from "./components/SettingsView";
import { StorageService } from "./services/storage";
import "./App.css";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("dashboard");
  const [user, setUser] = useState(StorageService.getUser());
  const [statistics, setStatistics] = useState(StorageService.getStatistics());
  const [activeCourse, setActiveCourse] = useState(StorageService.getActiveCourse());
  const [practiceSubject, setPracticeSubject] = useState(null);
  const [practiceQuestions, setPracticeQuestions] = useState(null);
  const [selectedTopicVideo, setSelectedTopicVideo] = useState("topic-bio-evolution");
  const [activeExamConfig, setActiveExamConfig] = useState(null);
  const [latestExamResult, setLatestExamResult] = useState(StorageService.getLatestTestResult());
  const [globalTermId, setGlobalTermId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize persistent storage
  useEffect(() => {
    StorageService.init();
    refreshMetrics();
  }, []);

  const refreshMetrics = () => {
    setUser(StorageService.getUser());
    setStatistics(StorageService.getStatistics());
    setActiveCourse(StorageService.getActiveCourse());
    setLatestExamResult(StorageService.getLatestTestResult());
  };

  const handleNavigate = (route) => {
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

  const handleSessionCompleted = (newSession) => {
    refreshMetrics();
  };

  const handleLogout = () => {
    StorageService.resetAll();
    refreshMetrics();
    setCurrentRoute("dashboard");
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Sidebar (Permanent on Desktop, Slide-out Drawer on Mobile/Tablet) */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="main-content-layout">
        {/* Header with Global Search, Course Switcher & Mobile Hamburger */}
        <Header
          user={user}
          activeCourse={activeCourse}
          onCourseChange={handleCourseChange}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onSelectTerm={(termId) => setGlobalTermId(termId)}
        />

        {/* Dynamic Route View */}
        <div className="route-content-viewport">
          {/* 1. Dashboard View */}
          {currentRoute === "dashboard" && (
            <DashboardView
              user={user}
              statistics={statistics}
              onNavigate={handleNavigate}
              onStartPracticeSubject={handleStartPracticeSubject}
            />
          )}

          {/* 2. Module A: Smart Notes & Clickable Terminology */}
          {currentRoute === "smart-notes" && (
            <SmartNotesView
              onNavigate={handleNavigate}
              onStartPracticeWithTopic={handleStartPracticeWithSet}
              onOpenVideoForTopic={handleOpenVideo}
            />
          )}

          {/* 3. Module C: Topic-Specific Videos & Synchronized Transcripts */}
          {currentRoute === "videos" && (
            <TopicVideosView
              initialTopicId={selectedTopicVideo}
              onNavigate={handleNavigate}
              onPracticeTopic={handleStartPracticeSubject}
            />
          )}

          {/* 4. Module B: Practice Questions */}
          {currentRoute === "practice" && (
            <PracticeView
              initialSubject={practiceSubject}
              initialQuestions={practiceQuestions}
              onSessionCompleted={handleSessionCompleted}
              onNavigate={handleNavigate}
            />
          )}

          {/* 5. Module D: Custom Test Builder */}
          {currentRoute === "test-builder" && (
            <CustomTestBuilderView
              onLaunchTest={handleLaunchTest}
              onNavigate={handleNavigate}
            />
          )}

          {/* 6. Active Live Examination Screen */}
          {currentRoute === "exam" && activeExamConfig && (
            <ExamScreen
              testConfig={activeExamConfig}
              onFinishExam={handleFinishExam}
              onCancelExam={() => setCurrentRoute("test-builder")}
            />
          )}

          {/* 7. Section 4: Instant Result Production & Performance Analytics */}
          {currentRoute === "results" && (
            <InstantResultView
              resultData={latestExamResult}
              onNavigate={handleNavigate}
              onRetryMistakes={handleStartPracticeWithSet}
            />
          )}

          {/* 8. Section 5: AI Doubt Assistant */}
          {currentRoute === "doubt-solver" && (
            <AIDoubtSolverView
              onNavigate={handleNavigate}
              onPracticeTopic={handleStartPracticeSubject}
            />
          )}

          {/* 9. Section 5: Digital Notebook & Spaced Repetition */}
          {currentRoute === "revision" && (
            <RevisionNotebookView
              onNavigate={handleNavigate}
              onStartPracticeWithMistakes={handleStartPracticeWithSet}
            />
          )}

          {/* 10. Section 6: Teacher & Admin CMS */}
          {currentRoute === "admin" && (
            <AdminCMSView
              onNavigate={handleNavigate}
            />
          )}

          {/* 11. Section 15: 20-Point Go-Live Launch Checklist */}
          {currentRoute === "checklist" && (
            <LaunchChecklistView
              onNavigate={handleNavigate}
            />
          )}

          {/* Legacy & Secondary Modules */}
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

        {/* Global Central Terminology Drawer */}
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

        {/* Mobile Bottom Navigation Bar (Visible on < 768px) */}
        <BottomNav
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onOpenMenu={() => setIsMobileMenuOpen(true)}
        />
      </main>
    </div>
  );
}
