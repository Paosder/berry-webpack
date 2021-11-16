import React from "react";
import styled from "styled-components";

const Div = styled.div`
  background-color: greenyellow;
`;

const SplittedComponent: React.FC = () => {
  return <Div>Splitted Component!</Div>;
};

export default SplittedComponent;
