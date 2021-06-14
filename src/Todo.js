import React, { useState } from 'react';
import TodoForm from './TodoForm';

export default function Todo(props) {
  console.log('todos after filter', props);
  const { todos, completeTodo, removeTodo, updateTodo } = props;
  console.log('todos after filter', todos);
  const [editTodo, setEditTodo] = useState({
    id: null,
    content: '',
    isDone: false,
  });

  //const [todoToDelete, setTododToDelete] = useState({});

  //UPDATEtODO
  const submitUpdate = (value) => {
    updateTodo(editTodo.id, value);
    setEditTodo({
      id: null,
      value: '',
    });
  };

  if (editTodo.id) {
    console.log('editTodo', editTodo);
    return <TodoForm editTodo={editTodo} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    // <div className={todo.isDone ? 'todo-row done' : 'todo-row'} key={index}>
    <ul className='todo'>
      <li>
        <div
          className={todo.isDone ? 'todo-row done' : 'todo-row'}
          key={todo.id}
          onClick={() => completeTodo(todo)}
          onDoubleClick={() =>
            setEditTodo({ id: todo.id, value: todo.content })
          }
        >
          {todo.content}
        </div>

        <div className='x' onClick={() => removeTodo(todo)}>
          X
        </div>
      </li>
    </ul>
  ));
}
