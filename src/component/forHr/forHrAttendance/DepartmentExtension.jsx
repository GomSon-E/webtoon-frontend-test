import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import axios from 'axios'; // Don't forget to import axios
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';

export default function DepartmentExtension() {
  const chartRef = useRef(null);

  const [departmentOvertimeData, setDepartmentOvertimeData] = useState({
      hrOvertimeSum: '0:00:00',
      amOvertimeSum: '0:00:00',
      wtOvertimeSum: '0:00:00',
      itOvertimeSum: '0:00:00'
  });

  const parseTimeToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
}

  useEffect(() => {
      axios.get('http://localhost:5050/attendance/total')
          .then(response => {
              const departmentOvertimeSumDto = response.data.totalAttendanceSummaryDto.departmentOvertimeSumDto;
              setDepartmentOvertimeData(departmentOvertimeSumDto);

              const ctx = chartRef.current.getContext('2d');
              chartRef.current.chart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                      labels: Object.keys(departmentOvertimeData), // Use the keys of departmentOvertimeData
                      datasets: [{
                          label: '부서별 연장근무시간(월계)',
                          data: Object.values(departmentOvertimeData).map(value => parseTimeToMinutes(value)),
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          borderColor: 'rgba(75, 192, 192, 1)',
                          borderWidth: 1
                      }]
                  },
                  options: {
                    plugins: {
                      datalabels: {
                        anchor: 'end',
                        align: 'top',
                        font: {
                          weight: 'bold'
                        },
                        formatter: (value) => (value * 100).toFixed(0), // 표시할 값을 다시 100 곱하여 원래대로 복원
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 0.5, // 눈금 간격을 0.5로 설정
                          callback: (value) => value * 100, // y축 눈금에 표시할 값을 다시 100 곱하여 원래대로 복원
                        }
                      }
                    }
                  }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <DepartmentVacationContainer>
                <Title>그룹별 연장근무시간(월계)</Title>
                <HorizonLine />
                <DepartmentVacationGrid className="ag-theme-alpine" style={{ height: '300px', width: '400px' }}>
                    <canvas ref={chartRef} width="400" height="200"></canvas>
                </DepartmentVacationGrid>
            </DepartmentVacationContainer>
        </>
    );
}

const DepartmentVacationContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 300px;
  width: 100%
  align-items: center;
`;

const Title = styled.h3`
    margin-left: 10px;
`;

const DepartmentVacationGrid = styled.div`
    width: 1200px;
    height: 50px;
`