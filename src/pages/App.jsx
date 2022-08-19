import { useReducer } from "react";
import id from "../id";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TodoList from "../initialTodoList";
import Input from "../Components/InputTodo.jsx";
import MakeTodo from "../Components/MakeTodo";
import Footer from "../Components/Footer";

const NEW_TODO = "NEW_TODO";
const DONE = "DONE";
const REMOVE_TODO = "REMOVE_TODO";
const _STORAGE = "_STORAGE";
const REMOVE_ALL_TODO = "REMOVE_ALL_TODO";
const UNDO = "UNDO";
const REDO = "REDO";

function reducer(state, action) {
  switch (action.type) {
    case NEW_TODO:
      const newPresent = [action.payload, ...state.present];
      const tempAdd = {
        future: [],
        past: [newPresent, ...state.past],
        present: newPresent,
      };
      localStorage.setItem(_STORAGE, JSON.stringify(tempAdd));
      return tempAdd;

    case DONE:
      var newState = state.present.map((todo) => {
        if (todo.id !== action.payload.id) return todo;
        return { ...todo, done: !todo.done };
      });
      localStorage.setItem(
        _STORAGE,
        JSON.stringify({
          future: [],
          past: [newState, ...state.past],
          present: newState,
        })
      );
      return {
        future: [],
        past: [newState, ...state.past],
        present: newState,
      };

    case REMOVE_TODO:
      var temp = [...state.present];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === action.payload.id) temp.splice(i, 1);
      }
      localStorage.setItem(
        _STORAGE,
        JSON.stringify({
          future: [],
          past: [temp, ...state.past],
          present: temp,
        })
      );
      return { future: [], past: [temp, ...state.past], present: temp };

    case REMOVE_ALL_TODO:
      localStorage.setItem(
        _STORAGE,
        JSON.stringify({
          future: [],
          past: [[], ...state.past],
          present: [],
        })
      );
      return { future: [], past: [[], ...state.past], present: [] };

    case UNDO:
      const [firstUndo, ...restUndo] = state.past;
      const undoAction = {
        past: [...restUndo],
        present: [...restUndo[0]],
        future: [firstUndo, ...state.future],
      };
      localStorage.setItem(_STORAGE, JSON.stringify(undoAction));
      return undoAction;

    case REDO:
      const [firstRedo, ...restRedo] = state.future;
      const redoAction = {
        past: [firstRedo, ...state.past],
        present: [...firstRedo],
        future: [...restRedo],
      };
      localStorage.setItem(_STORAGE, JSON.stringify(redoAction));
      return redoAction;

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
    ? { ...JSON.parse(localStorage.getItem("_STORAGE")) }
    : TodoList;
  const [AllTodo, dispatch] = useReducer(reducer, inputTodos);
  const newTodo = [...AllTodo.present];
  const undoTrue = inputTodos.past.length === 1 ? false : true;
  const redoTrue = !!inputTodos.future.length;

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
    if (!!newTodo.length) {
      dispatch({
        type: REMOVE_ALL_TODO,
      });
    }
  }
  function undoTodoAction() {
    dispatch({ type: UNDO });
  }
  function redoTodoAction() {
    dispatch({ type: REDO });
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
        <button className="removeAllTodo" onClick={removeAllTodo}>
          Remove All Todos
        </button>
        <div className="reverseAction">
          <button disabled={!undoTrue} onClick={undoTodoAction}>
            Undo{" "}
          </button>
          <button disabled={!redoTrue} onClick={redoTodoAction}>
            Redo{" "}
          </button>
        </div>
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
