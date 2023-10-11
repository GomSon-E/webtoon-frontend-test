import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';

const EpisodeList = () => {
    const rowData = [
        {'등록 날짜': '2023-02-10', '제목': 'episode1', '파일': ''},
        {'등록 날짜': '2023-03-10', '제목': 'episode2', '파일': ''},
        {'등록 날짜': '2023-04-10', '제목': 'episode3', '파일': ''},
    ];

    const columnDefs = [
        {field: '등록 날짜', sortable: true, filter: true},
        {field: '제목', filter: true},
        {field: '파일'},
    ];

    const titleText = `회차 (${rowData.length}개)`;

    return(
        <EpisodeListContainer>
            <Title>{titleText}</Title>
            <EpisodeListGrid className="ag-theme-alpine">
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection='multiple'
                    domLayout= 'autoHeight'
                />
            </EpisodeListGrid>
        </EpisodeListContainer>
    );
};
export default EpisodeList;

const EpisodeListContainer = styled.div`
    margin-top: 50px;
    padding: 10px 10px 10px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const EpisodeListGrid = styled.div`
    width: 610px;
    height: auto;
    overflow: hidden;
`