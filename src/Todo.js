import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Todo(props) {
  const { todos, completeTodo, removeTodo } = props;
  const [editTodo, setEditTodo] = useState({
    id: null,
    content: '',
  });
  // const file = async () => {
  //   await strapi.plugins['upload'].services.upload.fetch({ id });
  //   await strapi.plugins['upload'].services.upload.remove(todos);
  // };
  // const taskdelete = async () => {
  //   const response = await axios.delete('http://localhost:1337/todos/id');
  //   removeTodo();
  // };

  // useEffect(() => {
  //   taskdelete();
  // }, []);

  return todos.map((todo, index) => (
    <div
      className={todo.isCompleted ? 'todo-row completed' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.content}
      </div>
      <div onClick={() => removeTodo(todo.id)}>X</div>
    </div>
  ));
}
