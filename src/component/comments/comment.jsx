import styled from 'styled-components';

const Comment = (props) => {
    return (
        <>
        <UnorderedList>
            {props.children}
        </UnorderedList>
        </>
    )
}

export default Comment;

const UnorderedList = styled.ul`
    list-style-type: none;
    list-style: none;
`;