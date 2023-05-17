import React, { Component, ErrorInfo } from "react";

interface Props {
  fallback: string;
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    console.log("called");

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    console.log("hasError", hasError);

    if (hasError) {
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
