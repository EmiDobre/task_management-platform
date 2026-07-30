import {
    CalendarDays,
    CheckCircle2,
    Clock3,
} from "lucide-react";

function ProjectTaskBoard({ tasks = [], error = "" }) {
    const todoTasks = tasks.filter(
        (task) => task.status === "TODO"
    );

    const progressTasks = tasks.filter(
        (task) => task.status === "IN_PROGRESS"
    );

    const doneTasks = tasks.filter(
        (task) => task.status === "DONE"
    );

    function formatDeadline(deadline) {
        if (!deadline) {
            return "No deadline";
        }

        return new Date(deadline).toLocaleDateString(
            "en-GB"
        );
    }

    function getInitials(assignedUser) {
        if (!assignedUser) {
            return "?";
        }

        const firstInitial =
            assignedUser.firstName?.charAt(0) || "";

        const lastInitial =
            assignedUser.lastName?.charAt(0) || "";

        if (firstInitial || lastInitial) {
            return `${firstInitial}${lastInitial}`.toUpperCase();
        }

        return assignedUser.email
            ?.substring(0, 2)
            .toUpperCase() || "?";
    }

    function renderTaskCard(task) {
        return (
            <article
                key={task.id}
                className={`project-task-card ${
                    task.status === "DONE"
                        ? "project-task-card--done"
                        : ""
                }`}
            >
                <span className="project-task-card__tag">
                    {task.priority}
                </span>

                <h3 className="project-task-card__title">
                    {task.title}
                </h3>

                <div className="project-task-card__footer">
                    <span className="project-task-card__status">
                        {task.status === "TODO" && (
                            <CalendarDays size={14} />
                        )}

                        {task.status === "IN_PROGRESS" && (
                            <Clock3 size={14} />
                        )}

                        {task.status === "DONE" && (
                            <CheckCircle2 size={14} />
                        )}

                        {task.status === "DONE"
                            ? "Completed"
                            : formatDeadline(task.deadline)}
                    </span>

                    <span className="project-task-card__avatar">
                        {getInitials(task.assignedUser)}
                    </span>
                </div>
            </article>
        );
    }

    return (
        <section className="project-task-board">
            <div className="project-task-board__header">
                <div>
                    <p className="project-task-board__eyebrow">
                        Project workflow
                    </p>

                    <h2 className="project-task-board__title">
                        Tasks
                    </h2>

                    <p className="project-task-board__description">
                        View all tasks assigned to this project.
                    </p>
                </div>
            </div>

            {error && (
                <p className="project-task-board__error">
                    {error}
                </p>
            )}

            <div className="project-task-board__columns">
                <div className="project-task-column">
                    <div className="project-task-column__heading">
                        <span className="project-task-column__dot project-task-column__dot--todo" />

                        <span className="project-task-column__name">
                            To do
                        </span>

                        <strong className="project-task-column__count">
                            {todoTasks.length}
                        </strong>
                    </div>

                    {todoTasks.map((task) =>
                        renderTaskCard(task)
                    )}
                </div>

                <div className="project-task-column">
                    <div className="project-task-column__heading">
                        <span className="project-task-column__dot project-task-column__dot--progress" />

                        <span className="project-task-column__name">
                            In progress
                        </span>

                        <strong className="project-task-column__count">
                            {progressTasks.length}
                        </strong>
                    </div>

                    {progressTasks.map((task) =>
                        renderTaskCard(task)
                    )}
                </div>

                <div className="project-task-column">
                    <div className="project-task-column__heading">
                        <span className="project-task-column__dot project-task-column__dot--done" />

                        <span className="project-task-column__name">
                            Done
                        </span>

                        <strong className="project-task-column__count">
                            {doneTasks.length}
                        </strong>
                    </div>

                    {doneTasks.map((task) =>
                        renderTaskCard(task)
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProjectTaskBoard;