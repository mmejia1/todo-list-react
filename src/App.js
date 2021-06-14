import React from 'react';
import AllTodos from './AllTodos';
import './App.css';
const URL = 'https://git.heroku.com/halo-challenge.git/todos';

export default function App() {
  return (
    <>
      <h1>todos</h1>
      <div className='todo-app'>
        <AllTodos />
      </div>
    </>
  );
}
