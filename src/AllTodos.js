import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';

export default function AllTodos() {
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActive] = useState(0);
  const [clearCompleted, setClearCompleted] = useState(false);

  //FETCHING ALL TODOS
  // Fetch your todos immediately after the component is mounted
  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:1337/todos');
      console.log('made it here', response.data);
      console.log('made it here', response.data);
      setTodos(response.data);
      const countingTodos = response.data.length;
      console.log('bunny', countingTodos);

      //CHECKING ACTIVE TASK FOR COUNT
      const active = response.data.filter((todo) => {
        console.log('IN HERE TO FILTER');
        if (todo.isDone === false) {
          console.log(todo);
          return todo;
        }
      });
      console.log('filteractive', active);
      setActive(active.length);

      //CHECKING COMPLETED TASK FOR CLEAR COMPLETED BUTTON
      const isClearCompletedActivated = response.data.filter((todo) => {
        console.log('IN HERE TO FILTER');
        if (todo.isDone === true) {
          console.log(todo);
          return todo;
        }
      });
      if (isClearCompletedActivated.length > 0) {
        setClearCompleted(true);
      } else {
        setClearCompleted(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  //ADDING A TODO TO LIST
  const addTodo = (todo) => {
    const addedTodo = [todo, ...todos];
    console.log(addedTodo);
    setTodos(addedTodo);
    getTodos();
  };
  //UPDATING A TODO ON LIST
  const updateTodo = (todoId, newValue) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };
  //DELETING TODO ON LIST
  const removeTodo = async (todo) => {
    console.log('id', todo);
    const id = todo.id;
    const newList = [...todos].filter((todo) => todo.id !== id);

    const response = await axios.delete(
      `http://localhost:1337/todos/${todo.id}`
    );
    setTodos(newList);
  };

  const completeTodo = (todo) => {
    const id = todo.id;
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        console.log('foundIt');
        todo.isDone = !todo.isDone;
      }

      getTodos();

      return todo;
    });

    setTodos(updatedTodos);

    axios.put(`http://localhost:1337/todos/${todo.id}`, {
      isDone: todo.isDone,
    });
  };

  // DISPLAY COMPLETED OR ACTIVE
  const completedTodosList = async () => {
    const filteredCompletedTodo = await axios.get(
      'http://localhost:1337/todos?isDone=true'
    );
    console.log(filteredCompletedTodo.data);
    setTodos(filteredCompletedTodo.data);
  };

  const active = async () => {
    const filteredActive = await axios.get(
      'http://localhost:1337/todos?isDone=false'
    );

    console.log(filteredActive.data);
    setTodos(filteredActive.data);
  };
  // DeLETING A LIST OF ALL DONE
  const deleteList = async () => {
    console.log('todos to be deleted', todos);
    const listNotDelete = todos.filter((todo) => {
      //console.log('can I see is done', todo.isDone);
      if (todo.isDone !== false) {
        removeTodo(todo);

        console.log(todo);
      }
    });
    //setTodos(listNotDelete);
    getTodos();
  };

  return (
    <>
      <div className='App'>
        <TodoForm onSubmit={addTodo} />

        <Todo
          todos={todos}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
          completeTodo={completeTodo}
        />
        <div className='bar'>
          <div id='active'> {activeTodos} remaining task</div>
          <button onClick={() => getTodos()}>AllTodos </button>
          <button onClick={() => active()}>Active </button>

          <button onClick={() => completedTodosList()}> Completed</button>

          {clearCompleted && (
            <div onClick={(todo) => deleteList(todo)}>clear completed </div>
          )}
        </div>
      </div>
    </>
  );
}
