import React from "react";
import styled from "styled-components";

const Div = styled.div`
  background-color: greenyellow;
`;

const TestComponent: React.FC = () => {
  return <Div>Spliited Component!</Div>;
};

export default TestComponent;
