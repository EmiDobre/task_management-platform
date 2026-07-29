function ProjectHeader() {
    return (
        <header className="project-header">
            <div>
                <p className="project-header__eyebrow">
                    Project
                </p>

                <h1 className="project-header__title">
                    Project details
                </h1>

                <p className="project-header__description">
                    View project information, tasks, members and documents.
                </p>
            </div>

            <button
                className="project-header__button"
                type="button"
            >
                Edit project
            </button>
        </header>
    );
}

export default ProjectHeader;