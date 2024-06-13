import { BarcodeScanner } from 'react-barcode-scanner';
import 'react-barcode-scanner/polyfill';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const apiURL = `${process.env.BACKEND_URL}/users/`; // 학번 조회 API URL

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
      onCapture={(barcode) => {
        if (
          barcode.rawValue.startsWith('12') ||
          barcode.rawValue.startsWith('2')
        ) {
          const data = {
            id: barcode.rawValue.slice(0, 8),
          };
          fetch(apiURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((res) => {
              if (res.status === 200) {
                navigate(
                  '/tumbler?name=' +
                    res.data.name +
                    '&studentId=' +
                    res.data.id +
                    '&lang=' +
                    lang,
                );
              } else if (res.status === 400) {
                // 등록되지 않은 사용자
                navigate('/register?lang=' + lang);
              } else {
                alert(res.message);
              }
            })
            .catch((error) => console.error(error));
        }
      }}
    />
  );
}

export default LoginCard;
