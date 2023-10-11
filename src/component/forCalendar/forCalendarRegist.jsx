import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import dayjs from 'dayjs';
import { TimePicker, DatePicker, Space, message } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


const ForCalendarRegist = () => {
  //달력(요청, 납기일)

  const [registDate, setRegistDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('10:00');
  const [selectedEndTime, setSelectedEndTime] = useState('12:00');

  const handleSubmitClick = () => {
    //console.log(finalId, "finalId 결과값"); 

   axios.post('http://localhost:5050/register',
     {
      registDate: registDate,
      selectedStartDate: selectedStartDate,
      selectedStartTime: selectedStartTime,
      selectedEndDate: selectedEndDate, 
      selectedEndTime: selectedEndTime,  
      selectedDeliveryDate: selectedDeliveryDate,  
      selectedTitle: selectedTitle,
      selectedRequest: selectedRequest,
     },
     {
       headers: {
         'Content-Type': 'application/json',
       },
     })
     .then((result) => {
       if (result.status === 'done') {
        message.success(`[일정] 등록이 정상적으로 등록되었습니다.`);
      } 
     })
     .catch((error) => {
      message.error('[일정] 등록이 정상적으로 등록되지 않았습니다.');
     })
 };


  const SelectTitlehandler = (e) => {
    setSelectedTitle(e.target.value);
  };

  const format = 'HH:mm';

  const disabledDate = current => {
    // 오늘 이전의 날짜를 비활성화
    return current && current < dayjs().startOf('day');
  };

  const todayDate = new Date();

  const CustomDatePicker = (props) => {
    const todayDate = new Date();
    const formattedTodayDate = todayDate.toISOString().split('T')[0];
  
    return (
      <DatePicker {...props} placeholder={formattedTodayDate} disabled />
    );
  };
  
  

  return (
    <>
      <Title>일정 등록</Title>
      <RegistBtnContainer>
                    <RegistBtn onClick={handleSubmitClick}>등록</RegistBtn>
      </RegistBtnContainer>
      
      <MainContainer>
        <GridContainer1>
          <Container>
              <InputTitle>등록일</InputTitle>
              <Div3 />
              <CustomDatePicker
              selected={todayDate}
              dateFormat="yyyy-MM-dd"
              />
            </Container>
            <Container>
                <InputTitle>일정 제목</InputTitle><Div2/><Input type="text" placeholder="제목" onChange={SelectTitlehandler}/>
            </Container>
          </GridContainer1>
          <GridContainer2>
            <Container>
              <InputTitle>시작일자</InputTitle>
              <Div />
              <DatePicker
                  selected={selectedDeliveryDate}
                  onChange={(date) => setSelectedStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  disabledDate={disabledDate}
                  placeholderText="시작일자"
                  />
              <TimePicker defaultValue={dayjs('12:08', format)} 
                          format={format}
                          onChange={(time) => setSelectedStartTime(time)}
                          size="small" />
                  
          </Container>
          <Container>
              <InputTitle>종료일자</InputTitle>
              <Div />
              <DatePicker
                  selected={selectedDeliveryDate}
                  onChange={(date) => setSelectedEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  disabledDate={disabledDate}
                  placeholderText="종료일자"
                  />
                  
                  <TimePicker defaultValue={dayjs('12:08', format)} 
                              format={format}
                              onChange={(time) => setSelectedEndTime(time)}
                              size="small" />
          </Container>
        </GridContainer2> 
      </MainContainer>
      
    </>
  );
};

export default ForCalendarRegist;


const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 30px 50px;
  height: 200px;
  padding: 120px;
  display: flex;
  flex-direction: row;
`;

const GridContainer1 = styled.div`
  display: flex;
  display: flex;
  flex-direction: column;
  width: 40%
`;

const GridContainer2 = styled.div`
  display: flex;
  display: flex;
  flex-direction: column;
  width: 60%
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

const Div = styled.div`
  padding: 8px;
`;

const Div2 = styled.div`
  padding: 5px;
`;

const Div3 = styled.div`
  padding: 15px;
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
  margin: 20px;
`;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 86%;
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