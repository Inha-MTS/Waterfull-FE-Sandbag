import React, { useEffect } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Tumbler() {
  const navigate = useNavigate();
  const query = useQuery();
  const name = query.get('name');
  const studentId = query.get('studentId');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/tumbler-rek?name=' + name + '&studentId=' + studentId);
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 제거
  }, [navigate, name, studentId]);

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
