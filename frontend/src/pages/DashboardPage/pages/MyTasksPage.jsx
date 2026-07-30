import { useEffect, useState } from "react";
import ProjectTaskBoard from "../../Project/components/ProjectTaskBoard.jsx";

function MyTasksPage() {
    const [tasks, setTasks] = useState([]);
    const [tasksError, setTasksError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    async function fetchMyTasks() {
        setTasksError("");
        setIsLoading(true);

        try {
            const token = sessionStorage.getItem("token");

            console.log("TOKEN:", token);

            const response = await fetch(
                "http://localhost:8080/api/tasks/my-tasks",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            console.log("MY TASKS STATUS:", response.status);

            if (!response.ok) {
                const errorText = await response.text();

                console.error("MY TASKS ERROR:", errorText);

                throw new Error(
                    `Could not load your tasks. Status: ${response.status}`
                );
            }

            const data = await response.json();

            console.log("MY TASKS RESPONSE:", data);

            const receivedTasks = Array.isArray(data)
                ? data
                : Array.isArray(data.content)
                    ? data.content
                    : Array.isArray(data.tasks)
                        ? data.tasks
                        : [];

            setTasks(receivedTasks);
        } catch (error) {
            console.error(error);
            setTasks([]);
            setTasksError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMyTasks();
    }, []);

    return (
        <main className="dashboard-main">
            <span className="dashboard-main__eyebrow">
                My workspace
            </span>

            <h1 className="dashboard-main__title">
                My Tasks
            </h1>

            <p className="dashboard-main__description">
                View and manage the tasks assigned to you.
            </p>

            {isLoading ? (
                <p>Loading tasks...</p>
            ) : (
                <ProjectTaskBoard
                    tasks={tasks}
                    error={tasksError}
                    onTasksUpdated={fetchMyTasks}
                    allowDragAndDrop
                />
            )}
        </main>
    );
}

export default MyTasksPage;