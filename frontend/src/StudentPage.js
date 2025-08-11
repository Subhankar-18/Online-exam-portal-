import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentPage() {
const [studentsByCourse, setStudentsByCourse] = useState({});
const [newStudent, setNewStudent] = useState({ name: '', email: '', course: '' });
const [editMode, setEditMode] = useState({});

const fetchStudents = async () => {
    const res = await axios.get('http://localhost:8081/api/students/by-course');
    setStudentsByCourse(res.data);
};

useEffect(() => {
    fetchStudents();
}, []);

const handleAddStudent = async (course) => {
    if (!newStudent.name || !newStudent.email) return;

    const payload = {
    name: newStudent.name,
    email: newStudent.email,
    course: course
    };

    await axios.post('http://localhost:8081/api/students', payload);
    fetchStudents(); // refresh
    setNewStudent({ name: '', email: '', course: '' });
};

    const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8081/api/students/${id}`);
    fetchStudents();
};

    const handleUpdate = async (id, updatedStudent) => {
    await axios.put(`http://localhost:8081/api/students/${id}`, updatedStudent);
    fetchStudents();
    setEditMode({});
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
                            handleUpdate(stu.id, {
                              name: stu.editName || stu.name,
                              email: stu.editEmail || stu.email,
                              course: course
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
                          onClick={() => handleDelete(stu.id)}
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
            <div className="col-md-4">
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
            <div className="col-md-4">
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