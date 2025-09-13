import {render, screen, fireEvent} from "@testing-library/react";
import App from "../App";

test("初期状態で count is 0 が表示される", ()=>{
  render(<App />);
  expect(screen.getByText("count is 0")).toBeInTheDocument();

});

test("ボタンをクリックするとカウントが1増える", ()=>{
  render(<App />);
  const button=screen.getByRole("button", {name: /count is/i});
  expect(button).toHaveTextContent("count is 0");
  fireEvent.click(button);
  expect(button).toHaveTextContent("count is 1")
});