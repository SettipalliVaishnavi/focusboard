import { Pencil, Trash2, CalendarDays } from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="task-card">
      <div className="task-card-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`priority-badge ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>

        <p>{task.description}</p>

        <div className="task-meta">
          <span>{task.category}</span>

          <span className="due-date">
            <CalendarDays size={15} />
            {task.dueDate}
          </span>
        </div>

        <div className="task-actions">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            aria-label={`Change status of ${task.title}`}
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button onClick={() => onEdit(task)} aria-label="Edit task">
            <Pencil size={17} />
          </button>

          <button onClick={() => onDelete(task.id)} aria-label="Delete task">
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
