import RefDocsView from "../../component/forElectropayment/refDocsView";
import { styled } from "styled-components";

export default function EpRefDocsView (){
    return(
        <RefDocsViewContainer>
            <RefDocsView />
        </RefDocsViewContainer>
    )
}

const RefDocsViewContainer = styled.div`
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
`;