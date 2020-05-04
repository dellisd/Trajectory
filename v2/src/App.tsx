import React from 'react';
import './App.css';
import logo from './assets/trajectory_logo.svg';

function App() {
  return (
    <div className="main-container">
      <div className="logo-container">
        <img className="logo" src={logo} />
      </div>
      <div className="side-menu-container">
        <h2>
          Welcome to Trajectory
        </h2>
      </div>
    </div>
  );
}

export default App;
