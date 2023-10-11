import styled from "styled-components";
import TabComponent from "../../component/forHr/forMyAttendance/TabComponent";
import ScheduleComponent from "../../component/forHr/forMyAttendance/ScheduleComponent";
import MyHours from "../../component/forHr/forMyAttendance/MyHours";
import theme from '../../style/theme';


export default function HrMyAttendance() {
    return (
        <>
        <Title>개인 근태 현황</Title>
        <RegistBtnContainer>
                    <RegistBtn>휴가 신청</RegistBtn>
      </RegistBtnContainer>
            <Container2>
                <MyHours />
            </Container2>
            <Container >
                <TabComponent />
            </Container>
            <FlexContainer>
                <ScheduleComponent />
            </FlexContainer>
        </>
    );
}

const Container = styled.div`
    display: flex;
    padding-left: 45%;
    background: transparent;
`;
const Container2 = styled.div`
    display: flex;
    width: 1000px;
    align-items: center;
    padding: 20px;
    padding-left: 24%;
    padding-top: 30px;
`;

const FlexContainer = styled.div`
    width: 90%;
    padding-bottom: 50px;
    padding-left: 5%;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 120px;
  padding-left: 4%;
  font-weight: bold;
`;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 86%;
`;

const RegistBtn = styled.button`
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
