import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Collapse } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const MyHours = () => {

    // useEffect(() => {
  //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

    const [columnDefs, setColumnDefs] = useState([
        {field: '이번주 누적', width: 150},
        {field: '이번주 초과', width: 150},
        {field: '이번달 누적', width: 150},
        {field: '이번달 초과', width: 150},
    ]);

    const [rowData, setRowData] = useState([
        {field: '60H'},
        {field: '20H'},
        {field: '360H'},
        {field: '40H'},
    ]);

    return (
        <>
                <div className="ag-theme-alpine" style={{width: 650, height: 90}}>

                    <AgGridReact

                        rowData={rowData} // Row Data for Rows

                        columnDefs={columnDefs} // Column Defs for Columns

                        animateRows={true} 

                    />
                </div>
        </>
    )
}

export default MyHours;