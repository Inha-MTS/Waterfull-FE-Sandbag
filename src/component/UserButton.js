import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function UserButton({ text, onClick, variant }) {
  return (
    <Button
      variant={variant}
      size="lg"
      onClick={onClick}
      style={{ height: '100px', fontSize: '50px' }}
    >
      {text}
    </Button>
  );
}

export default UserButton;
