import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import theme from '../../../style/theme';

const FakeData = [
    {
        id: 1,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '사장',
        dep: '',
        name: 'employee 1',
        url: '/employee1',
    },
    {
        id: 2,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '전무',
        dep: '',
        name: 'employee 2',
        url: '/employee2',
    },
    {
        id: 3,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '상무',
        dep: '',
        name: 'employee 3',
        url: '/employee3',
    },
    {
        id: 4,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '부장',
        dep: '인사부',
        name: 'employee 4',
        url: '/employee4',
    },
    {
        id: 5,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '부장',
        dep: '회계부',
        name: 'employee 5',
        url: '/employee5',
    },
    {
        id: 6,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '차장',
        dep: '인사부',
        name: 'employee 6',
        url: '/employee6',
    },
    {
        id: 7,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '과장',
        dep: '인사부',
        name: 'employee 7',
        url: '/employee7',
    },
    {
        id: 8,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '팀장',
        dep: '웹툰관리부',
        name: 'employee 8',
        url: '/employee8',
    },
    {
        id: 9,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '팀장',
        dep: '회계부',
        name: 'employee 9',
        url: '/employee9',
    },
    {
        id: 10,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '사원',
        dep: '웹툰관리부',
        name: 'employee 10',
        url: '/employee10',
    },
    {
        id: 11,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        rank: '사원',
        dep: '개발부',
        name: 'employee 11',
        url: '/employee11',
    },
];

    
const EmployeeView = () => {
    const isLoading = false;

    const [data, setData] = useState({});
    const [selectedDep, setSelectedDep] = useState('전체');

    useEffect(() => {
        axios.get('http://localhost:5050/users').then((response)=> {
            setData(response.data);
        })
    }, []);

    // 부서 선택 핸들러
    const SelectDephandler = (e) => {
        setSelectedDep(e.target.value);
    };

    // 선택된 부서에 해당하는 프로필 필터링
    const filteredProfiles = selectedDep === '전체' ? data : data.filter((emp) => emp.dep === selectedDep);

    return(
        <EmpProfileContainer>
            <SelectAndBtnContainer>
                <SelectDepContainer>
                    <SelectDep value={selectedDep} onChange={SelectDephandler}>
                        <OptionDep value="전체">전체</OptionDep>
                        <OptionDep value="인사부">인사부</OptionDep>
                        <OptionDep value="회계부">회계부</OptionDep>
                        <OptionDep value="웹툰관리부">웹툰관리부</OptionDep>
                        <OptionDep value="개발부">개발부</OptionDep>
                        <OptionDep value="">기타</OptionDep>
                    </SelectDep>
                </SelectDepContainer>

                <BtnContainer>
                    <Link to="/hrAdd">
                        <Btn>추 가</Btn>
                    </Link>
                        <Btn>삭 제</Btn>
                </BtnContainer>
            </SelectAndBtnContainer>
            
            <CardGrid>
                {isLoading ? (
                Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonCardButton key={index}>
                    <Skeleton width={80} height={120} />
                    </SkeletonCardButton>
                ))
            ) : (
                filteredProfiles.map((emp) => (
                    <Link to={emp.url} key={emp.id} style={{ textDecoration: 'none' }}>
                    <CardButton>
                        <Img src={emp.imageUrl} alt={`${emp.rank} ${emp.name}의 프로필 사진`} />
                        <EmpInfContainer>
                        <CardRank>{emp.rank}</CardRank>
                        <CardName>{emp.name}</CardName>
                        </EmpInfContainer>
                    </CardButton>
                    </Link>
                ))
                )}
            </CardGrid>
        </EmpProfileContainer>
    );
};

export default EmployeeView;

const EmpProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
`;

const SelectAndBtnContainer = styled.div`
    display: flex;
    width: 1160px;
    justify-content: space-between;
    margin-left: 15px;
    margin-bottom: 20px;
`

const SelectDepContainer = styled.div`
    width: 130px;
    height: 35px;
    border-radius: 8px;
    border: 3px solid ${theme.colors.btn};
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const SelectDep = styled.select`
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0 5px;
    cursor: pointer;
`

const OptionDep = styled.option`
    background: #f1f1f1;
    font-size: 15px;
`

const BtnContainer = styled.div`
    display: flex;
`;

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
    margin: 0px 15px 0px 15px;
`

const EmpInfContainer = styled.div`
    width: 110px;
    height: 100px;
    flex-direction: column;
    border-radius: 8px;
    margin-top: 10px;
    background-color: #17DE76;
`;

const Img = styled.img`
    width: 130px;
    height: 140px;
    margin-top: 5px;
    border-radius: 8px;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 7px;
    margin-top: 20px;
`;

const CardButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 230px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 15px;
    padding: 5px 0px 25px 0px;
    background-color: #F7F7F7;
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #f1f1f1;
    }
`;

const CardRank = styled.h3`
    color: ${theme.colors.white};
    margin: 0 auto;
    padding: 5px;
`;

const CardName = styled.div`
    margin-bottom: 7px;
    color: ${theme.colors.white};
    margin: 8px;
    font-weight: bold;
    font-size: 13px;
`;

const SkeletonCardButton = styled(CardButton)`
    background-color: #f9f9f9;
`;