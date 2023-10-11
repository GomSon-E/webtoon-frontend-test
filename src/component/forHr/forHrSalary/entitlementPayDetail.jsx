import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import theme from '../../../style/theme';
import HorizonLine from '../../horizonLine';
import {
    CellValueChangedEvent,
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    ICellEditorComp,
    ICellEditorParams,
    RowValueChangedEvent,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const EntitlementPayDetail = () => {
    const gridRef = useRef(null);

    const rowData = [
        {'자격증 명': '정보처리기사', 지급액: '150,000'},
    ];

    const onCellValueChanged = useCallback((event) => {
        console.log(
            'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
        );
    }, []);
    
    const onRowValueChanged = useCallback((event) => {
        let data = event.data;
        console.log(
            'onRowValueChanged: (' +
                data.item +
                ', ' +
                data.quantity +
                ', ' +
                data.price +
            ')'
        );
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        { field: '자격증 명', editable: true,
            headerCheckboxSelection: true,checkboxSelection: true, showDisabledCheckboxes: true , width: 250 },
        { field: '지급액', editable: true , width: 100 },
    ]);

    // useEffect(() => {
    //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //     .then(result => result.json())
    //     .then(rowData => setRowData(rowData))
    // }, []);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
            cellDataType: false,
        };
    }, []);
    
    //  ag-grid 현재 편집 모드 종료하는 역할
    const onBtStopEditing = useCallback(() => {
        gridRef.current.api.stopEditing();
    }, []);
    
    let count = 1;

    return (
        <EntitlementPayDetailContainer>
            <Title>자격수당 상세</Title>
            <HorizonLine />
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <Btn onClick={onBtStopEditing}>완료</Btn>
                <div style={{ flexGrow: '1' }}>
                <EntitlementPayGrid className="ag-theme-alpine">
                    <AgGridReact 
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowSelection="multiple"
                        animateRows={true}
                        editType="fullRow"
                        onCellValueChanged={onCellValueChanged}
                        onRowValueChanged={onRowValueChanged}
                    />
                </EntitlementPayGrid>
            </div>
            </div>
        </EntitlementPayDetailContainer>
    )
};

export default EntitlementPayDetail;

const EntitlementPayDetailContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const EntitlementPayGrid = styled.div`
    width: 405px;
    height: 261px;
`

const Btn = styled.button`
    width: 70px;
    height: 30px;
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
    margin: 0px 15px 20px 330px;
`