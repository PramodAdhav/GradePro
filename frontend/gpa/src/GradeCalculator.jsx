// GradeCalculator.jsx
import React, { useState } from 'react';
import './GradeCalculator.css';


const GradeCalculator = () => {
  const [internalMarks, setInternalMarks] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const gradeCutoffs = {
    O: 91,
    "A+": 81,
    A: 71,
    "B+": 61,
    B: 56,
    C: 51,
  };

  const handleCalculate = () => {
    const marks = parseFloat(internalMarks);
    if (isNaN(marks)) {
      setError('Please enter a valid number.');
      setResults([]);
      return;
    }
    if (marks < 0 || marks > 60) {
      setError('Internal marks must be between 0 and 60.');
      setResults([]);
      return;
    }

    setError('');
    const calculatedResults = [];

    Object.entries(gradeCutoffs).forEach(([grade, totalRequired]) => {
      const marksNeededFromExam40 = totalRequired - marks;

      if (marksNeededFromExam40 <= 0) {
        calculatedResults.push({
          grade,
          message: 'Already secured with internal marks.',
        });
      } else if (marksNeededFromExam40 > 40) {
        calculatedResults.push({
          grade,
          message: 'Not possible even with full marks in semester exam.',
        });
      } else {
        const requiredExamMarksOutOf75 = (marksNeededFromExam40 / 40) * 75;
        calculatedResults.push({
          grade,
          message: `Need at least ${requiredExamMarksOutOf75.toFixed(2)} / 75 in semester exam.`,
        });
      }
    });

    setResults(calculatedResults);
  };

  return (
    <div className="grade-calculator-container">
      <h1>Grade Calculator</h1>
      <div>
        <label>
          Enter your internal marks (out of 60):
          <input
            type="number"
            value={internalMarks}
            onChange={(e) => setInternalMarks(e.target.value)}
            min="0"
            max="60"
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 && (
        <div>
          <h3>Required Semester Exam Marks for Grades:</h3>
          <ul>
            {results.map(({ grade, message }) => (
              <li key={grade}>
                <strong>{grade}:</strong> {message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GradeCalculator;
