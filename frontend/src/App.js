// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import TrainerLoginpage from './components/Trainer/TrainerLoginpage';
import ManagerLogin from './components/Manager/ManagerLogin';
import StudentLogin from './components/Student/StudentLogin';
import StudentDetails from './components/Student/StudentDetails';
import StudentAddTrainer from './components/Student/StudentAddTrainer';
import StudentViewTrainer from './components/Student/StudentViewTrainer';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/home-login" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/manager-login" element={<ManagerLogin/>} />
        
        <Route path="/Student-login" element={<StudentLogin />} />
   {/* <Route path="/Student-login" element={<BootstrapDropdown />
        <Route path="/Student-details" element={<StudentDetails />} />
         */}
        {/* <Route path="/Student-details" element={<StudentDetails/>} /> */}
        {/* <Route path="/trainer-dashboard" element={<TrainerDashboard />} /> */}
        <Route path="/trainer-login-page" element={<TrainerLoginpage />} />        
        <Route path="/student-add-trainer" element={<StudentAddTrainer/>} />
        <Route path="/Student-view-trainer" element={<StudentViewTrainer/>} />     
      </Routes>
    </Router>
  );
}

export default App;