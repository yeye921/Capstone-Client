import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    display: flex;
    background-color: rgb(94, 191, 236);
    height: 3rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: white;
    font-weight: bold;
    font-size: large;
`;

const MainHeader = ({text}) => {
  return (
    <>
      <Header>{text}</Header>
    </>
  );
};
export default MainHeader;
