import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { encounteredError: false };
  }

  static getDerivedStateFromError(error) {
    return { encounteredError: true };
  }

  componentDidCatch(error, errorDetails) {
    console.error("Caught an unhandled error:", error, errorDetails);
  }

  render() {
    if (this.state.encounteredError) {
      return <h1>Oops! Something went wrong.</h1>;
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