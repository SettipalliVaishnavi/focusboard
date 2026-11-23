import { Search, X } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar">
      <Search size={19} />

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search tasks by title"
      />

      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
