import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainPage from './pages/MainPage';
import LoginRegister from './pages/LoginRegister'
import AboutMe from './pages/AboutMe'
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {


  // const [user, setUser] = useState('');
  // useEffect(() => {
    
  // });

  const router = createBrowserRouter([
    {
      path: "/mainContent/:id",
      element: (
        <>
          <MainPage />
        </>
      ),
    },
    {
      path: "/",
      element: 
        <>
          <LoginRegister />
          <ToastContainer />
        </>
    },
    {
      path: "/aboutme",
      element: <AboutMe />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
}

export default App;
