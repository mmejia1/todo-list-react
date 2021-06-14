import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';

export default function AllTodos() {
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActive] = useState(0);
  const [clearCompleted, setClearCompleted] = useState(false);

  // Fetch your todos immediately after the component is mounted
  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:1337/todos');
      setTodos(response.data);

      //CHECKING ACTIVE TASK FOR COUNT
      const active = response.data.filter((todo) => {
        if (todo.isDone === false) {
          return todo;
        }
      });
      setActive(active.length);

      //CHECKING COMPLETED TASK FOR CLEAR COMPLETED BUTTON
      const isClearCompletedActivated = response.data.filter((todo) => {
        if (todo.isDone === true) {
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
    const id = todo.id;
    const newList = [...todos].filter((todo) => todo.id !== id);

    await axios.delete(`http://localhost:1337/todos/${todo.id}`);
    setTodos(newList);
  };

  const completeTodo = (todo) => {
    let updatedTodos = todos.map((task) => {
      if (todo.id === task.id) {
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

    setTodos(filteredCompletedTodo.data);
  };

  const active = async () => {
    const filteredActive = await axios.get(
      'http://localhost:1337/todos?isDone=false'
    );
    setTodos(filteredActive.data);
  };
  // DeLETING A LIST OF ALL DONE
  const deleteList = async () => {
    todos.filter((todo) => {
      if (todo.isDone !== false) {
        removeTodo(todo);
      }
    });
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
