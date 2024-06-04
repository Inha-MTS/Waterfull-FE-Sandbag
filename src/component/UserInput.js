import Form from 'react-bootstrap/Form';

function UserInput({ placeholder }) {
  return (
    <>
      <Form.Control
        type="text"
        id="userInput"
        placeholder={placeholder}
        style={{ marginLeft: '30px', width: '70%' }}
        size="lg"
      />
    </>
  );
}

export default UserInput;
