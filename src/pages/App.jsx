import { useEffect, useReducer } from "react";
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
      undoTrue = tempAdd.past.length === 1 ? false : true;
      redoTrue = !!tempAdd.future.length;
      localStorage.setItem(_STORAGE, JSON.stringify(tempAdd));
      return tempAdd;

    case DONE:
      var newState = state.present.map((todo) => {
        if (todo.id !== action.payload.id) return todo;
        return { ...todo, done: !todo.done };
      });
      const tempDone = {
        future: [],
        past: [newState, ...state.past],
        present: newState,
      };
      undoTrue = tempDone.past.length === 1 ? false : true;
      redoTrue = !!tempDone.future.length;
      localStorage.setItem(_STORAGE, JSON.stringify(tempDone));
      return tempDone;

    case REMOVE_TODO:
      var temp = [...state.present];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === action.payload.id) temp.splice(i, 1);
      }
      const tempRemovetodo = {
        future: [],
        past: [temp, ...state.past],
        present: temp,
      };
      undoTrue = tempRemovetodo.past.length === 1 ? false : true;
      redoTrue = !!tempRemovetodo.future.length;
      localStorage.setItem(_STORAGE, JSON.stringify(tempRemovetodo));
      return tempRemovetodo;

    case REMOVE_ALL_TODO:
      const tempRemoveall = {
        future: [],
        past: [[], ...state.past],
        present: [],
      };
      undoTrue = tempRemoveall.past.length === 1 ? false : true;
      redoTrue = !!tempRemoveall.future.length;
      localStorage.setItem(_STORAGE, JSON.stringify(tempRemoveall));
      return tempRemoveall;

    case UNDO:
      const [firstUndo, ...restUndo] = state.past;
      const undoAction = {
        past: [...restUndo],
        present: [...restUndo[0]],
        future: [firstUndo, ...state.future],
      };
      undoTrue = undoAction.past.length === 1 ? false : true;
      redoTrue = !!undoAction.future.length;
      localStorage.setItem(_STORAGE, JSON.stringify(undoAction));
      return undoAction;

    case REDO:
      const [firstRedo, ...restRedo] = state.future;
      const redoAction = {
        past: [firstRedo, ...state.past],
        present: [...firstRedo],
        future: [...restRedo],
      };
      undoTrue = redoAction.past.length === 1 ? false : true;
      redoTrue = !!redoAction.future.length;
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
var undoTrue;
var redoTrue;

function App() {
  const inputTodos = localStorage.getItem("_STORAGE")
    ? { ...JSON.parse(localStorage.getItem("_STORAGE")) }
    : TodoList;
  const [AllTodo, dispatch] = useReducer(reducer, inputTodos);
  const newTodo = [...AllTodo.present];

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
