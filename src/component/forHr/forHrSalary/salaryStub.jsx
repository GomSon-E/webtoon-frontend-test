import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import HorizonLine from '../../horizonLine';
// import { useEffect, useMemo, useState } from 'react';

const SalaryStub = () => {
    const rowData = [
        {급여월: '2023-02', '급여 지급일': '2023-02-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
        {급여월: '2023-03', '급여 지급일': '2023-03-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
        {급여월: '2023-04', '급여 지급일': '2023-04-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
        {급여월: '2023-05', '급여 지급일': '2023-05-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
        {급여월: '2023-06', '급여 지급일': '2023-06-10', '지급 합계': '72,250,000', '공제 후 지급액': '65,025,000'},
    ];

    const columnDefs = [
        {field: '급여월', sortable: true, filter: true, width: '150px'},
        {field: '급여 지급일', sortable: true, filter: true, width: '180px'},
        {field: '지급 합계', sortable: true, filter: true, width: '180px'},
        {field: '공제 후 지급액', sortable: true, filter: true, width: '180px'},
    ];

    // useEffect(() => {
    //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //     .then(result => result.json())
    //     .then(rowData => setRowData(rowData))
    // }, []);

    return (
        <SalaryStubContainer>
            <Title>급여 명세서</Title>
            <HorizonLine />
            <SalaryStubGrid className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='multiple'
                />
            </SalaryStubGrid>
        </SalaryStubContainer>
    )
};

export default SalaryStub;

const SalaryStubContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const SalaryStubGrid = styled.div`
    width: 720px;
    height: 300px;
`
