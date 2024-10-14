import './components/css/main.css';
import Navbar from "./components/common/navbar";
import Home from "./components/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './contexts/authContext';
import { useContext } from 'react';
import "./App.css";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {auth.user ?
          <>
          <Route path="/" element={<Home />} />
          </>
          :
          <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          </>
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
