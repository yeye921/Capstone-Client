import React from 'react';
import styled, { css } from 'styled-components';

const buttonStyle = css`
  border: 1px solid #ffffff;
  border-radius: 4px;

  color: #ffffff;
  font-weight: bold;

  background-color: #f7d358;
  &:hover {
    background-color: #dba901;
  }
  &:disabled {
    background-color: #bdbdbd;
  }
`;

const SytledButton = styled.button`
  ${buttonStyle}
`;

const Button = (props) => {
  return <SytledButton {...props} />;
};

export default Button;
