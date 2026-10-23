import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles
} from "lucide-react";
import { EXAM_TRACKS, getTrackById } from "../data/learningCategories";

// 1. Isometric 3D Book Stack with Circular Class Number Badge
function BookStackWithBadge({ number }) {
  return (
    <div className="slp-book-badge-wrapper">
      <svg
        width="110"
        height="90"
        viewBox="0 0 110 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="slp-books-svg"
      >
        {/* Soft Drop Shadow under bottom book */}
        <ellipse cx="55" cy="80" rx="42" ry="7" fill="#07865B" fillOpacity="0.12" />

        {/* Bottom Book (Deep Forest Green) */}
        <g id="bottom-book">
          {/* Back cover & pages */}
          <path d="M22 66 L86 52 L92 56 L28 70 Z" fill="#E8F1EC" />
          {/* Pages block */}
          <path d="M86 52 L92 56 L92 64 L86 60 Z" fill="#D3E2DA" />
          <path d="M28 70 L92 64 L92 66 L28 72 Z" fill="#F4F8F5" />
          {/* Spine & front cover */}
          <path
            d="M20 63 C18 63 16 65 18 69 L24 73 C26 75 29 74 31 73 L88 64 C90 63 91 61 90 59 L87 56 C86 54 83 55 81 56 L24 65 Z"
            fill="url(#greenGrad3)"
          />
        </g>

        {/* Middle Book (Vibrant Emerald Green) */}
        <g id="middle-book">
          <path d="M24 51 L84 39 L90 43 L30 55 Z" fill="#E8F1EC" />
          <path d="M84 39 L90 43 L90 50 L84 46 Z" fill="#D3E2DA" />
          <path d="M30 55 L90 49 L90 51 L30 57 Z" fill="#F4F8F5" />
          <path
            d="M22 48 C20 48 18 50 20 54 L26 58 C28 60 31 59 33 58 L86 50 C88 49 89 47 88 45 L85 42 C84 40 81 41 79 42 L26 50 Z"
            fill="url(#greenGrad2)"
          />
        </g>

        {/* Top Book (Rich Jade Green) */}
        <g id="top-book">
          <path d="M28 36 L82 26 L88 30 L34 40 Z" fill="#FFFFFF" />
          <path d="M82 26 L88 30 L88 36 L82 32 Z" fill="#E1EDE6" />
          <path d="M34 40 L88 35 L88 37 L34 42 Z" fill="#FFFFFF" />
          <path
            d="M26 33 C24 33 22 35 24 39 L30 43 C32 45 35 44 37 43 L84 36 C86 35 87 33 86 31 L83 28 C82 26 79 27 77 28 L30 35 Z"
            fill="url(#greenGrad1)"
          />
          {/* Embossed stripe on top book */}
          <path d="M36 34 L78 28" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Floating Circular Mint Badge with Number */}
        <g id="number-badge">
          <circle cx="85" cy="38" r="17" fill="#E9F9F0" stroke="#8AE1BA" strokeWidth="2" filter="url(#badgeShadow)" />
          <text
            x="85"
            y="43"
            textAnchor="middle"
            fill="#075B43"
            fontSize="15"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {number}
          </text>
        </g>

        {/* Gradients & Filters */}
        <defs>
          <linearGradient id="greenGrad1" x1="20" y1="25" x2="90" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="greenGrad2" x1="20" y1="40" x2="90" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" />
            <stop offset="1" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="greenGrad3" x1="20" y1="55" x2="90" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#047857" />
            <stop offset="1" stopColor="#064E3B" />
          </linearGradient>
          <filter id="badgeShadow" x="65" y="18" width="40" height="40" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#07865B" floodOpacity="0.2" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// 2. JEE Geometry Compass Graphic
function CompassGraphic() {
  return (
    <div className="slp-exam-icon-circle">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Compass Hinge Top */}
        <circle cx="22" cy="10" r="4.5" fill="#07865B" />
        <circle cx="22" cy="10" r="2" fill="#FFFFFF" />
        {/* Left Leg */}
        <path d="M19.5 13 L12 36" stroke="#07865B" strokeWidth="3" strokeLinecap="round" />
        {/* Right Leg */}
        <path d="M24.5 13 L32 36" stroke="#07865B" strokeWidth="3" strokeLinecap="round" />
        {/* Measurement Arc */}
        <path d="M14 28 C18 31 26 31 30 28" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Steel needles / pencil tip */}
        <circle cx="12" cy="36" r="1.5" fill="#064E3B" />
        <circle cx="32" cy="36" r="1.5" fill="#064E3B" />
      </svg>
    </div>
  );
}

