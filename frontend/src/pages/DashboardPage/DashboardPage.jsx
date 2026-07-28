import DashboardHeader from "./components/DashboardHeader.jsx";
import DashboardSidebar from "./components/DashboardSidebar.jsx";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import "./DashboardPage.css";

function DashboardPage() {

    const token = sessionStorage.getItem("token");
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCurrentUser() {
            const response = await fetch(
                "http://localhost:8080/api/users/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log("Current user:", data);

            setCurrentUser(data);
            setIsLoading(false);
        }

        if (token) {
            fetchCurrentUser();
        }
    }, [token]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (isLoading) {
        return <p>Loading dashboard...</p>;
    }

    return (
        // container pagina are 2 copii: sidebarul si partea dreapta mare
                //partea dreapta are header si main ca si copii
        <div className="dashboard-page">
            <DashboardSidebar />


            <div className="dashboard-page__content">

                <DashboardHeader currentUser={currentUser} />

                <main className="dashboard-main">

          <span className="dashboard-main__eyebrow">
            Workspace overview
          </span>

                    <h1 className="dashboard-main__title">
                        Welcome back, {currentUser.fullName}!
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