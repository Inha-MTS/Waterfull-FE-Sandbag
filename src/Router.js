import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserButton from './component/UserButton';
import Register from './pages/Register';
import LoginCard from './pages/LoginCard';
import Tumbler from './pages/Tumbler';
import TumblerRek from './pages/TumblerRek';
import Reward from './pages/Reward';
import RegisterFace from './pages/RegisterFace';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-card" element={<LoginCard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tumbler" element={<Tumbler />} />
      <Route path="/tumbler-rek" element={<TumblerRek />} />
      <Route path="/reward" element={<Reward />} />
      <Route path="/register-face" element={<RegisterFace />} />
    </Routes>
  );
};

export default Router;
