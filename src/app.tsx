import React from "react";

const t2 = {
  a: 4,
  b: 3,
};

const App: React.FC = () => {
  const t = 5;
  return (
    <div>
      test as23d are tyou
      {t}
      {`
asdasd
asdasdsdasd
      `}
      <div>te{t2.a}</div>
    </div>
  );
};

export default App;
