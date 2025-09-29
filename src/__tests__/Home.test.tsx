import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act } from "react";
import Home from "../pages/Home";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockClear();
});

describe("Homeページ", () => {
  test("ID入力フォームが表示される", () => {
    render(<Home />);
    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
  });

  test("IDを入力して名刺を見るボタンを押すと /cards/:id に遷移する", async () => {
    render(<Home />);
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/ID/i), "alice");
      await userEvent.click(screen.getByRole("button", { name: /名刺を見る/i }));
    });
    expect(mockNavigate).toHaveBeenCalledWith("/cards/alice");
  });

  test("ID未入力で名刺を見るを押すとエラーメッセージが表示される", async () => {
    render(<Home />);
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: /名刺を見る/i }));
    });
    expect(await screen.findByText(/idは必須です/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("新規登録はこちらボタンを押すと /cards/register に遷移する", async () => {
    render(<Home />);
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: /新規登録はこちら/i }));
    });
    expect(mockNavigate).toHaveBeenCalledWith("/cards/register");
  });
});
