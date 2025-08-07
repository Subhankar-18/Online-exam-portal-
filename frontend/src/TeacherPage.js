import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherPage() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8081/api/teachers')
      .then(res => setTeachers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddTeacher = () => {
    axios.post('http://localhost:8081/api/teachers', newTeacher)
      .then(res => {
        const updatedList = [...teachers, res.data];
        setTeachers(updatedList);
        setNewTeacher({ name: '', email: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/api/teachers/${id}`)
      .then(() => {
        const updatedList = teachers.filter(t => t.id !== id);
        setTeachers(updatedList);
      })
      .catch(err => console.error(err));
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:8081/api/teachers/${id}`, editData)
      .then(res => {
        const updatedList = teachers.map(t => t.id === id ? res.data : t);
        setTeachers(updatedList);
        setEditMode(null);
        setEditData({});
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f3e8ff" }}>
      <h2 className="mb-4 p-2" style={{ backgroundColor: "#4c1d95", color: "#fff" }}>
        Teacher Details
      </h2>

      <div className="mb-5 p-3 border rounded bg-white">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t.id}>
                {editMode === t.id ? (
                  <>
                    <td>{t.id}</td>
                    <td>
                      <input type="text" defaultValue={t.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                    </td>
                    <td>
                      <input type="email" defaultValue={t.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                    </td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(t.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => { setEditMode(t.id); setEditData(t); }}>Update</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Teacher */}
      <div className="p-3 border bg-white mt-4 rounded">
        <h5 className="mb-3">Add New Teacher</h5>
        <div className="row g-2">
          <div className="col-md-4">
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
          <div className="col-md-4">
            <button className="btn btn-success w-100" onClick={handleAddTeacher}>
              Add Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherPage;