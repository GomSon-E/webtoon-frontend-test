import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import theme from '../../../style/theme';

const FakeProfileData = [
    {
        id: 1,
        title: '엔딩, 바꿔보려합니다',
        author: 'author',
        drawer: 'drawer',
        day: '월요일',
        keyword: '코미디',
        content: '010-1234-1234',
        rank: 'title 1 썸네일',
        thumnailPreview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbxgxO2HlWpJnmMF19T9mPjPypU5Q7R5Dcfg&usqp=CAU',
        content: `배드엔딩만 쓰는 피폐소설작가 변수아는
        누군가의 저주로 인해 현재 연재중인 ‘청춘의 끝에’의 악녀 최세화로 빙의된다.
        인성파탄자, 소시오패스, 이중인격자, 싸이코패스뿐인 소설 속에서
        과연 수아는 살아서 원래 세계로 돌아갈 수 있을까?`,
    },
];


const ToonDetailComponent = (Id) => {
    //수정 가능 여부
    const [editable, setEditable] = useState('false');
    const [enrollable, setEnrollable] = useState('false');

    //editing
    const [isEditing, setIsEditing] = useState(false); 
    const [editedAuthor, setEditedAuthor] = useState(FakeProfileData[0].author);
    const [editedDrawer, setEditedDrawer] = useState(FakeProfileData[0].drawer);
    const [editedDay, setEditedDay] = useState(FakeProfileData[0].day);
    const [editedKeyword, setEditedKeyword] = useState(FakeProfileData[0].keyword);
    const [editedContent, setEditedContent] = useState(FakeProfileData[0].content);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    //data.title
    //const [data, setData] = useState({});

    //seEffect(() => {
    //    axios.get('http://localhost:5050/quals/'+Id).then((response)=> {
    //      setData(response.data);
    //      //console.log("ddddddd");
    //    })
    //  }, []);
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/episodeAdd");
    }

    const handleToggleEdit = () => {
      setIsEditing((prevState) => !prevState);
  };
    

    const handleAuthorChange = (e) => {
      setEditedAuthor(e.target.value);
  };

  const handleDrawerChange = (e) => {
      setEditedDrawer(e.target.value);
  };

  const handleDayChange = (e) => {
      setEditedDay(e.target.value);
  };

  const handleKeywordChange = (e) => {
      setEditedKeyword(e.target.value);
  };

  const handleContentChange = (e) => {
      setEditedContent(e.target.value);
  };
    
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setThumbnailPreview(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
    
      const handleSaveChanges = () => {
         //console.log(finalId, "finalId 결과값"); 
    
        axios.post('http://localhost:5050/register',
          { 
            editedDrawer: editedDrawer,  
            editedDay: editedDay,
            editedKeyword: editedKeyword,
            editedContent: editedContent,
            thumbnailPreview: thumbnailPreview,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((result) => {
            console.log(result);
            console.log("enroll!");
            window.alert('작품 상세정보가 정상적으로 수정되었습니다.');
            //window.location.replace("/login"); 
          })
          .catch((error) => {
            window.alert('작품 상세정보가 정상적으로 수정되지 않았습니다.');
            console.log(error);
          })
      };

    return (
        <>
            <RegistBtnContainer>
                      <Btn onClick={isEditing ? handleSaveChanges : handleToggleEdit}>
                                  {isEditing ? '등 록' : '수 정'}
                      </Btn>
                        <RegistBtn onClick={handleClick}>회차 등록</RegistBtn>
            </RegistBtnContainer>
            
            
            <WebtoonContainer>
            
                        <WebtoonImgContainer>
                            <Img src={FakeProfileData[0].thumnailPreview} alt={`${FakeProfileData[0].rank} ${FakeProfileData[0].name}의 프로필 사진`} />
                        </WebtoonImgContainer>
                        <ToonInsideInfoBox>
                            <ToonTitle>{FakeProfileData[0].title}</ToonTitle>
                        {!isEditing ? (
                            <>
                            <ToonInfoContainer>
                                <ToonInfoBox>작가 <ToonInfoData>{FakeProfileData[0].author}</ToonInfoData></ToonInfoBox>
                                <ToonInfoBox>그림 <ToonInfoData>{FakeProfileData[0].drawer}</ToonInfoData></ToonInfoBox>
                                <ToonInfoBox>업로드 요일 <ToonInfoData>{FakeProfileData[0].day}</ToonInfoData></ToonInfoBox>
                                <ToonInfoBox>키워드 <ToonInfoData>{FakeProfileData[0].keyword}</ToonInfoData></ToonInfoBox>
                            </ToonInfoContainer>
                            <ToonInsideInfoTextBox>
                                <ToonInfoBox>작품 설명 <ToonInfoTextData>{FakeProfileData[0].content}</ToonInfoTextData></ToonInfoBox>
                            </ToonInsideInfoTextBox>
                        
                        </>
                         ) : (
                          <>
                              <ToonInfoContainer>
                                <ToonInfoBox>작가 <InputContainer><InputField type="text" value={editedAuthor} onChange={handleAuthorChange} /></InputContainer></ToonInfoBox>
                                <ToonInfoBox>그림 <InputContainer><InputField type="text" value={editedDrawer} onChange={handleDrawerChange} /></InputContainer></ToonInfoBox>
                                <ToonInfoBox>업로드 요일 <InputContainer><InputField type="text" value={editedDay} onChange={handleDayChange} /></InputContainer></ToonInfoBox>
                                <ToonInfoBox>키워드 <InputContainer><InputField type="text" value={editedKeyword} onChange={handleKeywordChange} /></InputContainer></ToonInfoBox>
                            </ToonInfoContainer>
                            <ToonInsideInfoTextBox>
                              <ToonInfoBox>작품 설명 <InputContainer><InputTextField type="text" value={editedContent} onChange={handleContentChange} /></InputContainer></ToonInfoBox>
                            </ToonInsideInfoTextBox> {/**작품 설명 textfiled로 수정하기 */}
                          </>
                         )}
                      </ToonInsideInfoBox>
            </WebtoonContainer>
        </>
    )
};

export default ToonDetailComponent;

const Btn = styled.button`
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

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const InputField = styled.input`
    background-color: ${theme.colors.textBox};
    height: 25px;
    width: 60px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const InputTextField = styled.textarea`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
    width: 650px;
    height: 80px;
`;

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 58%;
    margin-bottom: 20px;
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

const WebtoonContainer = styled.div`
    display: flex;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const WebtoonImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`

const Img = styled.img`
    width: 180px;
    height: 270px;
`;

const ToonInfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`
const ToonInfoBox = styled.div`
    display: flex;
    margin: 20px;
`
const ToonInsideInfoBox = styled.div`
    display: flex;
    flex-direction: column;
`
const ToonInsideInfoTextBox = styled.div`
    
`

const ToonInfoData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 25px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
`
const ToonInfoTextData = styled.div`
    background-color: ${theme.colors.textBox};
    height: 75px;
    width: 650px;
    padding: 5px;
    padding-top: 10px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.10);
`
const ToonTitle = styled.div`
    font-size: 23px;
    margin: 15px;
    font-weight: bold;
`