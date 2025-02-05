import React from 'react';
import Home from './pages/Home.tsx';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Arbitration Session Scheduler</h1>
      <Home />
    </div>
  );
};

export default App;