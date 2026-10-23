import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Target,
  Sliders,
  Database,
  Save,
  CheckCircle,
  RefreshCw,
  Download,
  AlertTriangle
} from "lucide-react";
import { StorageService } from "../services/storage";
import { EXAMS_CATALOG } from "../data/mockData";

export default function SettingsView({ user, onUserUpdate }) {
  const [profile, setProfile] = useState(user);
  const [settings, setSettings] = useState(StorageService.getSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);

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
              Manage your student profile, target examination goals, study habits, and learning preferences.
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

        {/* Student Learning Goals */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Target size={18} className="card-header-icon" />
            <h3 className="card-title">Learning Goals & Daily Targets</h3>
          </div>

          <div className="settings-form">
            <div className="form-group-block">
              <label className="form-label">Daily Question Practice Target</label>
              <select
                className="custom-input"
                value={settings.dailyTarget || "25"}
                onChange={(e) => setSettings({ ...settings, dailyTarget: e.target.value })}
              >
                <option value="15">15 Questions / day (Light Practice)</option>
                <option value="25">25 Questions / day (Recommended Daily Goal)</option>
                <option value="40">40 Questions / day (Intensive Prep)</option>
                <option value="60">60 Questions / day (Exam Sprint)</option>
              </select>
            </div>

            <div className="form-group-block">
              <label className="form-label">Primary Subject Focus</label>
              <select
                className="custom-input"
                value={settings.primarySubject || "all"}
                onChange={(e) => setSettings({ ...settings, primarySubject: e.target.value })}
              >
                <option value="all">Balanced (All Curriculum Tracks)</option>
                <option value="biology">Biology & Medical Foundations</option>
                <option value="physics">Physics: Mechanics & Waves</option>
                <option value="chemistry">Chemistry & Organic Mechanisms</option>
                <option value="mathematics">Mathematics: Calculus & Limits</option>
              </select>
            </div>

            <div className="form-group-block">
              <label className="form-label">Revision Schedule Preference</label>
              <select
                className="custom-input"
                value={settings.revisionSchedule || "evening"}
                onChange={(e) => setSettings({ ...settings, revisionSchedule: e.target.value })}
              >
                <option value="evening">Evening Review (Daily at 8:00 PM)</option>
                <option value="morning">Morning Concept Drill (Daily at 7:00 AM)</option>
                <option value="weekend">Weekend Comprehensive Marathon</option>
              </select>
            </div>

            <button
              type="button"
              className="pill-btn pill-btn-dark"
              onClick={handleSaveSettings}
              style={{ marginTop: 8 }}
            >
              <Save size={15} /> Save Learning Goals
            </button>
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
