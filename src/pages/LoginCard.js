import { BarcodeScanner } from 'react-barcode-scanner';
import 'react-barcode-scanner/polyfill';
import { useNavigate } from 'react-router-dom';

const apiURL = ''; // 학번 조회 API URL

function LoginCard() {
  const navigate = useNavigate();
  return (
    <BarcodeScanner
      options={{ formats: ['code_39'] }}
      onCapture={(barcode) => {
        if (
          barcode.rawValue.startsWith('12') ||
          barcode.rawValue.startsWith('2')
        ) {
          const data = {
            studentId: barcode.rawValue.slice(0, 8),
          };
          //   fetch(apiURL, {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify(data),
          //   })
          //     .then((response) => response.json())
          //     .then((data) => {
          //       console.log(data);
          //       const { name, studentId } = data;
          //       navigate('/tumbler?name=' + name + '&studentId=' + studentId);
          //     })
          //     .catch((error) => console.error(error));
          navigate(
            '/tumbler?name=' + '김건탁' + '&studentId=' + data['studentId'],
          ); // TODO: Delete this
        }
      }}
    />
  );
}

export default LoginCard;
