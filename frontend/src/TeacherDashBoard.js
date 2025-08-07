import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherDashBoard() {
  const [activeSection, setActiveSection] = useState('create');
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);

  const [examName, setExamName] = useState('');
  const [questionForm, setQuestionForm] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  });

  const [selectedExamView, setSelectedExamView] = useState(null);

  const handleCreateExam = (e) => {
    e.preventDefault();
    const trimmedName = examName.trim();
    if (!trimmedName) return;
    const examExists = exams.some(exam => exam.examName === trimmedName);
    if (examExists) {
      alert('Exam already exists!');
      return;
    }
    setCurrentExam({ examName: trimmedName, questions: [] });
    setExamName('');
  };

  const handleQuestionChange = (e) => {
    setQuestionForm({ ...questionForm, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const updatedExam = {
      ...currentExam,
      questions: [...currentExam.questions, questionForm]
    };
    setCurrentExam(updatedExam);
    setQuestionForm({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: ''
    });
  };

  const handleEndExam = () => {
    setExams([...exams, currentExam]);
    setCurrentExam(null); // Reset to add another exam
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    // Add redirect logic if needed
  };

  const sidebarStyle = {
    backgroundColor: '#007FFF',
    minHeight: '100vh',
    padding: '1rem',
    color: 'white'
  };

  const mainContentStyle = {
    backgroundColor: '#b3e5fc',
    minHeight: '100vh',
    padding: '2rem'
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
              <button className="nav-link btn btn-link text-white" onClick={() => setActiveSection('create')}>
                Create Exam
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => setActiveSection('view')}>
                View Exams
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => setActiveSection('grades')}>
                View Grades
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10" style={mainContentStyle}>
          {activeSection === 'create' && (
            <>
              {!currentExam ? (
                <>
                  <h4>Add Exam</h4>
                  <form onSubmit={handleCreateExam}>
                    <div className="mb-3">
                      <label>Exam Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Exam</button>
                  </form>
                </>
              ) : (
                <>
                  <h4>Exam: {currentExam.examName}</h4>
                  <form onSubmit={handleAddQuestion}>
                    <div className="mb-3">
                      <label>Question</label>
                      <input
                        type="text"
                        className="form-control"
                        name="question"
                        value={questionForm.question}
                        onChange={handleQuestionChange}
                        required
                      />
                    </div>

                    {['A', 'B', 'C', 'D'].map(opt => (
                      <div className="mb-3" key={opt}>
                        <label>Option {opt}</label>
                        <input
                          type="text"
                          className="form-control"
                          name={`option${opt}`}
                          value={questionForm[`option${opt}`]}
                          onChange={handleQuestionChange}
                          required
                        />
                      </div>
                    ))}

                    <div className="mb-3">
                      <label>Correct Answer</label>
                      <input
                        type="text"
                        className="form-control"
                        name="correctAnswer"
                        value={questionForm.correctAnswer}
                        onChange={handleQuestionChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-success me-2">Add Question</button>
                    <button type="button" className="btn btn-warning" onClick={handleEndExam}>
                      End Exam
                    </button>
                  </form>

                  <hr />
                  <h5>Questions Added</h5>
                  {currentExam.questions.length === 0 ? (
                    <p>No questions added yet.</p>
                  ) : (
                    <ul className="list-group">
                      {currentExam.questions.map((q, i) => (
                        <li className="list-group-item" key={i}>
                          {i + 1}. {q.question}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </>
          )}

          {activeSection === 'view' && (
            <>
              <h4>View Exams</h4>
              {exams.length === 0 ? (
                <p>No exams created yet.</p>
              ) : (
                <div className="list-group mb-4">
                  {exams.map((exam, index) => (
                    <button
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => setSelectedExamView(exam)}
                    >
                      {exam.examName}
                    </button>
                  ))}
                </div>
              )}

              {selectedExamView && (
                <>
                  <h5>Questions in "{selectedExamView.examName}"</h5>
                  {selectedExamView.questions.length === 0 ? (
                    <p>No questions added for this exam.</p>
                  ) : (
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Question</th>
                          <th>Option A</th>
                          <th>Option B</th>
                          <th>Option C</th>
                          <th>Option D</th>
                          <th>Correct</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedExamView.questions.map((q, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{q.question}</td>
                            <td>{q.optionA}</td>
                            <td>{q.optionB}</td>
                            <td>{q.optionC}</td>
                            <td>{q.optionD}</td>
                            <td>{q.correctAnswer}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </>
          )}

          {activeSection === 'grades' && (
            <>
              <h4>Student Grades</h4>
              <p>This is a placeholder. Connect this to the backend later.</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default TeacherDashBoard;
