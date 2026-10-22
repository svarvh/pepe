import React, { useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Clock,
  Sparkles,
  Layers,
  Search,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  ListVideo,
  FileText,
  Video,
  Settings,
  ChevronRight,
  ExternalLink,
  Target
} from "lucide-react";
import { StorageService } from "../services/storage";
import TerminologyDrawer from "./TerminologyDrawer";

export default function TopicVideosView({ initialTopicId, onNavigate, onPracticeTopic }) {
  const activeCourse = StorageService.getActiveCourse();
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId || "topic-bio-evolution");
  const [activeTab, setActiveTab] = useState("player"); // 'player', 'solutions', 'generator'
  const [playbackSpeed, setPlaybackSpeed] = useState("1x");
  const [activeMarkerSeconds, setActiveMarkerSeconds] = useState(0);
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [activeTermId, setActiveTermId] = useState(null);

  // AI Pipeline Simulator state
  const [pipelineStage, setPipelineStage] = useState(1); // 1: Script, 2: Storyboard, 3: Narration, 4: Teacher Review, 5: Published
  const [isGenerating, setIsGenerating] = useState(false);

  const videoData = StorageService.getTopicVideo(selectedTopicId) || StorageService.getTopicVideo("topic-bio-evolution");
  const noteData = StorageService.getSmartNote(selectedTopicId);

  // Jump to marker
  const handleMarkerClick = (seconds) => {
    setActiveMarkerSeconds(seconds);
    // In an embedded iframe or player, postMessage or time seek can be passed
  };

  // Filter transcript
  const filteredTranscript = videoData.transcript.filter(line =>
    transcriptSearch.trim() === "" ||
    line.text.toLowerCase().includes(transcriptSearch.toLowerCase()) ||
    line.speaker.toLowerCase().includes(transcriptSearch.toLowerCase())
  );

  const handleSimulatePipeline = () => {
    setIsGenerating(true);
    let stage = 1;
    const interval = setInterval(() => {
      stage += 1;
      setPipelineStage(stage);
      if (stage >= 5) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 1200);
  };

  return (
    <div className="topic-videos-view fade-in">
      {/* 1. TOP HEADER HERO */}
      <div className="videos-hero-card">
        <div className="videos-hero-left">
          <div className="videos-icon-badge">
            <Video size={24} />
          </div>
          <div>
            <div className="videos-pill-row">
              <span className="badge badge-lime">Topic-Specific Video Modules</span>
              <span className="badge badge-lavender">Interactive Transcripts</span>
              <span className="badge badge-cream">AI Generation Pipeline</span>
            </div>
            <h1 className="videos-main-title">{videoData.title}</h1>
            <p className="videos-main-subtitle">
              Instructor: <strong>{videoData.instructor}</strong> • {videoData.duration} total duration • {videoData.viewsCount} views • ★ {videoData.rating}
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="videos-view-tabs">
          <button
            className={`vid-tab-btn ${activeTab === "player" ? "active" : ""}`}
            onClick={() => setActiveTab("player")}
          >
            <Play size={16} />
            <span>Concept Lesson</span>
          </button>
          <button
            className={`vid-tab-btn ${activeTab === "solutions" ? "active" : ""}`}
            onClick={() => setActiveTab("solutions")}
          >
            <ListVideo size={16} />
            <span>Question Walkthroughs ({videoData.solutionVideos?.length || 0})</span>
          </button>
          <button
            className={`vid-tab-btn ${activeTab === "generator" ? "active" : ""}`}
            onClick={() => setActiveTab("generator")}
          >
            <Sparkles size={16} />
            <span>AI Video Pipeline</span>
          </button>
        </div>
      </div>

      {/* 2. TAB 1: CONCEPT VIDEO PLAYER & INTERACTIVE TRANSCRIPT */}
      {activeTab === "player" && (
        <div className="videos-split-player-layout">
          {/* Main Video Screen */}
          <div className="video-player-main-col">
            <div className="video-embed-container">
              <iframe
                src={`${videoData.videoUrl}?start=${activeMarkerSeconds}&autoplay=0`}
                title={videoData.title}
                className="video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Controls & Speed Bar */}
            <div className="video-controls-bar">
              <div className="controls-left">
                <span className="current-marker-indicator">
                  <Clock size={15} />
                  <span>Current Marker: {Math.floor(activeMarkerSeconds / 60)}:{(activeMarkerSeconds % 60).toString().padStart(2, "0")}</span>
                </span>
              </div>

              <div className="controls-right">
                <span className="speed-label">Playback Speed:</span>
                {["0.75x", "1x", "1.25x", "1.5x", "2x"].map((spd) => (
                  <button
                    key={spd}
                    className={`speed-pill ${playbackSpeed === spd ? "active" : ""}`}
                    onClick={() => setPlaybackSpeed(spd)}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter Markers Timeline */}
            <div className="video-chapters-card">
              <div className="chapters-card-header">
                <Layers size={18} />
                <h3>Topic Chapter Markers ({videoData.chapterMarkers?.length})</h3>
              </div>
              <div className="chapters-timeline-list">
                {videoData.chapterMarkers?.map((marker, mIdx) => {
                  const isActive = activeMarkerSeconds === marker.seconds;
                  return (
                    <button
                      key={mIdx}
                      className={`chapter-marker-row ${isActive ? "active" : ""}`}
                      onClick={() => handleMarkerClick(marker.seconds)}
                    >
                      <span className="marker-timestamp">{marker.time}</span>
                      <span className="marker-title">{marker.title}</span>
                      <Play size={14} className="marker-play-icon" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="video-bottom-action-bar">
              <button
                className="pill-btn pill-btn-outline"
                onClick={() => onNavigate("smart-notes")}
              >
                <BookOpen size={16} />
                <span>Read Topic Smart Notes</span>
              </button>

              <button
                className="pill-btn pill-btn-lime"
                onClick={() => {
                  if (onPracticeTopic) onPracticeTopic(selectedTopicId);
                  else onNavigate("practice");
                }}
              >
                <Target size={16} />
                <span>Practise Topic Questions</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Synchronized Interactive Transcript */}
          <div className="video-transcript-col">
            <div className="transcript-header-box">
              <div className="transcript-title-row">
                <FileText size={18} />
                <h3>Interactive Transcript</h3>
              </div>
              <p className="transcript-hint">
                Words highlighted with a sparkle are clickable scientific terms. Tapping opens instant definitions.
              </p>

              {/* Transcript Search Bar */}
              <div className="transcript-search-wrap">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search in video transcript..."
                  value={transcriptSearch}
                  onChange={(e) => setTranscriptSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Transcript Lines List */}
            <div className="transcript-scroll-list">
              {filteredTranscript.map((item, tIdx) => (
                <div key={tIdx} className="transcript-line-card">
                  <div className="transcript-line-meta">
                    <button
                      className="transcript-time-badge"
                      onClick={() => handleMarkerClick(item.seconds)}
                      title="Jump video to this timestamp"
                    >
                      <Play size={10} />
                      <span>{item.time}</span>
                    </button>
                    <span className="transcript-speaker">{item.speaker}</span>
                  </div>

                  <p className="transcript-line-text">
                    {/* Parse [[term-id]] in transcripts */}
                    {item.text.split(/(\[\[[a-zA-Z0-9_-]+\]\])/g).map((part, pIdx) => {
                      const match = part.match(/^\[\[([a-zA-Z0-9_-]+)\]\]$/);
                      if (match) {
                        const termId = match[1];
                        const termObj = StorageService.getTerminology(termId);
                        return (
                          <button
                            key={pIdx}
                            className="transcript-term-link"
                            onClick={() => setActiveTermId(termId)}
                            title="Click to view definition"
                          >
                            <Sparkles size={11} />
                            <span>{termObj ? termObj.term : termId}</span>
                          </button>
                        );
                      }
                      return <span key={pIdx}>{part}</span>;
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: QUESTION SOLUTION WALKTHROUGH VIDEOS */}
      {activeTab === "solutions" && (
        <div className="solutions-videos-grid fade-in">
          <div className="solutions-intro-banner">
            <h3>Dedicated Question Walkthroughs</h3>
            <p>
              Step-by-step video solutions explaining not just the correct option, but why common exam distractors and alternatives are incorrect.
            </p>
          </div>

          <div className="solutions-cards-row">
            {videoData.solutionVideos?.map((solVid, idx) => (
              <div key={solVid.id} className="solution-video-card">
                <div className="sol-video-preview">
                  <iframe
                    src={solVid.url}
                    title={solVid.title}
                    className="sol-iframe"
                    allowFullScreen
                  />
                </div>
                <div className="sol-card-body">
                  <div className="sol-meta-row">
                    <span className={`badge ${solVid.difficulty === "Hard" ? "badge-lavender" : "badge-lime"}`}>
                      {solVid.difficulty}
                    </span>
                    <span className="sol-duration">
                      <Clock size={13} /> {solVid.duration}
                    </span>
                  </div>
                  <h4 className="sol-title">{solVid.title}</h4>
                  <button
                    className="pill-btn pill-btn-lime pill-btn-sm"
                    onClick={() => {
                      if (onPracticeTopic) onPracticeTopic(selectedTopicId);
                      else onNavigate("practice");
                    }}
                  >
                    <span>Practise Related Questions</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 3: AI VIDEO GENERATION PIPELINE SIMULATOR */}
      {activeTab === "generator" && (
        <div className="video-generator-pipeline-view fade-in">
          <div className="pipeline-intro-card">
            <div className="pipeline-hero-left">
              <Sparkles size={24} />
              <div>
                <h2>AI-Assisted Video Production Pipeline (Module C)</h2>
                <p>
                  Our automated workflow creates concept video lessons: AI proposes scripts and storyboards, followed by expert teacher review, voice synthesis, and publication.
                </p>
              </div>
            </div>
            <button
              className={`pill-btn pill-btn-lime ${isGenerating ? "disabled" : ""}`}
              onClick={handleSimulatePipeline}
              disabled={isGenerating}
            >
              <Sparkles size={16} />
              <span>{isGenerating ? "Generating in Progress..." : "Run Pipeline Simulator"}</span>
            </button>
          </div>

          {/* 5-Step Pipeline Steps Grid */}
          <div className="pipeline-steps-grid">
            {[
              {
                step: 1,
                title: "1. AI Script Draft",
                desc: "Synthesizes structured notes, key formulas, and common student misconceptions into an engaging lecture script."
              },
              {
                step: 2,
                title: "2. Storyboard & Diagrams",
                desc: "Generates high-resolution scientific diagrams, flowcharts, and slide markers."
              },
              {
                step: 3,
                title: "3. Narration & Timestamps",
                desc: "Generates natural speech narration, aligns subtitles, and links clickable terminology."
              },
              {
                step: 4,
                title: "4. Teacher Review & Audit",
                desc: "Subject matter expert checks factual accuracy, NCERT alignment, and verifies pronunciation."
              },
              {
                step: 5,
                title: "5. Published to Students",
                desc: "Video is deployed to the CDN, indexed in global search, and ready for streaming."
              }
            ].map((st) => {
              const isPast = pipelineStage >= st.step;
              const isCurrent = pipelineStage === st.step;
              return (
                <div
                  key={st.step}
                  className={`pipeline-step-card ${isPast ? "step-completed" : ""} ${isCurrent ? "step-active" : ""}`}
                >
                  <div className="step-num-icon">
                    {isPast ? <CheckCircle2 size={18} /> : <span>0{st.step}</span>}
                  </div>
                  <h4>{st.title}</h4>
                  <p>{st.desc}</p>
                  <div className="step-status-tag">
                    {isPast ? "Verified" : "Pending"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Central Terminology Drawer Modal */}
      {activeTermId && (
        <TerminologyDrawer
          termId={activeTermId}
          onClose={() => setActiveTermId(null)}
          onNavigateToNotes={() => {
            setActiveTermId(null);
            onNavigate("smart-notes");
          }}
          onPracticeTerm={() => {
            setActiveTermId(null);
            if (onPracticeTopic) onPracticeTopic(selectedTopicId);
            else onNavigate("practice");
          }}
        />
      )}
    </div>
  );
}
