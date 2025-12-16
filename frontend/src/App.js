// // src/App.js
// import React from "react";
// import DrawerView from "./components/DrawerView";

// function App() {
//   return <DrawerView />;
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:drawer" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
