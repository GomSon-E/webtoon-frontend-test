import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../../style/theme';
import HorizonLine from '../../horizonLine';
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


const FakeProfileData = [
    {
        id: 1,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/4519/4519678.png',
        name: 'employee 1',
        dep: '인사부',
        rank: '사원',
        empId: 1234,
        joinDate: '2022-07-13',
        phone: '010-1234-1234',
        email: 'employee1@gmail.com',
        birthDate: '1998-03-14',
        annualLeave: 5
    },
];

const HrProfileDetail = () => {
    const gridRef = useRef(null);

    const rowData = [
        {자격증명: '정보처리기사', '자격증 상세' : '', 만료일자: '2022-09-01'},
        {자격증명: 'SQLD', '자격증 상세' : '', 만료일자: '2023-02-10'},
        {자격증명: 'TOEIC', '자격증 상세' : '920', 만료일자: '2023-05-18'},
        {자격증명: 'JLPT', '자격증 상세' : 'N2', 만료일자: '2021-08-31'},
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
        {field: '자격증명', sortable: true, filter: true,  headerCheckboxSelection: true,checkboxSelection: true, showDisabledCheckboxes: true , width: '390px'},
        {field: '자격증 상세', sortable: true, filter: true, width: '380px'},
        {field: '만료일자', sortable: true, filter: true},
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
    
    // const clearData = useCallback(() => {
    //     const rowData = [];
    //     gridRef.current.api.forEachNode(function (node) {
    //         rowData.push(node.data);
    //     });
    //     const res = gridRef.current.api.applyTransaction({
    //         remove: rowData,
    //     });
    // }, []);
    
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

    const [isEditing, setIsEditing] = useState(false); // 상태 추가
    const [editedName, setEditedName] = useState(FakeProfileData[0].name);
    const [editedDep, setEditedDep] = useState(FakeProfileData[0].dep);
    const [editedRank, setEditedRank] = useState(FakeProfileData[0].rank);
    const [editedPhone, setEditedPhone] = useState(FakeProfileData[0].phone);
    const [editedEmail, setEditedEmail] = useState(FakeProfileData[0].email);
    const [editedBirthDate, setEditedBirthDate] = useState(FakeProfileData[0].birthDate);


    const handleToggleEdit = () => {
        setIsEditing((prevState) => !prevState);
    };

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
    };

    const handleDepChange = (e) => {
        setEditedDep(e.target.value);
    };

    const handleRankChange = (e) => {
        setEditedRank(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setEditedPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEditedEmail(e.target.value);
    };

    const handleBirthDateChange = (e) => {
        setEditedBirthDate(e.target.value);
    };

    const handleSaveChanges = () => {
        // You can implement the logic here to save the editedAccount value to your data source
        // For now, let's just set it back to FakeSalData
        setEditedName(editedName);
        setEditedDep(editedDep);
        setEditedRank(editedRank);
        setEditedPhone(editedPhone);
        setEditedEmail(editedEmail);
        setEditedBirthDate(editedBirthDate);
        setIsEditing(false);
    };

    return (
        <>
            <FlexBox>
                <Title>직원 상세</Title>
                <BtnContainer>
                    <Btn onClick={isEditing ? handleSaveChanges : handleToggleEdit}>
                        {isEditing ? '등 록' : '수 정'}
                    </Btn>
                    <Btn>퇴사자 처리</Btn>
                </BtnContainer>
            </FlexBox>
            <ProfileInHrSalaryContainer>
                <ProfileImgContainer>
                    <Img src={FakeProfileData[0].imageUrl} alt={`${FakeProfileData[0].rank} ${FakeProfileData[0].name}의 프로필 사진`} />
                </ProfileImgContainer>
                <ProfileInfoContainer>
                    <>
                        {!isEditing ? (
                            <>
                                <ProfileInfoBox>사원명 <ProfileInfoData>{editedName}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>부서 <ProfileInfoData>{editedDep}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>직급 <ProfileInfoData>{editedRank}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>사원번호 <ProfileInfoData>{FakeProfileData[0].empId}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>입사일 <ProfileInfoData>{FakeProfileData[0].joinDate}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>휴대전화 <ProfileInfoData>{editedPhone}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>이메일 <ProfileInfoData>{editedEmail}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>생년월일 <ProfileInfoData>{editedBirthDate}</ProfileInfoData></ProfileInfoBox>
                            </>
                        ) : (
                            <>
                                <ProfileInfoBox>사원명 <InputContainer><InputField type="text" value={editedName} onChange={handleNameChange} /></InputContainer></ProfileInfoBox>
                                <ProfileInfoBox>부서 <InputContainer><InputField type="text" value={editedDep} onChange={handleDepChange} /></InputContainer></ProfileInfoBox>
                                <ProfileInfoBox>직급 <InputContainer><InputField type="text" value={editedRank} onChange={handleRankChange} /></InputContainer></ProfileInfoBox>
                                <ProfileInfoBox>사원번호 <ProfileInfoData>{FakeProfileData[0].empId}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>입사일 <ProfileInfoData>{FakeProfileData[0].joinDate}</ProfileInfoData></ProfileInfoBox>
                                <ProfileInfoBox>휴대전화 <InputContainer><InputField type="text" value={editedPhone} onChange={handlePhoneChange} /></InputContainer></ProfileInfoBox>
                                <ProfileInfoBox>이메일 <InputContainer><InputField type="text" value={editedEmail} onChange={handleEmailChange} /></InputContainer></ProfileInfoBox>
                                <ProfileInfoBox>생년월일 <InputContainer><InputField type="text" value={editedBirthDate} onChange={handleBirthDateChange} /></InputContainer></ProfileInfoBox>
                            </> 
                        )}
                            <ProfileInfoBox>잔여연차 <ProfileInfoData>{FakeProfileData[0].annualLeave}</ProfileInfoData></ProfileInfoBox>
                    </>
                </ProfileInfoContainer>
            </ProfileInHrSalaryContainer>
            <EntitlementGridContainer>
                <Title2>자격증</Title2>
                <HorizonLine />
                {/* <EntitlementGrid className="ag-theme-alpine">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                        rowSelection='multiple'
                    />
                </EntitlementGrid> */}

                <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <BtnBox>
                        <Btn onClick={() => addItems(count)}>추 가</Btn>
                        <Btn onClick={onRemoveSelected}>선택 삭제</Btn>
                        {/* <Btn onClick={clearData}>모두 삭제</Btn> */}
                        <Btn onClick={onBtStopEditing}>등 록</Btn>
                    </BtnBox>
                    <div style={{ flexGrow: '1' }}>
                        <EntitlementGrid className="ag-theme-alpine">
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
                        </EntitlementGrid>
                    </div>
                </div>
            </EntitlementGridContainer>
        </>
    )
};

export default HrProfileDetail;

const ProfileInHrSalaryContainer = styled.div`
    display: flex;
    padding: 10px;
    border: 1px solid #ccc;
    width: 1000px;
    border-radius: 8px;
`;

const EntitlementGridContainer = styled.div`
    padding: 20px;
    margin-top: 30px;
    border: 1px solid #ccc;
    width: 980px;
    border-radius: 8px;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

const Title2 = styled.div`
    font-size: 22px;
    font-weight: bold;
`;

const BtnContainer = styled.div`
    display: flex;
    margin-left: 640px;
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

const BtnBox = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
`

const ProfileImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
`;

const ProfileInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`
const ProfileInfoBox = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`
const ProfileInfoData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
`

const EntitlementGrid = styled.div`
    width: 980px;
    height: 260px;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const InputField = styled.input`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;