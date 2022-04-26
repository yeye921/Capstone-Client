import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 23rem;
  height: 2.7rem;
  font-size: medium;
  font-weight: 600;
  border-style: initial;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border-radius: 0.7rem;
`;

const MainButton = ({ color, background, text }) => {
  return (
    <StyledButton color={color} background={background} text={text}>
      {text}
    </StyledButton>
  );
};

export default MainButton;
