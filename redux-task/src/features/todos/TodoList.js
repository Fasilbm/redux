// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

import { useState } from "react";
import {
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodoQuery();
  console.log(todos, "todos");
  const [addTodo,{isLoading:isAdding}] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userID: 1, title: newTodo, completed: false });
    setNewTodo("");
  };
  
  const handleDelete = (id) => {
    deleteTodo(id);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  } 
  console.log("hfaksdhfkjdsn")

  if (isError) {
    return <p>error123</p>;
  }
  

  return (
    <main>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
          <input
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
        </div>
        <button className="submit"> {isAdding ?"Adding" :"submit"}</button>
      </form>
      {todos.map((todo) => {
        return (
          <article key={todo.id}>
            <div className="todo">
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id}
                onChange={() =>
                  updateTodo({  ...todo, completed: !todo.completed })
                }
              />
              <label htmlFor={todo.id}>{todo.title}</label>
            </div>
            <button className="trash" onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </article>
        );
      })}
    </main>
  );
};

export default TodoList;
