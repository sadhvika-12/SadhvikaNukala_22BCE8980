import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodoItem from "../TodoItem";
import ShinyButton from "../components/magicui/shiny-button";
import { CoolMode } from "../components/magicui/cool-mode";
import StarsCanvas from "../StarBackground";

interface Todo {
  _id: string;
  title: string;
  text: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newTodo, setNewTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Get auth token
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch todos from backend - wrapped in useCallback
  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: getAuthHeader(),
      });
      setTodos(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin");
      }
    }
  }, [navigate]);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/signin");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchTodos();
  }, [navigate, fetchTodos]); // ✅ Added fetchTodos to dependencies

  const addTodo = async () => {
    if (newTitle.trim() && newTodo.trim()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/todos",
          { title: newTitle.trim(), text: newTodo.trim() },
          { headers: getAuthHeader() }
        );
        setTodos([response.data, ...todos]);
        setNewTitle("");
        setNewTodo("");
      } catch (err) {
        alert("Failed to add todo");
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: getAuthHeader(),
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      alert("Failed to delete todo");
    }
  };

  const editTodo = (id: string) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    if (todoToEdit) {
      setNewTitle(todoToEdit.title);
      setNewTodo(todoToEdit.text);
      deleteTodo(id);
    }
  };

  const removeAllTodos = async () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      try {
        await Promise.all(
          todos.map((todo) =>
            axios.delete(`http://localhost:5000/api/todos/${todo._id}`, {
              headers: getAuthHeader(),
            })
          )
        );
        setTodos([]);
      } catch (err) {
        alert("Failed to delete all todos");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="relative z-10 p-4 flex flex-col items-center w-full h-full min-h-screen">
      <StarsCanvas />

      {/* User info and logout */}
      <div className="relative z-20 w-full max-w-6xl flex justify-between items-center mb-4">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4 flex justify-center text-white">
            Welcome, {user?.email}
          </h2>
        </div>
        <button onClick={logout} className="">
          <ShinyButton text="Logout" />
        </button>
      </div>

      <div className="relative z-20 w-full max-w-6xl p-4 m-4 rounded bg-black/30 border backdrop-filter backdrop-blur-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">
          Todo List
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center mb-4 w-full">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-500 px-3 py-2 rounded-lg mr-2 w-full bg-black text-white md:w-1/4 lg:w-1/6 mb-2 md:mb-0"
            placeholder="Task Title"
            disabled={loading}
          />
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border border-gray-500 px-3 py-2 rounded-lg mr-2 w-full bg-black text-white md:w-3/4 lg:w-1/2"
            placeholder="Add a new task"
            disabled={loading}
          />
          <div className="flex flex-col md:flex-row items-center md:ml-2 mt-2 md:mt-0">
            <CoolMode>
              <button
                onClick={addTodo}
                className="mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                disabled={loading}
              >
                <ShinyButton text={loading ? "Adding..." : "Add Todo"} />
              </button>
            </CoolMode>
            <CoolMode>
              <button onClick={removeAllTodos} className="w-full md:w-auto">
                <ShinyButton text="Remove All" />
              </button>
            </CoolMode>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-6xl mt-4 relative z-20">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
        {todos.length === 0 && (
          <div className="text-center text-white text-lg">
            No todos yet. Add your first task!
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
