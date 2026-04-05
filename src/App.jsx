import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Expense from "./pages/Dashboard/Expense";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";

const Root = () => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </Router>
  );
};

export default App;
