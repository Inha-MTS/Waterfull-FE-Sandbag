import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';

const apiURL = `${process.env.REACT_APP_BACKEND_URL}/bottles/category`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TumblerRek() {
  const navigate = useNavigate();
  const query = useQuery();
  const name = query.get('name');
  const studentId = query.get('studentId');
  const lang = query.get('lang') || 'kr';
  const videoRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const guideCanvasRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const code = query.get('code') || 'NONE';

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
    if (code === 'RETRY') {
      setShowAlert(true);
    }
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 8000); // 10초 후에 showAlert를 false로 설정하여 Alert를 숨깁니다.

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
  }, [code]); // message 상태가 변경될 때마다 이 useEffect가 실행됩니다.

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
          return navigate(
            `/tumbler-rek?name=${name}&studentId=${studentId}&lang=${lang}&code=RETRY`,
          );
        }
        return navigate('/?lang=kr&code=WARN'); // Redirect to the home page temporarily
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
    <div className="full-screen">
      {showAlert && (
        <Alert variant="warn" onClose={() => setShowAlert(false)} dismissible>
          텀블러 사진 재촬영이 필요합니다.
        </Alert>
      )}
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="video" />
        <canvas
          ref={guideCanvasRef}
          className="canvas"
          style={{ marginTop: '300px' }}
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
