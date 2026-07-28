import { Navigate } from "react-router";

function DashboardPage() {
    const token = sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <main>
            <h1>My workspace</h1>

            <section>
                <h2>Projects</h2>

                <article>
                    <h3>Task Management App</h3>
                    <p>In progress</p>
                </article>

                <article>
                    <h3>Portfolio Website</h3>
                    <p>Planned</p>
                </article>
            </section>

            <section>
                <h2>Tasks</h2>

                <article>
                    <h3>Create dashboard</h3>
                    <p>In progress</p>
                </article>

                <article>
                    <h3>Connect login to backend</h3>
                    <p>Completed</p>
                </article>
            </section>
        </main>
    );
}

export default DashboardPage;