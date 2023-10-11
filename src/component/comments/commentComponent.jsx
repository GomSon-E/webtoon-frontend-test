import React, { useState } from "react";
import styled from 'styled-components';
import Comment from "./comment";
import CommentForm from "./commentForm";
import CommentList from "./commentList";

const CommentComponent = () => {
    const [list, setList] = useState([
        {userid: '12312', content: '댓글입니당1', date: '2023-08-11'},
        {userid: '12312', content: '댓글입니당2', date: '2023-08-11'},
        {userid: '12312', content: '댓글입니당3', date: '2023-08-11'},
    ]);

    const addList = (content) => {
        setList([...list, {userid:'werwer',content, date:'2023-08-11'}]);
    };

    return (
        <CommentContainer>
            <Comment>
                <Container>
                    <CommentForm addList={addList} />
                </Container>
                <CommentList list={list} />
            </Comment>
        </CommentContainer>
    )
}

export default CommentComponent;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-left: 15%;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-left: 15%;
`;



