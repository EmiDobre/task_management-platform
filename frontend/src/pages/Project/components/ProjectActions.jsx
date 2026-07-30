import ManageMembersPopover from "./ManageMembersPopover";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

function ProjectActions({ project,
                            onProjectUpdated,
                            onTasksUpdated,}) {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    return (
        <section className="project-actions">
            <div className="project-actions__content">
                <div>
                    <p className="project-actions__eyebrow">
                        Project management
                    </p>

                    <h2 className="project-actions__title">
                        Project actions
                    </h2>

                    <p className="project-actions__description">
                        Manage project members or open the project documents.
                    </p>
                </div>

                <div className="project-actions__buttons">
                    <ManageMembersPopover
                        project={project}
                        onProjectUpdated={onProjectUpdated}
                    />

                    <button
                        className="project-actions__button project-actions__button--primary"
                        type="button"
                    >
                        Project documents
                    </button>

                    <button
                        className="project-actions__button project-actions__button--primary"
                        type="button"
                        onClick={() => setIsAddTaskOpen(true)}
                    >
                        Add task
                    </button>

                    {isAddTaskOpen && (
                        <AddTaskModal
                            project={project}
                            onTasksUpdated={onTasksUpdated}
                            onClose={() => setIsAddTaskOpen(false)}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProjectActions;