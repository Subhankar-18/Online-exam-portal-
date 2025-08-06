import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const sidebarStyle = {
    backgroundColor: '#20c997',
    minHeight: '100vh',
    padding: '1rem',
    color: 'white'
  };

  const containerStyle = {
    margin: '0',
    padding: '0'
  };

  return (
    <div className="container-fluid" style={containerStyle}>
      {/* Header Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000' }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white">Hello Admin!</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => navigate('/')}>Dashboard</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => navigate('/courses')}>Courses</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => navigate('/users')}>Users</button>
              </li>
            </ul>
            <button className="btn btn-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="row g-0">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2" style={sidebarStyle}>
          <ul className="nav flex-column">
            <li className="nav-item"><button className="nav-link btn btn-link text-white" onClick={() => navigate('/')}>Dashboard</button></li>
            <li className="nav-item"><button className="nav-link btn btn-link text-white" onClick={() => navigate('/users')}>Manage Users</button></li>
            <li className="nav-item"><button className="nav-link btn btn-link text-white" onClick={() => navigate('/courses')}>Courses</button></li>
            <li className="nav-item"><button className="nav-link btn btn-link text-white" onClick={() => navigate('/reports')}>Reports</button></li>
            <li className="nav-item"><button className="nav-link btn btn-link text-white" onClick={() => navigate('/settings')}>Settings</button></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4 py-3" style={{ backgroundColor: '#d2f4ea' }}>
          <h4>Welcome, Admin!</h4>
          <p>This is your dashboard overview.</p>

          <div className="row">
            {/* Students Card */}
            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5 className="card-title">Students</h5>
                <p className="card-text">View and manage registered students and their progress.</p>
                <button className="btn btn-primary" onClick={() => navigate('/students')}>Manage Students</button>
              </div>
            </div>

            {/* Teachers Card */}
            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5 className="card-title">Teachers</h5>
                <p className="card-text">Manage teacher profiles, schedules, and responsibilities.</p>
                <button className="btn btn-primary" onClick={() => navigate('/teachers')}>Manage Teachers</button>
              </div>
            </div>

            {/* Courses Card */}
            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5 className="card-title">Courses</h5>
                <p className="card-text">Add, update, or remove courses available on the platform.</p>
                <button className="btn btn-primary" onClick={() => navigate('/courses')}>Manage Courses</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
