function ProjectHeader({ project }) {
    const statusLabel = project?.status
        ? project.status
            .toLowerCase()
            .replaceAll("_", " ")
            .replace(/^\w/, (letter) => letter.toUpperCase())
        : "Unknown";

    const ownerName = project?.owner
        ? [
        project.owner.firstName,
        project.owner.lastName,
    ]
        .filter(Boolean)
        .join(" ") || project.owner.email
        : "Unknown owner";

    const membersCount = project?.members?.length ?? 0;

    return (
        <section className="project-header">
            <div className="project-header__main">
                <div className="project-header__content">
                    <p className="project-header__eyebrow">
                        Current project
                    </p>

                    <h1 className="project-header__title">
                        {project.name}
                    </h1>

                    <p className="project-header__description">
                        {project.description || "No project description."}
                    </p>
                </div>

            </div>

            <div className="project-header__details">
                <div className="project-header__detail">
                    <span className="project-header__detail-label">
                        Status
                    </span>

                    <span className="project-header__status">
                        {statusLabel}
                    </span>
                </div>

                <div className="project-header__detail">
                    <span className="project-header__detail-label">
                        Owner
                    </span>

                    <span className="project-header__detail-value">
                        {ownerName}
                    </span>
                </div>

                <div className="project-header__detail">
                    <span className="project-header__detail-label">
                        Members
                    </span>

                    <span className="project-header__detail-value">
                        {membersCount}
                    </span>
                </div>
            </div>
        </section>
    );
}

export default ProjectHeader;