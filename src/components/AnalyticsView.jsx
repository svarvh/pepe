import React, { useState } from "react";
import {
  BarChart2,
  TrendingUp,
  AlertTriangle,
  Award,
  Clock,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Flame,
  ArrowUpRight
} from "lucide-react";
import { StorageService } from "../services/storage";
import { SUBJECTS_CATALOG } from "../data/mockData";

export default function AnalyticsView({ onStartPracticeWeakTopics, onNavigate }) {
  const sessions = StorageService.getSessions();
  const statistics = StorageService.getStatistics();
  const allQuestions = StorageService.getQuestions();

  // Calculate Topic Aggregates from actual practice sessions
  const topicMap = {};

  sessions.forEach(sess => {
    if (sess.topicBreakdown) {
      sess.topicBreakdown.forEach(tb => {
        if (!topicMap[tb.topic]) {
          topicMap[tb.topic] = { correct: 0, total: 0 };
        }
        topicMap[tb.topic].correct += tb.correct;
        topicMap[tb.topic].total += tb.total;
      });
    }
  });

  const topicList = Object.keys(topicMap).map(name => {
    const data = topicMap[name];
    const acc = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    return { name, correct: data.correct, total: data.total, accuracy: acc };
  });

  // Sort by accuracy
  const sortedTopics = [...topicList].sort((a, b) => a.accuracy - b.accuracy);
  const weakestTopics = sortedTopics.slice(0, 3);
  const strongestTopics = [...sortedTopics].reverse().slice(0, 3);

  // Subject Performance Dynamic Aggregates
  const subjectAggregates = SUBJECTS_CATALOG.map(sub => {
    const subSessions = sessions.filter(s => s.subjectId === sub.id);
    let attempted = 0;
    let correct = 0;
    subSessions.forEach(s => {
      attempted += s.totalQuestions;
      correct += s.correctAnswers;
    });
    // Add base seed if attempted is zero
    if (attempted === 0) {
      attempted = sub.attempted;
      correct = sub.correct;
    }
    const acc = attempted > 0 ? Math.round((correct / attempted) * 100) : sub.accuracy;
    return {
      ...sub,
      calcAttempted: attempted,
      calcCorrect: correct,
      calcAccuracy: acc
    };
  });

  const handlePracticeWeak = () => {
    if (weakestTopics.length === 0) {
      alert("No weak topics identified yet. Complete more practice drills to generate recommendations.");
      return;
    }
    // Filter questions matching weakest topics
    const weakNames = weakestTopics.map(w => w.name.toLowerCase());
    const matched = allQuestions.filter(q =>
      weakNames.some(w => q.topic?.toLowerCase().includes(w) || q.unit?.toLowerCase().includes(w))
    );

    if (matched.length > 0 && onStartPracticeWeakTopics) {
      onStartPracticeWeakTopics(matched);
    } else {
      onNavigate("practice");
    }
  };

  return (
    <div className="analytics-view fade-in">
      {/* Top Header Card */}
      <div className="analytics-header-card">
        <div className="analytics-header-left">
          <div className="analytics-icon-tile">
            <BarChart2 size={24} />
          </div>
          <div>
            <h2 className="section-title">Performance Analytics & Insights</h2>
            <p className="analytics-desc">
              Real-time calculations derived from actual test completions, response accuracy, and speed metrics.
            </p>
          </div>
        </div>

        <button
          className="pill-btn pill-btn-lime practice-weak-cta"
          id="btn-practice-weak-topics"
          onClick={handlePracticeWeak}
        >
          <RotateCcw size={15} />
          <span>Practice Weak Topics ({weakestTopics.length})</span>
        </button>
      </div>

      {/* Primary KPI Row */}
      <div className="analytics-kpi-grid">
        <div className="kpi-card">
          <span className="kpi-title">Overall Accuracy</span>
          <div className="kpi-val-row">
            <span className="kpi-number">{statistics.overallAccuracy}%</span>
            <span className="badge badge-lime">+4.2% this week</span>
          </div>
          <span className="kpi-subtext">{statistics.totalCorrect} correct of {statistics.totalAttempted} attempted</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Questions Attempted</span>
          <div className="kpi-val-row">
            <span className="kpi-number">{statistics.totalAttempted}</span>
            <span className="badge badge-lavender">Active</span>
          </div>
          <span className="kpi-subtext">Goal: 100 questions weekly</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Total Study Time</span>
          <div className="kpi-val-row">
            <span className="kpi-number">{statistics.hoursSpent}h</span>
            <span className="badge badge-cream">Avg 22m / session</span>
          </div>
          <span className="kpi-subtext">Across {sessions.length} recorded tests</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Consistent Streak</span>
          <div className="kpi-val-row">
            <span className="kpi-number">{statistics.streakDays} Days</span>
            <Flame size={20} className="flame-icon-active" />
          </div>
          <span className="kpi-subtext">Keep practicing daily</span>
        </div>
      </div>

      {/* Subject Performance & Weak/Strong Topics 2-Column Grid */}
      <div className="analytics-two-col-grid">
        {/* Subject-Wise Performance */}
        <div className="analytics-box">
          <h3 className="box-title">Subject Mastery & Accuracy</h3>
          <div className="subject-bars-list">
            {subjectAggregates.map(sub => (
              <div key={sub.id} className="subject-bar-item">
                <div className="bar-labels-row">
                  <span className="subject-name">{sub.name}</span>
                  <span className="subject-pct-label">{sub.calcAccuracy}% ({sub.calcCorrect}/{sub.calcAttempted})</span>
                </div>
                <div className="subject-track">
                  <div
                    className={`subject-fill bg-${sub.themeColor}`}
                    style={{ width: `${sub.calcAccuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weakest and Strongest Topics */}
        <div className="analytics-box">
          <div className="sub-box-header">
            <h3 className="box-title">Knowledge Strengths & Gaps</h3>
          </div>

          <div className="strengths-gaps-container">
            {/* Weakest Topics requiring revision */}
            <div className="gaps-col">
              <h4 className="col-subheading text-warning">
                <AlertTriangle size={15} /> Weak Topics (Needs Revision)
              </h4>
              <div className="topic-pill-list">
                {weakestTopics.map(t => (
                  <div key={t.name} className="weak-topic-pill">
                    <span className="weak-topic-name">{t.name}</span>
                    <span className="weak-topic-badge">{t.accuracy}% acc</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strongest Topics */}
            <div className="strengths-col" style={{ marginTop: 16 }}>
              <h4 className="col-subheading text-success">
                <Award size={15} /> Strongest Topics
              </h4>
              <div className="topic-pill-list">
                {strongestTopics.map(t => (
                  <div key={t.name} className="strong-topic-pill">
                    <span className="strong-topic-name">{t.name}</span>
                    <span className="strong-topic-badge">{t.accuracy}% acc</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Sessions History Table */}
      <div className="analytics-history-box">
        <h3 className="box-title">Recent Practice Drill History</h3>
        <div className="table-responsive">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Drill Name</th>
                <th>Subject</th>
                <th>Questions</th>
                <th>Accuracy</th>
                <th>Time Spent</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(sess => (
                <tr key={sess.id}>
                  <td className="table-date">{sess.dateFormatted}</td>
                  <td className="table-title"><strong>{sess.title}</strong></td>
                  <td>{sess.subjectName}</td>
                  <td>{sess.correctAnswers} / {sess.totalQuestions}</td>
                  <td>
                    <span className={`badge ${sess.accuracy >= 80 ? "badge-lime" : sess.accuracy >= 65 ? "badge-cream" : "badge-lavender"}`}>
                      {sess.accuracy}%
                    </span>
                  </td>
                  <td>{Math.round(sess.timeSpentSeconds / 60)} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
