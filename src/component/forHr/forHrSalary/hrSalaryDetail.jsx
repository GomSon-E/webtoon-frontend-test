import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import HorizonLine from '../../horizonLine';

const FakeSalData = [
    {
        id: 1,
        account: '국민은행 12345-67-890',
        anuSal: '36,000,000',
        monSal: '2,084,669',
        extraPay: '130,050',
        entitlementPay: '150,000',
    },
];

const HrSalaryDetail = () => {
    const [isEditing, setIsEditing] = useState(false); // 상태 추가
    const [editedAccount, setEditedAccount] = useState(FakeSalData[0].account);

    const handleToggleEdit = () => {
        setIsEditing((prevState) => !prevState);
    };

    const handleAccountChange = (e) => {
        setEditedAccount(e.target.value);
    };

    const handleSaveChanges = () => {
        // You can implement the logic here to save the editedAccount value to your data source
        // For now, let's just set it back to FakeSalData
        setEditedAccount(editedAccount);
        setIsEditing(false);
    };


    return (
        <HrSalaryDetailContainer>
            <FlexBox>
                <Title>급여 상세</Title>
                <Btn onClick={isEditing ? handleSaveChanges : handleToggleEdit}>
                    {isEditing ? '등 록' : '수 정'}
                </Btn>
            </FlexBox>
            <HorizonLine />
            <DetailContentContainer>
                <>
                    {!isEditing ? (
                        <SalaryInfoBox>지급계좌 <SalaryInfoData>{editedAccount}</SalaryInfoData></SalaryInfoBox>
                    ) : (
                        <SalaryInfoBox>지급계좌 <InputContainer><InputField type="text" value={editedAccount} onChange={handleAccountChange} /></InputContainer></SalaryInfoBox>
                    )}
                        <SalaryInfoBox>연봉 <SalaryInfoData>{FakeSalData[0].anuSal}</SalaryInfoData></SalaryInfoBox>
                        <SalaryInfoBox>월급 <SalaryInfoData>{FakeSalData[0].monSal}</SalaryInfoData></SalaryInfoBox>
                        <SalaryInfoBox>추가수당 <SalaryInfoData>{FakeSalData[0].extraPay}</SalaryInfoData></SalaryInfoBox>
                        <SalaryInfoBox>자격수당 <SalaryInfoData>{FakeSalData[0].entitlementPay}</SalaryInfoData></SalaryInfoBox>
                </>
            </DetailContentContainer>
        </HrSalaryDetailContainer>
    )
};

export default HrSalaryDetail;

const HrSalaryDetailContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const DetailContentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 10px;
`;

const SalaryInfoBox = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`
const SalaryInfoData = styled.div`
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
    margin: 0px 15px 0px 750px;
`

const FlexBox = styled.div`
    display: flex;
    align-items: center;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const InputField = styled.input`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;