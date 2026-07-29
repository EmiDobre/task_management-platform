function ProjectHeader() {
    return (
        <header className="project-header">
            <div className="project-header__main">
                <div className="project-header__content">
                    <p className="project-header__eyebrow">
                        Project
                    </p>

                    <h1 className="project-header__title">
                        Website Redesign
                    </h1>

                    <p className="project-header__description">
                        Redesign and improve the main company platform.
                    </p>
                </div>

                <button
                    className="project-header__filter-button"
                    type="button"
                >
                    Filter tasks
                </button>
            </div>

            <div className="project-header__details">
                <div className="project-header__detail">
                    <span className="project-header__detail-label">
                        Status
                    </span>

                    <span className="project-header__status">
                        In progress
                    </span>
                </div>

                <div className="project-header__detail">
                    <span className="project-header__detail-label">
                        Owner
                    </span>

                    <span className="project-header__detail-value">
                        Emilia Dobre
                    </span>
                </div>
            </div>
        </header>
    );
}

export default ProjectHeader;