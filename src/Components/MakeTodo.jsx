import id from "../id";
import { Link } from "react-router-dom";

function MakeTodo({ todos, toggle, removeTodo }) {
  return (
    <>
      {todos.map((todo) => {
        return (
          <article key={id()}>
            <div>
              <div className="dateTime">
                {todo.date ? (
                  <>
                    <div>{todo.date.currentTime}</div>
                    <div>{todo.date.currentDate}</div>
                  </>
                ) : (
                  " "
                )}
              </div>
              <div className="todoInfo">
                <h3>{todo.todo}</h3>
                <div className="details">
                  {todo.details}
                  <button className="view" id={todo.id} data-id={todo.id}>
                    <Link to={`/MoreDetails/${todo.id}`}>
                      {" "}
                      <i className="fa-solid fa-eye"></i>{" "}
                    </Link>
                  </button>
                </div>
              </div>
              <div className="otherEvents">
                <label htmlFor="checkbox">
                  <input
                    id="checkbox"
                    name="checkbox"
                    type="checkbox"
                    onChange={() => toggle(todo.id)}
                    checked={todo.done}
                  />{" "}
                  Done
                </label>
                <button
                  className="removeThis"
                  onClick={() => removeTodo(todo.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
export default MakeTodo;
