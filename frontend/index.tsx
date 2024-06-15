import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

interface AppErrorBoundaryState {
  encounteredError: boolean;
  errorMessage?: string;
}

class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { encounteredError: false };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    // You could also log error information to an error reporting service here
    return { encounteredError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Caught an unhandled error:", error, errorDUInfo);
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error: Error, errorInfo: React.ErrorInfo): void {
    // Placeholder for error logging logic
    // In a real app, you'd likely send this information to a backend service for monitoring
    console.log("Logging error to service:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.encounteredError) {
      return (
        <>
          <h1>Oops! Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorMessage && <summary>Details</summary>}
            {this.state.errorMessage}
          </details>
        </>
      );
    }

    return this.props.children; 
  }
}

const appRootElement = document.getElementById('root');
if (appRootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </React.StrictMode>,
    appRootElement
  );
} else {
  console.error('Unable to locate the app root element');
}