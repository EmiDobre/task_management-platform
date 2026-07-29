//verifica tokenul - incarca currentUser cu GET pe backend
//=> afiseaza SideBar si Headeer care sunt componente
//si afiseaza pagina curenta prin Outlet

import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

import DashboardHeader from "./components/DashboardHeader.jsx";
import DashboardSidebar from "./components/DashboardSidebar.jsx";

import "./DashboardPage.css";

function DashboardLayout() {
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
        <div className="dashboard-page">
            <DashboardSidebar />

            <div className="dashboard-page__content">
                <DashboardHeader currentUser={currentUser} />

                <Outlet context={{ currentUser, setCurrentUser }} />
            </div>
        </div>
    );
}

export default DashboardLayout;