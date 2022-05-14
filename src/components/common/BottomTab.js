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
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
      <BottomNavigationAction
        label="Cart"
        icon={<ShoppingCartOutlinedIcon />}
      />
      {/* <BottomNavigationAction label="Like" icon={<FavoriteIcon />} /> */}
      <BottomNavigationAction
        label="Chat"
        icon={<ChatBubbleOutlineOutlinedIcon />}
      />
      <BottomNavigationAction label="My" icon={<FaceOutlinedIcon />} />
    </BottomNavigation>
  );
};
export default BottomTab;
