import { useState } from "react";

function Input({ addTodoList }) {
  const [addedTodo, setAddedTodo] = useState({
    todo: "",
    details: "",
  });

  function manageTodo(e) {
    const key = e.target.name;

    setAddedTodo((prev) => {
      return { ...prev, [key]: e.target.value };
    });
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        return addTodoList(addedTodo);
      }}
    >
      <label htmlFor="todo">
        <input
          id="todo"
          type="text"
          name="todo"
          placeholder="Todo"
          value={addedTodo.todo}
          onChange={(event) => manageTodo(event)}
        />
      </label>
      <label htmlFor="details">
        <textarea
          id="details"
          name="details"
          type="text"
          placeholder="More Details on Todo"
          value={addedTodo.details}
          onChange={(event) => manageTodo(event)}
        />
      </label>
      <input type="Submit" value="Add" onChange={() => {}} />
    </form>
  );
}
export default Input;
