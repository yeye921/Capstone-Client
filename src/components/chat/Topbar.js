import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  height: 8vh;
  background-color: #84848480;
  margin: 0.5em;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Topbar = ({ location }) => {
  return <>{location && <Bar>{location}</Bar>}</>;
};

export default Topbar;
