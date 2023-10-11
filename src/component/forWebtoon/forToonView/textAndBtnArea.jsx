import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from './../../../style/theme';

const TextAndBtnArea = () => {
    return(
        <TextAndBtnContainer>
            <Title>웹툰 상세</Title>
            <BtnContainer>
                <Btn>수 정</Btn>
                <Btn>삭 제</Btn>
            </BtnContainer>
        </TextAndBtnContainer>
    );
};
export default TextAndBtnArea;

const TextAndBtnContainer = styled.div`
    display: flex;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const BtnContainer = styled.div`
    display: flex;
    margin-left: 600px;
    align-items: center;
`;

const Btn = styled.button`
    width: 90px;
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