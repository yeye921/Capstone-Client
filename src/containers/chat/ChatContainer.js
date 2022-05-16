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
import { roadAddrState } from "../../state";

const ChatContainer = ({ state }) => {
  const [color, setColor] = useState("success"); // 버튼 클릭 시 색상 변경
  const [disable, setDisable] = useState(false); // 버튼 클릭 시 disable처리
  const [fee, setFee] = useState(500); // 채팅방 상단 배달비
  const [addr, setAddr] = useState(""); // 채팅방 상단 나눔 위치
  const [location, setLocation] = useState("");

  // recoil에 저장된 변수들
  const [uId, setuId] = useRecoilState(idState);
  const [roadAddr, setRoadAddr] = useRecoilState(roadAddrState);

  const navigate = useNavigate();

  //const { pId } = queryString.parse(state);
  const here = useHere("here", "http://3.39.125.17/chat");
  const { isLoading, data } = useQuery("here");

  if (here.isLoading) {
    console.log(here.isLoading);
  }

  const onClosing = (e) => {
    e.target.disabled = !e.target.disabled;
    localStorage.setItem("isClose", true);
    // finishData(state.pId).then((data) => {
    //   setLocation(data.data);
    //   localStorage.setItem("pLocation", data.data);
    // });
    here.mutate({ pId: state.pId });
  };

  const onShooting = (e) => {
    setDisable(true);
    setColor("disabled");
    console.log(uId, state.pId);
    ssondaData(uId, state.pId);
    setFee(0);
    setAddr(roadAddr);

    // navigate('/login');
  };

  const onMap = (e) => {
    navigate("/here", {
      state: {
        pId: state.pId,
        title: state.title,
        location: location,
      },
    });
  };

  //   //useEffect 추가
  //   useEffect(() => {
  //     //렌더링 시, local storage에서 버튼, 나눔위치 정보 받아오기
  //     const isClose = localStorage.getItem("isClose");

  //     if (isClose) {
  //       //버튼 비활성화 유지 테스트 -> 나중에 리덕스로도 바꿀 수 있는듯
  //       //const target = document.getElementById("closeBtn");
  //       //target.disabled = true;
  //     }
  //   }, []);

  return (
    <>
      {data && <Topbar location={data.place_name} />}
      <NoticeBar fee={fee} addr={addr} />

      <Button id="closeBtn" onClick={onClosing}>
        모집마감
      </Button>
      <IconButton onClick={onShooting} disabled={disable}>
        <MonetizationOnIcon
          color={color}
          sx={{
            fontSize: 50,
          }}
        />
      </IconButton>
      <Button onClick={onMap}>지도</Button>
      <div>uid: {uId}</div>
    </>
  );
};

export default ChatContainer;
