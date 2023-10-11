import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { TimePicker, DatePicker, Space, message } from 'antd';


const HrAddComponent = () => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [selectedTeamID, setSelectedTeamID] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDeptCode, setSelectedDeptCode] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedBirthdayDate, setSelectedBirthdayDate] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  
  const SelectNamehandler = (e) => {
    setSelectedName(e.target.value);
  };

  const SelectDepthandler = (e) => {
    setSelectedDept(e.target.value);
  };

  const SelectDeptCodehandler = (e) => {
    setSelectedDeptCode(e.target.value);
  };

  const SelectPositionhandler = (e) => {
    setSelectedPosition(e.target.value);
  };

  const SelectTeamIDhandler = (e) => {
    setSelectedTeamID(e.target.value);
  };

  const SelectIDhandler = (e) => {
    setSelectedID(e.target.value);
  };

  const SelectPhoneNumberhandler = (e) => {
    setSelectedPhoneNumber(e.target.value);
  };


  const SelectEmailhandler = (e) => {
    setSelectedEmail(e.target.value);
  };


  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setProfilePreview(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitClick = () => {
     //console.log(finalId, "finalId 결과값"); 

    axios.post('http://localhost:5050/register',
      {
        selectedName: selectedName,           
        selectedDept: selectedDept,           
        selectedDeptCode: selectedDeptCode,           
        selectedPosition: selectedPosition,
        selectedTeamID: selectedTeamID,
        selectedID: selectedID,
        selectedStartDate: selectedStartDate,
        selectedPhoneNumber: selectedPhoneNumber,
        selectedEmail: selectedEmail,
        profilePreview: profilePreview,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        if (result.status === 'done') {
         message.success(`사원등록이 정상적으로 완료되었습니다.`);
       }  
      })
      .catch((error) => {
       message.error('사원등록이 정상적으로 완료되지 않았습니다.');
      })
  };
  
  return (
    <>
      <Title>사원 등록</Title>
      <RegistBtnContainer> 
                    <RegistBtn onClick={handleSubmitClick}>업로드</RegistBtn>
      </RegistBtnContainer>
      <MainContainer>
        <RangeContainer>
        <Container>
              <InputTitle>사원명</InputTitle><Div/><Input type="text" placeholder="제목" onChange={SelectNamehandler}/>
          </Container>
          <Container>
              <InputTitle>부서</InputTitle><Div2/>
              <Select value={selectedDept} onChange={SelectDepthandler}>
                          <Option value="인사부">인사부</Option>
                          <Option value="회계부">회계부</Option>
                          <Option value="웹툰 관리부">웹툰 관리부</Option>
                          <Option value="개발부">개발부</Option>
                </Select>
          </Container>
          <Container>
              <InputTitle>부서코드</InputTitle><Div3/>
              <Select value={selectedDeptCode} onChange={SelectDeptCodehandler}>
                          <Option value="HR">HR</Option>
                          <Option value="AM">AM</Option>
                          <Option value="IT">IT</Option>
                          <Option value="WT">WT</Option>
                </Select>
          </Container>
          <Container>
              <InputTitle>직급</InputTitle><Div2/>
              <Select value={selectedPosition} onChange={SelectPositionhandler}>
                          <Option value="부장">부장</Option>
                          <Option value="과장">과장</Option>
                          <Option value="차장">차장</Option>
                          <Option value="사원">사원</Option>
                          <Option value="인턴">인턴</Option>
                </Select>
          </Container>
          <Container>
              <InputTitle>팀번호</InputTitle><Div7/><Input type="text" placeholder="팀번호" onChange={SelectTeamIDhandler}/>
          </Container>
          <Container>
              <InputTitle>사원번호</InputTitle><Div3/><Input type="text" placeholder="사원번호" onChange={SelectIDhandler}/>
          </Container>
          
        </RangeContainer>
        <RangeContainer>
          <Container>
              <InputTitle>입사일</InputTitle><Div6/>
              <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="입사일"
                  />
          </Container>
          <Container>
                <InputTitle>전화번호</InputTitle><Div/><Input type="text" placeholder="전화번호" onChange={SelectPhoneNumberhandler}/>
            </Container>
            <Container>
                <InputTitle>이메일</InputTitle><Div4/><Input type="text" placeholder="이메일" onChange={SelectEmailhandler}/>
            </Container>
            <Container>
                <InputTitle>생년월일</InputTitle><Div/>
                <DatePicker
                    selected={selectedBirthdayDate}
                    onChange={(date) => setSelectedBirthdayDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="입사일"
                    />
            </Container>
          <ProfileContainer>
            <InputTitle>프로필 사진</InputTitle><Div5/>
            <Input type="file" accept="image/*" onChange={handleProfileChange} />
          </ProfileContainer>
          {profilePreview && (
            <Container>
              <ImagePreview src={profilePreview} alt="Profile Preview" />
            </Container>
          )}
        </RangeContainer>
      </MainContainer>
    </>
  );
};

export default HrAddComponent;

const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 30px 50px;
  height: 380px;
  padding-top: 10px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;


const InputTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 15px;
  padding-top: 7px;
`;

const RangeContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 30px;
`;

const Div = styled.div`
  padding: 20px;
`;

const Div2 = styled.div`
  padding-left: 60px;
`;

const Div3 = styled.div`
  padding: 15px;
`;

const Div4 = styled.div`
  padding-left: 55px;
`;

const Div5 = styled.div`
  padding: 12px;
`;

const Div6 = styled.div`
  padding: 27px;
`;

const Div7 = styled.div`
  padding: 23px;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 40px;
  padding-left: 4%;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 18px;
  padding-top: 12px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 18px;
  padding-top: 30px;
`;

const Select = styled.select`
  width: inherit;
  height: 30px;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  padding: 0 10px;
  padding-top: 2px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const Option = styled.option`
  background: #ffffff;
  font-size: 15px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const ImagePreview = styled.img`
  max-width: 300px;
  max-height: 200px;
  margin-top: 10px;
`;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 85%;
`;

const RegistBtn = styled.button`
    width: 100px;
    height: 40px;
    background-color: ${theme.colors.btn};
    border: none;
    color: ${theme.colors.white};
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #00B757;
    }
    cursor: pointer;
    margin: 0px 15px 0px 15px;
`