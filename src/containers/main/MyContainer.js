import React from "react";
import { UserViewer, PointViewer } from "../../components/main/My/MyViewer";
import { useRecoilState } from "recoil";
import { nameState, pointState } from "../../state";

const MyContainer = () => {
  const [username, setUsername] = useRecoilState(nameState);
  const [point, setPoint] = useRecoilState(pointState);

  return (
    <>
      <UserViewer name={username} />
      <PointViewer point={point} />
    </>
  );
};

export default MyContainer;
