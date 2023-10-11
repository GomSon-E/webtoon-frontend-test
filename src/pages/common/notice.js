import NoticeComponent from "../../component/forNotice/NoticeComponent";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
  padding-left: 5%;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 120px;
  padding-left: 4%;
  font-weight: bold;
`;


export default function Notice (){
    return(
        <>
          <NoticeComponent />
        </>
    )
}