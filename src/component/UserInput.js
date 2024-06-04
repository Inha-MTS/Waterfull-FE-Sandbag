import Form from 'react-bootstrap/Form';

function UserInput({ placeholder }) {
  return (
    <>
      <Form.Control
        type="text"
        id="userInput"
        aria-describedby="passwordHelpBlock"
        placeholder={placeholder}
        style={{ marginLeft: '30px', width: '70%' }}
      />
    </>
  );
}

export default UserInput;
