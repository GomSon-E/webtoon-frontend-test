import EpisodeList from "../../component/forWebtoon/forToonView/episodeList";
import TextAndBtnArea from "../../component/forWebtoon/forToonView/textAndBtnArea";
import ToonContent from "../../component/forWebtoon/forToonView/toonContent";
import styled from 'styled-components';

export default function ToonView (){
    return(
        <>
            <TextAndBtnAreaContainer>
                <TextAndBtnArea />
            </TextAndBtnAreaContainer>
            <ToonContentContainer>
                <ToonContent />
            </ToonContentContainer>
            <EpisodeListContainer>
                <EpisodeList />
            </EpisodeListContainer>
        </>
    )
}

const TextAndBtnAreaContainer = styled.div`
    margin-top: 120px;
    margin-left: 30px;
    width: 100%;
`;

const ToonContentContainer = styled.div`
    margin-left: 30px;
`;

const EpisodeListContainer = styled.div`
    margin-left: 30px;
`;