import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';


const ContentContainer = styled.div`
  text-align: center;
  margin-top: 15%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
`;

const ResetButton = styled(Button)`
  margin-top: 16px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const PasswordReset = () => {
  const handlePasswordReset = () => {
    // Handle password reset logic here
  };

  return (
    
      <ContentContainer>
        <Title>비밀번호 초기화</Title>
        <Description>
          비밀번호를 초기화하기 위해 사번을 입력한 후 아래 버튼을 클릭하세요.
        </Description>
        <Input placeholder='사번'/>
        <br/>
        <ResetButton type="primary" onClick={handlePasswordReset}>
          비밀번호 초기화 요청
        </ResetButton>
      </ContentContainer>
    
  );
};

export default PasswordReset;
