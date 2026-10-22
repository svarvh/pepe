import React from "react";
import { ShieldAlert, ArrowLeft, LogIn, Lock } from "lucide-react";

export default function AccessDeniedView({ currentUser, onReturnToDashboard, onSwitchToAdmin }) {
  return (
    <div className="access-denied-container fade-in">
      <div className="access-denied-card">
        <div className="access-icon-halo">
          <ShieldAlert size={48} className="text-amber" />
        </div>

        <span className="error-code-badge">HTTP 403 • FORBIDDEN</span>

        <h1 className="access-denied-title">Administrator Privileges Required</h1>

        <p className="access-denied-message">
          You are currently signed in as{" "}
          <strong>{currentUser?.name || "a registered user"}</strong> (
          <code>{currentUser?.email || "student@caplen.edu"}</code>) with the{" "}
          <span className="role-chip student">student</span> role.
        </p>

        <p className="access-denied-detail">
          The <code>/admin</code> control panel, question approval workflows, syllabus management,
          and platform readiness checklists are strictly restricted to authorized faculty and academic administrators.
        </p>

        <div className="access-denied-actions">
          <button
            onClick={onReturnToDashboard}
            className="btn-primary-emerald"
          >
            <ArrowLeft size={16} /> Return to Student Dashboard
          </button>

          <button
            onClick={onSwitchToAdmin}
            className="btn-outline-neutral"
          >
            <LogIn size={16} /> Sign In with Admin Account
          </button>
        </div>

        <div className="security-notice-footer">
          <Lock size={13} />
          <span>Caplen RBAC: Role-based permissions are strictly verified on all administrative operations.</span>
        </div>
      </div>
    </div>
  );
}
