import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AllTodos from './AllTodos';
import reportWebVitals from './reportWebVitals';
import TodoForm from './TodoForm';

ReactDOM.render(
  <React.StrictMode>
    <AllTodos />
    <TodoForm />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
