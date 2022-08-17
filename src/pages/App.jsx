import { useReducer } from "react";
import id from "../id";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TodoList from "../initialTodoList";
import Input from "../InputTodo.jsx";
import MakeTodo from "../MakeTodo";
import Footer from "../Footer";

const NEW_TODO = "NEW_TODO";
const DONE = "DONE";
const REMOVE_TODO = "REMOVE_TODO";
const _STORAGE = "_STORAGE";
const REMOVE_ALL_TODO = "REMOVE_ALL_TODO";

function reducer(state, action) {
  switch (action.type) {
    case NEW_TODO:
      localStorage.setItem(
        _STORAGE,
        JSON.stringify([action.payload, ...state])
      );
      return [action.payload, ...state];
    case DONE:
      var newState = state.map((todo) => {
        if (todo.id !== action.payload.id) return todo;
        return { ...todo, done: !todo.done };
      });
      localStorage.setItem(_STORAGE, JSON.stringify(newState));
      return newState;
    case REMOVE_TODO:
      var temp = [...state];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === action.payload.id) temp.splice(i, 1);
      }
      localStorage.setItem(_STORAGE, JSON.stringify(temp));
      return temp;
    case REMOVE_ALL_TODO:
      localStorage.setItem(_STORAGE, JSON.stringify([]));
      return [];
    default:
      return state;
  }
}

function check(addedTodo, newTodo) {
  for (let i = 0; i < newTodo.length; i++) {
    if (
      newTodo[i].details.toUpperCase() === addedTodo.details.toUpperCase() &&
      newTodo[i].todo.toUpperCase() === addedTodo.todo.toUpperCase()
    ) {
      return { id: newTodo[i].id, done: newTodo[i].done };
    }
  }
  return { id: id(), done: false };
}

function App() {
  const inputTodos = localStorage.getItem("_STORAGE")
    ? [...JSON.parse(localStorage.getItem("_STORAGE"))]
    : TodoList;
  const [newTodo, dispatch] = useReducer(reducer, inputTodos);

  function addTodoList(addedTodo) {
    dispatch({
      type: NEW_TODO,
      payload: {
        ...addedTodo,
        id: check(addedTodo, newTodo).id,
        done: check(addedTodo, newTodo).done,
      },
    });
  }

  function toggleDone(id) {
    dispatch({
      type: DONE,
      payload: {
        id,
      },
    });
  }

  function removeTodo(id) {
    dispatch({
      type: REMOVE_TODO,
      payload: {
        id,
      },
    });
  }
  function removeAllTodo() {
    dispatch({
      type: REMOVE_ALL_TODO,
    });
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <section className="inputTodo">
        {" "}
        <Link to="/" className="todoLists">
          <div />
        </Link>
        <Input addTodoList={addTodoList} removeAllTodo={removeAllTodo} />
      </section>
      <section className="todoContainer">
        <div className="Todos">
          <MakeTodo
            todos={newTodo}
            toggle={toggleDone}
            removeTodo={removeTodo}
          />
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}

export default App;
