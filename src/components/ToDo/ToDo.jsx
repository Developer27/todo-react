/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

function ToDo({ task, toggleComplete, editTodo }) {
  function checkPriority() {
    switch (task.item.priority) {
      case "Urgent":
        return "urgent";
      case "High":
        return "high";
      case "Medium":
        return "medium";
      case "Low":
        return "low";
      case "Not set":
        return "not_set";
    }
  }

  return (
    <div className={`todo ${checkPriority()}`}>
      <p
        className={`${task.item.completed ? "completed" : ""} full-width`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.item.task}
      </p>
      <div className="todo-icons">
        <FontAwesomeIcon
          className="todo-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="todo-icon"
          icon={faTrash}
          onClick={() => deleteDoc(doc(db, "todos", task.id))}
        />
      </div>
    </div>
  );
}

export default ToDo;
