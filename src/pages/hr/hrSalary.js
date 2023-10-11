import { styled } from "styled-components";
import ProfileInHrSalary from "../../component/forHr/forHrSalary/profileInHrSalary";
import HrSalaryDetail from "../../component/forHr/forHrSalary/hrSalaryDetail";
import SalaryStub from "../../component/forHr/forHrSalary/salaryStub";
import EntitlementPayDetail from "../../component/forHr/forHrSalary/entitlementPayDetail";

export default function HrSalary (){
    return(
        <HrSalaryContainer>
            <ProfileContainer>
                <ProfileInHrSalary />
            </ProfileContainer>
            <SalDetailContainer>
                <HrSalaryDetail />
            </SalDetailContainer>
            <SalStubAndEntPayContainer>
                <SalaryStubContainer>
                    <SalaryStub />
                </SalaryStubContainer>
                <EntitlementPayContainer>
                    <EntitlementPayDetail />
                </EntitlementPayContainer>
            </SalStubAndEntPayContainer>
        </HrSalaryContainer>
    )
}

const HrSalaryContainer = styled.div`
    margin-left: 40px;
    width: 100%;
`;

const ProfileContainer = styled.div`
    width: 100%;
    margin-top: 50px;
    margin-bottom: 30px;
`;

const SalDetailContainer = styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
`;

const SalStubAndEntPayContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
`;

const SalaryStubContainer = styled.div`
    width: 60%;
    margin-right: 20px; 
`;

const EntitlementPayContainer = styled.div`
    width: 40%;
`;