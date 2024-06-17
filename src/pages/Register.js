import React, { useState, useEffect } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import UserInput from '../component/UserInput';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import translate from 'translate';
import _ from 'lodash';
import Close from '../component/CloseButton';

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
      mainText: '안녕하세요 {} 님',
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
    {
      department: '    학부 선택    ',
      major: '    학과 선택    ',
    },
  ],
  en: [
    {
      mainText: 'Please enter your name',
      subText: 'Please enter your real name for reward payment',
      placeholder: 'Kim Indeok',
      input: true,
    },
    {
      mainText: 'Hi {}',
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
    {
      department: '    Select Department    ',
      major: '    Select Major    ',
    },
  ],
  cn: [
    {
      mainText: '请输入您的姓名',
      subText: '为了支付奖励，请务必输入真实姓名',
      placeholder: '金仁德',
      input: true,
    },
    {
      mainText: '嗨， {}',
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
    {
      department: '    选择部门    ',
      major: '    选择专业    ',
    },
  ],
};

async function RegisterUser(
  name,
  studentId,
  major,
  lang,
  navigate,
  registerFace,
) {
  try {
    const registeredUserRaw = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          id: studentId,
          major,
        }),
      },
    );
    const registeredUser = await registeredUserRaw.json();

    if (registeredUser.status === 409) {
      alert('이미 가입된 사용자입니다. 홈 화면으로 이동합니다.');
      return navigate('/');
    }
    if (registeredUser.status === 201 && registerFace)
      return navigate(`/register-face?studentId=${studentId}&lang=${lang}`);

    return navigate(
      `/tumbler?name=${name}&studentId=${studentId}&lang=${lang}`,
    );
  } catch (error) {
    console.error(error);
  }
}

function Register() {
  const query = useQuery();
  const lang = query.get('lang') || 'kr';
  const [index, setIndex] = useState(0);
  const [, setInputValue] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [departmentTitle, setDepartmentTitle] = useState(
    messages[lang][5].department,
  );
  const [majorTitle, setMajorTitle] = useState(messages[lang][5].major);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [major, setMajor] = useState('');
  const [majorList, setMajorList] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/majors`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const response = await rawResponse.json();

        const translateObjectStrings = async (obj) => {
          const entries = await Promise.all(
            Object.entries(obj).map(async ([key, value]) => {
              const translatedKey = await translate(key, {
                from: 'ko',
                to: lang,
              });

              const translatedValue = await Promise.all(
                value.map(async (item) => {
                  const translatedName = await translate(item.name, {
                    from: 'ko',
                    to: lang,
                  });
                  return { ...item, name: translatedName };
                }),
              );

              return [translatedKey, translatedValue];
            }),
          );
          return _.fromPairs(entries);
        };
        const majorList =
          lang === 'kr'
            ? response.data
            : await translateObjectStrings(response.data);

        setMajorList(majorList);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDepartment = (department) => {
    setSelectedDepartment(department);
    setDepartmentTitle(department);
    setSelectedMajor(null); // Reset selected major when department changes
    setMajorTitle(messages[lang][5].major); // Reset major title when department changes
  };

  const handleMajor = (major) => {
    setSelectedMajor(major.id);
    setMajorTitle(major.name);
  };

  const getMajorsForDepartment = (department) => {
    return majorList[department] || [];
  };

  return (
    <div className="App">
      <Close />
      <header className="App-header">
        <MainText text={messages[lang][index]['mainText']} />
        <SubText text={messages[lang][index]['subText'].replace('{}', name)} />
        {index < 2 && (
          <UserInput placeholder={messages[lang][index]['placeholder']} />
        )}
        {index === 2 && (
          <>
            <DropdownButton
              id="dropdown-department-button"
              title={departmentTitle}
              size="lg"
              style={{ marginBottom: '10px' }}
            >
              {Object.keys(majorList).map((department) => (
                <Dropdown.Item
                  as="button"
                  key={department}
                  onClick={() => handleDepartment(department)}
                >
                  {department}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <DropdownButton
              id="dropdown-major-button"
              title={majorTitle}
              size="lg"
            >
              {selectedDepartment &&
                getMajorsForDepartment(selectedDepartment).map((major) => (
                  <Dropdown.Item
                    as="button"
                    key={major.name}
                    onClick={() => handleMajor(major)}
                  >
                    {major.name}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </>
        )}
        <div style={{ display: 'block', marginTop: '200px' }} />
        {index !== 3 && (
          <Button
            onClick={() => {
              setInputValue(document.getElementById('userInput')?.value);
              if (index === 0) {
                setName(document.getElementById('userInput').value);
                messages[lang][index + 1]['mainText'] = messages[lang][
                  index + 1
                ]['mainText'].replace(
                  '{}',
                  document.getElementById('userInput').value,
                );
              } else if (index === 1)
                setStudentId(document.getElementById('userInput').value);
              else if (index === 2) setMajor(selectedMajor);
              setIndex(index + 1);
              if (index !== 2) document.getElementById('userInput').value = '';
            }}
            size="lg"
            style={{ width: '80%', height: '100px', fontSize: '50px' }}
          >
            {messages[lang][4]}
          </Button> // 다음 버튼
        )}
        {index === 0 && (
          <p>키보드는 화면 아래에서 위로 스와이프하면 나타납니다.</p>
        )}
        {index === 3 && (
          <>
            <Button
              size="lg"
              style={{ width: '80%', height: '100px', fontSize: '50px' }}
              onClick={() => {
                RegisterUser(name, studentId, major, lang, navigate, true);
              }}
            >
              {messages[lang][index]['ok']}
            </Button>
            <div style={{ display: 'block', marginTop: '20px' }} />
            <Button
              size="lg"
              style={{ width: '80%', height: '100px', fontSize: '50px' }}
              onClick={() => {
                RegisterUser(name, studentId, major, lang, navigate, false);
              }}
            >
              {messages[lang][index]['cancel']}
            </Button>
          </>
        )}
      </header>
    </div>
  );
}

export default Register;
