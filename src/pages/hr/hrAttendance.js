import styled from 'styled-components';
import WholeAttendance from '../../component/forHr/forHrAttendance/WholeAttendance';
import WorkExtension from '../../component/forHr/forHrAttendance/WorkExtension';
import DepartmentExtension from '../../component/forHr/forHrAttendance/DepartmentExtension';
import DepartmentAvgExtension from '../../component/forHr/forHrAttendance/DepartmentAvgExtension';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
  padding-left: 4%;
`;

const TodayContainer = styled.div`
  padding-left: 120px;
`;


const Title = styled.div`
  font-size: 30px;
  padding-top: 50px;
  padding-left: 3%;
  font-weight: bold;
`;

export default function HrAttendance() {
  return (
    <>
        <Title>근태 관리</Title>
    
        <Container>
                <WholeAttendance />
        </Container>
        <Container> 
            <WorkExtension />
            <DepartmentExtension />
            <DepartmentAvgExtension /> 
        </Container>
    </>
  );
};
