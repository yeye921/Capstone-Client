import React from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: rgb(104, 193, 251);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled.div`
  height: 3.5rem;
  font-size: large;
  font-weight: 600;
  color: white;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const HeaderText = styled.div`
//   margin: 0 auto;
    text-align: center;
    line-height: 3.5rem;
    display: flex;
    justify-content: center;
    width: 100%;
    padding-right: 1rem;
`;

export const Spacer = styled.div`
    height: 4rem;
`;

const Header = (props) => {
    const navigate = useNavigate();
    const backClick = () => {
        navigate("/main/chatlist");
    }
    return (
        <>
        <HeaderBlock>
            <Wrapper>
                <div onClick={backClick}>
                    <ArrowBackIosNewIcon
                        sx={{
                        fontSize: 26,
                        color: "white",
                        paddingLeft: "0.5rem",
                        }}
                    />
                </div>
               <HeaderText>{props.name}</HeaderText>
            </Wrapper>
        </HeaderBlock>
        <Spacer />
        </>
        );
    };

export default Header;
