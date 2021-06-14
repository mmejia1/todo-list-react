import React, { useState } from 'react';
import axios from 'axios';
//input the values, when button clickecd there should be a post request sent to back end

export default function TodoForm(props) {
  //console.log('props', props.editTodo.value);
  //useState needs to be set for a new added task or for editing task
  const [content, setTodo] = useState(
    props.editTodo ? props.editTodo.value : ''
  );
  //const [completed, setCompleted] = useState(false)
  console.log('edit propsp', props);
  const addTodo = async (content) => {
    await axios
      .post('http://localhost:1337/todos', {
        content: content,
        isDone: false,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const updateTodoRequest = async () => {
    //console.log('event', evt.target);
    console.log('inhere to destroy', content);
    const data = await axios
      .put(`http://localhost:1337/todos/${props.editTodo.id}`, {
        content: content,
      })
      .then((response) => {
        console.log(response);
      });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('in handlesubmit', evt);

    props.onSubmit({
      content: content,
    });
    if (props.editTodo) {
      console.log('we have props');
      setTodo(evt.target.value);
      updateTodoRequest();
    } else {
      // we want to set input to state so it can be postted?
      addTodo(content);
    }
    //reset for next input value on form
    setTodo('');
  }

  function onChange(evt) {
    console.log(evt.target.value);
    let todo = evt.target.value;
    setTodo(todo);
  }

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      {/* insert if statement in case its an existing to do and we just want to edit */}

      {props.editTodo ? (
        <>
          <input
            onChange={(evt) => onChange(evt)}
            type='text'
            className='form-control'
            placeholder='edit your task'
            value={content}
          />
          <button className='btn btn-primary'> Edit Task </button>
        </>
      ) : (
        <>
          <input
            onChange={(evt) => onChange(evt)}
            type='text'
            className='form-control'
            placeholder='your task'
            value={content}
          />
          {/* <button className='btn btn-primary'> Create New Task </button> */}
        </>
      )}
    </form>
  );
}
