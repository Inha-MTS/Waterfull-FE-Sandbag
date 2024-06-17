import MainText from '../component/MainText';
import SubText from '../component/SubText';
import UserButton from '../component/UserButton';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const messages = {
  kr: {
    welcome: '반가워요',
    login: '어떤 방법으로 로그인 하시겠어요?',
    face: '얼굴 인식',
    card: '학생증 바코드 인식',
    register: '회원가입',
  },
  en: {
    welcome: 'Welcome',
    login: 'How would you like to log in?',
    face: 'Face Recognition',
    card: 'Student card',
    register: 'Register',
  },
  cn: {
    welcome: '欢迎',
    login: '您想如何登录？',
    face: '用你的脸',
    card: '使用您的学生证',
    register: '注册',
  },
};

function Home() {
  const navigate = useNavigate();
  const query = useQuery();
  const lang = query.get('lang') || 'kr';
  const code = query.get('code') || '0';
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (code !== '0') {
      // 뭔가 보여줘야 함
      if (code === '1') {
        setMessage('얼굴 인식에 실패하였습니다. 다시 시도해주세요.');
        console.log(message);
      } else if (code === '2') {
        setMessage('텀블러 인식에 실패하였습니다. 다시 시도해주세요.');
      }
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 8000); // 10초 후에 showAlert를 false로 설정하여 Alert를 숨깁니다.

      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    }
  }, [message]); // message 상태가 변경될 때마다 이 useEffect가 실행됩니다.

  return (
    <div className="App">
      {showAlert && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <Alert variant="danger">{message}</Alert>
        </div>
      )}
      <header className="App-header">
        <MainText text={messages[lang]['welcome']} />
        <SubText text={messages[lang]['login']} />
        <div className="buttons">
          <Stack gap={2} className="col-md-5 mx-auto">
            <UserButton
              text={messages[lang]['face']}
              onClick={() => {
                navigate('/login?lang=' + lang);
              }}
            />
            <div style={{ display: 'block', marginTop: '30px' }}></div>
            <UserButton
              text={messages[lang]['card']}
              onClick={() => {
                navigate('/login-card?lang=' + lang);
              }}
              variant="success"
            />
            <div style={{ display: 'block', marginTop: '30px' }}></div>
            <UserButton
              text={messages[lang]['register']}
              onClick={() => {
                navigate('/register?lang=' + lang);
              }}
              variant="secondary"
            />
          </Stack>
        </div>
        <div className="buttons small">
          <button
            className="button round"
            onClick={() => {
              navigate('/?lang=kr');
            }}
          >
            <img src="icon-img/kr.png" alt="KR" className="lang-image" />
          </button>
          <button
            className="button round"
            onClick={() => {
              navigate('/?lang=en');
            }}
          >
            <img src="icon-img/us.png" alt="EN" className="lang-image" />
          </button>
          <button
            className="button round"
            onClick={() => {
              navigate('/?lang=cn');
            }}
          >
            <img src="icon-img/cn.png" alt="CN" className="lang-image" />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
