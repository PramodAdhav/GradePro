import React, { useState } from 'react';
import './CgpaCalculator.css';

const CgpaCalculator = () => {
  const [gpas, setGpas] = useState(['']);
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState('');

  const handleGpaChange = (index, value) => {
    const updated = [...gpas];

    if (value === '') {
      updated[index] = '';
    } else {
      const parsed = parseFloat(value);
      if (isNaN(parsed) || parsed < 0 || parsed > 10) {
        updated[index] = value; // Keep displaying the invalid value, but don't calculate
      } else {
        updated[index] = parsed;
      }
    }

    setGpas(updated);
  };

  const addSemester = () => {
    if (gpas.length < 8) {
      setGpas([...gpas, '']);
    }
  };

  const resetCalculator = () => {
    setGpas(['']);
    setCgpa(null);
    setError('');
  };

  const calculateCgpa = () => {
    if (
      gpas.length === 0 ||
      gpas.some(g => g === '' || isNaN(g) || parseFloat(g) < 0 || parseFloat(g) > 10)
    ) {
      setError('Please enter valid GPA values between 0.0 and 10.0 for all semesters.');
      setCgpa(null);
      return;
    }

    const sum = gpas.reduce((acc, val) => acc + parseFloat(val), 0);
    setCgpa((sum / gpas.length).toFixed(2));
    setError('');
  };

  return (
    <div className="cgpa-container">
      <h1 className="cgpa-title">CGPA Calculator</h1>

      <div className="semester-list-vertical">
        {gpas.map((gpa, index) => (
          <div key={index} className="semester-entry">
            <input
              type="number"
              className="gpa-input"
              step="0.01"
              min="0"
              max="10"
              placeholder={`Semester ${index + 1} GPA`}
              value={gpa}
              onChange={(e) => handleGpaChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {error && <div className="cgpa-error">{error}</div>}

      <div className="cgpa-btn-group">
        <button
          className="cgpa-btn"
          onClick={addSemester}
          disabled={gpas.length >= 8}
        >
          Add Semester
        </button>
        <button className="cgpa-btn" onClick={calculateCgpa}>
          Calculate CGPA
        </button>
      </div>

      <div className="cgpa-reset-container">
        <button className="cgpa-reset-btn" onClick={resetCalculator}>
          Reset
        </button>
      </div>

      {cgpa && (
        <div className="cgpa-result">
          Your CGPA is: <span className="cgpa-value">{cgpa}</span>
        </div>
      )}
    </div>
  );
};

export default CgpaCalculator;
