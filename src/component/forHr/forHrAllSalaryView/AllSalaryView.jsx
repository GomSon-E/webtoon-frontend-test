import React, { useRef } from 'react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AllSalaryView = () => {
    const gridRef = useRef(null);

    const columnDefs = [      
        {field: '이름', sortable: true, filter: true, width: '155px', headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: false},
        {field: '사번', sortable: true, filter: true, width: '140px'},
        {field: '부서', sortable: true, filter: true, width: '150px'},
        {field: '팀', sortable: true, filter: true, width: '120px'},
        {field: '급여', sortable: true, filter: true, width: '150px'},
        {field: '급여 지급일', sortable: true, filter: true, width: '150px', editable: false},
        {field: '지급 상태', sortable: true, filter: true, width: '153px', 
            cellStyle: params=> {
                if(params.value === '지급') {
                    return {color:'#F8F1F1', 'background-color':'#91CDF2', 'font-weight': 'bold'}
                } else return {color:'#F8F1F1', 'background-color':'#F2ACBF', 'font-weight': 'bold'}
        }},
    ];

    const rowData = [
        {이름: '안유진', 사번 : '1234', 부서: '웹툰관리부', 팀: '1팀', 급여: '3,084,000', '급여 지급일': '2023-08-01', '지급 상태': '지급', url: '/content1'},
        {이름: '장원영', 사번 : '2345', 부서: '인사부', 팀: '1팀', 급여: '3,100,500', '급여 지급일': '2023-08-01', '지급 상태': '지급', url: '/content2'},
        {이름: '김지원', 사번 : '3456', 부서: '회계부', 팀: '2팀', 급여: '3,516,000', '급여 지급일': '2023-08-01', '지급 상태': '미지급', url: '/content3'},
    ];

    function handleCellClick(event) {
        const column = event.colDef.field;
        const requests = event.data;
        const url = requests.url;
        if (column  && url) {
            window.location.href = url;
        }
    }

    const handleEditClick = () => {
        // '급여 지급일' 편집 
        const gridApi = gridRef.current.api;
        gridApi.setColumnDefs(columnDefs.map(col => col.field === '급여 지급일' ? { ...col, editable: true } : col));
    };

    const isRowSelectable = params => {
        return params.data['지급 상태'] !== '지급'; // '지급 상태'가 '지급'인 행은 선택 불가능하도록 설정
    };

    return (
        <>
            <FlexBox>
                <Title>전체 급여 관리</Title>
                <BtnContainer>
                        <Btn onClick={handleEditClick}>수 정</Btn>
                        <Btn>저 장</Btn>
                </BtnContainer>
            </FlexBox>
                <EntitlementGrid className="ag-theme-alpine">
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            animateRows={true}
                            rowSelection='multiple'
                            isRowSelectable={isRowSelectable}
                            onCellClicked= {handleCellClick}
                        />
                </EntitlementGrid>
        </>
    )
};

export default AllSalaryView;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const BtnContainer = styled.div`
    display: flex;
    margin-left: 570px;
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

const FlexBox = styled.div`
    display: flex;
    margin-bottom: 30px;
`

const EntitlementGrid = styled.div`
    width: 1020px;
    height: 260px;
`