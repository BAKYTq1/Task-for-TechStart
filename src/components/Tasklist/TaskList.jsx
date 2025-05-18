import React from "react";
import { FiEyeOff, FiEdit2, FiTrash } from "react-icons/fi";
import nothing from '../../assets/Detective-check-footprint 1.svg';
import nothing2 from '../../assets/Detective-check-footprint 1 (1).svg';

const TaskList = ({ tasks, onToggleStatus, onDelete, onEdit,theme }) => {
  if (tasks.length === 0) {
    return <div className="empty">   {theme === "light" ? <img width={200} src={nothing} alt="" />: <img width={200} src={nothing2} alt="" />}
    <h2>Empty...</h2>
    </div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className={`task ${task.status}`} key={task.id}>
          <div style={{display:'flex',}}>
          <input
          className="theme-checkbox"
            type="checkbox"
            checked={task.status === "completed"}
            onChange={() => onToggleStatus(task.id)}
          />

          <div className="info">
            <span className="title">{task.title}</span>
          </div>
          </div>

          <div className="icons">
            <button className="icon-button" title="Редактировать" onClick={() => onEdit(task)}>
              <FiEdit2 />
            </button>
            <button className="icon-button" title="Удалить" onClick={() => onDelete(task.id)}>
              <FiTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
