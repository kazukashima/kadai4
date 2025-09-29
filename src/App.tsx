import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardPage from "./pages/CardPage";
import RegisterCard from "./pages/RegisterCard";
import Home from "./pages/Home";

// function Home() {
//   return <h1>ホーム画面</h1>;
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards/:id" element={<CardPage />} />
        <Route path="/cards/register" element={<RegisterCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// App はルーティングだけにしてください。
// 余分な <React.StrictMode> や <ChakraProvider> は外します。