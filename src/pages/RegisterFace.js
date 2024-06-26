import Webcam from 'react-webcam';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const apiURL = `${process.env.REACT_APP_BACKEND_URL}/users/face-image`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const width = 600;
const height = 1024;

async function HandleFaceImage(studentId, imageString) {
  const data = {
    id: studentId,
    image: imageString,
  };

  try {
    const rawResponse = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

const RegisterFaceImage = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const studentId = query.get('studentId');
  const lang = query.get('lang');

  const [photoTaken, setPhotoTaken] = useState(false);
  const detectionRef = useRef(null);
  const onResultsExecutedRef = useRef(false);

  const handleOnResults = async (results) => {
    if (photoTaken || onResultsExecutedRef.current) return;
    if (results && results.image) {
      setPhotoTaken(true);
      onResultsExecutedRef.current = true;
      stopCamera();
      const dataUrl = results.image.toDataURL('image/jpeg');
      const imageString = dataUrl.split(',')[1];

      const response = await HandleFaceImage(studentId, imageString);
      const { status, message, data: resData } = response;

      if (status === 201) {
        return navigate(
          `/tumbler?name=${resData.name}&studentId=${resData.id}&lang=${lang}`,
        );
      }
      alert(message);
    }
  };

  const stopCamera = () => {
    if (detectionRef.current) {
      detectionRef.current.stop();
      detectionRef.current = null;
    }
  };

  const { webcamRef, boundingBox } = useFaceDetection({
    handleOnResults,
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) => {
      const cameraInstance = new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      });
      detectionRef.current = cameraInstance;
      return cameraInstance;
    },
  });

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div>
      <div style={{ width, height, position: 'relative' }}>
        {boundingBox.map((box, index) => (
          <div
            key={`${index + 1}`}
            style={{
              border: '4px solid red',
              position: 'absolute',
              top: `${box.yCenter * 100}%`,
              left: `${box.xCenter * 100}%`,
              width: `${box.width * 100}%`,
              height: `${box.height * 100}%`,
              zIndex: 1,
            }}
          />
        ))}
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          style={{
            height,
            width,
            position: 'absolute',
          }}
        />
      </div>
    </div>
  );
};

export default RegisterFaceImage;
