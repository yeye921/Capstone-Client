import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MainHeader from '../common/MainHeader';
import CategoryTab from './CategoryTab'
import {SearchContainer, Input, ListContainer, ItemContainer, AddButton} from './MainStyle'
import ListItem from './CategoryTab/ListItem'

const MainViewer = () => {
  const location = '원천동';

  return (
    <div style={{overflow: "scroll"}}>
      {/* 카테고리 탭 상단 공통부분 */}
      <MainHeader text={location} /> 

      {/* 카테고리 탭 */}
      <CategoryTab/>

       {/* 카테고리 탭 하단 공통부분 */}
      <AddButton>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab size="medium" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
        </AddButton>
    </div>
  );
};
export default MainViewer;
