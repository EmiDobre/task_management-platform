import { Bell, ChevronDown } from "lucide-react";
//headerul primeste userul pe care il obtin prin get in backend in dashboardpage
function DashboardHeader({ currentUser }) {

    const initials = currentUser.fullName
        .split(" ")
        .map((namePart) => namePart[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <header className="dashboard-header">
            <div>
                <p className="dashboard-header__label">
                    My workspace
                </p>

                <h2 className="dashboard-header__title">
                    Dashboard
                </h2>
            </div>

            <div className="dashboard-header__actions">
                <button
                    className="dashboard-header__notification"
                    type="button"
                    aria-label="Open notifications"
                >
                    <Bell size={19} />
                </button>

                <button
                    className="dashboard-header__profile"
                    type="button"
                >
          <span className="dashboard-header__avatar">
            {initials}
          </span>

                    <span className="dashboard-header__user">
            <strong>{currentUser.fullName}</strong>
            <small>{currentUser.role}</small>
          </span>

                    <ChevronDown size={17} />
                </button>
            </div>
        </header>
    );
}

export default DashboardHeader;