import { styled } from "styled-components";
import WebtoonSearch from "../../component/forWebtoon/webtoonSearch";
import BeforeUploadToon from "../../component/forWebtoon/beforeUploadToon";
import AfterUploadToon from "../../component/forWebtoon/afterUploadToon";

const WebtoonSearchContainer = styled.div`
    margin-top: 40px;
    margin-left: 40px;
    width: 100%;
`;

const WebtoonContainer = styled.div`
    display: flex;
`;

const BeforeUploadToonContainer = styled.div`
    margin-top: 30px;
    margin-left: 10px;
    width: 50%;
`;

const AfterUploadToonContainer = styled.div`
    margin-top: 30px;
    margin-left: 10px;
    width: 50%;
`;

export default function Webtoon (){
    return(
        <>
            <WebtoonSearchContainer>
                <WebtoonSearch />
            </WebtoonSearchContainer>
            <WebtoonContainer>
                <BeforeUploadToonContainer>
                    <BeforeUploadToon />
                </BeforeUploadToonContainer>
                <AfterUploadToonContainer>
                    <AfterUploadToon />
                </AfterUploadToonContainer>
            </WebtoonContainer>
        </>
    )
}