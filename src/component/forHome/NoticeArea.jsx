import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const NoticeAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid #ccc;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`;

const CardButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 180px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 8px;
  background-color: #f1f1f1;
  cursor: pointer;
`;

const CardTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardContent = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const FakeData = [
  {
    id: 1,
    title: 'Card 1',
    content:
      'This is the content of Card 1. It can be a bit longer and may overflow to the next line.',
    url: '/card1',
  },
  {
    id: 2,
    title: 'Card 2',
    content:
      'This is the content of Card 2. It can be a bit longer and may overflow to the next line.',
    url: '/card2',
  },
  {
    id: 3,
    title: 'Card 3',
    content:
      'This is the content of Card 3. It can be a bit longer and may overflow to the next line.',
    url: '/card3',
  },
  {
    id: 4,
    title: 'Card 4',
    content:
      'This is the content of Card 4. It can be a bit longer and may overflow to the next line.',
    url: '/card4',
  },
  {
    id: 5,
    title: 'Card 5',
    content:
      'This is the content of Card 5. It can be a bit longer and may overflow to the next line.',
    url: '/card5',
  },
  {
    id: 6,
    title: 'Card 6',
    content:
      'This is the content of Card 6. It can be a bit longer and may overflow to the next line.',
    url: '/card6',
  },
];

const SkeletonCardButton = styled(CardButton)`
  background-color: #f9f9f9;
`;

const NoticeArea = () => {
  const isLoading = false; // Set the loading state based on your data loading process

  return (
    <NoticeAreaContainer>
      <Title>공지사항</Title>
      <ButtonContainer>
        <Link to="/notice">
          <button>전체 공지사항 보기</button>
        </Link>
      </ButtonContainer>
      <CardGrid>
        {FakeData.map((card) => (
          <Link to={card.url} key={card.id}>
            {/* Replace CardButton with SkeletonCardButton during loading */}
            {isLoading ? (
              <SkeletonCardButton>
                <Skeleton width={80} height={120} />
              </SkeletonCardButton>
            ) : (
              <CardButton>
                <CardTitle>{card.title}</CardTitle>
                <CardContent>{card.content}</CardContent>
              </CardButton>
            )}
          </Link>
        ))}
      </CardGrid>
    </NoticeAreaContainer>
  );
};

export default NoticeArea;
