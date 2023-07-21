import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const defaultState = {
  id: 0,
  toDo: [],
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        id: state.id + 1,
        toDo: [...state.toDo, action.payload],
      }
      case "TOOGLE_TODO": 
      const id = action.payload
      const item = state.toDo.find((e) => e.id === +id)
      const setComplete = {...item, isComplete: !item.isComplete}
      const items = state.toDo.map((e) => e.id===+id? setComplete: e)
      return{...state, toDo: items
      }
      case "DELETE_TODO":
        console.log(action.payload);
        return{...state, toDo: state.toDo.filter((el) => el.id !==+action.payload)
        }
    default:
      return state;
  }
};

export const store = configureStore({ reducer });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
