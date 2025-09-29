// import { render, screen, act } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";
// import RegisterCard from "../pages/RegisterCard";

// // ✅ navigate をモック
// const mockNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockNavigate,
// }));

// // ✅ supabase をモック
// jest.mock("../../supabase", () => ({
//   supabase: {
//     from: jest.fn(() => ({
//       insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
//     })),
//   },
// }));

// describe("RegisterCard", () => {
//   test("全項目入力して登録ボタンを押すと / に遷移する", async () => {
//     render(<RegisterCard />);

//     await act(async () => {
//       await userEvent.type(screen.getByLabelText(/好きな英単語/), "alice");
//       await userEvent.type(screen.getByLabelText(/お名前/), "Alice");
//       await userEvent.type(screen.getByLabelText(/自己紹介/), "Hello world");
//       await userEvent.selectOptions(screen.getByLabelText(/好きな技術/), "1");
//       await userEvent.click(screen.getByRole("button", { name: "登録" }));
//     });

//     // ✅ navigate("/") が呼ばれることを確認
//     expect(mockNavigate).toHaveBeenCalledWith("/");
//   });
// });

// src/__tests__/RegisterCard.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterCard from "../pages/RegisterCard";

// navigate をモック
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// supabase モック
jest.mock("../../supabase", () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ data: [{}], error: null }),
    })),
  },
}));

describe("RegisterCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("タイトルが表示される", () => {
    render(<RegisterCard />);
    expect(
      screen.getByRole("heading", { name: /名刺新規登録/i })
    ).toBeInTheDocument();
  });

  test("全項目入力して登録ボタンを押すと / に遷移する", async () => {
    render(<RegisterCard />);

    fireEvent.change(screen.getByLabelText(/好きな英単語/), {
      target: { value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/自己紹介/), {
      target: { value: "Hello world" },
    });
    fireEvent.change(screen.getByLabelText(/好きな技術/), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("IDが空だとエラーメッセージが表示される", async () => {
    render(<RegisterCard />);

    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/自己紹介/), {
      target: { value: "Hello world" },
    });
    fireEvent.change(screen.getByLabelText(/好きな技術/), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => {
      expect(screen.getByText("IDは必須です")).toBeInTheDocument();
    });
  });

  test("名前が空だとエラーメッセージが表示される", async () => {
    render(<RegisterCard />);

    fireEvent.change(screen.getByLabelText(/好きな英単語/), {
      target: { value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/自己紹介/), {
      target: { value: "Hello world" },
    });
    fireEvent.change(screen.getByLabelText(/好きな技術/), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => {
      expect(screen.getByText("名前は必須です")).toBeInTheDocument();
    });
  });

  test("自己紹介が空だとエラーメッセージが表示される", async () => {
    render(<RegisterCard />);

    fireEvent.change(screen.getByLabelText(/好きな英単語/), {
      target: { value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/好きな技術/), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => {
      expect(screen.getByText("自己紹介は必須です")).toBeInTheDocument();
    });
  });

  test("オプション未入力でも登録できる", async () => {
    render(<RegisterCard />);

    fireEvent.change(screen.getByLabelText(/好きな英単語/), {
      target: { value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/自己紹介/), {
      target: { value: "Hello world" },
    });
    fireEvent.change(screen.getByLabelText(/好きな技術/), {
      target: { value: "1" },
    });

    // GitHub, Qiita, X は未入力

    fireEvent.click(screen.getByRole("button", { name: "登録" }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
