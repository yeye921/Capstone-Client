import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import MainHeader from "../common/MainHeader";
import CategoryTab from "./CategoryTab";
import {
  SearchContainer,
  Input,
  ListContainer,
  ItemContainer,
  AddButton,
} from "./MainStyle";
import ListItem from "./CategoryTab/ListItem";
import { useNavigate } from "react-router-dom";
import { roadAddrState } from "../../state";
import { useRecoilState } from "recoil";

const MainViewer = () => {
  const [roadAddr, setRoadAddr] = useRecoilState(roadAddrState);
  // const location = '원천동';

  const navigate = useNavigate();
  const onClick = () => {
    console.log("버튼클릭");
    navigate("/post");
  };

  return (
    <div style={{ overflow: "scroll" }}>
      {/* 카테고리 탭 상단 공통부분 */}
      <MainHeader text={roadAddr} />

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
