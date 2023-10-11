import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import HorizonLine from '../../horizonLine';
import { Link } from 'react-router-dom';

const fakeData = [
    {
        thumnail: '',
        count: '1',
        title: '에피소드1',
        manager: '또롱',
        date: '2023-07-17',
        url: '/toon1',
    },
]

const ToonGrid = (Id) => {
    const Toons =  fakeData
  

    // ag-grid
    const columnDefs = [
        { headerName: '회차 번호', field: 'count', width: 150},
        { headerName: '회차 제목', field: 'title', width: 450}, 
        { headerName: '업로드 일자', field: 'date', width: 300},    
        { headerName: '담당자', field: 'manager', width: 150},    
    ];

    const gridOptions = {
        columnDefs: columnDefs,
        rowData: Toons,
        rowSelection: 'single',
        animateRows: true,
        pagination: true,
        paginationPageSize: 10,
        onCellClicked: handleCellClick,
      };
    
      // 셀 클릭 핸들러
      function handleCellClick(event) {
        const column = event.colDef.field;
        const Toons = event.data;
        const url = Toons.url;
        if (column  && url) {
          window.location.href = url;
        }
      }


    //data.title
    //const [data, setData] = useState({});

    //useEffect(() => {
    //    axios.get('http://localhost:5050/quals/'+Id).then((response)=> {
    //      setData(response.data);
    //      //console.log("ddddddd");
    //    })
    //  }, []);

    return (
        <ToonGridContainer>
            <Title>회차정보</Title>
            <HorizonLine />
            <Toon className="ag-theme-alpine">
                <AgGridReact 
                    rowData={Toons}
                    columnDefs={columnDefs}
                    animateRows={true}
                    gridOptions={gridOptions}
                
                />
            </Toon>
        </ToonGridContainer>
        
    )
};

export default ToonGrid;

const ToonGridContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 1020px;
    height: 500px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const Toon = styled.div`
    width: 1020px;
    height: 400px;
`