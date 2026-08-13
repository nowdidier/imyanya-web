import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            fontFamily: "Open Sans, Arial, sans-serif",
            textAlign: "center",
            background: "#fafafa",
          }}
        >
          <h1 style={{ color: "#441da0", marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: "#666", marginBottom: 24 }}>
            An unexpected error occurred. Please reload the page to continue.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 24px",
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "#441da0",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;