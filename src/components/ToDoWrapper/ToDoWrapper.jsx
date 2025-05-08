import { useState, useEffect } from "react";
import ToDo from "../ToDo/ToDo";
import ToDoForm from "../ToDoForm/ToDoForm";
import { v4 as uuidv4 } from "uuid";
import ToDoEdit from "../ToDoEdit/ToDoEdit";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

uuidv4();
const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));

function ToDoWrapper() {
  const [todos, setTodos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [radioValue, setRadioValue] = useState("");

  const [completedTodos, setCompletedTodos] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const [priority, setPriority] = useState("");

  const [order, setOrder] = useState(1);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  }, []);

  function sortPriority(prior) {
    setPriority(prior);
    setCompletedTodos(todos.filter((item) => item.item.priority === prior));
    setIsSorted(true);
  }

  function reset() {
    setIsSorted(false);
  }

  ///Adding Todos to data base
  function addToDo(todo) {
    addDoc(collection(db, "todos"), {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
      priority: radioValue,
      order: order,
      timestamp: serverTimestamp(),
    });
    setOrder(order + 1);
  }

  ///Complete Todo
  function toggleComplete(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          updateDoc(doc(db, "todos", id), {
            completed: !todo.item.completed,
          });
        }
        return todo.id === id
          ? {
              ...todo,
              item: Object.assign(todo.item, {
                completed: !todo.item.completed,
              }),
            }
          : todo;
      })
    );
  }

  function editTodo(id) {
    if (isSorted) {
      setCompletedTodos(
        completedTodos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    }
  }

  ///Update task it data base
  async function editTask(task, id, radio) {
    await setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              item: Object.assign(todo.item, { priority: radio }, todo.item, {
                task: task,
              }),
            }
          : todo
      )
    );
    if (radio) {
      updateDoc(doc(db, "todos", id), {
        task: task,
        priority: radio,
      });
    } else {
      updateDoc(doc(db, "todos", id), {
        task: task,
      });
    }
    setCompletedTodos(todos.filter((item) => item.item.priority === priority));
  }

  return (
    <>
      <div className="todo-wrapper">
        <h1 className="todo-title">Get things done</h1>
        <div className="btns-filter">
          <div className="priority-btn-wrapper">
            <a
              className="priority-btn-sort urgent-label"
              onClick={() => sortPriority("Urgent")}
            >
              Urgent
            </a>
            <a
              className="priority-btn-sort high-label"
              onClick={() => sortPriority("High")}
            >
              High
            </a>
            <a
              className="priority-btn-sort medium-label"
              onClick={() => sortPriority("Medium")}
            >
              Medium
            </a>
            <a
              className="priority-btn-sort low-label"
              onClick={() => sortPriority("Low")}
            >
              Low
            </a>
            <a
              className="priority-btn-sort not_set-label"
              onClick={() => sortPriority("Not set")}
            >
              Not set
            </a>
            <a className="priority-btn-sort" onClick={() => reset()}>
              All
            </a>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="add-task-btn"
          >
            Add New Task
          </button>
        </div>

        {isAdding ? (
          <div className="todo-modal">
            <ToDoForm
              addToDo={addToDo}
              setIsAdding={setIsAdding}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
              isAdding={isAdding}
            />
          </div>
        ) : (
          ""
        )}

        {isSorted
          ? completedTodos.map((todo) => {
              return todo.isEditing ? (
                <div key={todo.id} className="shadowed-todo">
                  <div className="todo-modal">
                    <ToDoEdit
                      editTodo={editTask}
                      edit={editTodo}
                      task={todo}
                      setRadioValue={setRadioValue}
                    />
                  </div>
                  <ToDo
                    task={todo}
                    key={todo.id}
                    toggleComplete={toggleComplete}
                    editTodo={editTodo}
                  />
                </div>
              ) : (
                <ToDo
                  task={todo}
                  key={todo.id}
                  toggleComplete={toggleComplete}
                  editTodo={editTodo}
                />
              );
            })
          : todos.map((todo) => {
              return todo.isEditing ? (
                <div key={todo.id} className="shadowed-todo">
                  <div className="todo-modal">
                    <ToDoEdit
                      editTodo={editTask}
                      edit={editTodo}
                      task={todo}
                      setRadioValue={setRadioValue}
                    />
                  </div>
                  <ToDo
                    task={todo}
                    key={todo.id}
                    toggleComplete={toggleComplete}
                    editTodo={editTodo}
                  />
                </div>
              ) : (
                <ToDo
                  task={todo}
                  key={todo.id}
                  toggleComplete={toggleComplete}
                  editTodo={editTodo}
                />
              );
            })}
      </div>
    </>
  );
}

export default ToDoWrapper;
