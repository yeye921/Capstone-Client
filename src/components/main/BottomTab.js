import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";
import { styled } from "@mui/material/styles";

import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MainViewer from "../main/main/MainViewer";
import ChatListContainer from "../../containers/main/ChatListContainer";
import MyContainer from "../../containers/main/MyContainer";
import CartViewer from "./cart/CartViewer";
import { idState, roadAddrState } from "../../state";
import { useRecoilState } from "recoil";
import queryString from "query-string";

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  &.Mui-selected {
    color: rgb(104, 193, 251);
  }
`);

const useStyles = makeStyles({
  root: {
    //width: 500,
  },
});

const BottomTab = () => {
  const classes = useStyles();
  const location = useLocation();

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (location.pathname === "/main/chatlist") setValue(1);
    else if (location.pathname === "/main/mypage") setValue(2);
    else setValue(0);
  });

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          marginTop: "3rem",
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeOutlinedIcon />}
            component={Link}
            to="/main"
          />
          {/* <BottomNavigationAction
            label="Cart"
            icon={<ShoppingCartOutlinedIcon />}
            component={Link}
            to="/main/cart"
          /> */}
          {/* <BottomNavigationAction label="Like" icon={<FavoriteIcon />} /> */}
          <BottomNavigationAction
            label="Chat"
            icon={<ChatBubbleOutlineOutlinedIcon />}
            component={Link}
            to="/main/chatlist"
          />
          <BottomNavigationAction
            label="My"
            icon={<FaceOutlinedIcon />}
            component={Link}
            to="/main/mypage"
          />
        </BottomNavigation>
      </div>

      <Routes>
        <Route path="/*" element={<MainViewer />} />
        <Route path="/cart" element={<CartViewer />} />
        <Route path="/chatlist" element={<ChatListContainer />} />
        <Route path="/mypage" element={<MyContainer />} />
      </Routes>
    </>
  );
};
export default BottomTab;