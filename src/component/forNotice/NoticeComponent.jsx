import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const fakeData = [
  {
    tag: '시스템',
    date: '2023-07-01',
    title: 'notice 1',
    author: '총관리자',
    dep: '전체',
    url: '/notice1',
    count: 1,
  },
  {
    tag: '서비스',
    date: '2023-07-02',
    title: 'notice 2',
    author: '인사팀장',
    dep: '인사부',
    url: '/notice2',
    count: 1,
  },
  {
    tag: '시스템',
    date: '2023-07-03',
    title: 'notice 3',
    author: '회계팀장',
    dep: '회계부',
    url: '/notice3',
    count: 1,
    },
    {
      tag: '시스템',
        date: '2023-07-04',
        title: 'notice 4',
        author: '영업팀장',
        dep: '웹툰관리부',
        url: '/notice4',
        count: 1,
    },
    {
      tag: '서비스',
        date: '2023-07-05',
        title: 'notice 5',
        author: '기술팀장',
        dep: '개발부',
        url: '/notice5',
        count: 1,
    },
    {
      tag: '서비스',
        date: '2023-07-06',
        title: 'notice 6',
        author: '총관리자',
        dep: '전체',
        url: '/notice6',
        count: 1,
    },
    {
      tag: '행사',
        date: '2023-07-07',
        title: 'notice 7',
        author: '인사팀장',
        dep: '인사부',
        url: '/notice7',
        count: 1,
    },
    {
      tag: '행사',
        date: '2023-07-08',
        title: 'notice 8',
        author: '회계팀장',
        dep: '회계부',
        url: '/notice8',
        count: 1,
    },
    {
      tag: '행사',
        date: '2023-07-09',
        title: 'notice 9',
        author: '영업팀장',
        dep: '웹툰관리부',
        url: '/notice9',
        count: 1,
    },
    {
      tag: '서비스',
        date: '2023-07-10',
        title: 'notice 10',
        author: '기술팀장',
        dep: '개발부',
        url: '/notice10',
        count: 1,
    },
    {
      tag: '시스템',
      date: '2023-07-01',
      title: 'notice 11',
      author: '총관리자',
      dep: '전체',
      url: '/notice1',
      count: 1,
    },
    {
      tag: '서비스',
      date: '2023-07-02',
      title: 'notice 12',
      author: '인사팀장',
      dep: '인사부',
      url: '/notice2',
      count: 1,
    },
    {
      tag: '시스템',
      date: '2023-07-03',
      title: 'notice 13',
      author: '회계팀장',
      dep: '회계부',
      url: '/notice3',
      count: 1,
      },
      {
        tag: '시스템',
          date: '2023-07-04',
          title: 'notice 14',
          author: '영업팀장',
          dep: '웹툰관리부',
          url: '/notice4',
          count: 1,
      },
      {
        tag: '서비스',
          date: '2023-07-05',
          title: 'notice 15',
          author: '기술팀장',
          dep: '개발부',
          url: '/notice5',
          count: 1,
      },
      {
        tag: '서비스',
          date: '2023-07-06',
          title: 'notice 16',
          author: '총관리자',
          dep: '전체',
          url: '/notice6',
          count: 1,
      },
      {
        tag: '행사',
          date: '2023-07-07',
          title: 'notice 17',
          author: '인사팀장',
          dep: '인사부',
          url: '/notice7',
          count: 1,
      },
      {
        tag: '행사',
          date: '2023-07-08',
          title: 'notice 18',
          author: '회계팀장',
          dep: '회계부',
          url: '/notice8',
          count: 1,
      },
      {
        tag: '행사',
          date: '2023-07-09',
          title: 'notice 19',
          author: '영업팀장',
          dep: '웹툰관리부',
          url: '/notice9',
          count: 1,
      },
      {
        tag: '서비스',
          date: '2023-07-10',
          title: 'notice 20',
          author: '기술팀장',
          dep: '개발부',
          url: '/notice10',
          count: 1,
      },
];

const NoticeComponent = () => {
    const [selectedTag, setSelectedTag] = useState('전체');
  
    // 태그 선택 핸들러
    const selectTagHandler = (e) => {
      setSelectedTag(e.target.value);
    };
  
    // 선택된 부서에 해당하는 프로필 필터링
    const filteredNotices = fakeData.filter((emp) => emp.tag === selectedTag);
  
    // ag-grid
    const columnDefs = [
      { headerName: '태그', field: 'tag', width: 100 },
      { headerName: '제목', field: 'title', width: 400, cellRendererFramework: CellRenderer },
      { headerName: '작성자', field: 'author', width: 100 },
      { headerName: '부서', field: 'dep', width: 100 },
      { headerName: '작성일자', field: 'date', width: 200 },
      { headerName: '조회수', field: 'count', width: 100 },
    ];
  
    const gridOptions = {
      columnDefs: columnDefs,
      rowData: filteredNotices,
      rowSelection: 'single',
      animateRows: true,
      pagination: true,
      paginationPageSize: 10,
      onCellClicked: handleCellClick,
    };
  
    // 셀 클릭 핸들러
    function handleCellClick(event) {
      const column = event.colDef.field;
      const rowData = event.data;
      const url = rowData.url;
      if (column  && url) {
        window.location.href = url;
      }
    }
  
    // 사용자 정의 셀 렌더러
    function CellRenderer(props) {
      const rowData = props.data;
      const title = rowData.title;
      const url = rowData.url;
      return (
        <Link to={url}>{title}</Link>
      );
    }

    //검색
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
  
    return (
    <>
     <Title>공지사항</Title>

      <NoticeContainer>
        <SelectDepContainer>
          <select value={selectedTag} onChange={selectTagHandler}>
            <option value="전체">전체</option>
            <option value="서비스">서비스</option>
            <option value="시스템">시스템</option>
            <option value="행사">행사</option>
          </select>
          <Container />
            <input
                        type="text"
                        id="filter-text-box"
                        placeholder="Filter..."
                        onInput={onFilterTextBoxChanged}
                      />
        </SelectDepContainer>
        
        <div className="ag-theme-alpine" style={{ height: '400px', width: '1050px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={filteredNotices}
            gridOptions={gridOptions}
          />
        </div>
      </NoticeContainer>
      </>

    );
  };
  
  export default NoticeComponent;
  
  const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 50px;
    padding-left: 70px;
  `;
  
  const SelectDepContainer = styled.div`
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
