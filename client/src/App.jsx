import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginRegister from './pages/LoginRegister';
import AboutMe from './pages/AboutMe';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/mainContent/:id" element={<MainPage />} />
        <Route path="/" element={<LoginRegister />} />
        <Route path="/aboutme" element={<AboutMe />} />
      </Routes>
    </Router>
  );
}

export default App;
