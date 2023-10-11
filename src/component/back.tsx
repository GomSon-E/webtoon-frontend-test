import React from 'react';
import { useNavigate } from 'react-router-dom';

const Back = () => {
    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1); // 바로 이전 페이지로 이동
    };
    return <button onClick={onClickBack}>뒤로가기</button>;
};
export default Back;