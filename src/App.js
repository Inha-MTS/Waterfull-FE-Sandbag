import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>물바다</h1>
        <p>주문을 시작하세요</p>
        <div className="buttons">
          <button className="button large">
            <span className="emoji">📦</span>
            <span className="text">얼굴로</span>
          </button>
          <button className="button large">
            <span className="emoji">🛍️</span>
            <span className="text">학생증으로</span>
          </button>
        </div>
        <div className="buttons small">
          <button className="button round">🇰🇷</button>
          <button className="button round">🇺🇸</button>
          <button className="button round">🇨🇳</button>
        </div>
      </header>
    </div>
  );
}

export default App;
