// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './style.css';
// // import gmailImg from './images/gmailImg.jpg';

// export default function Home() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     navigate('/home-login');
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(prev => !prev);
//     document.body.classList.toggle('dark-mode', !darkMode);
//   };

//   return (
    
//     <div className={`container py-5 ${darkMode ? 'dark-mode-container' : 'light-mode-container'}`}>
//         <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       {/* Header and Dark Mode Toggle */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1 className="flex-grow-1 text-center">Welcome to Learning Management System</h1>
//         <button className="btn btn-outline-dark ms-3" onClick={toggleDarkMode}>
//           {darkMode ? 'Light Mode' : 'Dark Mode'}
//         </button>
//       </div>

       

//       {/* Login/Logout Buttons */}
//       {/* <div className="text-end mb-3">
//         {!isLoggedIn ? (
//           <button className="btn btn-success me-2" onClick={handleLogin}>Login</button>
//         ) : (
//           <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//         )}
//       </div> */}

//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
          

//       {/* Login Cards Section */}
//       <div className="row">
//         {/* Manager */}
//         <div className="col-md-4 mb-4">
//           <div className="card h-100 text-center shadow">
//             <div className="card-body">
//               <h3 className="card-title">Manager</h3>
//               <p className="card-text">Manage platform users, settings, and dashboards.</p>
//               <Link to="/manager-login" className="btn btn-primary">Manager Login</Link>
//             </div>
//           </div>
//         </div>

//         {/* Trainer */}
//         <div className="col-md-4 mb-4">
//           <div className="card h-100 text-center shadow">
//             <div className="card-body">
//               <h3 className="card-title">Trainer</h3>
//               <p className="card-text">Handle courses, lessons, and evaluations.</p>
//               {/* new */}
//               <Link to="/trainer-login-page" className="btn btn-success">Trainer Login</Link>
//             </div>
//           </div>
//         </div>

//         {/* Student */}
//         <div className="col-md-4 mb-4">
//           <div className="card h-100 text-center shadow">
//             <div className="card-body">
//               <h3 className="card-title">Student</h3>
//               <p className="card-text">Join courses, track progress, and learn.</p>
//               <Link to="/student-login" className="btn btn-warning text-white">Student Login</Link>
//             </div>
//           </div>
//         </div>
//       </div>

   
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/home-login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className={`container py-5 ${darkMode ? 'dark-mode-container' : 'light-mode-container'}`}>
      <br /><br /><br /><br /><br />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="flex-grow-1 text-center">Welcome to Learning Management System</h1>
        <button className="btn btn-outline-dark ms-3" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <br /><br /><br /><br />
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center shadow">
            <div className="card-body">
              <h3 className="card-title">Manager</h3>
              <p className="card-text">Manage platform users, settings, and dashboards.</p>
              <Link to="/manager-login" className="btn btn-primary">Manager Login</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center shadow">
            <div className="card-body">
              <h3 className="card-title">Trainer</h3>
              <p className="card-text">Handle courses, lessons, and evaluations.</p>
              <Link to="/trainer-login-page" className="btn btn-success">Trainer Login</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center shadow">
            <div className="card-body">
              <h3 className="card-title">Student</h3>
              <p className="card-text">Join courses, track progress, and learn.</p>
              <Link to="/student-login" className="btn btn-warning text-white">Student Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}