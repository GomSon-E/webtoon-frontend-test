import styled from 'styled-components';

const CommentList = ({list}) => {
        return (
            <UnorderedList>
                {list.map((comment, index) => (
                    <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                        <List>{comment.userid}</List>
                        <List>{comment.content}</List>
                        <List>{comment.date}</List>
                    </div>
                ))}
            </UnorderedList>
        );
};

export default CommentList;

const UnorderedList = styled.ul`
    
`;

const List  = styled.li`
    color: black;
    &:hover{
        color: green;
    }
    list-style-type: none;
    list-style: none;
    padding: 20px;
    width: 100px;
`;

const ContentList  = styled.li`
    color: black;
    &:hover{
        color: green;
    }
    list-style-type: none;
    list-style: none;
    padding: 20px;
    width: 400px;
`;