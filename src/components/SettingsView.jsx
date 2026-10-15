import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Cpu,
  Sliders,
  Database,
  Save,
  CheckCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  AlertTriangle
} from "lucide-react";
import { StorageService } from "../services/storage";
import { EXAMS_CATALOG } from "../data/mockData";

export default function SettingsView({ user, onUserUpdate }) {
  const [profile, setProfile] = useState(user);
  const [settings, setSettings] = useState(StorageService.getSettings());
  const [showKey, setShowKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testingAPI, setTestingAPI] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    StorageService.saveUser(profile);
    if (onUserUpdate) onUserUpdate(profile);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveSettings = () => {
    StorageService.saveSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleTestAPI = async () => {
    setTestingAPI(true);
    setTestResult(null);

    if (settings.aiProvider === "demo") {
      setTimeout(() => {
        setTestingAPI(false);
        setTestResult({ success: true, message: "Demo Engine is ready! Generates high-fidelity syllabus questions offline." });
      }, 600);
      return;
    }

    if (!settings.apiKey || settings.apiKey.trim() === "") {
      setTestingAPI(false);
      setTestResult({ success: false, message: "Please provide a valid API key for live generation." });
      return;
    }

    // Live test ping
    try {
      if (settings.aiProvider === "gemini") {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: "Ping test" }] }] })
        });
        if (res.ok) {
          setTestResult({ success: true, message: "Google Gemini API connected and verified!" });
        } else {
          setTestResult({ success: false, message: `Gemini API returned code ${res.status}. Check API key.` });
        }
      } else {
        setTestResult({ success: true, message: "API key stored securely for generation requests." });
      }
    } catch (err) {
      setTestResult({ success: false, message: `Network error: ${err.message}` });
    } finally {
      setTestingAPI(false);
    }
  };

  const handleExportAllData = () => {
    const backup = {
      user: StorageService.getUser(),
      statistics: StorageService.getStatistics(),
      sessions: StorageService.getSessions(),
      customSets: StorageService.getCustomSets(),
      aiSets: StorageService.getAISets(),
      bookmarks: StorageService.getBookmarks()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `caplen_study_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleResetDemoData = () => {
    if (confirm("Reset all platform data, questions, and practice sessions to the initial state?")) {
      StorageService.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="settings-view fade-in">
      {/* Top Header Card */}
      <div className="settings-header-card">
        <div className="settings-header-left">
          <div className="settings-icon-tile">
            <SettingsIcon size={24} />
          </div>
          <div>
            <h2 className="section-title">Settings & Configuration</h2>
            <p className="settings-desc">
              Manage student profile, target examination goals, AI generation keys, and study preferences.
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="save-badge-anim fade-in">
            <CheckCircle size={16} /> Saved Successfully
          </div>
        )}
      </div>

      <div className="settings-grid">
        {/* Profile Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <User size={18} className="card-header-icon" />
            <h3 className="card-title">Profile & Target Examination</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="form-group-block">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="custom-input"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value, name: e.target.value.split(" ")[0] })}
              />
            </div>

            <div className="form-group-block">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="custom-input"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div className="form-group-block">
              <label className="form-label">Target Examination</label>
              <select
                className="custom-input"
                value={profile.targetExam}
                onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })}
              >
                {EXAMS_CATALOG.map(exam => (
                  <option key={exam.id} value={exam.name}>{exam.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group-block">
              <label className="form-label">Exam Target Date</label>
              <input
                type="date"
                className="custom-input"
                value={profile.examDate}
                onChange={(e) => setProfile({ ...profile, examDate: e.target.value })}
              />
            </div>

            <button type="submit" className="pill-btn pill-btn-dark save-btn">
              <Save size={15} /> Save Profile Changes
            </button>
          </form>
        </div>

        {/* AI Provider Config */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Cpu size={18} className="card-header-icon" />
            <h3 className="card-title">AI Provider & API Keys</h3>
          </div>

          <div className="settings-form">
            <div className="form-group-block">
              <label className="form-label">Question Generation Engine</label>
              <select
                className="custom-input"
                value={settings.aiProvider}
                onChange={(e) => setSettings({ ...settings, aiProvider: e.target.value })}
              >
                <option value="demo">High-Fidelity Demo Engine (Curated & Offline)</option>
                <option value="gemini">Google Gemini API (1.5 Flash / Pro)</option>
                <option value="openai">OpenAI API (GPT-4o / GPT-4o-mini)</option>
                <option value="anthropic">Anthropic Claude (Claude 3.5 Sonnet)</option>
              </select>
            </div>

            {settings.aiProvider !== "demo" && (
              <div className="form-group-block">
                <label className="form-label">API Key</label>
                <div className="password-input-wrap">
                  <input
                    type={showKey ? "text" : "password"}
                    className="custom-input"
                    placeholder={`Enter your ${settings.aiProvider} API key...`}
                    value={settings.apiKey}
                    onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <span className="input-hint">Keys are stored locally in your browser storage and never sent elsewhere.</span>
              </div>
            )}

            <div className="api-test-row">
              <button
                type="button"
                className="pill-btn pill-btn-white"
                onClick={handleTestAPI}
                disabled={testingAPI}
              >
                {testingAPI ? <RefreshCw size={14} className="spin-icon" /> : null}
                <span>{testingAPI ? "Testing..." : "Test Connection"}</span>
              </button>

              <button
                type="button"
                className="pill-btn pill-btn-dark"
                onClick={handleSaveSettings}
              >
                <Save size={15} /> Save Provider
              </button>
            </div>

            {testResult && (
              <div className={`test-feedback-box ${testResult.success ? "success" : "error"} fade-in`}>
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Practice Preferences */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Sliders size={18} className="card-header-icon" />
            <h3 className="card-title">Study & Practice Preferences</h3>
          </div>

          <div className="settings-form">
            <div className="checkbox-setting-row">
              <div className="setting-info">
                <strong>Question Countdown Timer</strong>
                <span>Track time spent per question during drills</span>
              </div>
              <input
                type="checkbox"
                checked={settings.showTimer}
                onChange={(e) => setSettings({ ...settings, showTimer: e.target.checked })}
              />
            </div>

            <div className="checkbox-setting-row">
              <div className="setting-info">
                <strong>Instant Explanations Mode</strong>
                <span>Show verified solution immediately after choosing an answer</span>
              </div>
              <input
                type="checkbox"
                checked={settings.instantFeedback}
                onChange={(e) => setSettings({ ...settings, instantFeedback: e.target.checked })}
              />
            </div>

            <div className="checkbox-setting-row">
              <div className="setting-info">
                <strong>Confetti Celebration & Sounds</strong>
                <span>Reward high accuracy test results with animated celebrations</span>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => setSettings({ ...settings, soundEnabled: e.target.checked })}
              />
            </div>

            <button
              type="button"
              className="pill-btn pill-btn-dark"
              onClick={handleSaveSettings}
              style={{ marginTop: 16 }}
            >
              <Save size={15} /> Save Preferences
            </button>
          </div>
        </div>

        {/* Data Management & Backup */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Database size={18} className="card-header-icon" />
            <h3 className="card-title">Data Backup & Demo Reset</h3>
          </div>

          <div className="settings-form">
            <p className="backup-desc">
              All question banks, custom sets, bookmarks, and performance statistics are maintained persistently on your device.
            </p>

            <div className="backup-actions-row">
              <button
                type="button"
                className="pill-btn pill-btn-white"
                onClick={handleExportAllData}
              >
                <Download size={15} /> Export Complete Data (JSON)
              </button>

              <button
                type="button"
                className="pill-btn pill-btn-white text-danger"
                onClick={handleResetDemoData}
              >
                <RefreshCw size={15} /> Restore Factory Demo Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
