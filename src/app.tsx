import React from "react";

const t2 = {
  a: 4,
  b: 3,
};

const App: React.FC = () => {
  const t = 5;
  return (
    <div>
      test
      {t}
      {process.env.TEST_ENV}
      {process.env.NODE_ENV}
      <div>test{t2.a}</div>
    </div>
  );
};

export default App;
