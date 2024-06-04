import React, { useState, useEffect } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import { useNavigate } from 'react-router-dom';

function Tumbler() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <MainText text="텀블러 인식을 시작할게요" />
        <SubText text="텀블러를 준비해주세요" />
      </header>
    </div>
  );
}

export default Tumbler;
