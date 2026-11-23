import { Bell, Plus, Search } from "lucide-react";

function Header({ onAddTask }) {
  return (
    <header className="header">
      <div className="header-title">
        <p>Workspace / Overview</p>
        <h1>My Tasks</h1>
      </div>

      <div className="header-actions">
        <button className="icon-button" aria-label="Search tasks">
          <Search size={20} />
        </button>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <button className="add-task-button" onClick={onAddTask}>
          <Plus size={19} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
