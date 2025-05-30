import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

import perfect10Img from './assets/perfect10.jpg';
import outstandingImg from './assets/outstanding.jpg';
import excellentImg from './assets/excellent.jpg';
import veryGoodImg from './assets/verygood.png';
import goodImg from './assets/good.jpg';
import niceImg from './assets/nice.png';
import decentImg from './assets/decent.png';
import fairImg from './assets/fair.png';
import needsImprovementImg from './assets/needsimprovement.png';
import workHarderImg from './assets/workharder.png';
import wakeUpCallImg from './assets/wakeupcall.png';

const gradeOptions = ["O", "A+", "A", "B+", "B", "C", "F", "AB", "I"];
const creditOptions = [1, 2, 3, 4, 5];

const App = () => {
  const [subjects, setSubjects] = useState(
    Array(6).fill().map(() => ({ credit: 1, grade: "O" }))
  );
  const [sgpa, setSgpa] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = field === 'credit' ? parseInt(value, 10) : value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { credit: 1, grade: "O" }]);
  };

  const removeSubject = (index) => {
    if (subjects.length > 6) {
      const updatedSubjects = [...subjects];
      updatedSubjects.splice(index, 1);
      setSubjects(updatedSubjects);
    }
  };

  const calculateGPA = async () => {
    try {
      const payloadSubjects = subjects.map(({ credit, grade }) => ({
        credits: Number(credit),
        grade: grade.toUpperCase(),
      }));

      const response = await axios.post('https://gradepro.onrender.com/api/', {
        subjects: payloadSubjects,
      });

      setSgpa(response.data.sgpa);
      setError('');
    } catch (err) {
      setSgpa(null);
      setError(err.response?.data?.error || 'An error occurred while calculating GPA.');
    }
  };

  const getGpaMessage = (gpa) => {
    if (gpa === 10) return "🔥 You didn’t just pass, you've set the standard!";
    if (gpa >= 9.5) return "💪 Nearly flawless — your brain’s doing push-ups, and it’s working!";
    if (gpa >= 9.0) return "😎 You’re rocking it! Solid work, keep riding that wave.";
    if (gpa >= 8.5) return "🎉 You're doing well—keep grinding, success loves consistency.";
    if (gpa >= 8.0) return "🐢 Slow and steady—you're getting there, keep it up!";
    if (gpa >= 7.5) return "🌱 Growing steadily—just needs a little more sunshine and water!";
    if (gpa >= 7.0) return "📚 Books are calling — answer them with a little more hustle!";
    if (gpa >= 6.5) return "🔧 Needs some tuning — but hey, the engine's running!";
    if (gpa >= 6.0) return "🧗‍♂️ Slipped a bit — but you're still on the wall. Climb on!";
    if (gpa >= 5.0) return "🧊 Ice is thin, but you’re still skating. Time to gear up!";
    return "You must take this seriously. It's a wake-up call!";
  };

  const getGpaImage = (gpa) => {
    if (gpa === 10) return perfect10Img;
    if (gpa >= 9.5) return outstandingImg;
    if (gpa >= 9.0) return excellentImg;
    if (gpa >= 8.5) return veryGoodImg;
    if (gpa >= 8.0) return goodImg;
    if (gpa >= 7.5) return niceImg;
    if (gpa >= 7.0) return decentImg;
    if (gpa >= 6.5) return fairImg;
    if (gpa >= 6.0) return needsImprovementImg;
    if (gpa >= 5.0) return workHarderImg;
    return wakeUpCallImg;
  };

  return (
    <div>
      <div className={`app-container ${sgpa !== null ? 'gpa-only' : ''}`}>
        {sgpa === null && <h1 className="title">SGPA Calculator</h1>}

        {sgpa !== null ? (
          <>
            <div className="gpa-result-section">
              <img
                src={getGpaImage(sgpa)}
                alt="GPA Illustration"
                className="gpa-image"
              />
              <div className="gpa-display">
                Your Grade Point Average - <span className="gpa-value">{sgpa}</span>
              </div>
              <div className="gpa-message">{getGpaMessage(sgpa)}</div>
            </div>

            <div className='center-button'>
              <button
                className="btn calculate-btn recalculate-btn"
                onClick={() => setSgpa(null)}
                style={{marginTop: '20px'}}
              >
                Calculate Again
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="card">
              <div className="table-wrapper">
                <table className="subject-table">
                  <thead>
                    <tr>
                      <th>Course No.</th>
                      <th>Subject Credits</th>
                      <th>Grade Achieved</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <select
                            className="input-credit"
                            value={subject.credit}
                            onChange={(e) => handleInputChange(index, 'credit', e.target.value)}
                          >
                            {creditOptions.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className="input-grade"
                            value={subject.grade}
                            onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
                          >
                            {gradeOptions.map((grade) => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          {subjects.length > 6 && (
                            <button className="remove-btn" onClick={() => removeSubject(index)}>
                              ✕
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="button-row">
              <button className="btn add-btn" onClick={addSubject}>
                Add Subject
              </button>
              <button className="btn calculate-btn" onClick={calculateGPA}>
                Calculate GPA
              </button>
            </div>

            {error && <div className="error">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
