import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import HorizonLine from '../../horizonLine';
import styled from 'styled-components';
import axios from 'axios'; // Import axios for making API requests

export default function WorkExtension() {
  const chartRef = useRef(null);

  useEffect(() => {
      const chartCanvas = chartRef.current;
      const chartData = getRecentMonthsData();

      axios.get('http://localhost:5050/attendance/total')
            .then(response => {
                const overtimeData = response.data.totalAttendanceSummaryDto.monthlyOvertimeSummaryDto;

                const chartData = getRecentMonthsData(); // Calculate labels and initialize data

                const overtimeHoursArray = getOvertimeHoursArray(overtimeData, chartData.labels); // Pass the labels

                const chart = new Chart(chartCanvas, {
                    type: 'line',
                    data: {
                        labels: chartData.labels,
                        datasets: [
                            {
                                label: '연장근무시간',
                                data: overtimeHoursArray.map(item => item.value), // Use the actual values
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                  options: {
                      responsive: true,
                      plugins: {
                          datalabels: {
                              formatter: (value, context) => {
                                  const label = context.chart.data.labels[context.dataIndex];
                                  return label + ': ' + value;
                              },
                          },
                      },
                      scales: {
                          y: {
                              beginAtZero: true,
                              ticks: {
                                  stepSize: 500,
                              },
                          },
                      },
                  },
              });
              
              return () => {
                  chart.destroy();
              };
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, []);

  const parseTimeToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    return totalMinutes;
};

  const getOvertimeHoursArray = (overtimeData) => {
    const months = [
        'janOvertime', 'febOvertime', 'marOvertime', 'aprOvertime',
        'mayOvertime', 'junOvertime', 'julOvertime', 'augOvertime',
        'sepOvertime', 'octOvertime', 'novOvertime', 'decOvertime'
    ];

    return months.map((month, index) => ({
        id: index + 1, // Adding 1 to start IDs from 1
        value: parseTimeToMinutes(overtimeData[month]) // Convert time to minutes or other desired format
    }));
  };

  const getRecentMonthsData = () => {
    const today = new Date();
    const months = [];
    const data = [];

    for (let i = 3; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Adding 1 because months are zero-based
        const formattedMonth = month < 10 ? `0${month}` : month.toString();
        months.push(`${year}-${formattedMonth}`);
        data.push(0); // Initialize with 0, you can replace this with actual data if available
    }

    return { labels: months, data };
};


  return (
  <>
      <WorkExtensionContainer>
        <Title>월별 연장근무 시간 추이</Title>
        <HorizonLine />
        <WorkExtensionGrid className="ag-theme-alpine" style={{ height: '800px', width: '350px' }}>
            <canvas ref={chartRef} width="800px" height="500px" />
        </WorkExtensionGrid>
    </WorkExtensionContainer>
  </>
  )
};

const WorkExtensionContainer = styled.div`
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

const WorkExtensionGrid = styled.div`
    width: 900px;
    height: 110px;
`