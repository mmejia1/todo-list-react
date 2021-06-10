import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllTodos() {
  const [todos, setTodods] = useState([]);

  // Fetch your restaurants immediately after the component is mounted

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:1337/todos');
      console.log('made it here');
      console.log('made it here', response.data);
      setTodods(response.data);
      // this.setState({ todos: response.data });
    } catch (error) {
      //this.setState({ error });
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className='App'>
      <h1>todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
}

// class AllTodos extends React.Component {
//   // State of your application
//   state = {
//     todos: [],
//     error: null,
//   };

//   // Fetch your restaurants immediately after the component is mounted
//   componentDidMount = async () => {
//     try {
//       const response = await axios.get('http://localhost:1337/todos');
//       console.log('made it here');
//       console.log('made it here', response.data);
//       this.setState({ todos: response.data });
//     } catch (error) {
//       this.setState({ error });
//     }
//   };

//   render() {
//     const { error, todos } = this.state;

//     // Print errors if any
//     if (error) {
//       return <div>An error occured: {error.message}</div>;
//     }

//     return (
//       <div className='App'>
//         <h1>todos</h1>
//         <ul>
//           {this.state.todos.map((todo) => (
//             <li key={todo.id}>{todo.content}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default AllTodos
