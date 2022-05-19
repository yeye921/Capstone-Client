import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { ssondaData } from "../../services/chat";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { idState } from "../../state";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/chat/Topbar";
import { QueryClient, useMutation, useQuery } from "react-query";
import axios from "axios";
import { useHere } from "../../services/mutation";
import NoticeBar from "../../components/chat/NoticeBar";
import { useRecoilState } from "recoil";
import { roadAddrState, buttonState } from "../../state";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  height: 3em;
  justify-content: center;
`;

const ChatContainer = ({ state }) => {
  const [fee, setFee] = useState(state.fee); // 채팅방 상단 배달비
  const [buttons, setButtons] = useRecoilState(buttonState);
  // recoil에 저장된 변수들
  const [uId, setuId] = useRecoilState(idState);

  const navigate = useNavigate();
  // buttonState[pid].모집마감 = true;

  //const { pId } = queryString.parse(state);
  const here = useHere("here", "http://3.39.125.17/chat");
  const { data } = useQuery("here");

  if (here.isLoading) {
    console.log(here.isLoading);
  }

  const onClosing = (e) => {
    setButtons({
      ...buttons,
      [state.pId]: {
        ...buttons[state.pId],
        isClosing: true,
      },
    });
    // finishData(state.pId).then((data) => {
    //   setLocation(data.data);
    //   localStorage.setItem("pLocation", data.data);
    // });
    here.mutate({ pId: state.pId });
  };

  const onShooting = (e) => {
    setButtons({
      ...buttons,
      [state.pId]: {
        ...buttons[state.pId],
        isShooting: true,
      },
    });
    ssondaData(uId, state.pId).then((response) => {
      if (uId == response.data.uId) {
        setFee(response.data.total_fee);
      }
    });
    // navigate('/login');
  };

  const onMap = (e) => {
    navigate("/here", {
      state: {
        pId: state.pId,
        title: state.title,
      },
    });
  };

  //useEffect 추가
  useEffect(() => {
    //테스트용
    setButtons({
      ...buttons,
      [state.pId]: {
        isClosing: false,
        isShooting: false,
      },
    });
  }, []);

  useEffect(() => {
    console.log(fee);
  }, [fee]);

  return (
    <>
      {/* {here.isLoading && <LoadingText>isLoading</LoadingText>} */}
      <NoticeBar fee={fee} addr={data && data.place_name} />
      <ButtonContainer>
        <Button
          id="closeBtn"
          onClick={onClosing}
          disabled={buttons[state.pId] ? buttons[state.pId].isClosing : false}
        >
          모집마감
        </Button>
        <IconButton
          onClick={onShooting}
          disabled={buttons[state.pId] ? buttons[state.pId].isShooting : false}
        >
          <MonetizationOnIcon
            sx={{
              fontSize: 50,
            }}
          />
        </IconButton>
        <Button onClick={onMap}>지도</Button>
      </ButtonContainer>
    </>
  );
};

export default ChatContainer;
