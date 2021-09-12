import React from "react";
import styled from "styled-components";
import test from "./test.json";

const TestDiv = styled.div`
  background-color: grey;
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
      <TestDiv>
        <div>{test.test}</div>
      </TestDiv>
    </div>
  );
};

export default App;
