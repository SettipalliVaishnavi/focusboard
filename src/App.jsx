import { useMemo, useState } from "react";
import {
  Menu, UserRound, ChevronLeft, ChevronRight, CalendarDays,
  Home, Bell, Search, Plus, MoreVertical, ClipboardList,
  ShieldCheck, FolderKanban, StickyNote, X, CheckCircle2,
  Clock3, Circle, LayoutGrid
} from "lucide-react";

import TaskForm from "./components/TaskForm";
import sampleTasks from "./data/sampleTasks";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("focusboard-tasks", sampleTasks);
  const [activeTab, setActiveTab] = useState("My tasks");
  const [activeNav, setActiveNav] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeProject, setActiveProject] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In progress"
  ).length;

  const completion = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const categories = [...new Set(tasks.map((task) => task.category || "General"))];

  const projects = categories.map((category, index) => {
    const categoryTasks = tasks.filter(
      (task) => (task.category || "General") === category
    );
    const done = categoryTasks.filter(
      (task) => task.status === "Completed"
    ).length;

    return {
      name: category,
      subtitle: categoryTasks[0]?.title || "Your project",
      total: categoryTasks.length,
      progress: categoryTasks.length
        ? Math.round((done / categoryTasks.length) * 100)
        : 0,
      month: index % 2 === 0 ? "October 2026" : "November 2026",
    };
  });

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const openCreateForm = () => {
    setSelectedTask(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const saveTask = (formData) => {
    if (selectedTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === selectedTask.id
            ? { ...task, ...formData }
            : task
        )
      );
    } else {
      setTasks((previous) => [
        ...previous,
        { id: Date.now(), ...formData },
      ]);
    }

    setShowForm(false);
    setSelectedTask(null);
    setActiveTab("My tasks");
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((previous) => previous.filter((task) => task.id !== id));
    }
  };

  const updateStatus = (id, status) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedTask(null);
  };

  const nextProject = () => {
    setActiveProject((current) =>
      projects.length ? (current + 1) % projects.length : 0
    );
  };

  const previousProject = () => {
    setActiveProject((current) =>
      projects.length ? (current - 1 + projects.length) % projects.length : 0
    );
  };

  const selectedProject = projects[activeProject];

  if (showForm) {
    return (
      <div className="form-page">
        <TaskForm
          initialTask={selectedTask}
          onSubmit={saveTask}
          onCancel={closeForm}
        />
      </div>
    );
  }

  return (
    <div className="mobile-app">
      <header className="mobile-header">
        <button
          className="round-icon"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-greeting">
          <span>Hello,</span>
          <h1>Vaishnavi!</h1>
          <p>Have a nice day!</p>
        </div>

        <button className="profile-button" aria-label="Profile">
          <UserRound size={23} />
        </button>
      </header>

      {showMenu && (
        <div className="quick-menu">
          <button onClick={() => { setActiveTab("My tasks"); setShowMenu(false); }}>
            My Tasks
          </button>
          <button onClick={() => { setActiveTab("Project"); setShowMenu(false); }}>
            Projects
          </button>
          <button onClick={() => { setActiveTab("Note"); setShowMenu(false); }}>
            Notes
          </button>
        </div>
      )}

      <main className="mobile-content">
        <div className="top-tabs" role="tablist" aria-label="Dashboard sections">
          {["My tasks", "Project", "Note"].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={activeTab === tab ? "top-tab active" : "top-tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === "My tasks" && <span className="tab-dot" />}
            </button>
          ))}
        </div>

        {activeTab === "My tasks" && (
          <>
            <section className="project-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR WORKSPACE</span>
                  <h2>My Projects</h2>
                </div>
                <button className="text-action" onClick={() => setActiveTab("Project")}>
                  See all
                </button>
              </div>

              {selectedProject ? (
                <div className="project-carousel">
                  <button
                    className="project-arrow previous"
                    onClick={previousProject}
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <article className="project-card">
                    <div className="project-card-top">
                      <span className="project-icon">
                        <FolderKanban size={20} />
                      </span>
                      <span className="project-count">
                        {selectedProject.total} tasks
                      </span>
                    </div>
                    <span className="project-kicker">PROJECT {activeProject + 1}</span>
                    <h3>{selectedProject.name}</h3>
                    <p>{selectedProject.subtitle}</p>
                    <div className="project-progress-label">
                      <span>Progress</span>
                      <strong>{selectedProject.progress}%</strong>
                    </div>
                    <div className="project-progress-track">
                      <span style={{ width: `${selectedProject.progress}%` }} />
                    </div>
                    <span className="project-month">{selectedProject.month}</span>
                  </article>

                  <button
                    className="project-arrow next"
                    onClick={nextProject}
                    aria-label="Next project"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              ) : (
                <div className="empty-project">
                  No projects yet. Create a task to get started.
                </div>
              )}

              <div className="project-indicators">
                {projects.map((project, index) => (
                  <button
                    key={project.name}
                    className={activeProject === index ? "indicator active" : "indicator"}
                    onClick={() => setActiveProject(index)}
                    aria-label={`Show project ${index + 1}`}
                  />
                ))}
              </div>
            </section>

            <section className="progress-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR DAILY WORK</span>
                  <h2>Progress</h2>
                </div>
                <span className="completion-pill">{completion}% done</span>
              </div>

              <div className="progress-summary">
                <div className="progress-summary-icon">
                  <CheckCircle2 size={23} />
                </div>
                <div className="progress-summary-copy">
                  <strong>{completedTasks} of {tasks.length} tasks completed</strong>
                  <span>Keep going, you're doing great!</span>
                </div>
              </div>

              <div className="overall-progress">
                <span style={{ width: `${completion}%` }} />
              </div>

              <div className="task-list-heading">
                <h3>Recent Tasks</h3>
                <button onClick={() => setActiveTab("Project")}>View all</button>
              </div>

              {tasks.slice(0, 4).map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onEdit={openEditForm}
                  onDelete={deleteTask}
                  onStatusChange={updateStatus}
                />
              ))}

              {tasks.length === 0 && (
                <div className="empty-project">No tasks available yet.</div>
              )}
            </section>
          </>
        )}

        {activeTab === "Project" && (
          <section className="all-tasks-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">TASK MANAGEMENT</span>
                <h2>All Tasks</h2>
              </div>
              <span className="completion-pill">{tasks.length} tasks</span>
            </div>

            <label className="mobile-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} aria-label="Clear search">
                  <X size={17} />
                </button>
              )}
            </label>

            <div className="filter-controls">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by status"
              >
                <option value="All">All Status</option>
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
                aria-label="Filter by priority"
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            {visibleTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onEdit={openEditForm}
                onDelete={deleteTask}
                onStatusChange={updateStatus}
              />
            ))}

            {visibleTasks.length === 0 && (
              <div className="empty-project">No matching tasks found.</div>
            )}
          </section>
        )}

        {activeTab === "Note" && (
          <section className="notes-page">
            <span className="eyebrow">A LITTLE INSPIRATION</span>
            <h2>Focus Notes</h2>
            <article className="note-card">
              <StickyNote size={28} />
              <h3>Plan your day</h3>
              <p>Organize your priorities and focus on what matters most.</p>
            </article>
            <article className="note-card note-card-light">
              <ShieldCheck size={28} />
              <h3>Stay consistent</h3>
              <p>Small daily improvements lead to meaningful results.</p>
            </article>
            <article className="note-card note-card-light">
              <CheckCircle2 size={28} />
              <h3>Celebrate progress</h3>
              <p>Every completed task brings you closer to your goals.</p>
            </article>
          </section>
        )}
      </main>

      <button className="floating-add" onClick={openCreateForm} aria-label="Create new task">
        <Plus size={26} />
      </button>

      <nav className="bottom-navigation" aria-label="Main navigation">
        {[
          { name: "Home", icon: Home },
          { name: "Calendar", icon: CalendarDays },
          { name: "Notifications", icon: Bell },
          { name: "Search", icon: Search },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={activeNav === item.name ? "bottom-nav-item active" : "bottom-nav-item"}
              onClick={() => {
                setActiveNav(item.name);
                if (item.name === "Home") setActiveTab("My tasks");
                if (item.name === "Search") setActiveTab("Project");
              }}
              aria-label={item.name}
            >
              <Icon size={21} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function TaskRow({ task, onEdit, onDelete, onStatusChange }) {
  const isCompleted = task.status === "Completed";

  return (
    <article className={`progress-task ${isCompleted ? "task-completed" : ""}`}>
      <div className="task-row-icon">
        {isCompleted ? <CheckCircle2 size={21} /> : <ClipboardList size={21} />}
      </div>

      <div className="task-row-details">
        <h4>{task.title}</h4>
        <p>{task.dueDate || "No due date"} · {task.category || "General"}</p>
        <div className="task-row-bottom">
          <span className={`task-status ${task.status.toLowerCase().replace(" ", "-")}`}>
            {task.status}
          </span>
          <span className={`task-priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <div className="task-row-actions">
        <button onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}>
          <MoreVertical size={19} />
        </button>
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          aria-label={`Change status of ${task.title}`}
        >
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>
          <X size={17} />
        </button>
      </div>
    </article>
  );
}

export default App;
