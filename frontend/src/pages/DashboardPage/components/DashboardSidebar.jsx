import {
    FolderKanban,
    ListTodo,
    UserRound,
    Plus,
    LogOut
} from "lucide-react";

import { NavLink, useNavigate } from "react-router";

function DashboardSidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <aside className="dashboard-sidebar">
            <div className="dashboard-sidebar__brand">
        <span className="dashboard-sidebar__brand-icon">
          T
        </span>

                <span>TaskFlow</span>
            </div>

            <nav className="dashboard-sidebar__navigation">
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `dashboard-sidebar__link ${
                            isActive ? "dashboard-sidebar__link--active" : ""
                        }`
                    }
                >
                    <FolderKanban size={19} />
                    <span>My Projects</span>
                </NavLink>

                <NavLink
                    to="/dashboard/tasks"
                    className={({ isActive }) =>
                        `dashboard-sidebar__link ${
                            isActive ? "dashboard-sidebar__link--active" : ""
                        }`
                    }
                >
                    <ListTodo size={19} />
                    <span>My Tasks</span>
                </NavLink>

                <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                        `dashboard-sidebar__link ${
                            isActive ? "dashboard-sidebar__link--active" : ""
                        }`
                    }
                >
                    <UserRound size={19} />
                    <span>My Profile</span>
                </NavLink>

                <NavLink
                    to="/dashboard/projects/create"
                    className={({ isActive }) =>
                        isActive
                            ? "dashboard-sidebar__link dashboard-sidebar__link--active"
                            : "dashboard-sidebar__link"
                    }
                >
                    <Plus size={18} />
                    <span>Create Project</span>
                </NavLink>

            </nav>

            <button
                className="dashboard-sidebar__logout"
                type="button"
                onClick={handleLogout}
            >
                <LogOut size={19} />
                <span>Logout</span>
            </button>
        </aside>
    );
}

export default DashboardSidebar;