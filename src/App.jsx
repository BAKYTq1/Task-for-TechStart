import React, { useEffect, useState } from "react";
import TaskList from "./components/Tasklist/TaskList";
import Header from "./components/header/Header";
import AddTaskButton from "./components/AddtaskButton/AddTaskButton";
import "./styles/style.scss";
import TaskModal from "./components/TaskModal/TaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [darkMode, setDarkMode] = useState(false); 
  const [theme, setTheme] = useState("light");

useEffect(() => {
  document.body.className = theme;
}, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (task) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...task, id: t.id } : t))
      );
    } else {
      setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const next =
          task.status === "new"
            ? "in-progress"
            : task.status === "in-progress"
            ? "completed"
            : "new";
        return { ...task, status: next };
      })
    );
  };
const filteredTasks = tasks.filter((task) => {
  const title = task.title?.toLowerCase() || "";
  const description = task.description?.toLowerCase() || "";
  const search = searchTerm.toLowerCase();

  const matchSearch = title.includes(search) || description.includes(search);

  const matchFilter =
    filter === "ALL"
      ? true
      : filter === "complete"
      ? task.status === "completed"
      : filter === "Incomplete"
      ? task.status !== "completed"
      : true;

  return matchSearch && matchFilter;
});



  return (
    <div className={`light  ${darkMode ? "dark" : ""}`}>
    <Header
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  filter={filter}
  setFilter={setFilter}
  setTheme={setTheme} 
  theme={theme}
/>

      <TaskList
        tasks={filteredTasks}
        onToggleStatus={toggleStatus}
        onDelete={handleDelete}
        onEdit={handleEdit}
        theme={theme}
      />

      <AddTaskButton onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <TaskModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSave}
          task={editingTask}
        />
      )}
    </div>
  );
}

export default App;
