import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function UserButton({firstText, firstOnClick, secondText, secondOnClick}) {
  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Button variant="primary" size="lg" onClick={firstOnClick} style={{height: '100px', fontSize: '50px'}}>{firstText}</Button>
      <div style={{display: 'block', marginTop: '40px'}}></div>
      <Button variant="success" size="lg" onClick={secondOnClick} style={{height: '100px', fontSize: '50px'}}>{secondText}</Button>
    </Stack>
  );
}

export default UserButton;