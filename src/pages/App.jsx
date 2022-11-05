import { useEffect, useReducer, useState, useRef } from "react";
import id from "../id";
import scrollEffect from "../animateNav";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TodoList from "../initialTodoList";
import Input from "../Components/InputTodo.jsx";
import MakeTodo from "../Components/MakeTodo";
import Footer from "../Components/Footer";
import reducer from "../reducer";
import { gsap } from "gsap";

const NEW_TODO = "NEW_TODO";
const DONE = "DONE";
const REMOVE_TODO = "REMOVE_TODO";
const REMOVE_ALL_TODO = "REMOVE_ALL_TODO";
const UNDO = "UNDO";
const REDO = "REDO";

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
  const [addNewTodo, setAddNewTodo] = useState(false);

  const scrollElement = useRef();
  localStorage.setItem("_STORAGE", JSON.stringify(AllTodo));

  const undoTrue = AllTodo.past.length === 1 ? false : true;
  const redoTrue = !!AllTodo.future.length;

  //Nav bar animation
  useEffect(() => {
    scrollEffect(scrollElement);
  }, []);

  useEffect(() => {
    if (addNewTodo) {
      let tl = gsap.timeline();
      tl.fromTo(
        ".actioncenter",
        0.3,
        {
          scale: 0.01,
          yPercent: 45,
          xPercent: 40,
        },
        { yPercent: 1, xPercent: 1, scale: 1 }
      );
    }
  }, [addNewTodo]);

  //floating add btn animation
  useEffect(() => {
    if (!addNewTodo) {
      let tl = gsap.timeline();
      tl.to(".createtodo", 1.5, {
        y: -30,
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true,
        ease: "Bounce.easeIn",
      });
      // tl.to(".createtodo", 0.5, {
      //   rotation: 360,
      //   repeat: -1,
      //   repeatDelay: 3,
      // });
    }
  }, [addNewTodo]);

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

  async function hideActionCenter() {
    await gsap.fromTo(
      ".actioncenter",
      0.3,
      {
        scale: 1,
      },
      { scale: 0.01, yPercent: 45, xPercent: 40 }
    );
    setAddNewTodo(!addNewTodo);
  }

  async function removeTodo(e, id) {
    const parentRemoved =
      e.target.parentElement.parentElement.parentElement.parentElement;

    //Animation for individual todo when removed
    await gsap.fromTo(
      parentRemoved,
      0.2,
      {
        x: 0,
        opacity: 1,
      },
      {
        x: 1000,
        opacity: 0,
      }
    );

    dispatch({
      type: REMOVE_TODO,
      payload: {
        id,
      },
    });
  }

  //Todo removed animation
  function animateTodoRemove() {
    const tl = gsap.timeline();
    tl.fromTo(
      ".aniContainer",
      0.1,
      {
        x: 0,
        stagger: 0.05,
        opacity: 1,
      },
      {
        x: 500,
        stagger: 0.05,
        opacity: 0,
      }
    );

    return tl;
  }

  async function removeAllTodo() {
    if (!!newTodo.length) {
      await animateTodoRemove();
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
      <nav ref={scrollElement} className="inputTodo">
        {" "}
        <Link to="/" className="todoLists">
          <div />
        </Link>
        <div className="reverseAction">
          <button disabled={!undoTrue} onClick={undoTodoAction}>
            Undo{" "}
          </button>
          <button disabled={!redoTrue} onClick={redoTodoAction}>
            Redo{" "}
          </button>
        </div>
      </nav>
      <section className="todoContainer">
        <div className="Todos">
          <MakeTodo
            todos={newTodo}
            toggle={toggleDone}
            removeTodo={removeTodo}
          />
        </div>
        {addNewTodo ? (
          <>
            <div className="todomodal"></div>
            {addNewTodo && (
              <div className="actioncenter">
                <div className="hideactioncenter-container">
                  {" "}
                  <button
                    className="hideactioncenter"
                    onClick={hideActionCenter}
                  >
                    X
                  </button>
                </div>
                <Input
                  addTodoList={addTodoList}
                  removeAllTodo={removeAllTodo}
                />
                <button className="removeAllTodo" onClick={removeAllTodo}>
                  Remove All Todos
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="createtodo">
            <button onClick={() => setAddNewTodo(!addNewTodo)}>+</button>
          </div>
        )}
      </section>
      <Footer />
    </motion.div>
  );
}

export default App;
