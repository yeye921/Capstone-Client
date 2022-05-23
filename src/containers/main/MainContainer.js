import React from 'react';
import MainHeader from '../../components/common/MainHeader';
import MainViewer from '../../components/main/main/MainViewer';
import BottomTab from '../../components/main/BottomTab';

const MainContainer = () => {
	return (
		<div>
			{/* <MainHeader text={text} /> */}
			{/* 
       <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          marginTop: '3rem',
        }}
      > */}
			<BottomTab />
			{/* </div> */}
		</div>
	);
};
export default MainContainer;
