import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function StudentDashboard() {
  const studentId = 301; 
  const exam_id = 12; 
  const backendURL = "http://localhost:8081/api/student/exams";
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("view");
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (activeSection === "view" && !selectedExam) {
      axios
        .get(`${backendURL}/${exam_id}/questions`)
        .then(res => {
          setSelectedExam({
            id: exam_id,
            title: `Exam ${exam_id}`,
            questions: res.data
          });
          setAnswers({});
        })
        .catch(err => console.error("Error fetching questions:", err));
    }
  }, [activeSection, selectedExam]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmitExam = () => {
    const payload = {
      studentId,
      examId: selectedExam.id,
      answers: selectedExam.questions.map(q => ({
        questionId: q.id,
        answer: answers[q.id] || ""
      }))
    };

    axios
      .post(`${backendURL}/submit`, payload)
      .then(res => {
        alert(`Exam submitted! You scored ${res.data.score}/${res.data.totalQuestions}`);

      })
      .catch(err => console.error("Error submitting exam:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/");
  };

  const sidebarStyle = {
    backgroundColor: "#FF1493",
    minHeight: "100vh",
    padding: "1rem",
    color: "white"
  };

  const mainContentStyle = {
    backgroundColor: "#FFC0CB",
    minHeight: "100vh",
    padding: "2rem"
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000' }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white">Hello Student!</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="row g-0">
        <nav className="col-md-3 col-lg-2" style={sidebarStyle}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => setActiveSection("view")}
              >
                View Exam
              </button>
            </li>
          </ul>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10" style={mainContentStyle}>
          {activeSection === "view" && selectedExam && (
            <>
              <h4>{selectedExam.title}</h4>
              {selectedExam.questions.map((q, idx) => (
                <div key={q.id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{idx + 1}. {q.questionText}</h5>
                    {["A", "B", "C", "D"].map(opt => (
                      <div key={opt} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${q.id}`}
                          id={`q${q.id}-${opt}`}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => handleAnswerChange(q.id, opt)}
                        />
                        <label className="form-check-label" htmlFor={`q${q.id}-${opt}`}>
                          {q[`option${opt}`]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn btn-success" onClick={handleSubmitExam}>Submit Exam</button>
            </>
          )}
        </main>
      </div>
    </div>
  );
}