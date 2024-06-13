import React, { useState, useEffect } from 'react';
import MainText from '../component/MainText';
import SubText from '../component/SubText';
import UserInput from '../component/UserInput';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
      department: '학과 선택',
      faculty: '학부 선택',
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
      // 학과 / 학부
      department: '학과',
      faculty: '학부',
      datas: {
        '프런티어 학부대학': ['자유전공학부'],
        공과대학: [
          '기계공학과',
          '항공우주공학과',
          '조선해양공학과',
          '산업경영공학과',
          '화학공학과',
          '고분자공학과',
          '신소재공학과',
          '사회인프라공학과',
          '환경공학과',
          '공간정보공학과',
          '건축학부(건축공학)',
          '건축학부(건축학)',
          '에너지자원공학과',
          '융합기술경영학부',
          '전기공학과',
          '전자공학과',
          '정보통신공학과',
          '반도체시스템공학과',
          '미래자동차공학(융합전공)',
          '이차전지공학(융합전공)',
          '반도체공학(융합전공)',
        ],
        자연과학대학: [
          '수학과',
          '통계학과',
          '물리학과',
          '화학과',
          '해양과학과',
          '식품영양학과',
        ],
        경영대학: [
          '경영학과',
          '글로벌금융학과',
          '아태물류학부',
          '국제통상학과',
          '기후위기대응(융합전공)',
        ],
        사범대학: [
          '국어교육과',
          '영어교육과',
          '사회교육과',
          '교육학과',
          '체육교육과',
          '수학교육과',
        ],
        사회과학대학: [
          '행정학과',
          '정치외교학과',
          '미디어커뮤니케이션학과',
          '경제학과',
          '소비자학과',
          '아동심리학과',
          '사회복지학과',
          '기후위기대응(융합전공)',
        ],
        문과대학: [
          '한국어문학과',
          '사학과',
          '철학과',
          '중국학과',
          '일본언어문화학과',
          '영어영문학과',
          '프랑스언어문화학과',
          '문화콘텐츠문화경영학과',
        ],
        의과대학: ['의예과', '의학과', '간호학과'],
        미래융합대학: [
          '메카트로닉스공학과',
          '소프트웨어융합공학과',
          '산업경영학과',
          '금융투자학과',
        ],
        예술체육대학: [
          '조형예술학과',
          '디자인융합학과',
          '스포츠과학과',
          '연극영화학과',
          '의류디자인학과',
        ],
        국제학부: ['IBT학과', 'ISE학과', 'KLC학과'],
        소프트웨어융합대학: [
          '인공지능공학과',
          '데이터사이언스학과',
          '스마트모빌리티공학과',
          '디자인테크놀로지학과',
          '컴퓨터공학과',
        ],
        바이오시스템융합학부: ['생명공학과', '바이오제약공학과', '생명과학과'],
      },
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
      department: 'Department', // 학과
      faculty: 'Faculty', // 학부
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
      department: 'Department',
      faculty: 'Faculty',
      datas: {
        'Frontier College': ['Undeclared Major'],
        'College of Engineering': [
          'Mechanical Engineering',
          'Aerospace Engineering',
          'Naval Architecture and Ocean Engineering',
          'Industrial and Management Engineering',
          'Chemical Engineering',
          'Polymer Engineering',
          'Materials Science and Engineering',
          'Civil Infrastructure Engineering',
          'Environmental Engineering',
          'Geospatial Information Engineering',
          'Architectural Engineering',
          'Architecture',
          'Energy Resources Engineering',
          'Convergence Technology Management',
          'Electrical Engineering',
          'Electronic Engineering',
          'Information and Communication Engineering',
          'Semiconductor Systems Engineering',
          'Future Automotive Engineering (Convergence Major)',
          'Secondary Battery Engineering (Convergence Major)',
          'Semiconductor Engineering (Convergence Major)',
        ],
        'College of Natural Sciences': [
          'Mathematics',
          'Statistics',
          'Physics',
          'Chemistry',
          'Marine Science',
          'Food and Nutrition',
        ],
        'College of Business Administration': [
          'Business Administration',
          'Global Finance',
          'Asia-Pacific Logistics',
          'International Trade',
          'Climate Crisis Response (Convergence Major)',
        ],
        'College of Education': [
          'Korean Language Education',
          'English Education',
          'Social Studies Education',
          'Education',
          'Physical Education',
          'Mathematics Education',
        ],
        'College of Social Sciences': [
          'Public Administration',
          'Political Science and Diplomacy',
          'Media and Communication',
          'Economics',
          'Consumer Studies',
          'Child Psychology',
          'Social Welfare',
          'Climate Crisis Response (Convergence Major)',
        ],
        'College of Humanities': [
          'Korean Language and Literature',
          'History',
          'Philosophy',
          'Chinese Studies',
          'Japanese Language and Culture',
          'English Language and Literature',
          'French Language and Culture',
          'Cultural Contents and Cultural Management',
        ],
        'College of Medicine': ['Premedicine', 'Medicine', 'Nursing'],
        'College of Future Convergence': [
          'Mechatronics Engineering',
          'Software Convergence Engineering',
          'Industrial Management',
          'Financial Investment',
        ],
        'College of Arts and Sports': [
          'Fine Arts',
          'Design Convergence',
          'Sports Science',
          'Theatre and Film',
          'Fashion Design',
        ],
        'International Division': ['IBT', 'ISE', 'KLC'],
        'College of Software Convergence': [
          'Artificial Intelligence Engineering',
          'Data Science',
          'Smart Mobility Engineering',
          'Design Technology',
          'Computer Engineering',
        ],
        'Department of Bio Systems Convergence': [
          'Biotechnology',
          'Bio-Pharmaceutical Engineering',
          'Life Sciences',
        ],
      },
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
      mainText: '请输入您的学号',
      subText: '请输入您的8位学号',
      placeholder: '12201830',
      input: true,
    },
    {
      mainText: '请选择您所在的部门',
      subText: '请选择您所在的学院/系',
      placeholder: '计算机科学系',
      input: false,
      department: '部门选择',
      faculty: '学院选择',
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
      department: '部门',
      faculty: '学院',
      datas: {
        前沿学院: ['自由专业学部'],
        工学院: [
          '机械工程系',
          '航空航天工程系',
          '造船与海洋工程系',
          '工业管理工程系',
          '化学工程系',
          '高分子工程系',
          '新材料工程系',
          '社会基础设施工程系',
          '环境工程系',
          '空间信息工程系',
          '建筑学部（建筑工程）',
          '建筑学部（建筑学）',
          '能源资源工程系',
          '融合技术管理系',
          '电气工程系',
          '电子工程系',
          '信息通信工程系',
          '半导体系统工程系',
          '未来汽车工程（融合专业）',
          '二次电池工程（融合专业）',
          '半导体工程（融合专业）',
        ],
        自然科学学院: [
          '数学系',
          '统计学系',
          '物理学系',
          '化学系',
          '海洋科学系',
          '食品营养学系',
        ],
        经营学院: [
          '经营学系',
          '全球金融学系',
          '亚太物流学部',
          '国际通商学系',
          '气候危机应对（融合专业）',
        ],
        师范学院: [
          '国语教育系',
          '英语教育系',
          '社会教育系',
          '教育学系',
          '体育教育系',
          '数学教育系',
        ],
        社会科学学院: [
          '行政学系',
          '政治外交学系',
          '媒体与传播学系',
          '经济学系',
          '消费者学系',
          '儿童心理学系',
          '社会福利学系',
          '气候危机应对（融合专业）',
        ],
        文学院: [
          '韩国语言文学系',
          '历史系',
          '哲学系',
          '中国学系',
          '日本语言文化学系',
          '英语语言文学系',
          '法国语言文化学系',
          '文化内容与文化经营学系',
        ],
        医学院: ['预科医学系', '医学系', '护理学系'],
        未来融合学院: [
          '机电一体化工程系',
          '软件融合工程系',
          '产业经营学系',
          '金融投资学系',
        ],
        艺术体育学院: [
          '造型艺术学系',
          '设计融合学系',
          '体育科学系',
          '戏剧电影学系',
          '服装设计学系',
        ],
        国际学院: ['IBT学系', 'ISE学系', 'KLC学系'],
        软件融合学院: [
          '人工智能工程学系',
          '数据科学学系',
          '智能移动工程学系',
          '设计技术学系',
          '计算机工程学系',
        ],
        生物系统融合学部: ['生物工程学系', '生物制药工程学系', '生命科学系'],
      },
    },
  ],
};

