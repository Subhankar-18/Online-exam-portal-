import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentDashboard() {
  const studentId = 102; // Replace with actual logged-in student ID
  const exam_id = 1;
  const backendURL = "http://localhost:8081/api/student/exams";

  const [activeSection, setActiveSection] = useState("view");
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [marks, setMarks] = useState([]);

  // Fetch all available exams for the student
  useEffect(() => {
    if (activeSection === "view") {
      axios
        .get(`${backendURL}/${exam_id}`)
        .then(res => setExams(res.data))
        .catch(err => console.error("Error fetching exams:", err));
    }
  }, [activeSection]);

  // Fetch marks for the student
  useEffect(() => {
    if (activeSection === "marks") {
      axios
        .get(`${backendURL}/marks/${exam_id}`)
        .then(res => setMarks(res.data))
        .catch(err => console.error("Error fetching marks:", err));
    }
  }, [activeSection]);

  // Handle selecting an exam
  const handleSelectExam = (exam) => {
    axios
      .get(`${backendURL}/questions/${exam_id}`)
      .then(res => {
        setSelectedExam({ ...exam, questions: res.data });
        setAnswers({});
      })
      .catch(err => console.error("Error fetching questions:", err));
  };

  // Handle selecting an answer
  const handleAnswerChange = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  // Submit exam
  const handleSubmitExam = () => {
    const payload = {
      studentId,
      examId: selectedExam.id,
      answers
    };
    axios
      .post(`${backendURL}/submit`, payload)
      .then(() => {
        alert("Exam submitted successfully!");
        setSelectedExam(null);
        setActiveSection("view");
      })
      .catch(err => console.error("Error submitting exam:", err));
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    // TODO: Implement actual logout
  };

  const sidebarStyle = {
    backgroundColor: "#FF1493", // Neon pink
    minHeight: "100vh",
    padding: "1rem",
    color: "white"
  };

  const mainContentStyle = {
    backgroundColor: "#FFC0CB", // Baby pink
    minHeight: "100vh",
    padding: "2rem"
  };

  return (
    <div className="container-fluid">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000' }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white">Hello Student!</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="row g-0">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2" style={sidebarStyle}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => {
                  setActiveSection("view");
                  setSelectedExam(null);
                }}
              >
                View Exams
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-white"
                onClick={() => {
                  setActiveSection("marks");
                  setSelectedExam(null);
                }}
              >
                View Marks
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10" style={mainContentStyle}>
          {activeSection === "view" && !selectedExam && (
            <>
              <h4>Available Exams</h4>
              {/* Corrected: Added a check for Array.isArray(exams) */}
              {Array.isArray(exams) && exams.length > 0 ? (
                <div className="list-group">
                  {exams.map((exam, index) => (
                    <button
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelectExam(exam)}
                    >
                      {exam.title}
                    </button>
                  ))}
                </div>
              ) : (
                <p>No exams available right now.</p>
              )}
            </>
          )}

          {activeSection === "view" && selectedExam && (
            <>
              <h4>{selectedExam.title}</h4>
              {selectedExam.questions.map((q, idx) => (
                <div key={q.id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      {idx + 1}. {q.questionText}
                    </h5>
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
              <button className="btn btn-success" onClick={handleSubmitExam}>
                Submit Exam
              </button>
            </>
          )}

          {activeSection === "marks" && (
            <>
              <h4>Your Marks</h4>
              {/* Corrected: Added a check for Array.isArray(marks) */}
              {Array.isArray(marks) && marks.length > 0 ? (
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Exam</th>
                      <th>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((m, idx) => (
                      <tr key={idx}>
                        <td>{m.examTitle}</td>
                        <td>{m.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No marks available yet.</p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}