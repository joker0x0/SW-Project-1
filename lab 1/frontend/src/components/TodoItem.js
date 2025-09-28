import { useState } from "react";

export default function TodoItem({ todo, onToggle, onRename, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== todo.title) {
      onRename(todo._id, newTitle);
    }
    setIsEditing(false);
  };

  return (
    <li style={{ marginBottom: "0.5rem" }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo._id, !todo.done)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
          <button onClick={handleRename} style={{ marginLeft: "0.5rem" }}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: "0.5rem" }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              marginLeft: "0.5rem",
              textDecoration: todo.done ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>
          <button onClick={() => setIsEditing(true)} style={{ marginLeft: "0.5rem" }}>
            Edit
          </button>
          <button
            onClick={() => onRemove(todo._id)}
            style={{ marginLeft: "0.5rem", color: "red" }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
