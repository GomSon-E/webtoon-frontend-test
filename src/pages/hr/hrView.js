import { styled } from "styled-components";
import EmployeeView from "../../component/forHr/forHrView/employeeView";

const EmpProfileContainer = styled.div`
    margin-top: 45px;
    margin-left: 10px;
    width: 100%;
`;

const Title = styled.div`
    font-size: 30px;
    margin-bottom: 20px;
    padding-left: 33px;
    font-weight: bold;
`;

export default function HrView (){
    return(
        <EmpProfileContainer>
            <Title>전체 직원 관리</Title>
            <EmployeeView />
        </EmpProfileContainer>
    )
}