import styled from 'styled-components';
import theme from '../../../style/theme';

const FakeWebtoonData = [
    {
        id: 1,
        imageUrl: 'https://image.newdaily.co.kr/site/data/img/2023/05/30/2023053000065_0.png',
        name: 'toon1',
        week: '월요일',
        keyword: '로맨스',
        author: 'author1',
        expla: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
];

const ToonContent = () => {
    return(
        <ToonContentContainer>
                    <ToonImgContainer>
                        <Img src={FakeWebtoonData[0].imageUrl} alt={`${FakeWebtoonData[0].name}의 썸네일`} />
                    </ToonImgContainer>
                    <ToonInfoContainer>
                        <ToonInfoBox>제목 <ToonInfoData>{FakeWebtoonData[0].name}</ToonInfoData></ToonInfoBox>
                        <ToonInfoBox>업로드 요일 <ToonInfoData>{FakeWebtoonData[0].week}</ToonInfoData></ToonInfoBox>
                        <ToonInfoBox>키워드 <ToonInfoData>{FakeWebtoonData[0].keyword}</ToonInfoData></ToonInfoBox>
                        <ToonInfoBox>작가 <ToonInfoData>{FakeWebtoonData[0].author}</ToonInfoData></ToonInfoBox>
                        <ToonInfoBox>작품설명 <ToonInfoData>{FakeWebtoonData[0].expla}</ToonInfoData></ToonInfoBox>
                    </ToonInfoContainer>
        </ToonContentContainer>
    );
};
export default ToonContent;

const ToonContentContainer = styled.div`
    display: flex;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 40px;
`;

const ToonImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
`;

const ToonInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const ToonInfoBox = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`
const ToonInfoData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding: 1px 7px 1px 7px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
`