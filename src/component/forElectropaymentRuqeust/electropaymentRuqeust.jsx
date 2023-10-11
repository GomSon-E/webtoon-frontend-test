import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';

const ElectropaymentRuqeust = () => {
    const rowData = [
        {번호: '1', '결재 양식': '구매 품의서', url: '/epFormPurchaseOrder'},
        {번호: '2', '결재 양식': '법인카드 사용내역서', url: '/epFormCorporateCardUsage'},
        {번호: '3', '결재 양식': '비용집행 요청서', url: '/epFormReimbursementRequest'},
        {번호: '4', '결재 양식': '연장/휴일근무 신청서', url: '/epFormWorkRequest'},
    ];

    const columnDefs = [
        {field: '', width: '180px'},
        {field: '번호', width: '340px'},
        {field: '결재 양식', width: '345px'},
    ];

    function handleCellClick(event) {
        const column = event.colDef.field;
        const requests = event.data;
        const url = requests.url;
        if (column  && url) {
            window.location.href = url;
        }
    }

    return (
        <EpRuqeustAreaContainer>
            <Title>결재 요청</Title>
            <EpFormGrid className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='single'
                    domLayout= 'autoHeight'
                    onCellClicked= {handleCellClick}
                />
            </EpFormGrid>
        </EpRuqeustAreaContainer>
    )
};
export default ElectropaymentRuqeust;

const EpRuqeustAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 40px;
    margin-left: 40px;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 40px;
`;

const EpFormGrid = styled.div`
    width: 870px;
    margin-left: 150px;
`