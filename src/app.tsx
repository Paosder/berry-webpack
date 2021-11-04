import React, { Suspense } from "react";
import styled from "styled-components";
import test from "./test.json";

const OtherComponent = React.lazy(() => import("./test"));

const TestDiv = styled.div`
  background-color: yellow;
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
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
      <TestDiv>
        <div>{test.test}d3d243</div>
      </TestDiv>
    </div>
  );
};

export default App;
