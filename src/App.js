import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const ref = useRef()
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();
  const toDos = useSelector((state) => state.toDo);
  const id = useSelector((state) => state.id);
  const addTodo = () => {
    ref.current.value = ''
    if (!todoText) {
      return
    }
    dispatch({
      type: "ADD_TODO",
      payload: { id: id + 1, content: todoText, isComplete: false },
    });
    setTodoText('')
  };
  const todoCatch = (event) => {
    const target = event.target;
    setTodoText(target.value);
  };
  const toogleTodo = (event) => {
    const id = event.target.id;
    dispatch({
      type: "TOOGLE_TODO",
      payload: id,
    });
  };
  const deleteTodo = (event) => {
    const id = event.target.dataset.id;
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const notComplete = toDos.filter((todo) => !todo.isComplete);
  const Complete = toDos.filter((todo) => todo.isComplete);
  return (
    <div className="app">
      <div style={{ display: "flex" }}>
        <input ref={ref} onInput={todoCatch}></input>
        <button onClick={addTodo}>добавить</button>
      </div>
      <div style={{ display: "flex" }}>
        <ul>
          {notComplete.map((toDo) => (
            <li
              id={toDo.id}
              onClick={toogleTodo}
              className = {`todo ${toDo.isComplete ? "isComlpete" : "isNoComlete"}`}
              key={toDo.id}
            >
              {toDo.content}
            </li>
          ))}
        </ul>
        <ul>
          {Complete.map((toDo) => (
            <>
              <li
                id={toDo.id}
                onClick={toogleTodo}
                className={toDo.isComplete ? "isComlpete" : "isNoComlete"}
                key={toDo.id}
              >
                {toDo.content}
              </li>
              <button className="btn" data-id={toDo.id} onClick={deleteTodo}>
                Удалить
              </button>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
