import React from "react";

const CHUNK_ERROR_PATTERNS = [
  "loading chunk",
  "loading css chunk",
  "dynamically imported module",
  "failed to fetch",
  "chunkloaderror",
  "importing a module script failed",
];

const isChunkLoadError = (error) => {
  const message = String(error?.message || error || "").toLowerCase();
  return CHUNK_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
};

const CHUNK_RELOAD_KEY = "imyanya_chunk_reload_ts";

const shouldAutoReloadChunkError = () => {
  try {
    const lastReload = Number(
      window.sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0
    );
    // Only auto-reload once per 30s to avoid reload loops.
    if (Date.now() - lastReload < 30000) {
      return false;
    }
    window.sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
    return true;
  } catch (storageError) {
    return true;
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });

    try {
      window.sessionStorage.setItem(
        "imyanya_last_error",
        JSON.stringify({
          message: String(error?.message || error),
          stack: String(error?.stack || "").slice(0, 2000),
          componentStack: String(errorInfo?.componentStack || "").slice(0, 2000),
          url: window.location.href,
          time: new Date().toISOString(),
        })
      );
    } catch (storageError) {
      // Storage unavailable — error is still visible in the console.
    }

    // A new deployment renames code-split chunks, so a cached index.html
    // can request chunks that no longer exist. Reload once to fetch the
    // fresh index.html instead of showing a dead-end error screen.
    if (isChunkLoadError(error) && shouldAutoReloadChunkError()) {
      window.location.reload();
    }
  }

  handleCopyError = async () => {
    const { error, errorInfo } = this.state;
    const details = [
      `Message: ${error?.message || error}`,
      `URL: ${window.location.href}`,
      `Stack: ${error?.stack || "n/a"}`,
      `Component stack: ${errorInfo?.componentStack || "n/a"}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(details);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch (copyError) {
      this.setState({ copyFailed: true });
    }
  };

  handleClearAndReload = () => {
    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch (storageError) {
      // Storage may be unavailable — reload anyway.
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const chunkError = isChunkLoadError(error);

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
          <p style={{ color: "#666", marginBottom: 8, maxWidth: 560 }}>
            {chunkError
              ? "The app was just updated. Please reload the page to load the latest version."
              : "An unexpected error occurred. Please reload the page to continue."}
          </p>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", justifyContent: "center" }}>
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
            <button
              type="button"
              onClick={this.handleClearAndReload}
              style={{
                padding: "10px 24px",
                fontSize: 16,
                fontWeight: 600,
                color: "#441da0",
                backgroundColor: "#fff",
                border: "1px solid #441da0",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Clear site data & reload
            </button>
            <button
              type="button"
              onClick={this.handleCopyError}
              style={{
                padding: "10px 24px",
                fontSize: 16,
                fontWeight: 600,
                color: "#333",
                backgroundColor: "#eee",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              {this.state.copied ? "Copied!" : "Copy error details"}
            </button>
          </div>
          {this.state.copyFailed && (
            <p style={{ color: "#b00", fontSize: 13 }}>
              Copy failed — please screenshot this page instead.
            </p>
          )}
          <details
            style={{
              maxWidth: 720,
              width: "100%",
              textAlign: "left",
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              padding: "12px 16px",
              fontSize: 13,
              color: "#333",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: 700 }}>
              Error details (send this to support)
            </summary>
            <p style={{ margin: "8px 0", wordBreak: "break-word" }}>
              <strong>Message:</strong> {String(error?.message || error)}
            </p>
            {error?.stack && (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  background: "#f5f5f5",
                  padding: 8,
                  borderRadius: 4,
                  maxHeight: 200,
                  overflow: "auto",
                }}
              >
                {String(error.stack).slice(0, 2000)}
              </pre>
            )}
            {errorInfo?.componentStack && (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  background: "#f5f5f5",
                  padding: 8,
                  borderRadius: 4,
                  maxHeight: 200,
                  overflow: "auto",
                }}
              >
                {String(errorInfo.componentStack).slice(0, 2000)}
              </pre>
            )}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;