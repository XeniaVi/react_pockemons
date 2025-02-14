import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

import { DetailedInfo } from "./components/DetailedInfo.jsx";
import { Layout } from "./components/Layout.jsx";
import { Main } from "./components/Main.jsx";

function App() {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="pokemon/:id" element={<DetailedInfo />} />
        </Route>
      </Routes>
    </QueryParamProvider>
  );
}

export default App;
