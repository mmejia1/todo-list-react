import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';

export default function AllTodos(props) {
  //console.log('props', props);
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    const addedTodo = [todo, ...todos];
    console.log(addedTodo);
    setTodos(addedTodo);
  };

  const updateTodo = (todoId, newValue) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const newList = [...todos].filter((todo) => todo.id !== id);
    setTodos(newList);
  };

  // const completeTodo = (id) => {
  //   let updatedTodo = todos.map((todo) => {
  //     if (todo.id === id) {
  //       todo.isComplete = !todo.isComplete;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodo);
  // };

  // Fetch your todos immediately after the component is mounted

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:1337/todos');
      console.log('made it here');
      console.log('made it here', response.data);
      setTodos(response.data);
      // this.setState({ todos: response.data });
    } catch (error) {
      //this.setState({ error });
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // const taskdelete = async () => {
  //   const response = await axios.delete('http://localhost:1337/todos/id');
  //   removeTodo();
  // };

  // useEffect(() => {df
  //   taskdelete();
  // });
  return (
    <div className='App'>
      <TodoForm onSubmit={addTodo} />

      <h1>todos</h1>
      <Todo todos={todos} updateTodo={updateTodo} removeTodo={removeTodo} />

      {/* <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul> */}
    </div>
  );
}
