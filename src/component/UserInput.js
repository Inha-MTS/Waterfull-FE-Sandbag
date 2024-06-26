import Form from 'react-bootstrap/Form';

function UserInput({ placeholder, onChange }) {
  return (
    <>
      <Form.Control
        type="text"
        id="userInput"
        placeholder={placeholder}
        style={{
          height: '100px',
          width: '80%',
          marginLeft: '10%',
          marginTop: '10%',
        }}
        size="lg"
        onChange={onChange}
      />
    </>
  );
}

export default UserInput;
