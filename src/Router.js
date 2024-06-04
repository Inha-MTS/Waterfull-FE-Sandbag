import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserButton from './component/UserButton';
import Register from './pages/Register';
import LoginCard from './pages/LoginCard';
import Tumbler from './pages/Tumbler';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tumbler" element={<Tumbler />} />
      <Route path="/test-page" element={<LoginCard />} />
    </Routes>
  );
};

export default Router;
