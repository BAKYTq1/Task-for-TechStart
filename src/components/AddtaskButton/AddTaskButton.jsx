import React from "react";
import { FiPlus } from "react-icons/fi";
// import "../styles/addbutton.scss";

const AddTaskButton = ({onClick}) => {
  return (
    <button className="add-task-button1" onClick={onClick}>
      <FiPlus size={24} />
    </button>
  );
};

export default AddTaskButton;