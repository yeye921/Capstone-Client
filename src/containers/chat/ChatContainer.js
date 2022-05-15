import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { finishData, ssondaData } from "../../services/chat";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { idState } from "../../state";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/chat/Topbar";
import { useMutation } from "react-query";

const ChatContainer = ({ state }) => {
  const [color, setColor] = useState("success"); // 버튼 클릭 시 색상 변경
  const [disable, setDisable] = useState(false); // 버튼 클릭 시 disable처리
  const [fee, setFee] = useState(0); // 채팅방 상단 배달비
  const [location, setLocation] = useState("");

  // recoil로 선언한 사용자 로그인 아이디
  const uId = useRecoilValue(idState);
  const setuId = useSetRecoilState(idState);
  const navigate = useNavigate();

  //const { pId } = queryString.parse(state);

  const { mutate, isLoading, data, isSuccess } = useMutation(finishData);

  if (isSuccess) {
    console.log(data);
  }

  const onClosing = (e) => {
    e.target.disabled = !e.target.disabled;
    localStorage.setItem("isClose", true);
    // finishData(state.pId).then((data) => {
    //   setLocation(data.data);
    //   localStorage.setItem("pLocation", data.data);
    // });
    mutate({ p_id: state.pId });
  };

  const onShooting = (e) => {
    setDisable(true);
    setColor("disabled");
    console.log(uId, state.pId);
    ssondaData(2, 27); // 이건 됐음
    setFee(0);

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

  //useEffect 추가
  useEffect(() => {
    //렌더링 시, local storage에서 버튼, 나눔위치 정보 받아오기
    const isClose = localStorage.getItem("isClose");

    if (isClose) {
      //버튼 비활성화 유지 테스트 -> 나중에 리덕스로도 바꿀 수 있는듯
      //const target = document.getElementById("closeBtn");
      //target.disabled = true;
    }
  }, []);

  return (
    <>
      {isLoading && <div>isLoading</div>}
      <Topbar location={location.place_name} />
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
