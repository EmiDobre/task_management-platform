import { Bell, ChevronDown } from "lucide-react";

function DashboardHeader() {
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
            AC
          </span>

                    <span className="dashboard-header__user">
            <strong>Alex Constantin</strong>
            <small>User</small>
          </span>

                    <ChevronDown size={17} />
                </button>
            </div>
        </header>
    );
}

export default DashboardHeader;