import React from 'react';
import MainContainer from '../containers/main/MainContainer';
import BottomTab from '../components/common/BottomTab';
const Main = () => {
  return (
    <>
      <MainContainer />
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          marginTop: '3rem',
        }}
      >
        <BottomTab />
      </div>
    </>
  );
};
export default Main;
