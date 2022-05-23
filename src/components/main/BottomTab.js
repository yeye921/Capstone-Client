import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import { styled } from '@mui/material/styles';

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MainViewer from '../main/main/MainViewer';
import MyPageViewer from '../main/mypage/MyPageViewer';
import CartViewer from "./cart/CartViewer";
import ChatList from "./chatlist/ChatList";
import { idState, roadAddrState } from "../../state";
import { useRecoilState } from "recoil";

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
  const [value, setValue] = React.useState(0);

  return (
    <>
    <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          marginTop: '3rem',
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
        <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} component={Link} to="/main"/>
        <BottomNavigationAction
          label="Cart"
          icon={<ShoppingCartOutlinedIcon />}
          component={Link} to="/main/cart"
        />
        {/* <BottomNavigationAction label="Like" icon={<FavoriteIcon />} /> */}
        <BottomNavigationAction
          label="Chat" icon={<ChatBubbleOutlineOutlinedIcon />} component={Link} to="/main/chatlist" />
        <BottomNavigationAction label="My" icon={<FaceOutlinedIcon />} component={Link} to="/main/mypage" />
      </BottomNavigation>
    </div>
    
    <Routes>
      <Route path="/*" element={<MainViewer />} />
      <Route path="/cart" element={<CartViewer />} />
      <Route path ="/chatlist" element={<ChatList />} />
      <Route path="/mypage" element={<MyPageViewer />} />
    </Routes>
    </>
  );
};
export default BottomTab;
