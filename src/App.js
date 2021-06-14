import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllTodos from './AllTodos';
import './App.css';

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
