import { useEffect, useState, useCallback } from "react";
import api from "./api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Add todo
  const handleAdd = async (title) => {
    try {
      const res = await api.post("/todos", { title });
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Toggle completion
  const handleToggle = async (id, done) => {
    try {
      const res = await api.put(`/todos/${id}`, { done });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  // Rename todo
  const handleRename = async (id, title) => {
    try {
      const res = await api.put(`/todos/${id}`, { title });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error renaming todo:", err);
    }
  };

  // Remove todo
  const handleRemove = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Todo List</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList
        todos={todos}
        loading={loading}
        onToggle={handleToggle}
        onRename={handleRename}
        onRemove={handleRemove}
      />
    </div>
  );
}
