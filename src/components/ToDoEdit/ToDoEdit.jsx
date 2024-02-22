/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons'
import CustomRadio from "../CustomRadio/CustomRadio";

function ToDoEdit({editTodo, task, edit}) {

  const [value, setValue] = useState(`${task.item.task}`);
  let oldValue = task.item.task;
  const [editPriority, setEditPriority] = useState(task.item.priority);
 
  const priorities = [
    {value: 'Urgent', label: 'Urgent', label_color: 'urgent-label', priority_back:'radio-btn-urgent', priority_border: 'priority-label-urgent'},
    {value: 'High', label: 'High', label_color: 'high-label', priority_back: 'radio-btn-high', priority_border: 'priority-label-high'},
    {value: 'Medium', label: 'Medium', label_color: 'medium-label', priority_back: 'radio-btn-medium', priority_border: 'priority-label-medium'},
    {value: 'Low', label: 'Low', label_color: 'low-label', priority_back: 'radio-btn-low', priority_border: 'priority-label-low'},
    {value: 'Not set', label: 'Not set', label_color: 'not_set-label', priority_back: 'radio-btn-not_set', priority_border: 'priority-label-not_set'}, 
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    if(oldValue === value) {
      editTodo(value, task.id, editPriority);
      edit(task.id);
    }else {
      editTodo(value, task.id, editPriority);
      setValue('');
    }
  }

  function updatePriority(newValue) {
    setEditPriority(newValue);
  }

  return (
  <div className="todo-wrapper-modal">
    <div className="edit-wrapper">
      <h1 className="todo-title">Edit your task</h1>
      <FontAwesomeIcon className='todo-icon' icon = {faClose} onClick={() => {edit(task.id)}}/>
    </div>
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-edit-wrapper">
        <div className="todo-edit-input-wrapper">
          <input type="text" className="todo-input-edit" value={value} onChange={(e)=> setValue(e.target.value)} placeholder='Edit your task...'/>
          <button type="submit" className="todo-btn-edit">Update</button>
        </div>
        <div className="priorities">
          {priorities.map(item => {
            return(
            <div className="priority" key={item.value}>
              <CustomRadio class={item.priority_back} value={item.value} updatePriority={updatePriority} editPriority={editPriority} />
              <label className={`${item.label_color} ${item.priority_border} priority-label`} htmlFor={item.value}>{item.label}</label>
            </div>
          )})}
        </div>
      </div>
    </form>
  </div>   
  )
}

export default ToDoEdit;