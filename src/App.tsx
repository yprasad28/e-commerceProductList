import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/MainContent";
import ProductPage from "./Components/ProductPage";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
