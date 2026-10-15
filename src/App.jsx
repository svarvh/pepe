import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import DashboardView from "./components/DashboardView";
import PracticeView from "./components/PracticeView";
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
  const [practiceSubject, setPracticeSubject] = useState(null);
  const [practiceQuestions, setPracticeQuestions] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize persistent storage
  useEffect(() => {
    StorageService.init();
    refreshMetrics();
  }, []);

  const refreshMetrics = () => {
    setUser(StorageService.getUser());
    setStatistics(StorageService.getStatistics());
  };

  const handleNavigate = (route) => {
    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    if (route === "practice") {
      setPracticeSubject(null);
      setPracticeQuestions(null);
    }
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
        {/* Header with Search & Mobile Hamburger */}
        <Header
          user={user}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Dynamic Route View */}
        <div className="route-content-viewport">
          {currentRoute === "dashboard" && (
            <DashboardView
              user={user}
              statistics={statistics}
              onNavigate={handleNavigate}
              onStartPracticeSubject={handleStartPracticeSubject}
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

          {currentRoute === "ai-generator" && (
            <AIGeneratorView
              onStartPracticeSet={handleStartPracticeWithSet}
              onNavigate={handleNavigate}
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
