import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const RefDocsView = () => {
    const [selectedCell, setSelectedCell] = useState(null);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (selectedCell !== null) {
            axios.get(`http://localhost:5050/plas/documents/myCC/${selectedCell}`)
                .then(response => {
                    const data = response.data[selectedCell + 'UserList'];
                    setRowData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            
        }
    }, [selectedCell]);

    const columnDefs = [      
        {field: '문서종류', sortable: true, filter: true, width: '130px'},
        {field: '작성일', sortable: true, filter: true, width: '150px'},
        {field: '제목', sortable: true, filter: true, width: '250px'},
        {field: '부서', sortable: true, filter: true, width: '130px'},
        {field: '작성자', sortable: true, filter: true, width: '110px'},
        {field: '결재대기자', sortable: true, filter: true, width: '168px'},
        {field: '최종결재자', sortable: true, filter: true, width: '130px'},
        {field: '상태', sortable: true, filter: true, width: '130px', 
            cellStyle: params=> {
                if(params.value === '상신') {
                    return {color:'#F8F1F1', 'background-color':'#91CDF2', 'font-weight': 'bold'}
                } else return {color:'#F8F1F1', 'background-color':'#F2ACBF', 'font-weight': 'bold'}
        }},
    ];

    function handleCellClick(params) {
        setSelectedCell(params.column.getColDef().field);
    }

    return (
        <>
            <Title>참조 문서 조회</Title>                
            <EntitlementGrid className="ag-theme-alpine">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='multiple'
                        pagination= {true}
                        paginationPageSize= {20}
                        onCellClicked= {handleCellClick}
                    />
            </EntitlementGrid>
        </>
    )
};

export default RefDocsView;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const EntitlementGrid = styled.div`
    margin-top: 40px;
    width: 1200px;
    height: 960px;
`