import {
    FolderKanban,
    LayoutDashboard,
    ListTodo,
    LogOut,
    UserRound,
} from "lucide-react";
import { useNavigate } from "react-router";



function DashboardSidebar() {

    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <aside className="dashboard-sidebar">
            <div className="dashboard-sidebar__brand">
        <span className="dashboard-sidebar__logo">
          TF
        </span>

                <span className="dashboard-sidebar__name">
          TaskFlow
        </span>
            </div>

            <nav className="dashboard-sidebar__navigation">
                <button
                    className="dashboard-sidebar__link dashboard-sidebar__link--active"
                    type="button"
                >
                    <LayoutDashboard size={19} />
                    <span>Overview</span>
                </button>

                <button
                    className="dashboard-sidebar__link"
                    type="button"
                >
                    <FolderKanban size={19} />
                    <span>My projects</span>
                </button>

                <button
                    className="dashboard-sidebar__link"
                    type="button"
                >
                    <ListTodo size={19} />
                    <span>My tasks</span>
                </button>

                <button
                    className="dashboard-sidebar__link"
                    type="button"
                >
                    <UserRound size={19} />
                    <span>My profile</span>
                </button>
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