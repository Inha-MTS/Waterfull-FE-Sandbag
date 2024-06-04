import React, { useState, useEffect } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import UserInput from '../component/UserInput';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    mainText: '이름을 입력해주세요',
    subText: '리워드 지급을 위해서 꼭 본명을 입력해주세요',
    placeholder: '김인덕',
    input: true,
  },
  {
    mainText: '학번을 입력해주세요',
    subText: '8자리의 학번을 입력해주세요',
    placeholder: '12201830',
    input: true,
  },
  {
    mainText: '학과를 입력해주세요',
    subText: '학과명을 줄이지 말고 입력해주세요',
    placeholder: '컴퓨터공학과',
    input: true,
  },
  {
    mainText: '얼굴을 등록하시겠어요?',
    subText: '얼굴을 등록하면 리워드를 받을 수 있습니다',
    placeholder: '',
    input: false,
  },
];

function RegisterCamera(name, studentId, department, navigate) {
  // 카메라 호출 및 얼굴 등록
  const apiURL = ''; // 가입 API URL
  const faceRegisterApiURL = ''; // 얼굴 등록 API URL
  const data = {
    name: name,
    studentId: studentId,
    department: department,
    face: false, // 얼굴 등록 하기로 했다~
  };
  fetch(apiURL, {
    //
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // 얼굴 등록 API 호출
      fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate('/tumbler?name=' + name + '&studentId=' + studentId);
        })
        .catch((error) => console.error(error));
      navigate('/tumbler?name=' + name + '&studentId=' + studentId);
    })
    .catch((error) => console.error(error));
}

function RegisterNotCamera(name, studentId, department, navigate) {
  const apiURL = ''; // 가입 API URL
  const data = {
    name: name,
    studentId: studentId,
    department: department,
    face: false, // 얼굴 등록 안하기로 했다~
  };
  // fetch(apiURL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     navigate('/tumbler?name=' + name + '&studentId=' + studentId);
  //   })
  //   .catch((error) => console.error(error));
  navigate('/tumbler?name=' + name + '&studentId=' + studentId);
}

function Register() {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <div className="App">
      <header className="App-header">
        <MainText text={questions[index]['mainText']} />
        <SubText text={questions[index]['subText']} />
        {index !== 3 && (
          <UserInput placeholder={questions[index]['placeholder']} />
        )}
        {index !== 3 && (
          <Button
            onClick={() => {
              setInputValue(document.getElementById('userInput').value);
              if (index === 0)
                setName(document.getElementById('userInput').value);
              else if (index === 1)
                setStudentId(document.getElementById('userInput').value);
              else if (index === 2)
                setDepartment(document.getElementById('userInput').value);
              setIndex(index + 1);
              document.getElementById('userInput').value = '';
            }}
            size="lg"
            style={{ width: '70%' }}
          >
            다음
          </Button>
        )}
        {index === 3 && (
          <Button
            onClick={() => {
              RegisterCamera(name, studentId, department, navigate);
            }}
          >
            등록할래요
          </Button>
        )}
        {index === 3 && (
          <Button
            onClick={() => {
              RegisterNotCamera(name, studentId, department, navigate);
            }}
          >
            등록하지 않을래요
          </Button>
        )}
      </header>
    </div>
  );
}

export default Register;
