import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../style/theme';

const WebtoonSearch = () => {
    return(
        <WebtoonSearchContainer>
                <Title>작품 관리</Title>
                <ButtonContainer>
                    <Link to="/allToonView">
                        <Btn>전체 웹툰 리스트 보기</Btn>
                    </Link>
                </ButtonContainer>
        </WebtoonSearchContainer>       
    );
};
export default WebtoonSearch;

const WebtoonSearchContainer = styled.div`
    display: flex;
    width: 800px;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const Btn = styled.button`
    width: 150px;
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
    float: right;
`