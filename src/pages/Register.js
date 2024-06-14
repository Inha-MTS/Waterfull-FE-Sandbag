import React, { useState, useEffect } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import UserInput from '../component/UserInput';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const messages = {
  kr: [
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
      mainText: '학과를 선택해주세요',
      subText: '학부 / 학과를 선택해주시면 됩니다',
      placeholder: '컴퓨터공학과',
      input: true,
    },
    {
      mainText: '얼굴을 등록하시겠어요?',
      subText: '얼굴을 등록하면 리워드를 받을 수 있습니다',
      ok: '등록할래요',
      cancel: '등록하지 않을래요',
      placeholder: '',
      input: false,
    },
    '다음',
  ],
  en: [
    {
      mainText: 'Please enter your name',
      subText: 'Please enter your real name for reward payment',
      placeholder: 'Kim Indeok',
      input: true,
    },
    {
      mainText: 'Please enter your student ID',
      subText: 'Please enter your 8-digit student ID',
      placeholder: '12201830',
      input: true,
    },
    {
      mainText: 'Please select your department',
      subText: 'Please select your faculty/department',
      placeholder: 'Computer Science',
      input: true,
    },
    {
      mainText: 'Would you like to register your face?',
      subText: 'Simplify login process',
      ok: 'Yes',
      cancel: 'No',
      placeholder: '',
      input: false,
    },
    'Next',
  ],
  cn: [
    {
      mainText: '请输入您的姓名',
      subText: '为了支付奖励，请务必输入真实姓名',
      placeholder: '金仁德',
      input: true,
    },
    {
      mainText: '请输入您的学号',
      subText: '请输入您的8位学号',
      placeholder: '12201830',
      input: true,
    },
    {
      mainText: '请选择您所在的部门',
      subText: '请选择您所在的学院/系',
      placeholder: '计算机科学系',
      input: true,
    },
    {
      mainText: '您要注册您的脸吗？',
      subText: '简化登录流程',
      ok: '是',
      cancel: '没有',
      placeholder: '',
      input: false,
    },
    '下一个',
  ],
};

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
  const [data, setData] = useState([]); // 학과 정보 저장할 변수
  const query = useQuery();
  const lang = query.get('lang') || 'kr';
  const navigate = useNavigate();

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://18.143.140.208:3000/majors', {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        const groupedData = response.data.reduce((acc, item) => {
          if (!acc[item.department]) {
            acc[item.department] = [];
          }
          acc[item.department].push(item.name);
          return acc;
        }, {});
        setData(groupedData);
        console.log(groupedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <MainText text={messages[lang][index]['mainText']} />
        <SubText text={messages[lang][index]['subText']} />
        {index < 2 && (
          <UserInput placeholder={messages[lang][index]['placeholder']} />
        )}
        {index === 2 && (
          <>
            <DropdownButton id="dropdown-item-button" title="Dropdown button">
              <Dropdown.ItemText>학부 선택</Dropdown.ItemText>
              <Dropdown.Item as="button">Action</Dropdown.Item>
              <Dropdown.Item as="button">Another action</Dropdown.Item>
              <Dropdown.Item as="button">Something else</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-item-button" title="Dropdown button">
              <Dropdown.ItemText>학과 선택</Dropdown.ItemText>
              <Dropdown.Item as="button">Action</Dropdown.Item>
              <Dropdown.Item as="button">Another action</Dropdown.Item>
              <Dropdown.Item as="button">Something else</Dropdown.Item>
            </DropdownButton>
          </>
        )}
        <div style={{ display: 'block', marginTop: '200px' }} />
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
            style={{ width: '80%', height: '100px', fontSize: '50px' }}
          >
            {messages[lang][4]}
          </Button>
        )}
        {index === 3 && (
          <Button
            onClick={() => {
              RegisterCamera(name, studentId, department, navigate);
            }}
          >
            {messages[lang][index]['ok']}
          </Button>
        )}
        {index === 3 && (
          <Button
            onClick={() => {
              RegisterNotCamera(name, studentId, department, navigate);
            }}
          >
            {messages[lang][index]['cancel']}
          </Button>
        )}
      </header>
    </div>
  );
}

export default Register;
