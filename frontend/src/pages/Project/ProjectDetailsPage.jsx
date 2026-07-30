import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./ProjectDetailsPage.css";

import ProjectActions from "./components/ProjectActions";
import ProjectTaskBoard from "./components/ProjectTaskBoard";
import ProjectHeader from "./components/ProjectHeader";

function ProjectDetailsPage() {
    const { projectId } = useParams();

    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [tasks, setTasks] = useState([]);
    const [tasksError, setTasksError] = useState("");

    async function fetchProject() {
        try {
            setIsLoading(true);
            setError("");

            const token = sessionStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/projects/${projectId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("You are not authenticated.");
                }

                if (response.status === 403) {
                    throw new Error(
                        "You do not have access to this project."
                    );
                }

                if (response.status === 404) {
                    throw new Error("Project not found.");
                }

                throw new Error("Could not load the project.");
            }

            const data = await response.json();

            setProject(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchTasks() {
        try {
            setTasksError("");

            const token = sessionStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/projects/${projectId}/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Could not load project tasks."
                );
            }

            const data = await response.json();

            setTasks(data);
        } catch (error) {
            setTasksError(error.message);
        }
    }

    useEffect(() => {
        fetchProject();
        fetchTasks();
    }, [projectId]);

    if (isLoading) {
        return (
            <main className="project-details-page">
                <div className="project-details-page__container">
                    <div className="project-details-state">
                        Loading project...
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="project-details-page">
                <div className="project-details-page__container">
                    <div className="project-details-state project-details-state--error">
                        {error}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="project-details-page">
            <div className="project-details-page__container">
                <ProjectHeader project={project} />
                <ProjectActions project={project}
                                onProjectUpdated={fetchProject}
                                onTasksUpdated={fetchTasks}/>
                <ProjectTaskBoard
                    tasks={tasks}
                    error={tasksError}/>
            </div>
        </main>
    );
}

export default ProjectDetailsPage;