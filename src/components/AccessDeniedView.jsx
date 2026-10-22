import React from "react";
import { ShieldAlert, ArrowLeft, LogIn, Lock } from "lucide-react";

export default function AccessDeniedView({
  currentUser,
  attemptedRoute = "admin", // 'admin' | 'faculty'
  onReturnToDashboard,
  onSwitchToAdmin,
  onSwitchToFaculty
}) {
  const isFacultyAttempt = attemptedRoute === "faculty";

  return (
    <div className="access-denied-container fade-in">
      <div className="access-denied-card">
        <div className="access-icon-halo">
          <ShieldAlert size={48} className="text-amber" />
        </div>

        <span className="error-code-badge">HTTP 403 • ACCESS FORBIDDEN</span>

        <h1 className="access-denied-title">
          {isFacultyAttempt ? "Faculty Authorization Required" : "Administrator Privileges Required"}
        </h1>

        <p className="access-denied-message">
          You are currently signed in as{" "}
          <strong>{currentUser?.name || "a registered user"}</strong> (
          <code>{currentUser?.email || "student@caplen.edu"}</code>) with the{" "}
          <span className="role-chip student">{currentUser?.role || "student"}</span> role.
        </p>

        <p className="access-denied-detail">
          {isFacultyAttempt ? (
            <>
              The <code>/faculty</code> educator workspace, PDF document uploads, AI question generation,
              question paper builder, and class curriculum management are restricted to verified faculty members.
              Students cannot access or publish faculty resources.
            </>
          ) : (
            <>
              The <code>/admin</code> control panel, user management, and platform readiness checklists
              are strictly restricted to authorized platform administrators.
            </>
          )}
        </p>

        <div className="access-denied-actions">
          <button
            onClick={onReturnToDashboard}
            className="btn-primary-emerald"
          >
            <ArrowLeft size={16} /> Return to Student Dashboard
          </button>

          {isFacultyAttempt ? (
            <button
              onClick={onSwitchToFaculty || onSwitchToAdmin}
              className="btn-outline-neutral"
            >
              <LogIn size={16} /> Sign In as Faculty Instructor
            </button>
          ) : (
            <button
              onClick={onSwitchToAdmin}
              className="btn-outline-neutral"
            >
              <LogIn size={16} /> Sign In with Admin Account
            </button>
          )}
        </div>

        <div className="security-notice-footer">
          <Lock size={13} />
          <span>Caplen RBAC: Role-based permissions are strictly enforced. Students cannot escalate their own privileges.</span>
        </div>
      </div>
    </div>
  );
}
