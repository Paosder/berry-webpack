import React, { useState } from "react";

const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal",
};

interface LinkProp {
  page: string;
}

const Link: React.FC<LinkProp> = ({ page, children }) => {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || "#"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

export default Link;
