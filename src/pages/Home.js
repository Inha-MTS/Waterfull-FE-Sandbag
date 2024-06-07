import MainText from '../component/MainText';
import SubText from '../component/SubText';
import UserButton from '../component/UserButton';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const messages = {
  kr: {
    welcome: '반가워요',
    login: '어떤 방법으로 로그인 하시겠어요?',
    face: '얼굴로',
    card: '학생증 바코드로',
  },
  en: {
    welcome: 'Welcome',
    login: 'How would you like to log in?',
    face: 'Face',
    card: 'Student card',
  },
  cn: {
    welcome: '欢迎',
    login: '您想如何登录？',
    face: '用你的脸',
    card: '使用您的学生证',
  },
};

function Home() {
  const navigate = useNavigate();
  const query = useQuery();
  const lang = query.get('lang');
  return (
    <div className="App">
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
