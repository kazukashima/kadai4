// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import CardPage from "../pages/CardPage";

// // supabase をモック
// jest.mock("../../supabase", () => ({
//   supabase: {
//     from: jest.fn((table: string) => {
//       if (table === "users") {
//         return {
//           select: jest.fn().mockReturnThis(),
//           eq: jest.fn().mockReturnThis(),
//           single: jest.fn().mockResolvedValue({
//             data: {
//               id: "alice",
//               name: "Alice",
//               description: "Hello, I am Alice",
//               github_id: "alicehub",
//               qiita_id: "aliceqiita",
//               x_id: "alicex",
//             },
//             error: null,
//           }),
//         };
//       }
//       if (table === "user_skill") {
//         return {
//           select: jest.fn().mockReturnThis(),
//           eq: jest.fn().mockResolvedValue({
//             data: [{ skill_id: 1 }, { skill_id: 2 }],
//             error: null,
//           }),
//         };
//       }
//       if (table === "skills") {
//         return {
//           select: jest.fn().mockReturnThis(),
//           in: jest.fn().mockResolvedValue({
//             data: [{ name: "React" }, { name: "TypeScript" }],
//             error: null,
//           }),
//         };
//       }
//       return { select: jest.fn() };
//     }),
//   },
// }));

// describe("CardPage", () => {
//   test("名前・自己紹介・技術・SNSが表示される", async () => {
//     render(
//       <MemoryRouter initialEntries={["/cards/alice"]}>
//         <Routes>
//           <Route path="/cards/:id" element={<CardPage />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Alice")).toBeInTheDocument();
//     expect(await screen.findByText("Hello, I am Alice")).toBeInTheDocument();
//     expect(await screen.findByText("React")).toBeInTheDocument();
//     expect(await screen.findByText("TypeScript")).toBeInTheDocument();

//     expect(await screen.findByText("GitHub")).toBeInTheDocument();
//     expect(await screen.findByText("Qiita")).toBeInTheDocument();
//     expect(await screen.findByText("X")).toBeInTheDocument();
//   });
// });

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardPage from "../pages/CardPage";

// navigate をモック
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "alice" }), // ← CardPageでidを使ってるので追加
}));

// supabase をモック
jest.mock("../../supabase", () => ({
  supabase: {
    from: jest.fn((table: string) => {
      if (table === "users") {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({
            data: {
              id: "alice",
              name: "Alice",
              description: "Hello, I am Alice",
              github_id: "alicehub",
              qiita_id: "aliceqiita",
              x_id: "alicex",
            },
            error: null,
          }),
        };
      }
      if (table === "user_skill") {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({
            data: [{ skill_id: 1 }, { skill_id: 2 }],
            error: null,
          }),
        };
      }
      if (table === "skills") {
        return {
          select: jest.fn().mockReturnThis(),
          in: jest.fn().mockResolvedValue({
            data: [{ name: "React" }, { name: "TypeScript" }],
            error: null,
          }),
        };
      }
      return { select: jest.fn() };
    }),
  },
}));

describe("CardPage", () => {
  test("名前・自己紹介・技術・SNSが表示される", async () => {
    render(<CardPage />);

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(await screen.findByText("Hello, I am Alice")).toBeInTheDocument();
    expect(await screen.findByText("React")).toBeInTheDocument();
    expect(await screen.findByText("TypeScript")).toBeInTheDocument();
    expect(await screen.findByText("GitHub")).toBeInTheDocument();
    expect(await screen.findByText("Qiita")).toBeInTheDocument();
    expect(await screen.findByText("X")).toBeInTheDocument();
  });

  test("戻るボタンをクリックすると / に遷移する", async () => {
    render(<CardPage />);
    const backButton = await screen.findByRole("button", { name: /戻る/i });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
