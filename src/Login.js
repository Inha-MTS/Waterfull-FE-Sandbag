import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

function Login() {
  const videoRef = useRef(null);
  const [searchParams] = useSearchParams();
  const how = searchParams.get('how'); // 'face' or 'card'

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    }

    enableStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
      {how === 'face' && <img src="guide-img/face-guide.png" style={{ position: 'absolute', top: 0, left: 0, width: '640px', height: '480px' }} alt="Face Guide" />}
      {how === 'card' && <img src="guide-img/card-guide.png" style={{ position: 'absolute', top: 0, left: 0, width: '640px', height: '480px' }} alt="Card Guide" />}
    </div>
  );
}

export default Login;
