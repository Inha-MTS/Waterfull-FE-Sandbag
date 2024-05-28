import './UserButton.css';

function UserButton({ buttonText, outlineColor, onClick }) {
  return (
    <div 
      className="user-button" 
      onClick={onClick}
      style={{ border: `1px solid ${outlineColor}` }}
    >
      {buttonText}
    </div>
  );
}

export default UserButton;