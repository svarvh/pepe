import React, { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Target,
  FileText,
  Sliders,
  PenTool,
  UploadCloud,
  ChevronRight,
  Flame,
  Award,
  Layers,
  HelpCircle,
  Volume2,
  Clock,
  Shield,
  Users,
  Compass,
  Check
} from "lucide-react";
import heroImg from "../assets/student_hero_green.jpg";
import { COURSES_CATALOG } from "../data/edtechCurriculum";

export default function PublicLandingPage({
  currentUser,
  onOpenAuth,
  onNavigateToCourse,
  onGoToDashboard,
  onGoToAdmin
}) {
  const [selectedGoal, setSelectedGoal] = useState("class11_12");
  const [demoSelectedChoice, setDemoSelectedChoice] = useState(null);
  const [hasAnsweredDemo, setHasAnsweredDemo] = useState(false);

  const demoQuestion = {
    badge: "Class 12 Biology • Evolution & Genetics",
    type: "Assertion-Reason",
    assertion: "In post-industrial England, melanic (dark) forms of Biston betularia survived in higher proportions than light-colored forms on tree trunks.",
    reason: "Industrial soot blackened lichen-covered tree trunks, conferring camouflaged survival advantage against predatory birds (directional selection).",
    options: [
      { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
      { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
      { id: "C", text: "(A) is true, but (R) is false." },
      { id: "D", text: "(A) is false, but (R) is true." }
    ],
    correctOption: "A",
    explanation: "Correct! Industrial melanism is a classic real-world demonstration of natural selection. Lichens died from sulfur dioxide pollution, so darker moths were cryptic against predatory birds."
  };

  const handleDemoSelect = (choiceId) => {
    setDemoSelectedChoice(choiceId);
    setHasAnsweredDemo(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page-root">
      {/* 1. Public Top Navigation Bar */}
      <header className="landing-header">
        <div className="landing-container landing-header-inner">
          <div className="landing-brand">
            <div className="landing-logo-icon">
              <GraduationCap size={24} strokeWidth={2.4} />
            </div>
            <div className="landing-brand-text">
              <span className="landing-brand-title">Caplen</span>
              <span className="landing-brand-tag">LEARNING</span>
            </div>
          </div>

          <nav className="landing-nav-links">
            <button onClick={() => scrollToSection("features")} className="landing-nav-link">
              Features
            </button>
            <button onClick={() => scrollToSection("popular-goals")} className="landing-nav-link">
              Popular Goals
            </button>
            <button onClick={() => scrollToSection("how-it-works")} className="landing-nav-link">
              How It Works
            </button>
            <button onClick={() => scrollToSection("why-caplen")} className="landing-nav-link">
              Why Caplen
            </button>
          </nav>

          <div className="landing-header-actions">
            {currentUser ? (
              <div className="landing-auth-pill">
                <span className="landing-user-greeting">
                  Signed in as <strong>{currentUser.name}</strong>
                  {currentUser.role === "admin" && <span className="admin-chip">Admin</span>}
                </span>
                {currentUser.role === "admin" ? (
                  <button onClick={onGoToAdmin} className="btn-landing-primary">
                    Go to Admin Panel <ArrowRight size={16} />
                  </button>
                ) : (
                  <button onClick={onGoToDashboard} className="btn-landing-primary">
                    Go to Student Dashboard <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  id="btn-landing-login"
                  onClick={() => onOpenAuth("login")}
                  className="btn-landing-secondary"
                >
                  Log In
                </button>
                <button
                  id="btn-landing-signup"
                  onClick={() => onOpenAuth("register")}
                  className="btn-landing-primary"
                >
                  Start Learning Free <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-container landing-hero-grid">
          {/* Left Column: Motivational Copy & CTAs */}
          <div className="landing-hero-copy">
            <div className="hero-badge">
              <Sparkles size={15} />
              <span>All-In-One Digital Learning Ecosystem</span>
            </div>

            <h1 className="hero-headline">
              Study Smarter. <br />
              <span className="text-gradient-green">Score Better.</span>
            </h1>

            <p className="hero-subtext">
              Practice questions, master important topics, explore previous-year papers,
              and prepare with confidence — all in one place.
            </p>

            <div className="hero-cta-group">
              <button
                id="hero-btn-start-free"
                onClick={() => onOpenAuth("register")}
                className="btn-hero-cta"
              >
                <span>Start Learning Free</span>
                <ArrowRight size={18} />
              </button>
              <button
                id="hero-btn-explore"
                onClick={() => scrollToSection("features")}
                className="btn-hero-outline"
              >
                <span>Explore Features</span>
              </button>
            </div>

            {/* Micro trust indicators */}
            <div className="hero-trust-row">
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>100% NCERT Grounded</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Instant Terminology Drawer</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Bilingual English & Hindi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork + Live Question Preview */}
          <div className="landing-hero-visual-card">
            <div className="hero-image-wrap">
              <img
                src={heroImg}
                alt="Students studying collaboratively with Caplen learning platform"
                className="hero-students-img"
              />
              <div className="hero-floating-pill-1">
                <Target size={16} className="text-emerald" />
                <div>
                  <strong>Target Accuracy</strong>
                  <span>80% Goal Achieved</span>
                </div>
              </div>
              <div className="hero-floating-pill-2">
                <BookOpen size={16} className="text-emerald" />
                <div>
                  <strong>Smart Notes</strong>
                  <span>Bilingual Audio & Terms</span>
                </div>
              </div>
            </div>

            {/* Interactive Live Question Preview Card */}
            <div className="hero-live-demo-card">
              <div className="demo-card-header">
                <div className="demo-pill-badge">{demoQuestion.badge}</div>
                <div className="demo-format-pill">{demoQuestion.type}</div>
              </div>

              <div className="demo-stem-box">
                <p><strong>Assertion (A):</strong> {demoQuestion.assertion}</p>
                <p><strong>Reason (R):</strong> {demoQuestion.reason}</p>
              </div>

              <div className="demo-options-list">
                {demoQuestion.options.map((opt) => {
                  const isSelected = demoSelectedChoice === opt.id;
                  const isCorrect = opt.id === demoQuestion.correctOption;
                  let optionClass = "demo-option-btn";
                  if (hasAnsweredDemo) {
                    if (isCorrect) optionClass += " correct";
                    else if (isSelected && !isCorrect) optionClass += " incorrect";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleDemoSelect(opt.id)}
                      className={optionClass}
                    >
                      <span className="opt-letter">{opt.id}</span>
                      <span className="opt-text">{opt.text}</span>
                      {hasAnsweredDemo && isCorrect && <Check size={16} className="opt-check" />}
                    </button>
                  );
                })}
              </div>

              {hasAnsweredDemo && (
                <div className="demo-feedback-box fade-in">
                  <div className="demo-feedback-header">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <strong>Verified NCERT Rationale</strong>
                  </div>
                  <p>{demoQuestion.explanation}</p>
                  <button
                    onClick={() => onOpenAuth("register")}
                    className="btn-demo-continue"
                  >
                    Solve 40+ More Questions Free <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Goals / Exam Tracks Section */}
      <section id="popular-goals" className="landing-goals-section">
        <div className="landing-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">TARGETED ACADEMIC TRACKS</span>
            <h2 className="section-title">Select your goal or exam</h2>
            <p className="section-subtitle">
              Comprehensive syllabi, previous-year question archives, and AI-assisted drills tailored to your exact curriculum.
            </p>
          </div>

          <div className="goals-grid">
            {COURSES_CATALOG.map((course) => {
              const isSelected = selectedGoal === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedGoal(course.id)}
                  className={`goal-card ${isSelected ? "active" : ""}`}
                >
                  <div className="goal-badge-strip">{course.examType}</div>
                  <h3 className="goal-title">{course.name}</h3>
                  <p className="goal-desc">{course.description}</p>
                  <div className="goal-meta-row">
                    <span className="meta-tag">{course.subjects?.length || 3} Subjects</span>
                    <span className="meta-tag">Bilingual Notes</span>
                    <span className="meta-tag">10+ Qs / Topic</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigateToCourse) {
                        onNavigateToCourse(course.id);
                      } else {
                        onOpenAuth("register");
                      }
                    }}
                    className="goal-action-btn"
                  >
                    <span>Start Preparing</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Core Features Section (6 Cards Required by Prompt) */}
      <section id="features" className="landing-features-section">
        <div className="landing-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">PLATFORM CAPABILITIES</span>
            <h2 className="section-title">Everything you need to master your syllabus</h2>
            <p className="section-subtitle">
              Built on the principle that students should never have to leave the application to find definitions, practice questions, or analyze performance.
            </p>
          </div>

          <div className="features-six-grid">
            {/* 1. Practice Questions */}
            <div className="feature-card">
              <div className="feature-icon-box green">
                <Target size={24} />
              </div>
              <h3 className="feature-card-title">1. Practice Questions</h3>
              <p className="feature-card-desc">
                Solve questions topic by topic and improve your understanding across multiple formats: MCQs, Assertion-Reason, Numericals, Multiple-Select, and Match Columns.
              </p>
              <div className="feature-pill-list">
                <span>10+ Questions per Topic</span>
                <span>Instant Worked Hints</span>
                <span>Negative Marking Mode</span>
              </div>
            </div>

            {/* 2. Previous-Year Papers */}
            <div className="feature-card">
              <div className="feature-icon-box green">
                <FileText size={24} />
              </div>
              <h3 className="feature-card-title">2. Previous-Year Papers</h3>
              <p className="feature-card-desc">
                Access past exam questions to understand authentic exam patterns, recurring high-yield themes, and historical mark distributions.
              </p>
              <div className="feature-pill-list">
                <span>Class 12 Boards (2022–2024)</span>
                <span>JEE Advanced Papers</span>
                <span>Detailed Step Explanations</span>
              </div>
            </div>

            {/* 3. Important Topics */}
            <div className="feature-card">
              <div className="feature-icon-box green">
                <BookOpen size={24} />
              </div>
              <h3 className="feature-card-title">3. Important Topics</h3>
              <p className="feature-card-desc">
                Find essential concepts and focused revision material with our central Terminology Drawer offering instant Hindi translations and text-to-speech pronunciation.
              </p>
              <div className="feature-pill-list">
                <span>Clickable Scientific Terms</span>
                <span>Bilingual Toggles</span>
                <span>Memory Mnemonics</span>
              </div>
            </div>

            {/* 4. AI Question Generator */}
            <div className="feature-card">
              <div className="feature-icon-box green">
                <Sparkles size={24} />
              </div>
              <h3 className="feature-card-title">4. AI Question Generator</h3>
              <p className="feature-card-desc">
                Generate practice questions from any topic or chapter in seconds. Review generated questions, choose difficulty levels, and immediately start a tailored drill.
              </p>
              <div className="feature-pill-list">
                <span>Grounded in NCERT</span>
                <span>Custom Bloom Taxonomies</span>
                <span>Instant Answer Keys</span>
              </div>
            </div>

            {/* 5. Create Your Own Questions */}
            <div className="feature-card">
              <div className="feature-icon-box green">
                <PenTool size={24} />
              </div>
              <h3 className="feature-card-title">5. Create Your Own Questions</h3>
              <p className="feature-card-desc">
                Write, organize, and customize your own questions. Save them to your personal library, share with study groups, and add teacher notes.
              </p>
              <div className="feature-pill-list">
                <span>Rich Math & Formula Editor</span>
                <span>Tag by Subject & Unit</span>
                <span>Personal Library Storage</span>
              </div>
            </div>

            {/* 6. Topic-Based Learning */}
            <div className="feature-card">
              <div className="feature-icon-box green">
                <UploadCloud size={24} />
              </div>
              <h3 className="feature-card-title">6. Topic-Based Learning</h3>
              <p className="feature-card-desc">
                Import study material or a textbook topic and generate relevant practice quizzes, spaced-repetition flashcards, and formula cheatsheets automatically.
              </p>
              <div className="feature-pill-list">
                <span>PDF & Text Import</span>
                <span>Automated Extraction</span>
                <span>One-Click Practice Launcher</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="landing-how-section">
        <div className="landing-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">THE 3-STEP LEARNING LOOP</span>
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">
              A structured roadmap that transforms passive reading into active, measurable exam mastery.
            </p>
          </div>

          <div className="steps-three-grid">
            <div className="step-card">
              <div className="step-number-badge">Step 1</div>
              <h3 className="step-title">Choose a Topic</h3>
              <p className="step-desc">
                Select your academic track (NCERT, JEE, or NET) and open curated Smart Notes. Never pause to look up a word — click any scientific term for instant bilingual definitions and audio.
              </p>
              <div className="step-tag-pill">Smart Notes & Terminology</div>
            </div>

            <div className="step-card">
              <div className="step-number-badge">Step 2</div>
              <h3 className="step-title">Practice Questions</h3>
              <p className="step-desc">
                Solve validated questions with a live countdown timer, interactive question palette, and realistic marking rules (+4/-1 for JEE, +1/0 for CBSE).
              </p>
              <div className="step-tag-pill">Interactive Exam Engine</div>
            </div>

            <div className="step-card">
              <div className="step-number-badge">Step 3</div>
              <h3 className="step-title">Track Your Progress</h3>
              <p className="step-desc">
                Get instant 24/30 style scorecards, topic accuracy breakdowns, and automatically catalog wrong attempts into your personal Spaced-Repetition Mistake Notebook.
              </p>
              <div className="step-tag-pill">Instant Analytics & Mistake Notebook</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Student-Focused Motivational Section */}
      <section id="why-caplen" className="landing-motivation-section">
        <div className="landing-container motivation-card">
          <div className="motivation-grid">
            <div className="motivation-content">
              <span className="motivation-tag">BUILT SPECIFICALLY FOR STUDENTS</span>
              <h2 className="motivation-title">
                Zero distractions. <br />
                Maximum retention.
              </h2>
              <p className="motivation-text">
                Traditional exam preparation is fragmented across multiple tabs, bulky textbooks, confusing forums, and unverified answer keys.
              </p>
              <p className="motivation-text">
                Caplen unifies your syllabus into a focused, distraction-free environment where every question is verified, every scientific term has a one-click definition, and every mistake turns into an automatic revision flashcard.
              </p>

              <div className="motivation-points">
                <div className="point-item">
                  <CheckCircle2 size={18} className="text-emerald" />
                  <span>No paywalls or credit cards required to start practicing</span>
                </div>
                <div className="point-item">
                  <CheckCircle2 size={18} className="text-emerald" />
                  <span>Real step-by-step solutions for all answer options</span>
                </div>
                <div className="point-item">
                  <CheckCircle2 size={18} className="text-emerald" />
                  <span>Spaced repetition algorithm ensures you never repeat mistakes</span>
                </div>
              </div>

              <div className="motivation-cta-wrap">
                <button
                  onClick={() => onOpenAuth("register")}
                  className="btn-hero-cta"
                >
                  Create Free Student Account <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="motivation-side-box">
              <div className="quote-box">
                <div className="quote-stars">★★★★★</div>
                <p className="quote-body">
                  "Having the terminology drawer right inside my notes changed everything for Class 12 Biology and Electrochemistry. I never have to leave the app to Google concepts."
                </p>
                <div className="quote-author">
                  <div className="author-avatar-chip">AV</div>
                  <div>
                    <strong>Alyssa Vance</strong>
                    <span>Class 12 CBSE & Pre-Med Aspirant</span>
                  </div>
                </div>
              </div>

              <div className="mini-stats-grid">
                <div className="mini-stat-item">
                  <span className="stat-num">4</span>
                  <span className="stat-lbl">Curriculum Tracks</span>
                </div>
                <div className="mini-stat-item">
                  <span className="stat-num">40+</span>
                  <span className="stat-lbl">Validated Questions</span>
                </div>
                <div className="mini-stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-lbl">NCERT Grounded</span>
                </div>
                <div className="mini-stat-item">
                  <span className="stat-num">0</span>
                  <span className="stat-lbl">External Search Needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Clean Public Footer */}
      <footer className="landing-footer">
        <div className="landing-container landing-footer-grid">
          <div className="footer-col brand-col">
            <div className="landing-brand">
              <div className="landing-logo-icon">
                <GraduationCap size={22} strokeWidth={2.4} />
              </div>
              <div className="landing-brand-text">
                <span className="landing-brand-title">Caplen</span>
                <span className="landing-brand-tag">EXAM PREP</span>
              </div>
            </div>
            <p className="footer-mission">
              Empowering students across India with an all-in-one digital learning ecosystem combining NCERT notes, authentic question practice, and AI-powered personalized revision.
            </p>
            <div className="footer-social-note">
              <span>Study Smarter. Score Better.</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Academic Tracks</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigateToCourse && onNavigateToCourse("class9_10")}>Class 9–10 Foundations</button></li>
              <li><button onClick={() => onNavigateToCourse && onNavigateToCourse("class11_12")}>Class 11–12 NCERT</button></li>
              <li><button onClick={() => onNavigateToCourse && onNavigateToCourse("jee_advanced")}>IIT-JEE Main & Advanced</button></li>
              <li><button onClick={() => onNavigateToCourse && onNavigateToCourse("ugc_net")}>UGC-NET Paper 1 & 2</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Learning Modules</h4>
            <ul className="footer-links">
              <li><button onClick={() => onOpenAuth("register")}>Practice Questions Bank</button></li>
              <li><button onClick={() => onOpenAuth("register")}>Smart Notes & Terminology</button></li>
              <li><button onClick={() => onOpenAuth("register")}>Previous Year Papers</button></li>
              <li><button onClick={() => onOpenAuth("register")}>Custom Mock Test Builder</button></li>
              <li><button onClick={() => onOpenAuth("register")}>Spaced-Repetition Notebook</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection("features")}>About Caplen</button></li>
              <li><button onClick={() => scrollToSection("how-it-works")}>How It Works</button></li>
              <li><button onClick={() => onOpenAuth("login")}>Student Login</button></li>
              <li><button onClick={() => onOpenAuth("admin-login")}>Faculty & Admin Portal</button></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Caplen Privacy Policy: Student privacy is strictly protected. No third-party data selling."); }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert("Caplen Terms: Free educational platform for student learning and exam preparation."); }}>Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="landing-container footer-bottom-row">
          <p>© {new Date().getFullYear()} Caplen Learning Technologies. All rights reserved.</p>
          <div className="footer-trust-chips">
            <span className="trust-chip-item">🛡️ Encrypted Data</span>
            <span className="trust-chip-item">🌱 Student Focused</span>
            <span className="trust-chip-item">⚡ 100% Client Fast</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
