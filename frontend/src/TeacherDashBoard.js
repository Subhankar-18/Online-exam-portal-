import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherDashBoard() {
  const [activeSection, setActiveSection] = useState('add');

  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
  });

  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestions([...questions, formData]);
    setFormData({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
    });
  };

  // ✅ Sidebar in Azure Blue
  const sidebarStyle = {
    backgroundColor: '#007FFF', // Azure Blue
    minHeight: '100vh',
    padding: '1rem',
    color: 'white'
  };

  const containerStyle = {
    margin: '0',
    padding: '0'
  };

  const mainContentStyle = {
    backgroundColor: '#b3e5fc',
    minHeight: '100vh',
    padding: '2rem'
  };

  return (
    <div className="container-fluid" style={containerStyle}>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000' }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white">Hello Teacher!</span>
        </div>
      </nav>

      <div className="row g-0">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2" style={sidebarStyle}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => setActiveSection('add')}>
                Add Questions
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" onClick={() => setActiveSection('view')}>
                View Questions
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
          {activeSection === 'add' && (
            <>
              <h4>Add New Question</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Question</label>
                  <input
                    type="text"
                    className="form-control"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                  />
                </div>

                {['A', 'B', 'C', 'D'].map((opt) => (
                  <div className="mb-3" key={opt}>
                    <label>Option {opt}</label>
                    <input
                      type="text"
                      className="form-control"
                      name={`option${opt}`}
                      value={formData[`option${opt}`]}
                      onChange={handleChange}
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
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-info">
                  Add Question
                </button>
              </form>
            </>
          )}

          {activeSection === 'view' && (
            <>
              <h4>View Added Questions</h4>
              {questions.length === 0 ? (
                <p>No questions added yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Option A</th>
                        <th>Option B</th>
                        <th>Option C</th>
                        <th>Option D</th>
                        <th>Correct Answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((q, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
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
                </div>
              )}
            </>
          )}

          {activeSection === 'grades' && (
            <>
              <h4>Student Grades</h4>
              <p>This is a placeholder. Connect this to backend later.</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default TeacherDashBoard;
