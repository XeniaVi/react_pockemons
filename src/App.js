import React from "react";
import { Route, Routes } from "react-router-dom";
import { DetailedInfo } from "./components/DetailedInfo";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="pokemon/:id" element={<DetailedInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
