import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const EmployeeAttendanceView = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [leftPanelData, setLeftPanelData] = useState([]);

  const handleCellClick = (params) => {
      setSelectedCell(params.column.getColDef().field);
  };

  useEffect(() => {
      if (selectedCell !== null) {
        
          axios.get(`http://localhost:5050/attendance/${selectedCell}`)
              .then(response => {
                  const data = response.data.totalAttendanceSummaryDto[selectedCell + 'UserList'];
                  setRowData(data);
              })
              .catch(error => {
                  console.error('Error fetching data:', error);
              });
          
      }
      axios.get('http://localhost:5050/attendance/total')
            .then(response => {
                const totalSummary = response.data.totalAttendanceSummaryDto;
                setLeftPanelData([
                    {'전체 직원': totalSummary.totalUserCnt},
                    {'출근': totalSummary.onTimeStartUserCnt},
                    {'퇴근': totalSummary.onTimeEndUserCnt},
                    {'미출근': totalSummary.notStartUserCnt},
                    {'지각': totalSummary.lateStartUserCnt},
                    {'휴가': totalSummary.dayOffUserCnt},
                    {'연장근무': totalSummary.notEndUserCnt},
                ]);
            }).catch(error => {
              console.error('Error fetching left panel data:', error);
          });
  }, [selectedCell]);

  const leftPanelColumnDefs = [
    {field: '전체 직원'},
    {field: '출근'},
    {field: '퇴근'},
    {field: '미출근'},
    {field: '지각'},
    {field: '휴가'},
    {field: '연장근무'},
  ];

  const rightPanelColumnDefs = [
    { headerName: '부서명', field: 'dept', width: 100 },
    { headerName: '팀번호', field: 'dept', width: 100 },
    { headerName: '직급', field: 'position', width: 100 },
    { headerName: '사번', field: 'id', width: 150 },
    { headerName: '이름', field: 'name', width: 100 },
    { headerName: '전화번호', field: 'phoneNumber', width: 200 },
    { headerName: '이메일', field: 'email', width: 200 },
    // ... (other columns)
  ];

  const rowColumnData = [
    // ... (rowData for right panel)
  ];

  

  return (
    <Container>
      <LeftPanel>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            columnDefs={leftPanelColumnDefs}
            rowData={leftPanelData}
            onCellClicked={handleCellClick}
          />
        </div>
      </LeftPanel>
      <RightPanel>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                columnDefs={rightPanelColumnDefs}
                rowData={rowData}
            />
        </div>
    </RightPanel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
`;

const Panel = styled.div`
  padding: 20px;
`;

const LeftPanel = styled(Panel)`
  background-color: #f0f0f0;
  height: 110px;  
  width: 1000px;
`;

const RightPanel = styled(Panel)`
  background-color: #ffffff;
  height: 500px;
  width: 1000px;
`;

export default EmployeeAttendanceView;

