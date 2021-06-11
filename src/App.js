import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllTodos from './AllTodos';

export default function App() {
  // const [todos, setTodods] = useState([]);
  // console.log('todos', todos);

  // // Fetch your restaurants immediately after the component is mounted

  // const getTodos = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:1337/todos');
  //     console.log('made it here');
  //     console.log('made it here', response.data);
  //     setTodods(response.data);
  //     // this.setState({ todos: response.data });
  //   } catch (error) {
  //     //this.setState({ error });
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getTodos();
  // }, []);

  return (
    <>
      <AllTodos />
    </>
  );
}
