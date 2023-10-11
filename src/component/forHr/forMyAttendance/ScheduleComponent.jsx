import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Collapse } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ScheduleComponent = () => {

    const gridRef = useRef(); // Optional - for accessing Grid's API
    //const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  
    const [columnDefs, setColumnDefs] = useState([
        {field: '일자'},
        {field: '업무시작'},
        {field: '업무종료'},
        {field: '총 근무시간'},
        {field: '근무시간 상세'},
    ]);

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        generateRowData();
    }, []);

    //임시데이터
    const randomRowData = ['04 월', '08:00:00','18:00:00','8h 20m 0s', "기본 8h 10m 0s/ 연장 0h 10m 0s/ 야간 0h 0m 0s"]

    const generateRowData = () => {
        
    const generatedData = items.map((item) => ({
        '일자': item,
        '업무시작': '',
        '업무종료': '',
        '총 근무시간': '',
        '근무시간 상세': '',
    }));
    setRowData(generatedData);
    };


const defaultColDef = useMemo( ()=> ({
    sortable: true
    }));



    // Example load data from server(후 작업)
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, []);

    const Cell = () => {
        return (
        <>
            <div className="ag-theme-alpine" style={{width: 1050, height: 100}}>

                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API

                    rowData={rowData} // Row Data for Rows

                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties

                    animateRows={true} 

                    />
            </div>
        </>
        )
    }
    
    const items = [
        {
        key: '1',
        label: '1주차',
        children:
            <>
                <Cell/>
            </>
        ,
        },
        {
        key: '2',
        label: '2주차',
        children: 
            <>
                <Cell/>
            </>
        ,
        },
        {
        key: '3',
        label: '3주차',
        children:
        <>
            <Cell/>
        </>
        ,
        },
        {
            key: '4',
            label: '4주차',
            children:
            <>
                <Cell/>
            </>
        ,
        },
        {
            key: '5',
            label: '5주차',
            children:
            <>
                <Cell/>
            </>
        ,
        },
    ];

    const onChange = (key) => {
        console.log(key);};
    
      //defaultActiveKey={['1']}
    return (
        <>
            <Collapse items={items}  onChange={onChange} />
        </>
    )
}

export default ScheduleComponent;