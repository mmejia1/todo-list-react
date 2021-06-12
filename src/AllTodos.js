import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';
//import Completed from './Completed';

export default function AllTodos(props) {
  //console.log('props', props);
  const [todos, setTodos] = useState([]);
  const [todoDelete, setTodoDelete] = useState({});
  const [numberOfTodos, setCount] = useState(0);

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

  const removeTodo = (todo) => {
    console.log('id', todo);
    const id = todo.id;
    const newList = [...todos].filter((todo) => todo.id !== id);

    setTodos(newList);
    console.log('todo', todo);
    console.log('id here', id);
    //taskdelete(id);

    setTodoDelete(todo);
    //set the state to object i want to delete to be passd in axios call
    taskdelete(todoDelete);
  };

  const taskdelete = async () => {
    console.log('in here to delete', todoDelete);
    const response = await axios.delete(
      `http://localhost:1337/todos/${todoDelete.id}`
    );
  };

  const completeTodo = (todo) => {
    const id = todo.id;
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        console.log('foundIt');
        todo.isDone = !todo.isDone;
      }
      return todo;
    });

    setTodos(updatedTodos);

    axios.put(`http://localhost:1337/todos/${todo.id}`, {
      isDone: todo.isDone,
    });
  };
  //need axios call to update if todo isDone
  // const updateIsDone = async () => {
  //   console.log('todoUpdate', idUpdate);
  //   await axios.put(`http://localhost:1337/todos/${idUpdate.id}`, {
  //     // isDone: 1isDone,
  //   });
  // };

  // Fetch your todos immediately after the component is mounted

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:1337/todos');
      console.log('made it here');
      console.log('made it here', response.data);
      setTodos(response.data);
      const countingTodos = response.data.length;
      console.log(countingTodos);
      setCount(countingTodos);
      // this.setState({ todos: response.data });
    } catch (error) {
      //this.setState({ error });
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // DISPLAY COMPLETED OR ACTIVE
  const completedTodosList = async () => {
    const filteredCompletedTodo = await axios.get(
      'http://localhost:1337/todos?isDone=true'
    );
    // const filteredCompletedTodo = todos.filter((todo) => {
    //   console.log(todo);
    //   if (todo.isDone === true) {
    //     return todo;
    //   }
    // });
    console.log(filteredCompletedTodo.data);
    setTodos(filteredCompletedTodo.data);
  };

  const active = async () => {
    const filteredActive = await axios.get(
      'http://localhost:1337/todos?isDone=false'
    );

    //todos.filter((todo) => {
    //   console.log(todo);
    //   if (todo.isDone === false) {
    //     return todo;
    //   }
    // });
    console.log(filteredActive.data);
    setTodos(filteredActive.data);
  };

  return (
    <div className='App'>
      <TodoForm onSubmit={addTodo} />

      <h1>todos</h1>
      <Todo
        todos={todos}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
      />
      <div>you have {numberOfTodos} task left</div>
      <button onClick={() => getTodos()}>AllTodos </button>
      <button onClick={() => active()}>Active </button>
      {/* <Completed todos={todos} /> */}

      <button onClick={() => completedTodosList()}> Completed</button>

      {/* <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul> */}
    </div>
  );
}
