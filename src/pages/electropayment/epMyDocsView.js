import MyDocsView from "../../component/forElectropayment/myDocsView";
import { styled } from "styled-components";

export default function EpMyDocsView (){
    return(
        <MyDocsViewContainer>
            <MyDocsView />
        </MyDocsViewContainer>
    )
}

const MyDocsViewContainer = styled.div`
    margin-left: 40px;
    margin-top: 50px;
    width: 100%;
`;