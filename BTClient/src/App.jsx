import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Chart, { chartLoader } from "./components/Chart";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/chart",
    element: <Chart />,
    loader: chartLoader,
    errorElement: <ErrorBoundary />,
  },
]);

function App() {
  return (
    <div style={{ width: "100%" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
