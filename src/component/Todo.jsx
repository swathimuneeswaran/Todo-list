import React, { useState } from "react";
import "../style/Todo.css"

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); 
  const handleAdd = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a task");
      return;
    }
    const newTodo = { text: inputValue, completed: false };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
  };

  const handleDelete = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTodos = todoList.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodos);
  };

  const filteredTodos = todoList.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true; 
  });

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-button" onClick={handleAdd}>
          Add Task
        </button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <span className="todo-text">{todo.text}</span>
            <button className="delete-button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
