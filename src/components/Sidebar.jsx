import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Settings,
  Focus,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "My Tasks", icon: CheckSquare },
    { name: "Calendar", icon: CalendarDays },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Focus size={26} />
        <h2>FocusBoard</h2>
      </div>

      <p className="sidebar-label">MENU</p>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
