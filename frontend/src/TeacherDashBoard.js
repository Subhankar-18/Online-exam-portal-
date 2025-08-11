import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TeacherDashboard() {
  const [teacherId, setTeacherId] = useState(501); // Replace with actual logged-in teacher's ID
  const [title, setTitle] = useState("");
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Fetch exams by teacher
  useEffect(() => {
    if (teacherId) {
      axios
        .get(`http://localhost:8081/api/teacher/exams/by-teacher/${teacherId}`)
        .then((res) => setExams(res.data))
        .catch((err) => console.error("Error fetching exams:", err));
    }
  }, [teacherId]);

  // Fetch questions when exam is selected
  useEffect(() => {
    if (selectedExamId) {
      axios
        .get(`http://localhost:8081/api/teacher/questions/by-exam/${selectedExamId}`)
        .then((res) => setQuestions(res.data))
        .catch((err) => console.error("Error fetching questions:", err));
    }
  }, [selectedExamId]);

  // Create exam
  const handleCreateExam = () => {
    axios
      .post("http://localhost:8081/api/teacher/exams/create", {
        teacherId,
        title,
      })
      .then((res) => {
        setExams([...exams, res.data]);
        setTitle("");
      })
      .catch((err) => console.error("Error creating exam:", err));
  };

  // Add question
  const handleAddQuestion = () => {
    axios
      .post("http://localhost:8081/api/teacher/questions/add", {
        examId: selectedExamId,
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
      })
      .then((res) => {
        setQuestions([...questions, res.data]);
        setQuestionText("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setCorrectAnswer("");
      })
      .catch((err) => console.error("Error adding question:", err));
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    // TODO: Implement logout functionality
  };

  const sidebarStyle = {
    backgroundColor: "#007FFF",
    minHeight: "100vh",
    padding: "1rem",
    color: "white"
  };

  const mainContentStyle = {
    backgroundColor: "#b3e5fc",
    minHeight: "100vh",
    padding: "2rem"
  };

  return (
    <div className="container-fluid">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000' }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white">Hello Teacher!</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="row g-0">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2" style={sidebarStyle}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-white" href="#create">Create Exam</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#view">View Exams</a>
            </li>
            {selectedExamId && (
              <li className="nav-item">
                <a className="nav-link text-white" href="#questions">Add Questions</a>
              </li>
            )}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10" style={mainContentStyle}>
          {/* Create Exam */}
          <section id="create" className="mb-5">
            <h2>Create Exam</h2>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Exam Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleCreateExam}>Create</button>
            </div>
          </section>

          {/* List Exams */}
          <section id="view" className="mb-5">
            <h2>Your Exams</h2>
            {exams.length === 0 ? (
              <p>No exams created yet.</p>
            ) : (
              <div className="list-group">
                {exams.map((exam) => (
                  <button
                    key={exam.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => setSelectedExamId(exam.id)}
                  >
                    {exam.title}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Questions for Selected Exam */}
          {selectedExamId && (
            <section id="questions">
              <h2>Questions for Exam ID: {selectedExamId}</h2>
              {questions.length === 0 ? (
                <p>No questions added yet.</p>
              ) : (
                <ul className="list-group mb-3">
                  {questions.map((q) => (
                    <li className="list-group-item" key={q.id}>
                      {q.questionText} <span className="badge bg-success">Correct: {q.correctAnswer}</span>
                    </li>
                  ))}
                </ul>
              )}

              <h3>Add Question</h3>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Question Text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Option A"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Option B"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Option C"
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Option D"
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Correct Answer"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAddQuestion}>Add Question</button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}