// 3. NEET Stethoscope Graphic
function StethoscopeGraphic() {
  return (
    <div className="slp-exam-icon-circle">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Earpieces */}
        <path d="M14 8 C14 14 17 19 22 19 C27 19 30 14 30 8" stroke="#07865B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="8" r="2" fill="#064E3B" />
        <circle cx="30" cy="8" r="2" fill="#064E3B" />
        {/* Flexible Tube */}
        <path
          d="M22 19 L22 25 C22 31 27 34 31 30 C34 27 33 22 29 22"
          stroke="#059669"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Chestpiece / Bell */}
        <circle cx="29" cy="22" r="5" fill="#E9F9F0" stroke="#07865B" strokeWidth="2.5" />
        <circle cx="29" cy="22" r="2.2" fill="#07865B" />
      </svg>
    </div>
  );
}

// 4. Hero Banner Illustration (Books + Graduation Cap + Doodle Arrow + 'Choose your path')
function HeroPathBanner() {
  return (
    <div className="slp-hero-banner-wrap" aria-hidden="true">
      <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ambient Glow */}
        <circle cx="145" cy="85" r="60" fill="#E8F9F0" fillOpacity="0.75" />

        {/* Books Stack */}
        <g id="hero-books" transform="translate(100, 48)">
          {/* Bottom Book */}
          <ellipse cx="45" cy="62" rx="40" ry="7" fill="#07865B" fillOpacity="0.1" />
          <path d="M12 48 L76 36 L82 40 L18 52 Z" fill="#E8F1EC" />
          <path d="M10 46 C8 46 6 48 8 51 L14 55 C16 57 18 56 20 55 L78 47 C80 46 81 44 80 42 L77 39 C76 38 73 39 71 40 L14 48 Z" fill="#047857" />

          {/* Middle Book */}
          <path d="M16 36 L72 26 L78 30 L22 40 Z" fill="#FFFFFF" />
          <path d="M14 34 C12 34 10 36 12 39 L18 43 C20 45 22 44 24 43 L74 37 C76 36 77 34 76 32 L73 29 C72 28 69 29 67 30 L18 36 Z" fill="#059669" />

          {/* Top Book */}
          <path d="M20 25 L68 16 L74 20 L26 29 Z" fill="#E1EDE6" />
          <path d="M18 23 C16 23 14 25 16 28 L22 32 C24 34 26 33 28 32 L70 27 C72 26 73 24 72 22 L69 19 C68 18 65 19 63 20 L22 25 Z" fill="#10B981" />

          {/* Graduation Cap (Mortarboard) */}
          <g id="mortarboard" transform="translate(20, -12)">
            {/* Skull cap */}
            <path d="M22 20 C22 24 32 26 42 24 C48 22 50 18 50 16 C42 16 32 17 22 20 Z" fill="#17221F" />
            {/* Diamond top */}
            <polygon points="36,4 70,14 36,24 2,14" fill="#1F2937" stroke="#111827" strokeWidth="1" />
            <polygon points="36,6 66,14 36,22 6,14" fill="#374151" />
            {/* Center button */}
            <circle cx="36" cy="14" r="2.5" fill="#10B981" />
            {/* Tassel */}
            <path d="M36 14 Q22 20 20 29" stroke="#10B981" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="20" cy="30" r="2" fill="#059669" />
          </g>
        </g>

        {/* Sparkles */}
        <path d="M190 28 L192 34 L198 36 L192 38 L190 44 L188 38 L182 36 L188 34 Z" fill="#10B981" />
        <path d="M110 32 L111 36 L115 37 L111 38 L110 42 L109 38 L105 37 L109 36 Z" fill="#34D399" />
        <circle cx="178" cy="62" r="2" fill="#10B981" />

        {/* Doodle Curved Arrow */}
        <path
          d="M72 38 C62 46 64 62 82 66"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="3 3"
          fill="none"
        />
        <path d="M78 62 L83 67 L76 68" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Handwritten text 'Choose your path' */}
        <text
          x="62"
          y="28"
          fill="#64748B"
          fontSize="13"
          fontStyle="italic"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, 'Segoe UI', cursive, sans-serif"
          transform="rotate(-8 62 28)"
        >
          Choose
        </text>
        <text
          x="55"
          y="42"
          fill="#64748B"
          fontSize="13"
          fontStyle="italic"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, 'Segoe UI', cursive, sans-serif"
          transform="rotate(-8 55 42)"
        >
          your path
        </text>
      </svg>
    </div>
  );
}

