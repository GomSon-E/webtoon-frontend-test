import { styled } from "styled-components";
import ServiceState from "../../component/forITSM/forServiceView/serviceState";
import ViewList from "../../component/forITSM/forServiceView/viewList";

export default function ItRequestListView (){
    return(
        <>
            <Title>서비스 조회</Title>
            <FlexBox>
                <ViewListContainer>
                    <ViewList />
                </ViewListContainer>
                <ServiceStateContainer>
                    <ServiceState />
                </ServiceStateContainer>
            </FlexBox>
            
        </>
    )
}

const Title = styled.div`
    font-size: 30px;
    padding-top: 50px;
    padding-left: 2%;
    font-weight: bold;
`;

const FlexBox = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
`

const ServiceStateContainer = styled.div`
    padding-left: 2%;
    margin-top: 30px; 
    width: 40%
`

const ViewListContainer = styled.div`
    padding-left: 2%;
    margin-top: 30px; 
    width: 55%
`