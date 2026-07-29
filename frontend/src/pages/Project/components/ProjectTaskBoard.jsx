import {
    CalendarDays,
    CheckCircle2,
    Clock3,
} from "lucide-react";

function ProjectTaskBoard() {
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

            <div className="project-task-board__columns">
                <div className="project-task-column">
                    <div className="project-task-column__heading">
                        <span className="project-task-column__dot project-task-column__dot--todo" />

                        <span className="project-task-column__name">
                            To do
                        </span>

                        <strong className="project-task-column__count">
                            2
                        </strong>
                    </div>

                    <article className="project-task-card">
                        <span className="project-task-card__tag">
                            Design
                        </span>

                        <h3 className="project-task-card__title">
                            Create project page
                        </h3>

                        <div className="project-task-card__footer">
                            <span className="project-task-card__status">
                                <CalendarDays size={14} />
                                Today
                            </span>

                            <span className="project-task-card__avatar">
                                ED
                            </span>
                        </div>
                    </article>

                    <article className="project-task-card">
                        <span className="project-task-card__tag">
                            Frontend
                        </span>

                        <h3 className="project-task-card__title">
                            Build task filters
                        </h3>

                        <div className="project-task-card__footer">
                            <span className="project-task-card__status">
                                <CalendarDays size={14} />
                                Tomorrow
                            </span>

                            <span className="project-task-card__avatar">
                                AD
                            </span>
                        </div>
                    </article>
                </div>

                <div className="project-task-column">
                    <div className="project-task-column__heading">
                        <span className="project-task-column__dot project-task-column__dot--progress" />

                        <span className="project-task-column__name">
                            In progress
                        </span>

                        <strong className="project-task-column__count">
                            2
                        </strong>
                    </div>

                    <article className="project-task-card">
                        <span className="project-task-card__tag">
                            Development
                        </span>

                        <h3 className="project-task-card__title">
                            Build project dashboard
                        </h3>

                        <div className="project-task-card__footer">
                            <span className="project-task-card__status">
                                <Clock3 size={14} />
                                In progress
                            </span>

                            <span className="project-task-card__avatar">
                                MI
                            </span>
                        </div>
                    </article>

                    <article className="project-task-card">
                        <span className="project-task-card__tag">
                            API
                        </span>

                        <h3 className="project-task-card__title">
                            Connect project tasks
                        </h3>

                        <div className="project-task-card__footer">
                            <span className="project-task-card__status">
                                <Clock3 size={14} />
                                In progress
                            </span>

                            <span className="project-task-card__avatar">
                                ED
                            </span>
                        </div>
                    </article>
                </div>

                <div className="project-task-column">
                    <div className="project-task-column__heading">
                        <span className="project-task-column__dot project-task-column__dot--done" />

                        <span className="project-task-column__name">
                            Done
                        </span>

                        <strong className="project-task-column__count">
                            1
                        </strong>
                    </div>

                    <article className="project-task-card project-task-card--done">
                        <span className="project-task-card__tag">
                            Backend
                        </span>

                        <h3 className="project-task-card__title">
                            Configure project API
                        </h3>

                        <div className="project-task-card__footer">
                            <span className="project-task-card__status">
                                <CheckCircle2 size={14} />
                                Completed
                            </span>

                            <span className="project-task-card__avatar">
                                ED
                            </span>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default ProjectTaskBoard;