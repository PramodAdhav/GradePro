import React, { useState } from 'react';
import './Layout.css';
import App from './App';  // SGPA Calculator
import CgpaCalculator from './CgpaCalculator';
import GradeCalculator from './GradeCalculator';

const Layout = () => {
  const [selected, setSelected] = useState('sgpa');

  const renderCalculator = () => {
    if (selected === 'sgpa') return <App />;
    if (selected === 'cgpa') return <CgpaCalculator />;
    if (selected === 'grade') return <GradeCalculator />;
    return null;
  };

  return (
    <div className="layout-container">
      <nav className="navbar">
        <div className="navbar-title">PassPlease</div>
        <div className="nav-options">
          <button
            className={`nav-button ${selected === 'sgpa' ? 'active' : ''}`}
            onClick={() => setSelected('sgpa')}
          >
            Calculate SGPA
          </button>
          <button
            className={`nav-button ${selected === 'cgpa' ? 'active' : ''}`}
            onClick={() => setSelected('cgpa')}
          >
            Calculate CGPA
          </button>
          <button
            className={`nav-button ${selected === 'grade' ? 'active' : ''}`}
            onClick={() => setSelected('grade')}
          >
            Calculate Grade
          </button>
        </div>
      </nav>

      <main className="main-content">
        {renderCalculator()}
      </main>

      <footer className="footer">
        Made with ❤️ |{' '}
        <a
          href="https://www.linkedin.com/in/justlikepramod"
          target="_blank"
          rel="noopener noreferrer"
        >
          Badmosh Billa
        </a>
      </footer>
    </div>
  );
};

export default Layout;
