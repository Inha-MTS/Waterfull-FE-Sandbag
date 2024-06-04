// import './MainText.css';

import MainText from '../component/MainText';
import UserButton from '../component/UserButton';

function Register() {
  return (
    <div>
      <MainText text="이름을 입력해주세요" />

      <UserButton
        buttonText="회원가입"
        outlineColor="black"
        onClick={() => {
          alert('회원가입');
        }}
      />
    </div>
  );
}

export default Register;
