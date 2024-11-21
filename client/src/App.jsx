import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage.jsx';
import LoginRegister from './pages/loginRegister.jsx';
import AboutMe from './pages/aboutMe.jsx';
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
