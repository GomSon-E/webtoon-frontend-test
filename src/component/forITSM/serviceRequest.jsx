'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
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
//import NumericCellEditor from './numericCellEditor';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';
import { Button, Upload, message, Modal } from 'antd';

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


const ServiceRequest = () => {
  //달력(요청, 납기일)

  const [startDate, setStartDate] = useState(new Date());
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
  const [selectedRequestType, setSelectedRequestType] = useState('');
  
  const [selectedRequester, setSelectedRequester] = useState('');
  const [selectedAssigner, setSelectedAssigner] = useState('');
  const [SelectedTitle, setSelectedTitle] = useState('');
  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedthumbnail, setSelectedThumbnail] = useState(null);

  const handleSubmitClick = () => {
    //console.log(finalId, "finalId 결과값"); 

   axios.post('http://localhost:5050/register',
     {
      selectedDeliveryDate: selectedDeliveryDate,           
      selectedRequestType: selectedRequestType,  
      selectedRequester: selectedRequester,  
      selectedAssigner: selectedAssigner,
      SelectedTitle: SelectedTitle,
      selectedRequest: selectedRequest,
      selectedthumbnail: selectedthumbnail,
     },
     {
       headers: {
         'Content-Type': 'application/json',
       },
     })
     .then((result) => {
       if (result.status === 'done') {
        message.success(`[ITSM] 요청이 정상적으로 등록되었습니다.`);
      } 
     })
     .catch((error) => {
      message.error('[ITSM] 요청이 정상적으로 등록되지 않았습니다.');
     })
 };

 const assigners = []

  const SelectAssignerhandler = (value) => {
    setSelectedAssigner(value);
    console.log(value);
    assigners.push(value);
  };
  const SelectTitlehandler = (e) => {
    setSelectedTitle(e.target.value);
  };
  const SelectRequesthandler = (e) => {
    setSelectedRequest(e.target.value);
  };
  const SelectRequestTypehandler = (e) => {
    setSelectedRequestType(e.target.value);
  };
  const SelectThumbnailhandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setSelectedThumbnail(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  //AgGridReact
  const gridRef = useRef(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const onCellValueChanged = useCallback((event) => {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }, []);

  const onRowValueChanged = useCallback((event) => {
    var data = event.data;
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

  //요청 상품
  const [columnDefs, setColumnDefs] = useState([
    { headerName: '요청 품목', field: 'item', editable: true,
          headerCheckboxSelection: true,checkboxSelection: true, showDisabledCheckboxes: true , width: 250 },
    { headerName: '요청 수량', field: 'quantity', editable: true , width: 100 },
    { headerName: '예상 비용(단위:만원)', field: 'price', editable: true , width: 200 },
  ]);

  const rowData = [
    {'item': '품목', 'quantity': 0, 'price': 0},
  ];

  //담당자
  const [columnDefs2, setColumnDefs2] = useState([
    { headerName: '이름', field: 'name', editable: false,
          headerCheckboxSelection: true,checkboxSelection: true, showDisabledCheckboxes: true , width: 250 },
    { headerName: '부서', field: 'dept', editable: false , width: 150 },
    { headerName: '직급', field: 'responsibilities ', editable: false , width: 100 },
  ]);

  const rowData2 = [
    {'name': '김민수', 'dept': '인사 1팀', 'responsibilities': '부장'},
    {'name': '김민정', 'dept': '인사 1팀', 'responsibilities': '차장'},
    {'name': '김민자', 'dept': '인사 1팀', 'responsibilities': '과장'},
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      cellDataType: false,
    };
  }, []);

  const clearData = useCallback(() => {
    const rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    const res = gridRef.current.api.applyTransaction({
      remove: rowData,
    });
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

  const onBtStopEditing = useCallback(() => {
    gridRef.current.api.stopEditing();
  }, []);

  const onRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({
      remove: selectedData,
    });
  }, []);

  // Ag-Grid에서 row 선택 시 호출되는 이벤트 핸들러
  const onRowSelected = useCallback((event) => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 1) {
      setSelectedAssigner(selectedRows[0].name); // 선택한 담당자 이름으로 업데이트
      setModalOpen(false);
    } 
  }, []);

  const [fileList, setFileList] = useState([]);

  const [setInfo, setSelectedInfo] = useState(null);

  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);

    setSelectedInfo(info.url);

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // 아래 action 부분 setInfo 데이터로 바꿔볼 예정

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: true,
  };

  var count = 1;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Title>서비스 요청</Title>
      <RegistBtnContainer>
                    <RegistBtn onClick={handleSubmitClick}>요청</RegistBtn>
      </RegistBtnContainer>
      
      <MainContainer>
          <RangeContainer1>
          <Container>
              <InputTitle>요청일</InputTitle>
              <Div />
              <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                disabled
              />
            </Container>

            <Container>
              <InputTitle>납기일</InputTitle>
              <Div />
              <DatePicker
                  selected={selectedDeliveryDate}
                  onChange={(date) => setSelectedDeliveryDate(date)}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  placeholderText="납기일"
                  />
          </Container>
            <Container>
                <InputTitle>담당자</InputTitle><Div/>
                <Button type="primary" onClick={() => setModalOpen(true)}>
                  {selectedAssigner ? selectedAssigner : '담당자'}
                </Button>
                  <Modal
                    title="담당자 선택"
                    centered
                    open={modalOpen}
                    onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                  >
                    <GridContainer> 
                          <div style={{ height: '150px', display: 'flex', flexDirection: 'column' }}>
                            
                            <div>
                              {[assigners]}
                            </div>
                            <div style={{ flexGrow: '1' }}>
                              <div style={gridStyle} className="ag-theme-alpine">
                                <AgGridReact
                                  ref={gridRef}
                                  rowData={rowData2}
                                  columnDefs={columnDefs2}
                                  defaultColDef={defaultColDef}
                                  rowSelection={'single'}
                                  animateRows={true}
                                  onRowSelected={onRowSelected} // 이벤트 핸들러 등록
                                />
                            </div>
                          </div>
                          </div>
                      </GridContainer>
                  </Modal>
            </Container>

            <Container>
            <InputTitle>요청 타입</InputTitle><Div/>
                <Select value={selectedRequestType} onChange={SelectRequestTypehandler}>
                            <Option value="구매">구매 </Option>
                            <Option value="업무 지원">업무 지원</Option>
                </Select>
            </Container>
         
            <Container>
                <InputTitle>제목</InputTitle><Div2/><Input type="text" placeholder="제목" onChange={SelectTitlehandler}/>
            </Container>
            <Container>
            <InputTitle>요청사항</InputTitle><TextArea placeholder="요청 사항" onChange={SelectRequesthandler}/>
          </Container>

          </RangeContainer1>
        <RangeContainer4>
          <Container>
            <InputTitle>요청 상품</InputTitle><Div2/>
            <GridContainer> 
                  <div style={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <button onClick={() => addItems(count)}>Add Items Index</button>
                      <button onClick={onRemoveSelected}>Remove Selected</button>
                      <button onClick={clearData}>Clear Data</button>
                      <button onClick={onBtStopEditing}>stop ()</button>
                    </div>
                    <div style={{ flexGrow: '1' }}>
                      <div style={gridStyle} className="ag-theme-alpine">
                        <AgGridReact
                          ref={gridRef}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          defaultColDef={defaultColDef}
                          rowSelection={'multiple'}
                          animateRows={true}
                          editType={'fullRow'}
                          onCellValueChanged={onCellValueChanged}
                          onRowValueChanged={onRowValueChanged}
                        />
                    </div>
                  </div>
                  </div>
              </GridContainer>
            </Container>
            <Div3 />
            
          <Container>
            <InputTitle>첨부 파일</InputTitle><Div2 />
              <Container2>
                <Upload {...props} fileList={fileList}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Container2>
           </Container> 
        </RangeContainer4>
      </MainContainer>
      
    </>
  );
};

export default ServiceRequest;

const GridContainer = styled.div`
    width: 400px;
    height: 100px;
`

const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 30px 50px;
  height: 540px;
  padding-top: 50px;
`;

const Input = styled.input`
  height: 30px;
  border: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const TextArea = styled.textarea`
  height: 150px;
  width: 350px;
  border: transparent;
  background: transparent;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
  resize: none;
`;

const InputTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 15px;
  padding-top: 7px;
`;


const RangeContainer4 = styled.div`
  width: 100%;
  height: 100%;
`;


const RangeContainer1 = styled.div`
  width: 60%;
  height: 100%;
  padding-left: 30px;
`;

const Div = styled.div`
  padding: 8px;
`;

const Div2 = styled.div`
  padding: 13px;
`;

const Div3 = styled.div`
  padding: 40px;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 40px;
  padding-left: 4%;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 13px;
  margin: 20px;
`;

const Container2 = styled.div`
  border: 1px solid #ccc;
  width: 360px;
  padding: 20px;
`;

const Select = styled.select`
  width: inherit;
  height: 30px;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  padding: 0 10px;
  padding-top: 2px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const Option = styled.option`
  background: #ffffff;
  font-size: 15px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
`;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 86%;
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