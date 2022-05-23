import React from "react";
import styled from "styled-components";
import Face from "@material-ui/icons/Face";
import Button from "../../common/Button";

const UserBlock = styled.div`
  margin-top: 1.5em;
  margin-left: 2.5em;
  margin-right: 2.5em;
  margin-bottom: 1em;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
`;

const Greeting = styled.div`
  font-size: large;
`;

const UserViewer = (props) => {
  console.log(props.name);

  return (
    <>
      <UserBlock>
        <Face />
        <Greeting>
          <b>{props.name}</b>님<br />
          안녕하세요
        </Greeting>
      </UserBlock>
      <hr style={{ width: "90vw" }} />
    </>
  );
};

const PointViewer = (props) => {
  console.log(props.point);
  return (
    <>
      <div>POINT</div>
      <div>{props.point}</div>
      <Button>충전</Button>
      <Button>내역</Button>
    </>
  );
};

export { UserViewer, PointViewer };
