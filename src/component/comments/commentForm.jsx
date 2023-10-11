import styled from 'styled-components';
import { useState } from 'react';
import theme from '../../style/theme';

const CommentForm = ({ addList }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addList({ userid: '12312', content: value, date: '2023-08-11' });
        setValue('');
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setValue(value);
        console.log(value);
    }

    return (
        <List>
            <Form  style={{display: 'flex', flexDirection: 'row'}}>
                <span>
                    <Input
                        type='text'
                        placeholder='댓글을 입력해주세요.'
                        value={value}
                        onChange={handleChange}
                    />
                </span>
                <Button onSubmit={handleSubmit}>등록</Button>
            </Form>
        </List>
    )
}

export default CommentForm;

const List  = styled.li`
    color: black;
    &:hover{
        color: green;
    }
    list-style-type: none;
    list-style: none;
`;

const Form = styled.form`
width:  600px;
`;

const Input = styled.input`
    width: 500px;
    height: 40px;
`;

const Button = styled.button`
    width: 50px;
    height: 40px;
    background-color: ${theme.colors.btn};
    border: none;
    color: ${theme.colors.white};
    text-align: center;
    box-shadow: 0 5px 10px rgba(0,0,0,0.10), 0 2px 2px rgba(0,0,0,0.20);
    &:hover {
        background-color: #00B757;
    }
    cursor: pointer;
`;
