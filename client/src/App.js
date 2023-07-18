import "./App.css";
import "./stylesheet/alignments.css";
import "./stylesheet/cusom-components.css";
import "./stylesheet/form-elements.css";
import "./stylesheet/text-elements.css";
import "./stylesheet/theme.css";
import "./stylesheet/layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Home from "./pages/Home/home";
import ProtectedRouted from "./components/ProtectedRouted";
import PublicRoute from "./components/PublicRoute";
import Loader from "./pages/Loader/Loder";
import { useSelector } from "react-redux";
import Transactions from "./pages/Transactions";
import Requests from "./pages/Requests";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouted>
                <Home />
              </ProtectedRouted>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouted>
                <Profile />
              </ProtectedRouted>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRouted>
                <Users />
              </ProtectedRouted>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRouted>
                <Transactions />
              </ProtectedRouted>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRouted>
                <Requests />
              </ProtectedRouted>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
