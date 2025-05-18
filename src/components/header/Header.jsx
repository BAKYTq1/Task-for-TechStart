import React, { useState } from "react";
import { FiSearch, FiMoon, FiChevronDown } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

const Header = ({ searchTerm, setSearchTerm, filter, setFilter, darkMode, setDarkMode, setTheme, theme }) => {
  const [open, setOpen] = useState(false);

  const filters = [
    { label: "All", value: "ALL" },
    { label: "Complete", value: "complete" },
    { label: "Incomplete", value: "Incomplete" },
  ];

  const handleSelect = (value) => {
    setFilter(value);
    setOpen(false);
  };

  return (
    <header className="header">
      <div className="header-item">
        <h1>TODO LIST</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск по задачам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <FiSearch className="icon" />
      </div>

      <div className="controls">
        <div className="filter-dropdown">
          <button className="filter" onClick={() => setOpen(!open)}>
            {filter.toUpperCase()} <FiChevronDown />
          </button>
          {open && (
            <div className="dropdown-menu">
              {filters.map((f) => (
                <div
                  key={f.value}
                  className="dropdown-item"
                  onClick={() => handleSelect(f.value)}
                >
                  {f.label}
                </div>
              ))}
            </div>
          )}
        </div>
<button
  className="theme-toggle"
  onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
>
  {theme === "light" ? <FiMoon /> : <IoSunnyOutline />}
</button>
      </div>
    </header>
  );
};

export default Header