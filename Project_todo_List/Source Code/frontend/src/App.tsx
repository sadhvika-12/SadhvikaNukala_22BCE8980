import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TodoList from "./pages/TodoList"; // Adjust the import path if needed

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todolist" element={<TodoList />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

export default App;
