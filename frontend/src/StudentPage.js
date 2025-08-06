import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialData = {
  "Math": [
    { id: 1, name: "Alice", email: "alice@example.com" },
  ],
  "Science": [
    { id: 2, name: "Bob", email: "bob@example.com" },
  ]
};

function StudentPage() {
  const [studentsByCourse, setStudentsByCourse] = useState(initialData);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', id: '' });
  const [editMode, setEditMode] = useState({}); // { course: id }

  const handleAddStudent = (course) => {
    if (!newStudent.name || !newStudent.email || !newStudent.id) return;

    const updated = { ...studentsByCourse };
    updated[course].push({
      id: newStudent.id,
      name: newStudent.name,
      email: newStudent.email,
    });

    setStudentsByCourse(updated);
    setNewStudent({ name: '', email: '', id: '' });
  };

  const handleDelete = (course, id) => {
    const updated = { ...studentsByCourse };
    updated[course] = updated[course].filter(student => student.id !== id);
    setStudentsByCourse(updated);
  };

  const handleUpdate = (course, id, updatedStudent) => {
    const updated = { ...studentsByCourse };
    updated[course] = updated[course].map(student =>
      student.id === id ? { ...student, ...updatedStudent } : student
    );
    setStudentsByCourse(updated);
    setEditMode({}); // exit edit mode
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f3e8ff" }}>
      <h2 className="mb-4 p-2" style={{ backgroundColor: "#6b21a8", color: "#fff" }}>
        Student Details
      </h2>

      {Object.entries(studentsByCourse).map(([course, students]) => (
        <div key={course} className="mb-5 p-3 border rounded bg-white">
          <h4 style={{ color: "#9333ea" }}>{course}</h4>
          
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.id}>
                  <td>{stu.id}</td>
                  {editMode[course] === stu.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={stu.name}
                          onChange={(e) => stu.editName = e.target.value}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue={stu.email}
                          onChange={(e) => stu.editEmail = e.target.value}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleUpdate(course, stu.id, {
                              name: stu.editName || stu.name,
                              email: stu.editEmail || stu.email
                            })
                          }
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditMode({})}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{stu.name}</td>
                      <td>{stu.email}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => setEditMode({ [course]: stu.id })}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(course, stu.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Student Form for this Course */}
          <div className="row g-2 mt-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="ID"
                name="id"
                value={newStudent.id}
                onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={() => handleAddStudent(course)}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentPage;
