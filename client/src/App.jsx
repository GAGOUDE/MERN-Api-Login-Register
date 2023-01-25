import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./style.scss";
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModContext';
// Toastify for errors
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Pages
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={8000} />
    </div>
  );
}

export default App;