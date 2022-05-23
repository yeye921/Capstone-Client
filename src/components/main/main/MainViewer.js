import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import MainHeader from "../../common/MainHeader";
import CategoryTab from "./CategoryTab";
import { AddButton } from "../main/MainStyle";
import { useNavigate } from "react-router-dom";
import {
  addrState,
  idState,
  roadAddrState,
  xState,
  yState,
} from "../../../state";
import { useRecoilState } from "recoil";

const MainViewer = () => {
  const [uId, setUid] = useRecoilState(idState);
  const [roadAddr, setRoadAddr] = useRecoilState(roadAddrState);
  const [addr, setAddr] = useRecoilState(addrState);
  const [x, setX] = useRecoilState(xState);
  const [y, setY] = useRecoilState(yState);

  let text = "";

  if (roadAddr === "") {
    text = addr;
  } else if (roadAddr.length > 21) {
    text = roadAddr.substr(0, 21);
  } else {
    text = roadAddr;
  }

  const navigate = useNavigate();
  const onClick = () => {
    console.log("버튼클릭");
    navigate("/post");
  };

  useEffect(() => {
    console.log("현재 u_x u_y: ", x, y);
  });

  return (
    <div style={{ overflow: "scroll" }}>
      {/* 카테고리 탭 상단 공통부분 */}
      <MainHeader text={text} />

      {/* 카테고리 탭 */}
      <CategoryTab />

      {/* 카테고리 탭 하단 공통부분 */}
      <AddButton>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab size="medium" color="primary" aria-label="add" onClick={onClick}>
            <AddIcon />
          </Fab>
        </Box>
      </AddButton>
    </div>
  );
};
export default MainViewer;
