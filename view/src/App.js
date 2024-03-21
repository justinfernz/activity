import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util/index';

const App = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState([]); //useState should be initialized empty (no inner brackets)
  const [error, setError] = useState(''); //same as above, no need for '' within parentheses

  const fetchTodos = async () => {
    try { //is there a way to perform this function without using try/catch? An if statement may be more optimal.
      const res = await getTodos();
      setTodoList(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    //const data for new FormData is missing from this section
    try {
      const newTodo = await createTodo({
        description: todo.description, //needs to be wrapped around a call to data.set
        created_at: new Date().toISOString(), //needs to be wrapped around a call to data.set
      });
      todo(newTodo); //might be unnecessary
      setTodo({ description: '' });
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setError(''); //not needed
    try {
      await removeTodo(id);
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); 

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) => setTodo({ ...todo, description: event.target.value })}
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList && todoList.map((todoItem) => ( //it's better to write this as an if (?) statement
          <li
            key={todoItem.todo_id}
            onClick={() => {
              handleDelete(todoItem.todo_id);
            }}
          >
            {todoItem.description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