export default function SelectLearningPathView({
  currentPath = "class_10",
  onSelectPath,
  onBackToHome,
  user
}) {
  const [selectedId, setSelectedId] = useState(currentPath || "class_10");

  // 1. School Classes (Top Grid - 4 Options)
  const schoolClasses = [
    {
      id: "class_9",
      number: "9",
      name: "Class 9",
      description: "Build strong fundamentals for high school.",
      slug: "/class-9"
    },
    {
      id: "class_10",
      number: "10",
      name: "Class 10",
      description: "Master concepts and prepare for board exams.",
      slug: "/class-10"
    },
    {
      id: "class_11",
      number: "11",
      name: "Class 11",
      description: "Strengthen your concepts for advanced learning.",
      slug: "/class-11"
    },
    {
      id: "class_12",
      number: "12",
      name: "Class 12",
      description: "Board preparation and competitive exam readiness.",
      slug: "/class-12"
    }
  ];

  // 2. Competitive Entrance Exams (Bottom Grid - 2 Options)
  const competitiveExams = [
    {
      id: "jee",
      name: "JEE (IIT)",
      description: "Comprehensive preparation for JEE Main and Advanced.",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      icon: CompassGraphic,
      slug: "/jee"
    },
    {
      id: "neet",
      name: "NEET (Medical)",
      description: "Focused preparation for NEET with concepts, questions and PYQs.",
      subjects: ["Physics", "Chemistry", "Biology"],
      icon: StethoscopeGraphic,
      slug: "/neet"
    }
  ];

  const handleCardClick = (id) => {
    setSelectedId(id);
  };

  const handleConfirm = (idToConfirm) => {
    const finalId = idToConfirm || selectedId;
    if (onSelectPath) {
      onSelectPath(finalId);
    }
  };

  const selectedItem =
    schoolClasses.find((c) => c.id === selectedId) ||
    competitiveExams.find((e) => e.id === selectedId) ||
    schoolClasses[1];

  return (
    <div className="select-learning-path-viewport fade-in">
      <div className="slp-inner-container">
        {/* Top Breadcrumb / Back button */}
        <div className="slp-top-nav-row">
          <button
            type="button"
            className="slp-back-btn"
            id="btn-back-from-selection"
            onClick={onBackToHome}
            title="Return to Student Dashboard"
          >
            <ArrowLeft size={17} strokeWidth={2.2} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Header Section with Title & Right Illustration */}
        <div className="slp-header-section">
          <div className="slp-header-text">
            <span className="slp-eyebrow">SELECT YOUR LEARNING PATH</span>
            <h1 className="slp-heading">
              Which class or exam are you{" "}
              <span className="highlight-green-text">preparing for?</span>
            </h1>
            <p className="slp-subtitle">
              Choose your goal to get personalised content, questions and learning materials.
            </p>
          </div>

          <HeroPathBanner />
        </div>

        {/* SECTION 1: School Classes (4-Column Grid) */}
        <div className="slp-section-block">
          <div className="slp-cards-grid-4">
            {schoolClasses.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <div
                  key={item.id}
                  id={`card-select-${item.id}`}
                  className={`slp-class-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleCardClick(item.id)}
                  onDoubleClick={() => handleConfirm(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  title={`Select ${item.name}`}
                >
                  {/* Selected Tick Indicator */}
                  {isSelected && (
                    <div className="slp-selected-pill-badge">
                      <Check size={13} strokeWidth={3} />
                      <span>Selected</span>
                    </div>
                  )}

                  <BookStackWithBadge number={item.number} />

                  <div className="slp-card-body">
                    <h3 className="slp-card-title">{item.name}</h3>
                    <p className="slp-card-desc">{item.description}</p>
                  </div>

                  <div className="slp-card-footer">
                    <button
                      type="button"
                      className={`slp-circle-arrow-btn ${isSelected ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirm(item.id);
                      }}
                      title={`Continue with ${item.name}`}
                      aria-label={`Continue with ${item.name}`}
                    >
                      <ArrowRight size={17} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Competitive Exams (2-Column Grid) */}
        <div className="slp-section-block">
          <div className="slp-cards-grid-2">
            {competitiveExams.map((item) => {
              const isSelected = selectedId === item.id;
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  id={`card-select-${item.id}`}
                  className={`slp-exam-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleCardClick(item.id)}
                  onDoubleClick={() => handleConfirm(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  title={`Select ${item.name}`}
                >
                  {/* Selected Tick Indicator */}
                  {isSelected && (
                    <div className="slp-selected-pill-badge">
                      <Check size={13} strokeWidth={3} />
                      <span>Selected</span>
                    </div>
                  )}

                  <div className="slp-exam-card-left">
                    <IconComp />
                  </div>

                  <div className="slp-exam-card-middle">
                    <h3 className="slp-card-title">{item.name}</h3>
                    <p className="slp-card-desc">{item.description}</p>
                    <div className="slp-chips-row">
                      {item.subjects.map((sub) => (
                        <span key={sub} className="slp-subject-chip">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="slp-exam-card-right">
                    <button
                      type="button"
                      className={`slp-circle-arrow-btn ${isSelected ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirm(item.id);
                      }}
                      title={`Continue with ${item.name}`}
                      aria-label={`Continue with ${item.name}`}
                    >
                      <ArrowRight size={17} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Floating Confirmation CTA Bar */}
        <div className="slp-confirm-bar fade-in">
          <div className="slp-confirm-info">
            <span className="slp-confirm-eyebrow">Chosen Goal:</span>
            <span className="slp-confirm-name">{selectedItem.name}</span>
          </div>
          <button
            type="button"
            id="btn-confirm-learning-path"
            className="slp-continue-btn"
            onClick={() => handleConfirm(selectedId)}
          >
            <span>Continue to Dashboard</span>
            <ArrowRight size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}
