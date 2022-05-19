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
import { roadAddrState, buttonState, postState } from "../../state";
import styled from "styled-components";

import ChatContent from "../../components/chat/firebase/ChatContent";
import ChatInput from "../../components/chat/firebase/ChatInput";

const ButtonContainer = styled.div`
  display: flex;
  height: 3em;
  justify-content: center;
`;

const ChatContainer = ({ state }) => {
  const [fee, setFee] = useState(state.fee); // 채팅방 상단 배달비
  const [buttons, setButtons] = useRecoilState(buttonState);
  const [uId, setuId] = useRecoilState(idState);

  const [postInfo, setPostInfo] = useRecoilState(postState);
  //fee, location, buttons

  const navigate = useNavigate();
  // buttonState[pid].모집마감 = true;

  //const { pId } = queryString.parse(state);
  const here = useHere("here", "http://3.39.125.17/chat");
  const { data } = useQuery("here");

  if (data) {
    // setPostInfo({
    //   ...postInfo,
    //   [state.pId]: {
    //     ...postInfo[state.pId],
    //     location: data.place_name,
    //   },
    // });
  }

  const onClosing = (e) => {
    // setButtons({
    //   ...buttons,
    //   [state.pId]: {
    //     ...buttons[state.pId],
    //     isClosing: true,
    //   },
    // });
    setPostInfo({
      ...postInfo,
      [state.pId]: {
        ...postInfo[state.pId],
        isClosing: true,
      },
    });
    here.mutate({ pId: state.pId });
  };

  const onShooting = (e) => {
    // setButtons({
    //   ...buttons,
    //   [state.pId]: {
    //     ...buttons[state.pId],
    //     isShooting: true,
    //   },
    // });
    ssondaData(uId, state.pId).then((response) => {
      let fee = 0;
      if (uId == response.data.uId) {
        // setFee(response.data.total_fee);
        fee = response.data.total_fee;
      }
      setPostInfo({
        ...postInfo,
        [state.pId]: {
          ...postInfo[state.pId],
          isShooting: true,
          fee: fee,
          location: "here",
        },
      });
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
    //초기화 코드
    // setPostInfo({
    //   ...buttons,
    //   [state.pId]: {
    //     fee: state.fee,
    //     location: data ? data.place_name : null,
    //     isClosing: false,
    //     isShooting: false,
    //   },
    // });

    console.log(postInfo);
  }, [data]);

  //   useEffect(() => {
  //     console.log(fee);
  //   }, [fee]);

  return (
    <div>
      {/* {here.isLoading && <LoadingText>isLoading</LoadingText>} */}
      <NoticeBar
        fee={fee}
        addr={postInfo[state.pId] ? postInfo[state.pId].location : "isLoading"}
      />
      <ButtonContainer>
        <Button
          id="closeBtn"
          onClick={onClosing}
          disabled={postInfo[state.pId] ? postInfo[state.pId].isClosing : false}
        >
          모집마감
        </Button>
        <IconButton
          onClick={onShooting}
          disabled={
            postInfo[state.pId] ? postInfo[state.pId].isShooting : false
          }
        >
          <MonetizationOnIcon
            sx={{
              fontSize: 50,
            }}
          />
        </IconButton>
        <Button onClick={onMap}>지도</Button>
      </ButtonContainer>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
