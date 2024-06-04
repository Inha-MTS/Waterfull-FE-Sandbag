// import './MainText.css';

import React, { useState } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import UserButton from '../component/UserButton';
import UserInput from '../component/UserInput';

const questions = [
  {
    mainText: '이름을 입력해주세요',
    subText: '리워드 지급을 위해서 꼭 본명을 입력해주세요',
    input: true,
  },
  {
    mainText: '학번을 입력해주세요',
    subText: '8자리의 학번을 입력해주세요',
    input: true,
  },
  {
    mainText: '학과를 입력해주세요',
    subText: '학과명을 줄이지 말고 입력해주세요',
    input: true,
  },
  {
    mainText: '얼굴을 등록하시겠어요?',
    subText: '얼굴을 등록하면 리워드를 받을 수 있습니다',
    input: false,
  },
];

function Register() {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <MainText text="이름을 입력해주세요" />
        <SubText text="리워드 지급을 위해서 꼭 본명을 입력해주세요" />
        <UserInput placeholder="김인덕" />
      </header>
    </div>
  );
}

export default Register;
