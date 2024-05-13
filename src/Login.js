import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

function Login() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [searchParams] = useSearchParams();
  const how = searchParams.get('how'); // 'face' or 'card'

  // Access camera and start video stream
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

  // Draw the guide on the canvas
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    const drawGuide = () => {
      if (!videoRef.current) return;

      // Ensure canvas dimensions match the video
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.strokeStyle = 'red';
      context.lineWidth = 4;

      if (how === 'face') {
        // Draw a face shape guide
        context.beginPath();
        context.arc(canvasRef.current.width / 2, canvasRef.current.height / 2, 100, 0, 2 * Math.PI);
        context.stroke();
      } else if (how === 'card') {
        // Draw a card shape guide
        context.beginPath();
        context.rect((canvasRef.current.width - 200) / 2, (canvasRef.current.height - 100) / 2, 200, 100);
        context.stroke();
      }
    };

    const intervalId = setInterval(drawGuide, 100); // Redraw guide every 100ms

    return () => clearInterval(intervalId);
  }, [how]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" style={{ display: 'block' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
    </div>
  );
}

export default Login;
