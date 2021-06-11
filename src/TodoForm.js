import React, { useState, useEffect } from 'react';
import axios from 'axios';
//input the values, when button clickecd there should be a post request sent to back end

export default function TodoForm(props) {
  const [content, setTodo] = useState('');
  //const [completed, setCompleted] = useState(false)

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

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('in handlesubmit');
    props.onSubmit({
      content: content,
    });
    // we want to set input to state so it can be postted?
    addTodo(content);
    //reset for next input value on form
    setTodo('');
  }

  function onChange(evt) {
    console.log(evt.target.value);
    let todo = evt.target.value;
    setTodo(todo);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='col-md-7'>
        <input
          onChange={(evt) => onChange(evt)}
          type='text'
          className='form-control'
          placeholder='your task'
          value={content}
        />
      </div>
      <div className='col-md-4'>
        <button className='btn btn-primary'> Create New Task </button>
      </div>
    </form>
  );
}

// class TodoForm extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   render() {
//     return (
//       <form>

//       </form>
//     )
//   }
// }

// export default TodoForm;
