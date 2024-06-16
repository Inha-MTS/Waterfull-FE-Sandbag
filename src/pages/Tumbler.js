import React, { useEffect } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const messages = {
  kr: {
    main: '안녕하세요 ',
    sub: '텀블러 인식을 시작할게요',
  },
  en: {
    main: 'Hi ',
    sub: 'Getting ready for Tumblr',
  },
  cn: {
    main: '你好 ',
    sub: '请准备好 Tumblr',
  },
};

function Tumbler() {
  const navigate = useNavigate();
  const query = useQuery();
  const name = query.get('name');
  const studentId = query.get('studentId');
  const lang = query.get('lang');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(
        '/tumbler-rek?name=' +
          name +
          '&studentId=' +
          studentId +
          '&lang=' +
          lang,
      );
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 제거
  }, [navigate, name, studentId, lang]);

  return (
    <div className="App">
      <header className="App-header">
        <MainText
          text={messages[lang]['main'] + name + (lang === 'kr' ? '님' : '')}
        />
        <SubText text={messages[lang]['sub']} />
      </header>
    </div>
  );
}

export default Tumbler;
