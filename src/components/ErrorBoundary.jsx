import React from "react";
import { RefreshCw, Home, RotateCcw, AlertTriangle } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  handleResetCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error("Failed to clear storage:", e);
    }
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F7FAF8",
            fontFamily: "system-ui, -apple-system, sans-serif",
            padding: "24px"
          }}
        >
          <div
            style={{
              maxWidth: "540px",
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              padding: "36px 32px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
              border: "1px solid #E5ECE8",
              textAlign: "center"
            }}
          >
            {/* Emerald Icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                backgroundColor: "#E9F9F0",
                color: "#07865B",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#17221F",
                marginBottom: "10px"
              }}
            >
              Caplen Learning App
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#66736D",
                lineHeight: 1.5,
                marginBottom: "24px"
              }}
            >
              A momentary issue occurred while loading this page. You can reload or reset your local session below.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "20px"
              }}
            >
              <button
                onClick={this.handleReload}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#07865B",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
              >
                <RefreshCw size={16} /> Reload Page
              </button>

              <button
                onClick={this.handleGoHome}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  color: "#17221F",
                  border: "1px solid #E5ECE8",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer"
                }}
              >
                <Home size={16} /> Return to Homepage
              </button>

              <button
                onClick={this.handleResetCache}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  color: "#889690",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  cursor: "pointer"
                }}
              >
                <RotateCcw size={14} /> Clear Local Cache & Restart
              </button>
            </div>

            {/* Error Details Collapsible */}
            {this.state.error && (
              <details
                style={{
                  marginTop: "16px",
                  textAlign: "left",
                  fontSize: "0.8rem",
                  color: "#889690",
                  borderTop: "1px solid #E5ECE8",
                  paddingTop: "12px"
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>Technical Details</summary>
                <pre
                  style={{
                    marginTop: "8px",
                    padding: "12px",
                    backgroundColor: "#F7FAF8",
                    borderRadius: "8px",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all"
                  }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
