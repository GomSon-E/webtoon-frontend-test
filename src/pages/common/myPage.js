import styled from 'styled-components';
import MyPageView from '../../component/forMyPage/myPageView';

export default function myPage (){
    return(
        <HrProfileDetailContainer>
            <MyPageView />
        </HrProfileDetailContainer>
    )
}

const HrProfileDetailContainer = styled.div`
    margin-top: 50px;
    margin-left: 30px;
`