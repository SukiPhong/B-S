import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
const router = createBrowserRouter(routes);
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
