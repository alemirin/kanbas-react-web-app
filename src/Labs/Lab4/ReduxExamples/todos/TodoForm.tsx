import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item d-flex align-items-center">
      <div className="d-flex order-2 ms-4">
        <button
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
          className="btn btn-success order-2 ms-2"
        >
          Add
        </button>
        <button
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
          className="btn btn-warning order-1"
        >
          Update{" "}
        </button>
      </div>
      <input
        className="order-1 flex-grow-1"
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
    </li>
  );
}
