import { styled } from "styled-components";
import HoldenDocsView from "../../component/forElectropayment/holdenDocsView";

export default function EpHoldenDocsView (){
    return(
        <HoldenDocsViewContainer>
            <HoldenDocsView />
        </HoldenDocsViewContainer>
    )
}

const HoldenDocsViewContainer = styled.div`
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
`;