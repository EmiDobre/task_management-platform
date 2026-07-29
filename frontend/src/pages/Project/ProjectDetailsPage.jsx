import "./ProjectDetailsPage.css";
import ProjectActions from "./components/ProjectActions.jsx";
import ProjectTaskBoard from "./components/ProjectTaskBoard.jsx";
import ProjectHeader from "./components/ProjectHeader.jsx";

function ProjectDetailsPage() {
    return (
        <main className="project-details-page">
            <div className="project-details-page__container">
                <ProjectHeader />
                <ProjectActions />
                <ProjectTaskBoard />
            </div>
        </main>
    );
}

export default ProjectDetailsPage;