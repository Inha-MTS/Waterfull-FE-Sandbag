import React, { useState, useEffect } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import { useNavigate, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Demo = () => {
  return <Confetti width={600} height={1024} />;
};

const messages = {
  kr: {
    main: '리워드가 지급되었습니다!',
    sub: '텀블러 사용에 동참해주셔서 진심으로 감사합니다.',
    status: '님의 마일리지:',
  },
  en: {
    main: 'Your reward has been paid!',
    sub: 'Thank you so much for joining us on Tumblr.',
    status: "'s mileage:",
  },
  cn: {
    main: '您的奖励已经支付！',
    sub: '非常感谢你加入我们的 Tumblr 节目。',
    status: '您的里程数:',
  },
};

function Reward() {
  const [progress, setProgress] = useState(0);
  const [reward, setReward] = useState(100);
  const navigate = useNavigate();
  const query = useQuery();
  const name = query.get('name');
  const studentId = query.get('studentId');
  const lang = query.get('lang') || 'kr';

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            navigate('/?lang=kr'); // progress가 100이 되면 /home 페이지로 이동
            return 100;
          }
          return Math.min(oldProgress + 10, 100); // 5초 동안 100까지 증가하려면 0.2초마다 20씩 증가
        });
      }, 125); // 0.2초마다 실행

      return () => {
        clearInterval(timer);
      };
    }, 5000); // 3초 후에 시작

    return () => {
      clearTimeout(delayTimer);
    };
  }, [navigate]);

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const response = await axios.patch(
          `${process.env.BACKEND_URL}/users/${studentId}/point`,
        );
        setReward(response.data.point);
      } catch (error) {
        console.error('Failed to fetch reward:', error);
      }
    };

    fetchReward();
  }, [studentId]);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Demo />
          <MainText text={messages[lang]['main']} />
          <SubText text={messages[lang]['sub']} />
          <div style={{ display: 'block', marginTop: '200px' }}></div>
          <SubText text={`${name} ${messages[lang]['status']} ${reward}`} />
        </header>
      </div>
    </>
  );
}

export default Reward;
