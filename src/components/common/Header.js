import React from "react";
import styled from "styled-components";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: rgb(104, 193, 251);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled.div`
  height: 4rem;
  font-size: large;
  font-weight: 600;
  color: white;
  align-items: center;
`;

const HeaderText = styled.div`
  margin: 0 auto;
  text-align: center;
  line-height: 4rem;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = (props) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <HeaderText>{props.name}</HeaderText>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
