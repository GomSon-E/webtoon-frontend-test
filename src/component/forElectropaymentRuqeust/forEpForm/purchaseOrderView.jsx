import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
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
import { Radio, Select, Space } from 'antd';
import FileInput from '../../fileUpload';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

let newCount = 1;

function createNewRowData() {
    const newData = {
        make: 'Toyota ' + newCount,
        model: 'Celica ' + newCount,
        price: 35000 + newCount * 17,
        zombies: 'Headless',
        style: 'Little',
        clothes: 'Airbag',
    };
    newCount++;
    return newData;
}

const options = [];

for (let i = 10; i < 20; i++) {
    options.push({
        value: 'employee' + i,
        label: 'employee' + i,
    });
}

const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};

const PurchaseOrderView = () => {
    const gridRef = useRef(null);

    const rowData = [
        {'시작일시': '', '종료일시': '', '부서코드': '', '사용부서' : '', '거래처명': '', '비용타입': '', 수량: '', 단가: '', '공급가액': '', '부가세액': '', '총 금액': '', '비고': ''},
    ];

    const rowData2 = [
        {'결재자': '', '참조자': ''},
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
        {field: '시작일시', sortable: true, filter: true,  headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true},
        {field: '종료일시', sortable: true, filter: true},
        {field: '부서코드', sortable: true, filter: true},
        {field: '사용부서', sortable: true, filter: true},
        {field: '거래처명', sortable: true, filter: true},
        {field: '비용타입', sortable: true, filter: true},
        {field: '수량', sortable: true, filter: true},
        {field: '단가', sortable: true, filter: true},
        {field: '공급가액', sortable: true, filter: true},
        {field: '총 금액', sortable: true, filter: true},
        {field: '비고', sortable: true, filter: true},
    ]);

    const [columnDefs2, setColumnDefs2] = useState([
        {field: '결재자', sortable: true, filter: true,  headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true},
        {field: '참조자', sortable: true, filter: true},
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
    
    const addItems = useCallback((addIndex) => {
        count++;
        const newItems = [
            createNewRowData(),
        ];
        const res = gridRef.current.api.applyTransaction({
            add: newItems,
            addIndex: addIndex,
        });
    }, []);
    
    //  ag-grid 현재 편집 모드 종료하는 역할
    const onBtStopEditing = useCallback(() => {
        gridRef.current.api.stopEditing();
    }, []);
    
    const onRemoveSelected = useCallback(() => {
        const selectedData = gridRef.current.api.getSelectedRows();
        const res = gridRef.current.api.applyTransaction({
            remove: selectedData,
        });
    }, []);

    let count = 1;

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            editorRef.current.setContent('<p>전자결재</p>');
        }
    };

    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const TodayDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        setTodayDate(TodayDate);
    }, []);

    return (
        <PurchaseOrderContainer>
            <FlexBox>
                <Title>구매 품의서</Title>
                <RequestBtn>요 청</RequestBtn>
            </FlexBox>

            <InputTitle placeholder='제목을 입력해주세요.'/>

            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={`
                    <div>
                        <h3>문서 종류: 구매 품의서</h3>
                        <p>&nbsp;</p>
                        <h3>1. 목적</h3>
                        <p>- </p>
                        <p>&nbsp;</p>
                        <h3>2. 내역</h3>
                        <p>- 사용 일자: 년 월 일 (요일)</p>
                        <p>- 사용자: </p>
                        <p>- 구매 비용: ₩ 원</p>
                        <p>- 업체: </p>
                        <p>- 상세 내역</p>
                    </div>
                `}
                apiKey='gkyfnz48wo3yqa2iodxgl1skx1rebhsdsdl0g5a6rt3pk1k2'
                id='electropaymentRuqeust'
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'searchreplace',
                        'fullscreen',
                        'media',
                        'table',
                        'code',
                        'help',
                        'emoticons',
                        'codesample',
                        'quickbars',
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'lists table link charmap searchreplace | ' +
                    'image media codesample emoticons fullscreen preview | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <div id='detailGrid' style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <BtnBox>
                        <Btn onClick={() => addItems(count)}>추 가</Btn>
                        <Btn onClick={onRemoveSelected}>선택 삭제</Btn>
                        <Btn onClick={onBtStopEditing}>등 록</Btn>
                        <Btn>표 삽입</Btn>
                    </BtnBox>
                    <div style={{ flexGrow: '1' }}>
                        <DetailGrid className="ag-theme-alpine">
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
                        </DetailGrid>
                    </div>
                </div>

                <div id='apprReferGrid' style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <BtnBox>
                        <Btn onClick={() => addItems(count)}>추 가</Btn>
                        <Btn onClick={onRemoveSelected}>선택 삭제</Btn>
                        <Btn onClick={onBtStopEditing}>등 록</Btn>
                        <Btn>표 삽입</Btn>
                    </BtnBox>
                    <div style={{ flexGrow: '1' }}>
                        <ApprReferGrid className="ag-theme-alpine">
                            <AgGridReact 
                                ref={gridRef}
                                rowData={rowData2}
                                columnDefs={columnDefs2}
                                defaultColDef={defaultColDef}
                                rowSelection="multiple"
                                animateRows={true}
                                editType="fullRow"
                                onCellValueChanged={onCellValueChanged}
                                onRowValueChanged={onRowValueChanged}
                            />
                        </ApprReferGrid>
                    </div>
                </div>

                {/* <FlexBox2>
                    <SubH>결재자:</SubH>
                    <Space
                        direction="vertical"
                        style={{
                        width: '250px',
                        marginRight: '30px',
                        }}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Please select"
                            onChange={handleChange}
                            style={{
                                width: '100%',
                            }}
                            options={options}
                        />
                    </Space>
                    <SubH>참조자:</SubH>
                    <Space
                        direction="vertical"
                        style={{
                        width: '250px',
                        }}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Please select"
                            onChange={handleChange}
                            style={{
                                width: '100%',
                            }}
                            options={options}
                        />
                    </Space>
                </FlexBox2> */}

                <FileInput />
            {/* <button onClick={log}>Log editor content</button> */}
        </PurchaseOrderContainer>
    )
};

export default PurchaseOrderView;

const PurchaseOrderContainer = styled.div`
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

const FlexBox = styled.div`
    display: flex;
`

const FlexBox2 = styled.div`
    display: flex;
    margin-top: 30px;
    margin-bottom: 20px;
`

const RequestBtn = styled.button`
    width: 90px;
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
    margin: 0px 15px 0px 840px;
    float: right;
`

const Btn = styled.button`
    width: 90px;
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
    margin: 0px 15px 0px 20px;
    float: right;
`

const InputTitle = styled.input`
    width: 1080px; 
    height: 40px;
    margin-bottom: 10px;
    border: 2px solid #EEEEEE;
    border-radius: 10px;
    padding-left: 10px;
    font-size: 14px;
    &::placeholder {
        color: #C3C3C3;
        font-size: 14px;
    }
`

const BtnBox = styled.div`
    margin: 20px 0px 20px 10px;
    display: flex;
    justify-content: flex-end;
`

const DetailGrid = styled.div`
    width: 1200px;
    height: 260px;
`

const ApprReferGrid = styled.div`
    width: 500px;
    height: 260px;
`

const SubH = styled.h4`
    margin: 5px 20px 0px 0px;
`