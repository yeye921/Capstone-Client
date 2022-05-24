import React, { useState } from "react";
import Face from "@material-ui/icons/Face";
import Button from "../../common/Button";
import Payment from "./Payment";
import { UserBlock, Greeting } from "./styles";

const UserViewer = (props) => {
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
  return (
    <>
      <div>POINT</div>
      <div>{props.point}</div>
      <Payment>충전</Payment>
      <Button>내역</Button>
    </>
  );
};

export { UserViewer, PointViewer };
