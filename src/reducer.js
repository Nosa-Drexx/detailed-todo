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

      // localStorage.setItem(_STORAGE, JSON.stringify(tempAdd));
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

      // localStorage.setItem(_STORAGE, JSON.stringify(tempDone));
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

      // localStorage.setItem(_STORAGE, JSON.stringify(tempRemovetodo));
      return tempRemovetodo;

    case REMOVE_ALL_TODO:
      const tempRemoveall = {
        future: [],
        past: [[], ...state.past],
        present: [],
      };

      // localStorage.setItem(_STORAGE, JSON.stringify(tempRemoveall));
      return tempRemoveall;

    case UNDO:
      const [firstUndo, ...restUndo] = state.past;
      const undoAction = {
        past: [...restUndo],
        present: [...restUndo[0]],
        future: [firstUndo, ...state.future],
      };

      // localStorage.setItem(_STORAGE, JSON.stringify(undoAction));
      return undoAction;

    case REDO:
      const [firstRedo, ...restRedo] = state.future;
      const redoAction = {
        past: [firstRedo, ...state.past],
        present: [...firstRedo],
        future: [...restRedo],
      };

      // localStorage.setItem(_STORAGE, JSON.stringify(redoAction));
      return redoAction;

    default:
      return state;
  }
}

export default reducer;
