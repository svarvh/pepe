import React, { useState } from "react";
import {
  FolderHeart,
  Search,
  Bookmark,
  Sparkles,
  PenTool,
  UploadCloud,
  FileText,
  Play,
  Trash2,
  Edit2,
  Download,
  Calendar,
  Layers,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { StorageService } from "../services/storage";

export default function LibraryView({ onStartPracticeWithCustom, onNavigate }) {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const customSets = StorageService.getCustomSets();
  const aiSets = StorageService.getAISets();
  const importedSets = StorageService.getImportedSets();
  const bookmarkedIds = StorageService.getBookmarks();
  const allQuestions = StorageService.getQuestions();
  const bookmarkedQuestions = allQuestions.filter(q => bookmarkedIds.includes(q.id));

  // Build unified items list
  const unifiedItems = [
    ...customSets.map(s => ({ ...s, libraryType: "custom", badgeLabel: "Self Created", badgeColor: "cream" })),
    ...aiSets.map(s => ({ ...s, libraryType: "ai", badgeLabel: "AI Generated", badgeColor: "lavender" })),
    ...importedSets.map(s => ({ ...s, libraryType: "imported", badgeLabel: "Imported Set", badgeColor: "lime" }))
  ];

  const filteredItems = unifiedItems.filter(item => {
    if (activeTab === "custom" && item.libraryType !== "custom") return false;
    if (activeTab === "ai" && item.libraryType !== "ai") return false;
    if (activeTab === "imported" && item.libraryType !== "imported") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.subject?.toLowerCase().includes(q);
    }
    return true;
  });

  const handleDeleteItem = (item) => {
    if (!confirm(`Delete "${item.title}" from My Library?`)) return;
    if (item.libraryType === "custom") {
      StorageService.deleteCustomSet(item.id);
    }
    window.location.reload(); // Refresh view
  };

  const handleExportItem = (item) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${item.title.replace(/\s+/g, "_")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="library-view fade-in">
      {/* Top Header Card */}
      <div className="library-header-card">
        <div className="library-header-info">
          <div className="library-icon-tile">
            <FolderHeart size={24} />
          </div>
          <div>
            <h2 className="section-title">My Library & Saved Content</h2>
            <p className="library-desc">
              Centralized collection of self-authored questions, AI sets, bookmarked items, and imported assessments.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="library-toolbar">
        <div className="library-tabs">
          <button
            className={`lib-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Collections ({unifiedItems.length})
          </button>
          <button
            className={`lib-tab ${activeTab === "custom" ? "active" : ""}`}
            onClick={() => setActiveTab("custom")}
          >
            Self-Created ({customSets.length})
          </button>
          <button
            className={`lib-tab ${activeTab === "ai" ? "active" : ""}`}
            onClick={() => setActiveTab("ai")}
          >
            AI Generated ({aiSets.length})
          </button>
          <button
            className={`lib-tab ${activeTab === "bookmarks" ? "active" : ""}`}
            onClick={() => setActiveTab("bookmarks")}
          >
            Bookmarks ({bookmarkedQuestions.length})
          </button>
        </div>

        <div className="library-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search saved sets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Bookmarks Tab View */}
      {activeTab === "bookmarks" ? (
        <div className="bookmarks-grid fade-in">
          {bookmarkedQuestions.length === 0 ? (
            <div className="library-empty-box">
              <Bookmark size={40} className="empty-icon-muted" />
              <h3>No Bookmarked Questions Yet</h3>
              <p>During practice drills, click the bookmark icon to pin questions for quick revision here.</p>
            </div>
          ) : (
            bookmarkedQuestions.map((q, idx) => (
              <div key={q.id} className="bookmarked-q-card">
                <div className="bookmark-card-top">
                  <span className="badge badge-navy">Q{idx + 1}</span>
                  <span className="badge badge-cream">{q.difficulty}</span>
                  <span className="badge badge-lavender">{q.topic || q.unit}</span>
                  <button
                    className="bookmark-remove-btn"
                    title="Remove from bookmarks"
                    onClick={() => {
                      StorageService.toggleBookmark(q.id);
                      window.location.reload();
                    }}
                  >
                    <Bookmark size={16} fill="#BDA3FA" stroke="#292840" />
                  </button>
                </div>
                <p className="bookmark-q-text">{q.text}</p>
                <div className="bookmark-solution-box">
                  <strong>Solution: {q.correctAnswer}</strong>
                  <p>{q.explanation}</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Saved Sets Grid */
        <div className="library-grid fade-in">
          {filteredItems.length === 0 ? (
            <div className="library-empty-box">
              <FolderHeart size={40} className="empty-icon-muted" />
              <h3>No Question Sets Found</h3>
              <p>Create sets using the Self Question Generator or AI Question Generator to populate your library.</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className="library-card">
                <div className="lib-card-top">
                  <span className={`badge badge-${item.badgeColor}`}>{item.badgeLabel}</span>
                  <span className="lib-date-label">
                    {new Date(item.createdAt || item.importedAt || Date.now()).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>

                <h3 className="lib-card-title">{item.title}</h3>
                <p className="lib-card-sub">
                  {item.subject || "General Science"} • {item.questionsCount || item.questions?.length || 0} Questions
                </p>

                <div className="lib-card-footer">
                  <button
                    className="pill-btn pill-btn-dark lib-practice-btn"
                    onClick={() => {
                      if (onStartPracticeWithCustom && item.questions) {
                        onStartPracticeWithCustom(item.questions);
                      } else {
                        onNavigate("practice");
                      }
                    }}
                  >
                    <Play size={14} />
                    <span>Practice Set</span>
                  </button>

                  <div className="lib-icon-actions">
                    <button
                      className="icon-only-btn"
                      title="Export as JSON"
                      onClick={() => handleExportItem(item)}
                    >
                      <Download size={15} />
                    </button>
                    <button
                      className="icon-only-btn text-danger"
                      title="Delete set"
                      onClick={() => handleDeleteItem(item)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
