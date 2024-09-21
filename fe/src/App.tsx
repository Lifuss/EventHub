import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./ui/Layout";

const BoardPage = lazy(() => import("./pages/BoardPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ParticipantsPage = lazy(() => import("./pages/ParticipantsPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={"Loading..."}>
              <BoardPage />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense fallback={"Loading..."}>
              <ParticipantsPage />
            </Suspense>
          }
        />
        <Route
          path="/register/:id"
          element={
            <Suspense fallback={"Loading..."}>
              <RegisterPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
