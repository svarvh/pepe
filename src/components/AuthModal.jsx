import React, { useState } from "react";
import {
  GraduationCap,
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen
} from "lucide-react";
import { AuthService, ROLES } from "../services/authService";

export default function AuthModal({
  isOpen,
  initialMode = "login", // 'login' | 'register' | 'admin-login'
  onClose,
  onAuthSuccess,
  redirectMessage = ""
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'admin-login' | 'forgot'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [targetExam, setTargetExam] = useState("CBSE Class 11-12 NCERT");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode with prop changes when modal opens
  React.useEffect(() => {
    setMode(initialMode);
    setErrorMessage("");
    setSuccessNotice("");
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessNotice("");
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match. Please re-enter.");
          setIsSubmitting(false);
          return;
        }

        const res = AuthService.createAccount({
          name,
          email,
          password,
          targetExam
        });

        if (!res.success) {
          setErrorMessage(res.error);
          setIsSubmitting(false);
          return;
        }

        onAuthSuccess(res.user, "student");
      } else if (mode === "login" || mode === "admin-login") {
        const res = AuthService.login(email, password);
        if (!res.success) {
          setErrorMessage(res.error);
          setIsSubmitting(false);
          return;
        }

        // Check if admin mode was attempted by a non-admin
        if (mode === "admin-login" && res.user.role !== ROLES.ADMIN) {
          setErrorMessage("This account does not have administrator privileges. Please sign in as a student.");
          setIsSubmitting(false);
          return;
        }

        onAuthSuccess(res.user, res.user.role);
      } else if (mode === "forgot") {
        if (!email || !email.includes("@")) {
          setErrorMessage("Please enter a valid email address to receive password reset instructions.");
          setIsSubmitting(false);
          return;
        }
        setSuccessNotice(`Password reset instructions sent to ${email}. Check your inbox!`);
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoStudent = () => {
    setEmail("student@caplen.edu");
    setPassword("student123");
    setErrorMessage("");
    const res = AuthService.login("student@caplen.edu", "student123");
    if (res.success) {
      onAuthSuccess(res.user, "student");
    }
  };

  const handleQuickDemoAdmin = () => {
    setEmail("admin@caplen.edu");
    setPassword("admin123");
    setErrorMessage("");
    const res = AuthService.login("admin@caplen.edu", "admin123");
    if (res.success) {
      onAuthSuccess(res.user, "admin");
    }
  };

  return (
    <div className="auth-modal-overlay fade-in" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="auth-modal-header">
          <div className="auth-brand-chip">
            <GraduationCap size={20} className="text-emerald" />
            <span>Caplen Education</span>
          </div>
          <button
            onClick={onClose}
            className="auth-close-btn"
            id="btn-close-auth"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Redirect notice if triggered by protected route */}
        {redirectMessage && (
          <div className="auth-redirect-banner">
            <AlertCircle size={16} />
            <span>{redirectMessage}</span>
          </div>
        )}

        {/* Mode Selector Tabs */}
        {mode !== "forgot" && (
          <div className="auth-tabs-row">
            <button
              type="button"
              className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => { setMode("login"); setErrorMessage(""); }}
            >
              Student Log In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${mode === "register" ? "active" : ""}`}
              onClick={() => { setMode("register"); setErrorMessage(""); }}
            >
              Create Account
            </button>
            <button
              type="button"
              className={`auth-tab-btn admin-tab ${mode === "admin-login" ? "active" : ""}`}
              onClick={() => { setMode("admin-login"); setErrorMessage(""); }}
            >
              <ShieldCheck size={14} /> Admin Portal
            </button>
          </div>
        )}

        {/* Form Title & Subtext */}
        <div className="auth-title-box">
          <h2 className="auth-heading">
            {mode === "register" && "Start Learning Free"}
            {mode === "login" && "Welcome Back, Student"}
            {mode === "admin-login" && "Administrator Sign In"}
            {mode === "forgot" && "Reset Password"}
          </h2>
          <p className="auth-subheading">
            {mode === "register" && "Create your free account to access questions, notes, and track your scores."}
            {mode === "login" && "Enter your email and password to resume your practice sessions."}
            {mode === "admin-login" && "Faculty and administration access for syllabus, questions, and approval workflows."}
            {mode === "forgot" && "Enter your email address and we'll send a link to reset your password."}
          </p>
        </div>

        {/* Error / Success Notices */}
        {errorMessage && (
          <div className="auth-alert error fade-in">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}
        {successNotice && (
          <div className="auth-alert success fade-in">
            <CheckCircle2 size={16} />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "register" && (
            <>
              <div className="auth-field-group">
                <label className="auth-label">Full Name</label>
                <div className="auth-input-wrap">
                  <User size={18} className="auth-input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Target Exam / Goal</label>
                <div className="auth-input-wrap">
                  <BookOpen size={18} className="auth-input-icon" />
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="auth-input auth-select"
                  >
                    <option value="CBSE Class 9-10 Foundations">CBSE Class 9–10 Foundations</option>
                    <option value="CBSE Class 11-12 NCERT">CBSE Class 11–12 NCERT</option>
                    <option value="IIT-JEE Main & Advanced">IIT-JEE Main & Advanced</option>
                    <option value="UGC-NET Paper 1 & 2">UGC-NET Paper 1 & 2</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="auth-field-group">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrap">
              <Mail size={18} className="auth-input-icon" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>
          </div>

          {mode !== "forgot" && (
            <div className="auth-field-group">
              <div className="auth-label-row">
                <label className="auth-label">Password</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); setErrorMessage(""); }}
                    className="auth-forgot-btn"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="auth-input-wrap">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-pwd-toggle"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
          )}

          {mode === "register" && (
            <div className="auth-field-group">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrap">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Re-type password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="auth-submit-btn"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>
                  {mode === "register" && "Create Free Student Account"}
                  {mode === "login" && "Sign In as Student"}
                  {mode === "admin-login" && "Access Admin Portal"}
                  {mode === "forgot" && "Send Reset Link"}
                </span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials Box for Testing */}
        <div className="auth-demo-shortcuts">
          <div className="demo-shortcuts-label">
            <Sparkles size={13} className="text-emerald" />
            <span>Instant Demo Sign-In (Click to Test Roles):</span>
          </div>
          <div className="demo-shortcuts-grid">
            <button
              type="button"
              onClick={handleQuickDemoStudent}
              className="btn-demo-preset student"
            >
              <div className="preset-name">Student Account</div>
              <div className="preset-meta">student@caplen.edu (Alyssa Vance)</div>
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="btn-demo-preset admin"
            >
              <div className="preset-name">Admin Account</div>
              <div className="preset-meta">admin@caplen.edu (Dr. Vikram Malhotra)</div>
            </button>
          </div>
        </div>

        {/* Footer switcher */}
        <div className="auth-modal-footer">
          {mode === "forgot" ? (
            <button
              type="button"
              onClick={() => { setMode("login"); setErrorMessage(""); setSuccessNotice(""); }}
              className="auth-switch-link"
            >
              Back to Student Log In
            </button>
          ) : mode === "register" ? (
            <p className="auth-switch-text">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setMode("login"); setErrorMessage(""); }}
                className="auth-switch-link"
              >
                Log in here
              </button>
            </p>
          ) : (
            <p className="auth-switch-text">
              New to Caplen?{" "}
              <button
                type="button"
                onClick={() => { setMode("register"); setErrorMessage(""); }}
                className="auth-switch-link"
              >
                Create a free student account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
