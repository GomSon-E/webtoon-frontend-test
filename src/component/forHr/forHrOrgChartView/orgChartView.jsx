import { useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import theme from '../../../style/theme';

const profileImg = 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png';
const FakeData = [
    {
        id: 1,
        imageUrl: profileImg,
        rank: '임원',
        dep: '',
        name: 'employee 1',
        url: '/employee1',
    },
    {
        id: 2,
        imageUrl: profileImg,
        rank: '사원',
        dep: '',
        name: 'employee 2',
        url: '/employee2',
    },
    {
        id: 3,
        imageUrl: profileImg,
        rank: '부장',
        dep: '',
        name: 'employee 3',
        url: '/employee3',
    },
    {
        id: 4,
        imageUrl: profileImg,
        rank: '임원',
        dep: '인사부',
        name: 'employee 4',
        url: '/employee4',
    },
    {
        id: 5,
        imageUrl: profileImg,
        rank: '과장',
        dep: '회계부',
        name: 'employee 5',
        url: '/employee5',
    },
    {
        id: 6,
        imageUrl: profileImg,
        rank: '사원',
        dep: '인사부',
        name: 'employee 6',
        url: '/employee6',
    },
    {
        id: 7,
        imageUrl: profileImg,
        rank: '차장',
        dep: '인사부',
        name: 'employee 7',
        url: '/employee7',
    },
    {
        id: 8,
        imageUrl: profileImg,
        rank: '대리',
        dep: '웹툰관리부',
        name: 'employee 8',
        url: '/employee8',
    },
    {
        id: 9,
        imageUrl: profileImg,
        rank: '부장',
        dep: '회계부',
        name: 'employee 9',
        url: '/employee9',
    },
    {
        id: 10,
        imageUrl: profileImg,
        rank: '대리',
        dep: '웹툰관리부',
        name: 'employee 10',
        url: '/employee10',
    },
    {
        id: 11,
        imageUrl: profileImg,
        rank: '사원',
        dep: '개발부',
        name: 'employee 11',
        url: '/employee11',
    },
];


const OrgChartView = () => {
    const isLoading = false;

    // 원하는 순서대로 rank를 배열로 나열
    const rankOrder = ['임원', '부장', '차장', '과장', '대리', '사원'];

    // 직급 순으로 정렬한 데이터
    const sortedData = FakeData.sort((a, b) =>
        rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank)
    );

    let prevRank = null; // 이전 rank 값

    return (
        <OrgChViewContainer>
            <h1>조직도</h1>
            <CardGrid>
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonCardButton key={index}>
                        <Skeleton width={80} height={120} />
                        </SkeletonCardButton>
                    ))
                ) : (
                    sortedData.map((emp) => {
                        const shouldAddBreak = emp.rank !== prevRank; // 현재 rank와 이전 rank 비교
                        prevRank = emp.rank; // 현재 rank를 이전 rank로 저장

                        return (
                            <>
                                {shouldAddBreak && <br />} {/* 줄바꿈 조건에 따라 <br /> 태그 추가 */}
                                <CardButton>
                                    <Img src={emp.imageUrl} alt={`${emp.rank} ${emp.name}의 프로필 사진`} />
                                    <EmpInfContainer>
                                        <CardRank>{emp.rank}</CardRank>
                                        <CardName>{emp.name}</CardName>
                                    </EmpInfContainer>
                                </CardButton>
                            </>
                        );
                    })
                )}
            </CardGrid>
        </OrgChViewContainer>
        
    );
}
export default OrgChartView;

const OrgChViewContainer = styled.div`
    margin-top: 40px;
    margin-left: 40px;
`

const EmpInfContainer = styled.div`
    width: 100px;
    height: 90px;
    flex-direction: column;
    border-radius: 8px;
    margin-top: 10px;
    background-color: #45aaed;
`;

const Img = styled.img`
    width: 80px;
    height: 110px;
    margin-top: 5px;
    border-radius: 8px;
`;

const CardGrid = styled.div`
    display: flex;
    margin-top: 20px;
`;

const CardButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 165px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 10px;
    padding: 5px 0px 20px 0px;
    background-color: #F7F7F7;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const CardRank = styled.div`
    color: ${theme.colors.white};
    margin: 0 auto;
    padding: 5px;
    font-size: 14px;
`;

const CardName = styled.div`
    margin-bottom: 7px;
    color: ${theme.colors.white};
    margin: 5px;
    font-weight: bold;
    font-size: 13px;
`;

const SkeletonCardButton = styled(CardButton)`
    background-color: #f9f9f9;
`;