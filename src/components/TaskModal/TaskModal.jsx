import React, { useState, useEffect } from "react";
import "../../styles/style.scss";

const TaskModal = ({ onClose, onSave, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Введите заголовок задачи");
      onSave({
  title,
  description,
  status: task?.status || "new",
});

      return;
    }

    onSave({
      ...task,            
      title,
      status: task?.status || "new",
    });

    onClose();              
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{task ? "EDIT NOTE" : "NEW NOTE"}</h2>
        <form onSubmit={handleSubmit}>
       <input
  type="text"
  placeholder="Input new note..."
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>CANCEL</button>
            <button type="submit">APPLY</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
