import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

function TaskForm({ initialTask, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    status: "To do",
    priority: "Medium",
    dueDate: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setFormData({
      title: initialTask?.title || "",
      description: initialTask?.description || "",
      category: initialTask?.category || "General",
      status: initialTask?.status || "To do",
      priority: initialTask?.priority || "Medium",
      dueDate: initialTask?.dueDate || "",
    });

    setError("");
  }, [initialTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (!formData.dueDate) {
      setError("Please select a due date.");
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      category: formData.category.trim() || "General",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="task-form-modal">
        <div className="form-header">
          <div className="form-heading-content">
            <button
              type="button"
              className="form-back-button"
              onClick={onCancel}
              aria-label="Go back"
            >
              <ChevronLeft size={21} />
            </button>

            <div>
              <h2>{initialTask ? "Edit Task" : "Create New Task"}</h2>
              <p>
                {initialTask
                  ? "Update your task details and expectations."
                  : "Assign a clear objective and set expectations for your team."}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Task Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Follow up with Lead #402 regarding Q3 Promo"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide detailed instructions and context for this task..."
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />

          <div className="form-row">
            <div>
              <label htmlFor="priority">Priority Level *</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <div>
              <label htmlFor="status">Initial Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <label htmlFor="dueDate">Due Date *</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-buttons">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit">
              {initialTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
