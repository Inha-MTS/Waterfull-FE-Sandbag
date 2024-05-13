import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>반가워요</h1>
                <p>텀블러 사용을 시작하세요</p>
                <div className="buttons">
                <Link to="/login?how=face" className="button large">
                    <img src="icon-img/grinning.png" alt="얼굴로 인증하기"/>
                    <span className="text">얼굴로</span>
                </Link>
                <Link to="/login?how=card" className="button large">  {/* Changed to match the intended route */}
                    <img src="icon-img/credit_card.png" alt="학생증으로 인증하기" />
                    <span className="text">학생증으로</span>
                </Link>
                </div>
                <div className="buttons small">
                <button className="button round"><img src="icon-img/kr.png" alt="KR" className="lang-image" /></button>
                <button className="button round"><img src="icon-img/us.png" alt="EN" className="lang-image" /></button>
                <button className="button round"><img src="icon-img/cn.png" alt="CN" className="lang-image" /></button>
                </div>
            </header>
        </div>

    );
}

export default Home;

