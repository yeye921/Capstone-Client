import React, { useState } from "react";
import Button from "../../components/common/Button";
import queryString from "query-string";
import { finishData, ssondaData } from "../../services/chat";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { idState } from "../../state";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/chat/Topbar";

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

  const onClosing = (e) => {
    e.target.disabled = !e.target.disabled;
    finishData(state.pId).then((data) => {
      console.log(data);
      setLocation(data.data);
    });
  };

  const onShooting = (e) => {
    setDisable(true);
    setColor("disabled");
    console.log(uId, state.pId);
    ssondaData(2, 27); // 이건 됐음
    setFee(0);

    // navigate('/login');
  };
  return (
    <>
      <Topbar location={location.place_name} />
      <Button onClick={onClosing}>모집마감</Button>
      <IconButton onClick={onShooting} disabled={disable}>
        <MonetizationOnIcon
          color={color}
          sx={{
            fontSize: 50,
          }}
        />
      </IconButton>
      <div>uid: {uId}</div>
    </>
  );
};

export default ChatContainer;
