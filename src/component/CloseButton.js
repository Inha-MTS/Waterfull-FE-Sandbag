import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate, useLocation } from 'react-router-dom';

function Close() {
  const navigate = useNavigate();
  return (
    <CloseButton
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '40px',
        height: '40px',
      }}
      onClick={() => {
        navigate('/');
      }}
    />
  );
}

export default Close;
