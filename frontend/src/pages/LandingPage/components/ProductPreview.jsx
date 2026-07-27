import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    FolderKanban,
} from "lucide-react";

function ProductPreview() {
    return (
        <div className="product-preview">
            <div className="product-preview__window">
                <div className="product-preview__topbar">
                    <div className="product-preview__window-controls">
                        <span />
                        <span />
                        <span />
                    </div>

                    <span className="product-preview__topbar-title">
            Project workspace
          </span>
                </div>

                <div className="product-preview__content">
                    <div className="product-preview__project-header">
                        <div>
              <span className="product-preview__label">
                Current project
              </span>

                            <h2>TaskFlow Platform</h2>
                        </div>

                        <span className="product-preview__project-icon">
              <FolderKanban size={24} />
            </span>
                    </div>

                    <div className="product-preview__progress-section">
                        <div className="product-preview__progress-info">
                            <span>Project progress</span>
                            <strong>68%</strong>
                        </div>

                        <div className="product-preview__progress-track">
                            <div className="product-preview__progress-value" />
                        </div>
                    </div>

                    <div className="product-preview__board">
                        <div className="board-column">
                            <div className="board-column__heading">
                                <span className="board-column__dot board-column__dot--todo" />
                                <span>To do</span>
                                <strong>2</strong>
                            </div>

                            <article className="task-card">
                                <span className="task-card__tag">Design</span>
                                <h3>Create landing page</h3>

                                <div className="task-card__footer">
                  <span>
                    <CalendarDays size={14} />
                    Today
                  </span>

                                    <span className="task-card__avatar">ED</span>
                                </div>
                            </article>

                            <article className="task-card">
                                <span className="task-card__tag">Frontend</span>
                                <h3>Build authentication forms</h3>

                                <div className="task-card__footer">
                  <span>
                    <CalendarDays size={14} />
                    Tomorrow
                  </span>

                                    <span className="task-card__avatar">AD</span>
                                </div>
                            </article>
                        </div>

                        <div className="board-column">
                            <div className="board-column__heading">
                                <span className="board-column__dot board-column__dot--progress" />
                                <span>In progress</span>
                                <strong>2</strong>
                            </div>

                            <article className="task-card">
                                <span className="task-card__tag">Development</span>
                                <h3>Build project dashboard</h3>

                                <div className="task-card__footer">
                  <span>
                    <Clock3 size={14} />
                    In progress
                  </span>

                                    <span className="task-card__avatar">MI</span>
                                </div>
                            </article>

                            <article className="task-card">
                                <span className="task-card__tag">API</span>
                                <h3>Connect authentication</h3>

                                <div className="task-card__footer">
                  <span>
                    <Clock3 size={14} />
                    In progress
                  </span>

                                    <span className="task-card__avatar">ED</span>
                                </div>
                            </article>
                        </div>

                        <div className="board-column">
                            <div className="board-column__heading">
                                <span className="board-column__dot board-column__dot--done" />
                                <span>Done</span>
                                <strong>1</strong>
                            </div>

                            <article className="task-card task-card--done">
                                <span className="task-card__tag">Backend</span>
                                <h3>Configure project API</h3>

                                <div className="task-card__footer">
                  <span>
                    <CheckCircle2 size={14} />
                    Completed
                  </span>

                                    <span className="task-card__avatar">ED</span>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

            <div className="floating-card floating-card--projects">
        <span className="floating-card__icon">
          <FolderKanban size={19} />
        </span>

                <div>
                    <strong>8 active projects</strong>
                    <span>Everything in one place</span>
                </div>
            </div>

            <div className="floating-card floating-card--tasks">
        <span className="floating-card__icon floating-card__icon--success">
          <CheckCircle2 size={19} />
        </span>

                <div>
                    <strong>24 tasks completed</strong>
                    <span>This week</span>
                </div>
            </div>
        </div>
    );
}

export default ProductPreview;