import { BarcodeScanner } from 'react-barcode-scanner';
import 'react-barcode-scanner/polyfill';
import { useNavigate, useLocation } from 'react-router-dom';

const apiURL = `${process.env.REACT_APP_BACKEND_URL}/users/login`; // 학번 조회 API URL

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function LoginCard() {
  const navigate = useNavigate();
  const query = useQuery();
  const lang = query.get('lang');
  return (
    <BarcodeScanner
      options={{ formats: ['code_39'] }}
      onCapture={async (barcode) => {
        if (
          barcode.rawValue.startsWith('12') ||
          barcode.rawValue.startsWith('2')
        ) {
          const data = {
            type: 'card',
            id: barcode.rawValue.slice(0, 8),
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
            const { status, message, data: resData } = response;
            if (status === 200) {
              navigate(
                `/tumbler?name=${resData.name}&studentId=${resData.id}&lang=${lang}`,
              );
            } else if (status === 401) {
              navigate(`/register?lang=${lang}`);
            }
            alert(message);
          } catch (error) {
            console.error(error);
          }
        }
      }}
    />
  );
}

export default LoginCard;
