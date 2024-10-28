import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "../Form/Form";

function App() {
  // Инициализируем `todos` значениями из `localStorage`, если они есть
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [allTodos, setAllTodos] = useState(0);
  const [allComplite, setAllComplite] = useState(0);

  useEffect(() => {
    setAllComplite(todos.filter((todo) => todo.done === true).length);
    setAllTodos(todos.length);
    // Сохраняем `todos` в `localStorage` при каждом изменении
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const putTodo = (value) => {
    if (value) {
      setTodos([...todos, { id: Date.now(), text: value, done: false }]);
    } else {
      alert("Введите текст");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          done: !todo.done,
        };
      })
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">TodoList</h1>
        <Form putTodo={putTodo} />

        <ul className="todos">
          {todos.map((todo) => (
            <li
              className={todo.done ? "todo done" : "todo"}
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
              <img
                src="./img/delete.svg"
                alt="delete"
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTodo(todo.id);
                }}
              />
            </li>
          ))}
        </ul>
        <div className="info">
          <span>All todos: {allTodos}</span>
          <span>Complete: {allComplite}</span>
        </div>
        <div className="resetBtn-container">
          <button className="resetBtn" onClick={clearAllTodos}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
