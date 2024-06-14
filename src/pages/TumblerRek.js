import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const apiURL = `${process.env.REACT_APP_BACKEND_URL}/bottles/category`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TumblerRek() {
  const navigate = useNavigate();
  const query = useQuery();
  const name = query.get('name');
  const studentId = query.get('studentId');
  const lang = query.get('lang');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });
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
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      const imageString = dataUrl.split(',')[1];

      try {
        const rawResponse = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageString }),
        });
        const response = await rawResponse.json();
        const {
          status,
          data: { category },
        } = response;
        if (status === 200 && category === 'tumbler') {
          return navigate(
            `/reward?name=${name}&studentId=${studentId}&lang=${lang}`,
          );
        } else if (status === 204 && category === 'tumbler') {
          alert('텀블러 사진 재촬영이 필요합니다'); // TODO: 건탁 - 팝업에서 다른 메세지로 바꾸기
          return navigate(
            `/tumbler-rek?name=${name}&studentId=${studentId}&lang=${lang}`,
          );
        }
        alert('텀블러를 사용하세요!');
        return navigate('/'); // Redirect to the home page temporarily
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      capturePhoto();
    }, 3000);

    return () => clearTimeout(timer);
  });

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} autoPlay playsInline />
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        width={640}
        height={480}
      />
    </div>
  );
}

export default TumblerRek;
