import { Route, Routes } from "react-router";

import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";
import DashboardLayout from "../pages/DashboardPage/DashboardLayout.jsx";
import MyProjectsPage from "../pages/DashboardPage/pages/MyProjectsPage.jsx";
import MyTasksPage from "../pages/DashboardPage/pages/MyTasksPage.jsx";
import MyProfilePage from "../pages/DashboardPage/pages/MyProfilePage.jsx";
import CreateProjectPage from "../pages/DashboardPage/pages/CreateProjectPage.jsx";
import ProjectDetailsPage from "../pages/Project/ProjectDetailsPage";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<MyProjectsPage />} />
                <Route path="tasks" element={<MyTasksPage />} />
                <Route path="profile" element={<MyProfilePage />} />
                <Route path="projects/create" element={<CreateProjectPage />} />
                <Route path="projects/:projectId" element={<ProjectDetailsPage />}/>
            </Route>
        </Routes>
    );
}

export default AppRoutes;