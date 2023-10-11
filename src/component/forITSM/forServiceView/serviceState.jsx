import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';
import theme from '../../../style/theme';

const ServiceState = () => {
    const chartRef = useRef(null);

    useEffect(() => {

        const chartCanvas = chartRef.current;
        const chartData = [2, 3, 1];
    
        const chart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['미완료', '완료', '진행'],
                datasets: [
                    {
                        label: '개수',
                        data: chartData,
                        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(145,242,155,0.7)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(145,242,155,1)'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            const dataset = context.chart.data.datasets[0];
                            const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${value}개 (${percentage}%)`;
                        },
                    },
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                },
                tooltips: {
                    enabled: false,
                },
            },
        });
    
        return () => {
            chart.destroy();
        };
    }, []);

    return(
        <RequestStateContainer>
            <Title>요청 상태 현황</Title>
            <HorizonLine />
            <FlexBox>
                <MoreOuterBox>
                    <OuterBox>
                        <Box>
                            <h3 style={{ 'margin-top': '0' }}>완료</h3>
                            <Count style={{ 'background-color': '#91CDF2' }}>3</Count>
                        </Box>
                        <Box>
                            <h3 style={{ 'margin-top': '0' }}>미완료</h3>
                            <Count style={{ 'background-color': '#F2ACBF' }}>2</Count>
                        </Box>
                    </OuterBox>
                    <Box>
                        <h3 style={{ 'margin-top': '0' }}>진행</h3>
                        <Count style={{ 'background-color': '#91F29B' }}>1</Count>
                    </Box>
                </MoreOuterBox>
                

                <RequestStateGrid className="ag-theme-alpine" style={{ height: '200px', width: '200px' }}>
                    <canvas ref={chartRef} width="200px" height="200px" />
                </RequestStateGrid>
            </FlexBox>
            
        </RequestStateContainer>
    );
};
export default ServiceState;

const RequestStateContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 350px;
    width: 490px;
`;

const FlexBox = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
`

const Title = styled.h3`
    margin-left: 10px;
`;

const RequestStateGrid = styled.div`
    width: 400px;
    height: 110px;
    margin-top: 30px;
    margin-left: 10px;
`

const MoreOuterBox = styled.div`
`

const OuterBox = styled.div`
    display : flex;
    margin-bottom: 25px;
`

const Box = styled.div`
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
`
const Count = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    font-size: 35px;
    color: ${theme.colors.white};
    width: 100px;
    height: 70px;
    border-radius: 8px;
    margin: auto;
    box-shadow: 0 5px 10px rgba(0,0.10,0,0.10), 0 2px 2px rgba(0,0.10,0,0.10);
`