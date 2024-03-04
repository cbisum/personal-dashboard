// pages/todos.tsx
"use client"

import React, { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    // Load todos from local storage on page load
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever todos change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container min-h-screen mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>

      {/* Add Todo */}
      <div className="mb-4 flex">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-l-md flex-grow"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-md"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul className="list-disc pl-4">
        {todos.map((todo) => (
          <li
          key={todo.id}
          className="mb-4 p-4 border rounded-md flex items-center justify-between bg-white shadow-md"
        >
          <span className="text-lg">{todo.text}</span>
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none"
            onClick={() => removeTodo(todo.id)}
          >
            Remove
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
