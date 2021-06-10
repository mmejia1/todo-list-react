import React, { useState, useEffect } from 'react';

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

export default function TodoForm() {
  return (
    <div className='row'>
      <div className='col-md-6 col-md-offset-3'>
        <div style={{ margin: '20px' }}>
          <div className='row'>
            <div className='col-md-7'>
              <input
                type='text'
                className='form-control'
                placeholder='your task'
              />
            </div>
            <div className='col-md-4'>
              <button className='btn btn-primary'> Create New Task </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
