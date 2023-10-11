import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import HorizonLine from '../horizonLine';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Upload, message, Modal } from 'antd';
import AnnualLeaveRequestView from '../forElectropaymentRuqeust/forEpForm/annualLeaveRequestView';


const FakeProfileData = [
    {
        id: 1,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        name: 'employee 1',
        dep: '인사부',
        rank: '사원',
        empId: 1234,
        joinDate: '2022-07-13',
        phone: '010-1234-1234',
        email: 'employee1@gmail.com',
        birthDate: '1998-03-14',
        annualLeave: 5
    },
];

const MyPageView = () => {
    const rowData = [
        {자격증명: '정보처리기사', '자격증 상세' : '', 만료일자: '2022-09-01'},
        {자격증명: 'SQLD', '자격증 상세' : '', 만료일자: '2023-02-10'},
        {자격증명: 'TOEIC', '자격증 상세' : '920', 만료일자: '2023-05-18'},
        {자격증명: 'JLPT', '자격증 상세' : 'N2', 만료일자: '2021-08-31'},
    ];

    const columnDefs = [
        {field: '자격증명', sortable: true, filter: true, width: '390px'},
        {field: '자격증 상세', sortable: true, filter: true, width: '380px'},
        {field: '만료일자', sortable: true, filter: true},
    ];

    const [modalOpen, setModalOpen] = useState(false);

    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const TodayDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        setTodayDate(TodayDate);
    }, []);

    return (
        <>
            <FlexBox>
                <Title>마이페이지</Title>
                <Btn onClick={() => setModalOpen(true)}>유급휴가 신청</Btn>
                <Modal
                    title="유급휴가 신청"
                    centered
                    open={modalOpen}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <InputTitle placeholder='제목을 입력해주세요.'/>
                    <H3>문서 종류: 연차 신청서</H3>
                    <H3>날짜: {todayDate}</H3>
                    <H3 style={{ marginBottom: '5px' }}>사유: </H3>
                    <TextArea />
                    <p>위와 같이 상신하오니 검토 후 재가 바랍니다.</p>
                </Modal>
            </FlexBox>            
            <ProfileInHrSalaryContainer>
                <ProfileImgContainer>
                    <Img src={FakeProfileData[0].imageUrl} alt={`${FakeProfileData[0].rank} ${FakeProfileData[0].name}의 프로필 사진`} />
                </ProfileImgContainer>
                <ProfileInfoContainer>
                    <ProfileInfoBox>사원명 <ProfileInfoData>{FakeProfileData[0].name}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>부서 <ProfileInfoData>{FakeProfileData[0].dep}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>직급 <ProfileInfoData>{FakeProfileData[0].rank}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>사원번호 <ProfileInfoData>{FakeProfileData[0].empId}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>입사일 <ProfileInfoData>{FakeProfileData[0].joinDate}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>휴대전화 <ProfileInfoData>{FakeProfileData[0].phone}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>이메일 <ProfileInfoData>{FakeProfileData[0].email}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>생년월일 <ProfileInfoData>{FakeProfileData[0].birthDate}</ProfileInfoData></ProfileInfoBox>
                    <ProfileInfoBox>잔여연차 <ProfileInfoData>{FakeProfileData[0].annualLeave}</ProfileInfoData></ProfileInfoBox>
                </ProfileInfoContainer>
            </ProfileInHrSalaryContainer>
            <EntitlementGridContainer>
                <Title2>자격증</Title2>
                <HorizonLine />
                <EntitlementGrid className="ag-theme-alpine">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='multiple'
                    />
                </EntitlementGrid>
            </EntitlementGridContainer>
        </>
    )
};

export default MyPageView;

const ProfileInHrSalaryContainer = styled.div`
    display: flex;
    padding: 10px;
    border: 1px solid #ccc;
    width: 1000px;
    border-radius: 8px;
`;

const EntitlementGridContainer = styled.div`
    padding: 20px;
    margin-top: 30px;
    border: 1px solid #ccc;
    width: 980px;
    border-radius: 8px;
`;

const FlexBox = styled.div`
    display: flex;
`

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const Title2 = styled.div`
    font-size: 22px;
    font-weight: bold;
`;

const InputTitle = styled.input`
    width: 450px; 
    height: 40px;
    margin-top: 20px;
    margin-bottom: 5px;
    border: 2px solid #EEEEEE;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 14px;
    &::placeholder {
        color: #C3C3C3;
        font-size: 14px;
    }
`

const H3 = styled.h3`

`

const TextArea = styled.textarea`
    width: 450px; 
    height: 100px;
    margin-bottom: 10px;
    border: 2px solid #EEEEEE;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 14px;
    &::placeholder {
        color: #C3C3C3;
        font-size: 14px;
    }
`

const Btn = styled.button`
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
    margin: 0px 15px 0px 770px;
`

const ProfileImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
`;

const ProfileInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`
const ProfileInfoBox = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`
const ProfileInfoData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
`

const EntitlementGrid = styled.div`
    width: 980px;
    height: 260px;
`