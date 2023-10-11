'use strict';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import SearchComponent from '../../search';
import theme from '../../../style/theme';

const fakeData = [
    {
      id: 1,
      day: '월',
      title: '월요일웹툰1',
      author: 'author 1',
      drawer: 'drawer 1',
      keyword: '코미디',
      url: '/data1',
    },
    {
        id: 2,
        day: '월',
        title: '월요일웹툰2',
        author: 'author 2',
        drawer: 'drawer 2',
        keyword: '코미디',
        url: '/data2',
      },
      {
        id: 3,
        day: '월',
        title: '월요일웹툰3',
        author: 'author 3',
        drawer: 'drawer 3',
        keyword: '코미디',
        url: '/data3',
      },
      {
        day: '화',
        title: '화요일웹툰1',
        author: 'author 1',
        drawer: 'drawer 1',
        keyword: '코미디',
        url: '/data1',
      },
      {
          day: '화',
          title: '화요일웹툰2',
          author: 'author 2',
          drawer: 'drawer 2',
          keyword: '코미디',
          url: '/data2',
        },
        {
          day: '화',
          title: '월요일웹툰3',
          author: 'author 3',
          drawer: 'drawer 3',
          keyword: '코미디',
          url: '/data3',
        },
        {
            day: '수',
            title: '수요일웹툰1',
            author: 'author 1',
            drawer: 'drawer 1',
            keyword: '코미디',
            url: '/data1',
          },
          {
              day: '수',
              title: '수요일웹툰2',
              author: 'author 2',
              drawer: 'drawer 2',
              keyword: '코미디',
              url: '/data2',
            },
            {
              day: '수',
              title: '수요일웹툰3',
              author: 'author 3',
              drawer: 'drawer 3',
              keyword: '코미디',
              url: '/data3',
            },
            
  ];

const AllWebtoonListView = () => {
    const [data, setData] = useState({});
    const [selectedDay, setSelectedDay] = useState('전체');
    const [filterText, setFilterText] = useState(''); // New state for filter text
  
    useEffect(() => {
      axios.get('http://localhost:5050/webtoon').then((response)=> {
        setData(response.data);
      })
    }, []);

    // 태그 선택 핸들러
    const selectDayHandler = (e) => {
        setSelectedDay(e.target.value);
    };
  
    // 선택된 부서에 해당하는 프로필 필터링
    const filteredDays = selectedDay === '전체' ? data : data.filter((emp) => emp.day === selectedDay);
  
    // ag-grid
    const columnDefs = [
      { headerName: '요일', field: 'day', width: 100 },
      { headerName: '제목', field: 'title', width: 400 },
      { headerName: '작가', field: 'author', width: 120 },
      { headerName: '그림', field: 'drawer', width: 120 },
      { headerName: '키워드', field: 'keyword', width: 280 },
    ];
  

    // 검색 기능
    const handleCellClick = (event) => {
      const column = event.colDef.field;
      const rowData = event.data;
      const url = rowData.url;
      if (column && url) {
        window.location.href = url;
      }
    };

    const gridOptions = {
      columnDefs: columnDefs,
      rowData: filteredDays,
      rowSelection: 'single',
      animateRows: true,
      pagination: true,
      paginationPageSize: 10,
      onCellClicked: handleCellClick,
    };

    const gridRef = useRef(null);

      useEffect(() => {
        gridRef.current = gridOptions.api;
      }, []);

      const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.setQuickFilter(
          document.getElementById('filter-text-box').value
        );
      }, []);
      

      const onPrintQuickFilterTexts = useCallback(() => {
        gridRef.current.forEachNode((rowNode, index) => {
          console.log(
            'Row ' + index + ' quick filter text is ' + rowNode.quickFilterAggregateText
          );
        });
      }, []);

      //
      const navigate = useNavigate();

      const handleClick = () => {
        navigate("/toonAdd");
    }
      

    return (
        <>
          <Title>전체 웹툰</Title>
            <ToonContainer>
                <SelectTagContainer>
                <select value={selectedDay} onChange={selectDayHandler}>
                    <option value="전체">전체</option>
                    <option value="월">월</option>
                    <option value="화">화</option>
                    <option value="수">수</option>
                    <option value="목">목</option>
                    <option value="금">금</option>
                    <option value="토">토</option>
                    <option value="일">일</option>
                </select>
                <Container />
                  <input
                        type="text"
                        id="filter-text-box"
                        placeholder="Filter..."
                        onInput={onFilterTextBoxChanged}
                      />
                  <RegistBtnContainer>
                        <RegistBtn onClick={handleClick}>작품 등록</RegistBtn>
                  </RegistBtnContainer>
                </SelectTagContainer>

                
                
                <div className="ag-theme-alpine" style={{ height: '400px', width: '1050px' }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={filteredDays}
                  gridOptions={gridOptions}
                  ref={gridRef}
                />

                </div>
            </ToonContainer>
        </>
    )
}

export default AllWebtoonListView;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 5%;
    margin-bottom: 20px;
`;

const RegistBtn = styled.button`
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

const ToonContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;

padding: 50px;
padding-left: 70px;
`;

const SelectTagContainer = styled.div`
margin-bottom: 20px;

select {
  width: 150px;
  height: 35px;
}
display: flex;
flex-direction: row;
`;

const Title = styled.div`
font-size: 30px;
padding-top: 40px;
padding-left: 4%;
font-weight: bold;
`;

const Container = styled.div`
padding-left: 600px;
`;