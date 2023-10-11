import React, { useEffect, useState } from 'react';
import { CgAlignLeft } from "react-icons/cg";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';

const TabComponent = () => {
  const [mydate, setDate] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth());
    const yearMonth = date.toISOString().slice(0, 7).replace(/-/g, '');
    setDate(yearMonth);
  }, []);

  const getPreviousMonthsData = () => {
    const date = new Date();
    setCount(count - 1);
    date.setMonth(date.getMonth() + count);
    const yearMonth = date.toISOString().slice(0, 7).replace(/-/g, '');
    setDate(yearMonth);
  };

  const getNextMonthsData = () => {
    const date = new Date();
    setCount(count + 1);
    date.setMonth(date.getMonth() + count);
    const yearMonth = date.toISOString().slice(0, 7).replace(/-/g, '');
    setDate(yearMonth);
  };

  return (
    <>
      <Button >
        <LeftIcon />
      </Button>
      <h3>{mydate}</h3>
    </>
  );
};

export default TabComponent;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: lightgray;
  }
`;

const LeftIcon = styled(CgAlignLeft)`
`;
