import {
    CalendarDays,
    CheckCircle2,
    Clock3,
} from "lucide-react";
import { useState } from "react";


function ProjectTaskBoard({ tasks = [], error = "" }) {
    const [groupBy, setGroupBy] = useState("status");

    const todoTasks = tasks.filter(
        (task) => task.status === "TODO"
    );

    const progressTasks = tasks.filter(
        (task) => task.status === "IN_PROGRESS"
    );

    const doneTasks = tasks.filter(
        (task) => task.status === "DONE"
    );

    const lowPriorityTasks = tasks.filter(
        (task) => task.priority === "LOW"
    );

    const mediumPriorityTasks = tasks.filter(
        (task) => task.priority === "MEDIUM"
    );

    const highPriorityTasks = tasks.filter(
        (task) => task.priority === "HIGH"
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
                    <span
                        className="project-task-card__avatar"
                        title={
                            task.assignedUser?.firstName || task.assignedUser?.lastName
                                ? `${task.assignedUser.firstName ?? ""} ${task.assignedUser.lastName ?? ""}`.trim()
                                : task.assignedUser?.email ?? "Unassigned"
                        }
                    >
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

                    <div className="project-task-board__filters">
                        <button
                            type="button"
                            className={`project-task-board__filter ${
                                groupBy === "status"
                                    ? "project-task-board__filter--active"
                                    : ""
                            }`}
                            onClick={() => setGroupBy("status")}
                        >
                            Status
                        </button>

                        <button
                            type="button"
                            className={`project-task-board__filter ${
                                groupBy === "priority"
                                    ? "project-task-board__filter--active"
                                    : ""
                            }`}
                            onClick={() => setGroupBy("priority")}
                        >
                            Priority
                        </button>
                    </div>

                </div>
            </div>

            {error && (
                <p className="project-task-board__error">
                    {error}
                </p>
            )}
                {groupBy === "status" ? (
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
                ) : (
                    <div className="project-task-board__columns">
                        <div className="project-task-column">
                            <div className="project-task-column__heading">
                                <span className="project-task-column__dot project-task-column__dot--low" />

                                <span className="project-task-column__name">
                    Low
                </span>

                                <strong className="project-task-column__count">
                                    {lowPriorityTasks.length}
                                </strong>
                            </div>

                            {lowPriorityTasks.map((task) =>
                                renderTaskCard(task)
                            )}
                        </div>

                        <div className="project-task-column">
                            <div className="project-task-column__heading">
                                <span className="project-task-column__dot project-task-column__dot--medium" />

                                <span className="project-task-column__name">
                    Medium
                </span>

                                <strong className="project-task-column__count">
                                    {mediumPriorityTasks.length}
                                </strong>
                            </div>

                            {mediumPriorityTasks.map((task) =>
                                renderTaskCard(task)
                            )}
                        </div>

                        <div className="project-task-column">
                            <div className="project-task-column__heading">
                                <span className="project-task-column__dot project-task-column__dot--high" />

                                <span className="project-task-column__name">
                    High
                </span>

                                <strong className="project-task-column__count">
                                    {highPriorityTasks.length}
                                </strong>
                            </div>

                            {highPriorityTasks.map((task) =>
                                renderTaskCard(task)
                            )}
                        </div>
                    </div>
                )}

        </section>
    );
}

export default ProjectTaskBoard;