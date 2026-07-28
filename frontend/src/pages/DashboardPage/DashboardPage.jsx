import DashboardHeader from "./components/DashboardHeader.jsx";
import DashboardSidebar from "./components/DashboardSidebar.jsx";

import "./DashboardPage.css";

function DashboardPage() {
    return (
        // container pagina are 2 copii: sidebarul si partea dreapta mare
                //partea dreapta are header si main ca si copii
        <div className="dashboard-page">
            <DashboardSidebar />


            <div className="dashboard-page__content">
                <DashboardHeader />

                <main className="dashboard-main">

          <span className="dashboard-main__eyebrow">
            Workspace overview
          </span>

                    <h1 className="dashboard-main__title">
                        Welcome back
                    </h1>

                    <p className="dashboard-main__description">
                        Follow your projects and continue working on your current tasks.
                    </p>
                </main>
            </div>
        </div>
    );
}

export default DashboardPage;