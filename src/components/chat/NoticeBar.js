import React from "react";
import styled from "styled-components";

const Content = styled.div`
  background-color: rgba(230, 228, 228);
  // margin-top: 0.1rem;
  width: 21rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  padding-left: 1.5rem;
  // padding-top: 0.5rem;
  padding-top: 0.9rem;
`;
const Text = styled.div`
  // color: white;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;
const Location = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: navy;
  text-decoration: underline;
  margin-left: 0.4rem;
`;
const Div = styled.div`
  display: flex;
`;
const Container = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
`;

const NoticeBar = (props) => {
  const { fee, addr } = props;
  return (
    <Container>
      <Content>
        <Text>현재 나의 배달비: {fee}원</Text>
        <Div>
          <Text>나눔 위치: </Text>
          <Location>{addr}</Location>
        </Div>
      </Content>
    </Container>
  );
};
export default NoticeBar;
