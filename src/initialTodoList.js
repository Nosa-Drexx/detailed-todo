var TodoList = [];
//FOR PREVIOUS USERS OF THE APP BEFORE IMPLEMENTATION OF REDO AND UNDO FEATURE
if (
  localStorage.getItem("_STORAGE") &&
  !JSON.parse(localStorage.getItem("_STORAGE")).past
) {
  localStorage.setItem(
    "_STORAGE",
    JSON.stringify({
      past: [[...JSON.parse(localStorage.getItem("_STORAGE"))]],
      present: [...JSON.parse(localStorage.getItem("_STORAGE"))],
      future: [],
    })
  );
}

//PREVENT UNDO AND REDO FROM PEREXISTING EVEN AFTER RELOADS;
window.addEventListener("load", () => {
  if (
    localStorage.getItem("_STORAGE") &&
    JSON.parse(localStorage.getItem("_STORAGE")).past
  ) {
    localStorage.setItem(
      "_STORAGE",
      JSON.stringify({
        past: [[...JSON.parse(localStorage.getItem("_STORAGE")).present]],
        present: [...JSON.parse(localStorage.getItem("_STORAGE")).present],
        future: [],
      })
    );
  }
});

//FOR NEW USERS OF THE APP
TodoList = {
  past: [
    [
      {
        id: 0,
        todo: "nothing",
        details: "i have nothing to do now",
        done: false,
      },
    ],
  ],
  present: [
    {
      id: 0,
      todo: "nothing",
      details: "i have nothing to do now",
      done: false,
    },
  ],
  future: [],
};
export default TodoList;
