import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import HorizonLine from '../../horizonLine';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import FileDownloader from '../../fileDownloader';

const FakeNoticeData = [
    {
        id: 1,
        startDate: '2023.08.22',
        deliveryDate: '2023.08.22',
        requester: '요청자1',
        assigners: '담당자1, 담당자2, 담당자3, 담당자4',
        requestType: '구매',
        title: '제목',
        content: `안녕하세요, 네이버웍스입니다.
        ​
        3월 전직원 대상 강연을 기획하고 있습니다. 관련 강연을 요청 드리고자 합니다.`,
        file: 'fileName'
    },
];


const ServiceDetailComponent = () => {

  const [selectedId, setSelectedId] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  //아래는 파일 첨부 필요하면 넣기
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  
  const [data, setData] = useState({});
  const [selectedDay, setSelectedDay] = useState('전체');
  const [filterText, setFilterText] = useState(''); // New state for filter text

  /*useEffect(() => {
    axios.get('http://localhost:5050/webtoon').then((response)=> {
      setData(response.data);
    })
  }, []);*/

  
  // ag-grid
  const columnDefs = [
    { headerName: '요청 품목', field: 'item', width: 440 },
    { headerName: '요청 수량', field: 'quantity', width: 300 },
    { headerName: '예상 비용(단위:만원)', field: 'price', width: 300 },
  ];

  const rowData = [
    {'item': '블루투스 키보드', 'quantity': '3', 'price': '45'},
    {'item': '블루투스 이어폰', 'quantity': '3', 'price': '60'},
    {'item': '노트북', 'quantity': '2', 'price': '300'},
  ];

    const navigate = useNavigate();

    const handleHomeClick = () => {
      navigate('/');
    }

    const handleNoticeClick = () => {
      navigate('/itRequestListView');
    }

    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      animateRows: true,
      pagination: true,
      paginationPageSize: 5,
    };

  return (
    <>
    <Title>ITSM 서비스 조회</Title>
    <BreadContainer>
      <Breadcrumb
          items={[
            {
              onClick: handleHomeClick,
              title: <HomeOutlined />,
            },
            {
              onClick: handleNoticeClick,
              title: (
                <>
                  <UserOutlined />
                  <span>ITSM 서비스 조회</span>
                </>
              ),
            },
            {
              title: `${FakeNoticeData[0].title}`,
            },
          ]}
        />
    </BreadContainer>
        <NoticeContainer>
          <ContentTitle>{FakeNoticeData[0].title}</ContentTitle>

          <ContainerBox>
            <ContainerBox>
              <Container>
                <SmallTitle>요청일</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].startDate}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>

            <ContainerBox>
              <Container>
                <SmallTitle>납기일</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].deliveryDate}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>
          </ContainerBox>
          
          <ContainerBox>
            <ContainerBox>
              <Container>
                <SmallTitle>요청자</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].requester}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>

            <ContainerBox>
              <Container>
                <SmallTitle>담당자</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].assigners}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>
          </ContainerBox>
          <ContainerBox>
              <Container>
                <SmallTitle>타입</SmallTitle>
              </Container>
              <SmallContentContainer>
                <SmallContent>{FakeNoticeData[0].requestType}</SmallContent>
              </SmallContentContainer>
            </ContainerBox>
        <HorizonLine />
        <ContentContainer>
          {FakeNoticeData[0].content}
        </ContentContainer>
        <ContentContainer2>
        <div className="ag-theme-alpine" style={{ height: '400px', width: '1050px' }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  gridOptions={gridOptions}
                  domLayout='autoHeight'
                  suppressAutoSize={false}
                />
                </div>
                <FileContainer>
          <FileDownloader files={[{ name: FakeNoticeData[0].title, filename: FakeNoticeData[0].file }]}/>
        </FileContainer>
        </ContentContainer2>
        
        </NoticeContainer>
        
      </>

    );
};
  
export default ServiceDetailComponent; 

const NoticeContainer = styled.div`
  margin: 30px;
  margin-top: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 800px;
  width: 100%
  align-items: center;
`;

const BreadContainer = styled.div`
  margin-left: 75%
`;

const Container = styled.div`
  border: 1px dashed #ccc;
  width: 50px;
  height: 25px;
  padding: 20px;
`;

const FileContainer = styled.div`
  border: 1px dashed #ccc;
  width: 100%
  height: 10px;
  margin: 30px;
  margin-top: 0px;
  border-radius: 8px;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
`;

  const Title = styled.div`
  font-size: 30px;
  padding-top: 40px;
  padding-left: 4%;
  font-weight: bold;
`;

const ContentTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 20px;
`;

const SmallTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
`;

const SmallContent= styled.div`
    font-size: 15px;
`;

const SmallContentContainer = styled.div`
  border: 1px dashed #ccc;
  width: 440px;
  height: 25px;
  padding: 20px;
`;

const ContentContainer = styled.div`
  width: 90%
  height: 200px;
  padding: 50px;;
`;

const ContentContainer2 = styled.div`
  width: 90%
  height: 100px;
  padding: 50px;
`;