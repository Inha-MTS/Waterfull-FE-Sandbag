import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './Login';
import UserButton from './component/UserButton';
import Register from './pages/Register';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/test-page"
        element={
          <UserButton
            buttonText="테스트"
            outlineColor="black"
            onClick={() => {
              alert('test');
            }}
          />
        }
      />
    </Routes>
  );
};

export default Router;
