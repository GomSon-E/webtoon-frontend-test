import AllSalaryView from "../../component/forHr/forHrAllSalaryView/AllSalaryView";
import { styled } from "styled-components";

export default function HrAllSalaryView (){
    return(
        <HrAllSalaryContainer>
            <AllSalaryView />
        </HrAllSalaryContainer>
    )
}

const HrAllSalaryContainer = styled.div`
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
`;