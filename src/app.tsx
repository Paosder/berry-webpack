import React from "react";
import styled from "styled-components";
import TestComponent from "./test";
import test from "./test.json";

const TestDiv = styled.div`
  background-color: blue;
`;

const testObject = {
  a: 4,
  b: 3,
};

const App: React.FC = () => {
  const t = "Hello world!";
  return (
    <div>
      {t}
      <section>{process.env.TEST_ENV}</section>
      <section>{process.env.NODE_ENV}</section>
      <section>{testObject.a}</section>
      <TestComponent />
      <TestDiv>
        <div>{test.test}d3d243</div>
      </TestDiv>
    </div>
  );
};

export default App;
