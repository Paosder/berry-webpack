import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Link from "./link";

describe("link", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    // @ts-ignore
    container = null;
  });

  test("mount", () => {
    act(() => {
      ReactDOM.render(<Link page="https://naver.com" />, container);
    });
  });
});