function RegisterCamera(name, studentId, department, navigate) {
  const apiURL = '18.143.140.208:3001/users'; // 가입 API URL
  const data = {
    name: name,
    id: studentId,
    major: department,
  };
  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      navigate('/face-rek?name=' + name + '&studentId=' + studentId);
    })
    .catch((error) => console.error(error));
}

function RegisterNotCamera(name, studentId, department, navigate) {
  const apiURL = '18.143.140.208:3001/users'; // 가입 API URL
  const data = {
    name: name,
    id: studentId,
    major: department,
  };
  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      navigate('/face-rek?name=' + name + '&studentId=' + studentId);
    })
    .catch((error) => console.error(error));
}

function Register() {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [faculty, setFaculty] = useState('');
  const [data, setData] = useState([]); // 학과 정보 저장할 변수
  const query = useQuery();
  const lang = query.get('lang') || 'kr';
  const navigate = useNavigate();

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  // 번역 이슈로 인해 주석 처리
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://18.143.140.208:3001/majors', {
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //         },
  //       });
  //       const groupedData = response.data.data.reduce((acc, item) => {
  //         if (!acc[item.department]) {
  //           acc[item.department] = [];
  //         }
  //         acc[item.department].push(item.name);
  //         return acc;
  //       }, {});
  //       setData(groupedData);
  //       console.log(groupedData);
  //     } catch (error) {
  //       console.error('Failed to fetch data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
            <DropdownButton
              id="dropdown-item-button"
              title={messages[lang][2]['faculty']}
              variant="secondary"
              size="lg"
              style={{ width: '100%', height: '100px', fontSize: '50px' }}
            >
              <Dropdown.ItemText>
                {messages[lang][5]['faculty']}
              </Dropdown.ItemText>
              {Object.keys(messages[lang][5]['datas']).map((key) => (
                <Dropdown.Item
                  eventKey={key}
                  onClick={() => {
                    setFaculty(key);
                    console.log(key);
                  }}
                >
                  {key}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <ButtonGroup vertical>
              {faculty &&
                messages[lang][5]['datas'][faculty].map((item) => (
                  <Button
                    variant="primary"
                    key={item}
                    onClick={() => {
                      setDepartment(item);
                      console.log(item);
                      setIndex(index + 1);
                    }}
                  >
                    {item}
                  </Button>
                ))}
            </ButtonGroup>
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
