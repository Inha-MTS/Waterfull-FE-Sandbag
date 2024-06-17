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
  const captureCanvasRef = useRef(null);
  const guideCanvasRef = useRef(null);

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

  useEffect(() => {
    if (guideCanvasRef.current) {
      const context = guideCanvasRef.current.getContext('2d');
      const { width, height } = guideCanvasRef.current;

      // Clear the canvas
      context.clearRect(0, 0, width, height);

      // Draw a rectangle guideline in the center of the canvas
      const rectWidth = 200;
      const rectHeight = 300;
      const rectX = (width - rectWidth) / 2;
      const rectY = (height - rectHeight) / 2;

      context.strokeStyle = 'red';
      context.lineWidth = 2;
      context.strokeRect(rectX, rectY, rectWidth, rectHeight);
    }
  }, [guideCanvasRef]);

  const capturePhoto = async () => {
    if (videoRef.current && captureCanvasRef.current) {
      const context = captureCanvasRef.current.getContext('2d');
      context.drawImage(
        videoRef.current,
        0,
        0,
        captureCanvasRef.current.width,
        captureCanvasRef.current.height,
      );
      const dataUrl = captureCanvasRef.current.toDataURL('image/jpeg');
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
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ position: 'relative', width: 640, height: 480 }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
        <canvas
          ref={guideCanvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          width={640}
          height={480}
        />
        <canvas
          ref={captureCanvasRef}
          style={{ display: 'none' }}
          width={640}
          height={480}
        />
      </div>
    </div>
  );
}

export default TumblerRek;
