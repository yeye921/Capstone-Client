import React from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  background-color: rgb(104, 193, 251);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: large;
`;

const MainHeader = ({ text }) => {
  return (
    <>
      <Header>{text}</Header>
    </>
  );
};
export default MainHeader;
