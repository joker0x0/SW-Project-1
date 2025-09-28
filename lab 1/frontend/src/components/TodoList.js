import TodoItem from "./TodoItem";

export default function TodoList({ todos, loading, onToggle, onRename, onRemove }) {
  if (loading) return <p>Loading todos...</p>;
  if (todos.length === 0) return <p>No todos yet. Add one!</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onRename={onRename}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
