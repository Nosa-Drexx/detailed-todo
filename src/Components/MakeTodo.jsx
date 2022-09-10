import id from "../id";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

var elemArr = JSON.parse(localStorage.getItem("_STORAGE")).present.length;

function MakeTodo({ todos, toggle, removeTodo }) {
  const allElem = useRef(null);
  allElem.current = [];

  //For animating the eye logo
  useEffect(() => {
    if (todos.length) {
      //Only run if you have todos
      gsap.to(".fa-eye", 1, {
        scale: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    }
  });

  //For animation each todo individually when they load in first
  function animateIndividualTodo() {
    const tl = gsap.timeline();
    tl.fromTo(
      ".aniContainer",
      0.3,
      {
        x: 500,
        stagger: 0.1,
        opacity: 0,
      },
      {
        x: 0,
        stagger: 0.1,
        opacity: 1,
      }
    );

    return tl;
  }

  useEffect(() => {
    if (todos.length) {
      animateIndividualTodo();
    }
  }, []);

  //For animation new todos only
  useEffect(() => {
    if (elemArr < todos.length && todos.length) {
      gsap.fromTo(
        allElem.current[0],
        0.3,
        {
          x: 500,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
        }
      );

      elemArr = todos.length;
    }
  });

  const elementRefs = (elem) => {
    if (elem && !allElem.current.includes(elem)) {
      allElem.current.push(elem);
    }
    // console.log(allElem.current[0]);
  };

  return (
    <>
      {todos.map((todo) => {
        return (
          <article key={id()} className="aniContainer" ref={elementRefs}>
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
                  onClick={(e) => removeTodo(e, todo.id)}
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
