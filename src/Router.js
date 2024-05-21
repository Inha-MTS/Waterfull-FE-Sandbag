import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
