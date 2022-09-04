import { useParams, Link } from "react-router-dom";
import TodoList from "../initialTodoList";
import scrollEffect from "../animateNav";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Footer from "../Components/Footer";

function MoreDetails() {
  const params = useParams();
  const NO_EXTRA_DETAILS = "NO EXTRA DETAIL FOR THIS TODO";
  const store = localStorage.getItem("_STORAGE")
    ? [...JSON.parse(localStorage.getItem("_STORAGE")).present]
    : TodoList.present;
  const scrollElement2 = useRef();

  useEffect(() => {
    scrollEffect(scrollElement2);
  }, []);

  function details() {
    var txt = {
      todo: "ERROR: 404",
      detail: "NOTHING HERE",
      done: false,
    };
    for (let i = 0; i < store.length; i++) {
      if (String(params.id) === String(store[i].id)) {
        return store[i].details === "" || store[i].details === " "
          ? {
              todo: store[i].todo,
              detail: NO_EXTRA_DETAILS,
              done: store[i].done,
            }
          : {
              todo: store[i].todo,
              detail: store[i].details,
              done: store[i].done,
            };
      }
    }
    return txt;
  }

  const TODO = details();

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <section className="moreDetailsContainer">
        <header ref={scrollElement2} className="todoLists head">
          <Link className="Link" to="/">
            <div />
          </Link>
        </header>
        <article className="moreArticle">
          <div className="todoHead">
            <div>{TODO.todo}</div>{" "}
            {TODO.done ? (
              <i className="fa-solid fa-square-check"></i>
            ) : (
              <i className="fa-solid fa-hourglass"></i>
            )}
          </div>
          <div className="moreDetails">
            <div>{TODO.detail}</div>
          </div>
        </article>
      </section>
      <Footer />
    </motion.div>
  );
}
export default MoreDetails;
