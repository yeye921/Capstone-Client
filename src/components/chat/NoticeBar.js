import React from "react";
import styled from "styled-components";

const Content = styled.div`
  //   background-color: rgba(221, 220, 220, 0.8);
  background-color: rgba(230, 228, 228, 0.8);
  margin-top: 0.3rem;
  width: 20.5rem;
  height: 3.3rem;
  border-radius: 0.5rem;
  padding-left: 1.5rem;

  padding-top: 0.5rem;
`;
const Text = styled.div`
  font-size: 14px;
  margin-bottom: 0.2rem;
`;
const Location = styled.div`
  font-size: 14px;
  color: blue;
  text-decoration: underline;
  margin-left: 0.4rem;
`;
const Div = styled.div`
  display: flex;
`;
const NoticeBar = (props) => {
  const { fee, addr } = props;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Content>
        <Text>현재 나의 배달비: {fee}원</Text>
        <Div>
          <Text>나눔 위치: </Text>
          <Location>{addr}</Location>
        </Div>
      </Content>
    </div>
  );
};
export default NoticeBar;
