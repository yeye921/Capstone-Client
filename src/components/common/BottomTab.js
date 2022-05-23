import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onClick = (params, e) => {
    console.log(params);
    // e.preventDefault();

    navigate(`${params}`, {
      state: {},
    });
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        //Home->0, Cart->1, Chat->2, My->3
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeOutlinedIcon />}
        onClick={(e) => {
          onClick("", e);
        }}
      />
      <BottomNavigationAction
        label="Cart"
        icon={<ShoppingCartOutlinedIcon />}
        // onClick={(e) => {
        //   onClick("Cart", e);
        // }}
      />
      {/* <BottomNavigationAction label="Like" icon={<FavoriteIcon />} /> */}
      <BottomNavigationAction
        label="Chat"
        icon={<ChatBubbleOutlineOutlinedIcon />}
        onClick={(e) => {
          onClick("Chat", e);
        }}
      />
      <BottomNavigationAction
        label="My"
        icon={<FaceOutlinedIcon />}
        onClick={(e) => {
          onClick("My", e);
        }}
      />
    </BottomNavigation>
  );
};
export default BottomTab;
