function FilterTabs({
  activeFilter,
  setActiveFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  const tabs = ["All", "To do", "In progress", "Completed"];

  return (
    <div className="filter-section">
      <div className="filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeFilter === tab ? "filter-tab active" : "filter-tab"}
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        aria-label="Filter by priority"
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
    </div>
  );
}

export default FilterTabs;
