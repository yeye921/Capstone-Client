import React from "react";
import { UserViewer, PointViewer } from "../../components/main/mypage/MyViewer";
import { useRecoilState } from "recoil";
import { nameState, pointState } from "../../state";
import Header from "../../components/common/Header";

const MyContainer = () => {
  const [username, setUsername] = useRecoilState(nameState);
  const [point, setPoint] = useRecoilState(pointState);

  return (
    <>
      <Header name="마이페이지" />
      <UserViewer name={username} />
      <PointViewer point={point} />
    </>
  );
};

export default MyContainer;
