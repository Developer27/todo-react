/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CustomRadio from "../CustomRadio/CustomRadio";


function ToDoForm({addToDo, setIsAdding, isAdding, setRadioValue}) {
  const [value, setValue] = useState('');
  
  const priorities = [
    {value: 'Urgent', label: 'Urgent', label_color: 'urgent-label', priority_back:'radio-btn-urgent', priority_border: 'priority-label-urgent'},
    {value: 'High', label: 'High', label_color: 'high-label', priority_back: 'radio-btn-high', priority_border: 'priority-label-high'},
    {value: 'Medium', label: 'Medium', label_color: 'medium-label', priority_back: 'radio-btn-medium', priority_border: 'priority-label-medium'},
    {value: 'Low', label: 'Low', label_color: 'low-label', priority_back: 'radio-btn-low', priority_border: 'priority-label-low'},
    {value: 'Not set', label: 'Not set', label_color: 'not_set-label', priority_back: 'radio-btn-not_set', priority_border: 'priority-label-not_set'}, 
  ]
 
  const handleSubmit = (e) => {
    e.preventDefault();
    addToDo(value);
    setValue('');
    setIsAdding(!isAdding);
  }
  
  return (
    <div className="todo-wrapper-modal">
      <div className="edit-wrapper">
        <h1 className="todo-title">Add new task</h1>
        <FontAwesomeIcon className='todo-icon' icon = {faClose} onClick={() => {setIsAdding(!isAdding)}}/>
      </div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="todo-edit-wrapper">
          <div className="todo-edit-input-wrapper">
            <input type="text" className="todo-input" value={value} onChange={(e)=> setValue(e.target.value)} placeholder="Add new..."/>
            <button type="submit" className="todo-btn">Add</button>
          </div>
          <div className="priorities">
            {priorities.map(item => {
              return(
              <div className="priority" key={item.value}>
                <CustomRadio class={item.priority_back} value={item.value} setRadioValue={setRadioValue}/>
                <label className={`${item.label_color} ${item.priority_border} priority-label`} htmlFor={item.value}>{item.label}</label>
              </div>
            )})}
          </div>
        </div>
      </form>
    </div>
  )
}

export default ToDoForm;