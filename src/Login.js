import React, { useEffect, useRef } from 'react';
function Camera() {
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
    const captureVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        let chunks = [];
        const recorder = new MediaRecorder(stream);
  
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = async () => {
          const blob = new Blob(chunks, { 'type' : 'video/mp4' });
          chunks = [];

          const response = await fetch('https://4a4vx7p4jhrv7wucp6pqisynsy0gfrfs.lambda-url.ap-northeast-2.on.aws/ ', {
            method: 'POST',
            body: blob,
            headers: {
              'Content-Type': 'video/mp4',
              'Allow-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
          });
  
          if (!response.ok) {
            console.log(response);
            throw new Error('Video upload failed');
          }
  
          // 스트림 정리
          stream.getTracks().forEach(track => track.stop());
        };
  
        recorder.start();
        // 5초 후 녹화 중지
        setTimeout(() => {
          recorder.stop();
        }, 5000);
      } catch (error) {
        console.error('Error capturing video:', error);
      }
    };
  
    captureVideo();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} autoPlay playsInline/>
      <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
    </div>
  );
}

export default Camera;