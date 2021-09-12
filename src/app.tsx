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
      <button
        type="button"
        className="
        px-4 py-1 text-sm text-purple-600
        font-semibold rounded-full border border-purple-200
        hover:text-white hover:bg-purple-600 hover:border-transparent
        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        tailwindcss test!0
      </button>
    </div>
  );
};

export default App;
