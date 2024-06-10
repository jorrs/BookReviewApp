import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root(Item = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  console.error('Failed to find the root element');
}