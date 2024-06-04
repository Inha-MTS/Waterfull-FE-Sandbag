import MainText from '../component/MainText';
import SubText from '../component/SubText';
import UserButton from '../component/UserButton';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <MainText text="반가워요" />
        <SubText text="어떤 방법으로 로그인 하시겠어요?" />
        <div className="buttons">
          <UserButton
            firstText="얼굴로"
            firstOnClick={() => {
              navigate('/login?how=face');
            }}
            secondText="학생증으로"
            secondOnClick={() => {
              navigate('/login?how=card');
            }}
          />
        </div>
        <div className="buttons small">
          <button className="button round">
            <img src="icon-img/kr.png" alt="KR" className="lang-image" />
          </button>
          <button className="button round">
            <img src="icon-img/us.png" alt="EN" className="lang-image" />
          </button>
          <button className="button round">
            <img src="icon-img/cn.png" alt="CN" className="lang-image" />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
