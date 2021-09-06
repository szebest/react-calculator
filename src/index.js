import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Calculator from './components/Calculator/Calculator.jsx';
import ThemeToggle from './components/ThemeToggle/ThemeToggle.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
    <ThemeToggle />
  </React.StrictMode>,
  document.getElementById('root')
);
