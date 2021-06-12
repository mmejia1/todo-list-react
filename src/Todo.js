import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  // const deletingTodo = (todo) => {
  //   console.log('tod in single todo', todo);
  //   setTododToDelete(todo);
  // };

  // const taskdelete = async () => {
  //   console.log('in here to delete');
  //   const response = await axios.delete(
  //     `http://localhost:1337/todos/${todo.id}`
  //   );
  // };

  return todos.map((todo, index) => (
    <div className={todo.isDone ? 'todo-row done' : 'todo-row'} key={index}>
      <div
        key={todo.id}
        onClick={() => completeTodo(todo)}
        onDoubleClick={() => setEditTodo({ id: todo.id, value: todo.content })}
      >
        {todo.content}
      </div>
      <div onClick={() => removeTodo(todo)}>X</div>
    </div>
  ));
}
