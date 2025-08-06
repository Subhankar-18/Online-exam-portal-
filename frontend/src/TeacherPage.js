import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialTeachers = {
  "Computer Science": [
    { id: 1, name: "Dr. Sharma", email: "sharma@univ.edu" },
  ],
  "Mathematics": [
    { id: 2, name: "Prof. Iyer", email: "iyer@univ.edu" },
  ]
};

function TeacherPage() {
  const [teachersByDept, setTeachersByDept] = useState(initialTeachers);
  const [newTeacher, setNewTeacher] = useState({ id: '', name: '', email: '' });
  const [editMode, setEditMode] = useState({}); // { dept: id }

  const handleAddTeacher = (dept) => {
    if (!newTeacher.id || !newTeacher.name || !newTeacher.email) return;

    const updated = { ...teachersByDept };
    updated[dept].push({ ...newTeacher });
    setTeachersByDept(updated);
    setNewTeacher({ id: '', name: '', email: '' });
  };

  const handleDelete = (dept, id) => {
    const updated = { ...teachersByDept };
    updated[dept] = updated[dept].filter(teacher => teacher.id !== id);
    setTeachersByDept(updated);
  };

  const handleUpdate = (dept, id, updatedData) => {
    const updated = { ...teachersByDept };
    updated[dept] = updated[dept].map(teacher =>
      teacher.id === id ? { ...teacher, ...updatedData } : teacher
    );
    setTeachersByDept(updated);
    setEditMode({});
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f3e8ff" }}>
      <h2 className="mb-4 p-2" style={{ backgroundColor: "#4c1d95", color: "#fff" }}>
        Teacher Details
      </h2>

      {Object.entries(teachersByDept).map(([dept, teachers]) => (
        <div key={dept} className="mb-5 p-3 border rounded bg-white">
          <h4 style={{ color: "#9333ea" }}>{dept}</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  {editMode[dept] === t.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={t.name}
                          onChange={(e) => t.editName = e.target.value}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          className="form-control"
                          defaultValue={t.email}
                          onChange={(e) => t.editEmail = e.target.value}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleUpdate(dept, t.id, {
                              name: t.editName || t.name,
                              email: t.editEmail || t.email
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
                      <td>{t.name}</td>
                      <td>{t.email}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => setEditMode({ [dept]: t.id })}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(dept, t.id)}
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

          {/* Add Teacher Form */}
          <div className="row g-2 mt-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="ID"
                value={newTeacher.id}
                onChange={(e) => setNewTeacher({ ...newTeacher, id: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={() => handleAddTeacher(dept)}
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeacherPage;
