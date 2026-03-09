import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { MyProvider } from "./store/Store.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FollowSuggPage from "./pages/FollowSuggPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/follow-suggestions", element: <FollowSuggPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyProvider>
      <RouterProvider router={router}/>
    </MyProvider>
  </StrictMode>,
);
