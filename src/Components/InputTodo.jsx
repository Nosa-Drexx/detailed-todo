import { useEffect, useState } from "react";

function Input({ addTodoList }) {
  const [addedTodo, setAddedTodo] = useState({
    todo: "",
    details: "",
    date: {},
  });
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    setDateTime(new Date());
  }, [addedTodo]);

  function manageTodo(e) {
    const key = e.target.name;

    setAddedTodo((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
        date: {
          currentTime: dateTime.toLocaleTimeString(),
          currentDate: dateTime.toLocaleDateString(),
        },
      };
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
      <label className="textarea" htmlFor="details">
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
