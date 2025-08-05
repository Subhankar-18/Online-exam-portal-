import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // ✅ use navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
        role
      });

      console.log('Login successful:', response.data);
      

      // ✅ Navigate based on role
      if (role === 'ADMIN') {
        navigate('/admin');
      } 
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-info vh-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '100%', maxWidth: '400px', borderRadius: '10px' }}
      >
        <h2 className="text-white text-center mb-4">Login</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="name@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label text-white">Password</label>
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelpBlock"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div id="passwordHelpBlock" className="form-text text-light">
            Your password must be 8–20 characters, contain letters and numbers, and no special characters.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label text-white">Select Role</label>
          <select className="form-select" id="role"
            value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Open this select menu </option>
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button className="btn btn-light w-100 mt-3" type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
