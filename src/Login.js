import React, { useEffect, useRef } from 'react';
import axios from 'axios';

function Login() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {width: 640, height:480} });
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

  useEffect(() => {
    let imageCount = 0; // Add this line to track the number of images sent
  
    const sendImageToApi = () => {
      const interval = setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('image', blob);
            formData.append('fileName', `${++imageCount}.jpg`); // Update this line to use the imageCount
            try {
              await axios.post('https://p2pvgx6eak.execute-api.ap-northeast-2.amazonaws.com/dev/image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            } catch (err) {
              console.error('Error sending the image:', err);
            }
          });
        }
      }, 2000);
  
      return () => clearInterval(interval);
    };
  
    sendImageToApi();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} autoPlay playsInline/>
      <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
    </div>
  );
}

export default Login;