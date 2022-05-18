import React from "react";
import logo from "../static/images/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogoImg = styled.img`
  width: 70vw;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50%;
`;

const Logo = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };
  return (
    <>
      <Box>
        <LogoImg src={logo} onClick={onClick} />
      </Box>
    </>
  );
};

export default Logo;
