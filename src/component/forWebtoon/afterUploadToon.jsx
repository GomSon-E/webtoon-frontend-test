import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import theme from '../../style/theme';

const currentDate = new Date();

const month = currentDate.getMonth() + 1;
const week = Math.ceil(currentDate.getDate() / 7);

const FakeData = [
    {
        id: 1,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 1',
        url: '/toon1',
        week: '월요일',
    },
    {
        id: 2,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 2',
        url: '/toon2',
        week: '월요일',
    },
    {
        id: 3,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 3',
        url: '/toon3',
        week: '화요일',
    },
    {
        id: 4,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 4',
        url: '/toon4',
        week: '수요일',
    },
    {
        id: 5,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 5',
        url: '/toon5',
        week: '수요일',
    },
    {
        id: 6,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        title: 'toon 6',
        url: '/toon6',
        week: '목요일',
    },
];

const AfterUploadToon = () => {
    const isLoading = false;

    const [data, setData] = useState({});
    const [selectedWeek, setSelectedWeek] = useState('요일');

    useEffect(() => {
        axios.get('http://localhost:5050/webtoon').then((response)=> {
            setData(response.data);
        })
    }, []);

    const SelectWeekhandler = (e) => {
        setSelectedWeek(e.target.value);
    };

    const filteredToon = selectedWeek === '요일' ? data : data.filter((toon) => toon.week === selectedWeek);

    return(
        <AfterUploadToonContainer>
            <FlexBox>
                <Title>{month}월 {week}주차 업로드 완료 웹툰</Title>
                <SelectWeekContainer>
                    <SelectWeek value={selectedWeek} onChange={SelectWeekhandler}>
                        <OptionWeek value="요일">요일</OptionWeek>
                        <OptionWeek value="월요일">월요일</OptionWeek>
                        <OptionWeek value="화요일">화요일</OptionWeek>
                        <OptionWeek value="수요일">수요일</OptionWeek>
                        <OptionWeek value="목요일">목요일</OptionWeek>
                        <OptionWeek value="금요일">금요일</OptionWeek>
                        <OptionWeek value="토요일">토요일</OptionWeek>
                        <OptionWeek value="일요일">일요일</OptionWeek>
                    </SelectWeek>
                </SelectWeekContainer>
            </FlexBox>
            <CardGrid>
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonCardButton key={index}>
                            <Skeleton width={80} height={120} />
                        </SkeletonCardButton>
                    ))
                ) : (
                    filteredToon.map((toon) => (
                        <Link to={toon.url} key={toon.id} style={{ textDecoration: 'none' }}>
                        <CardButton>
                            <Img src={toon.imageUrl} alt={toon.title} />
                            <CardTitle>{toon.title}</CardTitle>
                        </CardButton>
                        </Link>
                    ))
                )}          
            </CardGrid>
        </AfterUploadToonContainer>
    );
};
export default AfterUploadToon;

const AfterUploadToonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    /* border: 1px solid #ccc; */
`;

const Img = styled.img`
    width: 130px;
    height: 140px;
    margin-top: 5px;
    border-radius: 8px;
`;

const Title = styled.h2`
    margin-bottom: 16px;
    margin-left: 10px;
`;

const SelectWeekContainer = styled.div`
    width: 130px;
    height: 35px;
    border-radius: 8px;
    border: 3px solid ${theme.colors.btn};
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    margin-left: 120px;
`;

const SelectWeek = styled.select`
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0 5px;
    cursor: pointer;
`

const OptionWeek = styled.option`
    background: #f1f1f1;
    font-size: 15px;
`

const FlexBox = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
`

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8px;
`;

const CardButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 10px;
    background-color: #F7F7F7;
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #f1f1f1;
    }
`;

const CardTitle = styled.h3`
    font-weight: bold;
    margin-bottom: 8px;
`;

const SkeletonCardButton = styled(CardButton)`
    background-color: #f9f9f9;
`;