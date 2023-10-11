import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import theme from '../../../style/theme';
import CommentComponent from '../../comments/commentComponent';

const FakeProfileData = [
    {
        id: 1,
        title: '엔딩, 바꿔보려합니다 1화 제목',
        author: '나는 작가',
        manager: '담당자1',
        thumnailPreview: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbxgxO2HlWpJnmMF19T9mPjPypU5Q7R5Dcfg&usqp=CAU',
        content: `엔딩, 바꿔보려합니다 1화입니다.
        잘 부탁드립니다.`,
    },
];


const ForEpisodeDetail = (Id) => {
    //수정 가능 여부
    const [editable, setEditable] = useState('false');
    const [enrollable, setEnrollable] = useState('false');

    //editing
    const [isEditing, setIsEditing] = useState(false); 
    const [editedAuthor, setEditedAuthor] = useState(FakeProfileData[0].author);
    const [editedManager, setEditedManager] = useState(FakeProfileData[0].manager);
    const [editedTitle, setEditedTitle] = useState(FakeProfileData[0].title);
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

  const handleManagerChange = (e) => {
      setEditedManager(e.target.value);
  };

  const handleTitleChange = (e) => {
      setEditedTitle(e.target.value);
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
            editedTitle: editedTitle,
            editedAuthor: editedAuthor,
            editedManager: editedManager, 
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
            window.alert('화차 상세정보가 정상적으로 수정되었습니다.');
            //window.location.replace("/login"); 
          })
          .catch((error) => {
            window.alert('회차 상세정보가 정상적으로 수정되지 않았습니다.');
            console.log(error);
          })
      };

    return (
        <>
            <RegistBtnContainer>
                      <Btn onClick={isEditing ? handleSaveChanges : handleToggleEdit}>
                                  {isEditing ? '등 록' : '수 정'}
                      </Btn>
            </RegistBtnContainer>
            
            <WebtoonContainer>
                        <WebtoonImgContainer>
                            <Img src={FakeProfileData[0].thumnailPreview} alt={`${FakeProfileData[0].rank} ${FakeProfileData[0].name}의 프로필 사진`} />
                        </WebtoonImgContainer>
                        
                        {!isEditing ? ( 
                        <>
                        <ToonInsideInfoBox>
                          <ToonTitle>{FakeProfileData[0].title}</ToonTitle>
                          
                          <ToonInfoContainer>
                              <ToonInfoBox>작가 <ToonInfoData>{FakeProfileData[0].author}</ToonInfoData></ToonInfoBox>
                              <ToonInfoBox>담당자 <ToonInfoData>{FakeProfileData[0].manager}</ToonInfoData></ToonInfoBox>
                          </ToonInfoContainer>
                          <ToonInsideInfoTextBox>
                              <ToonInfoBox>작가의 말 <ToonInfoTextData>{FakeProfileData[0].content}</ToonInfoTextData></ToonInfoBox>
                          </ToonInsideInfoTextBox>
                          </ToonInsideInfoBox>
                        </>
                        ):(
                          <>
                          <ToonInsideInfoBox>
                              <ToonTitle><InputContainer><InputTitleField type="text" value={editedTitle} onChange={handleTitleChange} /></InputContainer></ToonTitle>
                              
                              <ToonInfoContainer>
                                <ToonInfoBox>작가 <InputContainer><InputField type="text" value={editedAuthor} onChange={handleAuthorChange} /></InputContainer></ToonInfoBox>
                                <ToonInfoBox>담당자 <InputContainer><InputField type="text" value={editedManager} onChange={handleManagerChange} /></InputContainer></ToonInfoBox>
                              </ToonInfoContainer>
                               <ToonInsideInfoTextBox>
                                 <ToonInfoBox>작가의 말 <InputContainer><InputTextField type="text" value={editedContent} onChange={handleContentChange} /></InputContainer></ToonInfoBox>
                               </ToonInsideInfoTextBox>
                              </ToonInsideInfoBox>
                              
                          </>
                        ) }     
                        
                    </WebtoonContainer>
            <WebtoonWorksContainer>
                <ToonImg src={FakeProfileData[0].thumnailPreview} alt={` ${FakeProfileData[0].title}의 썸네일 사진`} />
            </WebtoonWorksContainer>
            
            <CommentContainer>
              <CommentComponent />
            </CommentContainer>

        </>
    )
};

export default ForEpisodeDetail;

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

const InputTitleField = styled.input`
    background-color: ${theme.colors.textBox};
    height: 25px;
    width: 400px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);
`;

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

const RegistBtnContainer = styled.div`
    display: flex;
    padding-left: 75%;
    margin-bottom: 20px;
`;

const WebtoonContainer = styled.div`
    display: flex;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const CommentContainer = styled.div`
    display: flex;
    padding: 20px;
    width: 1000px;
    padding-left: 30px;
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

//수정 필요
const WebtoonWorksContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #eee;
    width: 100%;
`

const Img = styled.img`
    width: 180px;
    height: 270px;
`;

const ToonImg = styled.img`
    padding: 20px;
    width: 480px;
    height: 700px;
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