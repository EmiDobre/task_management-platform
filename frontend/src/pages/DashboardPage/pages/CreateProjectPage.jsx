import { useState } from "react";
import { useNavigate } from "react-router";

import "./CreateProjectPage.css";

function CreateProjectPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const [memberId, setMemberId] = useState("");
    const [memberIds, setMemberIds] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setErrorMessage("");
    }

    function handleMemberIdChange(event) {
        setMemberId(event.target.value);
        setErrorMessage("");
    }

    function handleAddMember() {
        const parsedMemberId = Number(memberId);

        if (!memberId.trim()) {
            setErrorMessage("Enter a user ID before adding a member.");
            return;
        }

        if (!Number.isInteger(parsedMemberId) || parsedMemberId <= 0) {
            setErrorMessage("The member ID must be a valid positive number.");
            return;
        }

        if (memberIds.includes(parsedMemberId)) {
            setErrorMessage("This member has already been added.");
            return;
        }

        setMemberIds((previousIds) => [
            ...previousIds,
            parsedMemberId,
        ]);

        setMemberId("");
        setErrorMessage("");
    }

    function handleRemoveMember(idToRemove) {
        setMemberIds((previousIds) =>
            previousIds.filter((id) => id !== idToRemove)
        );
    }

    async function addMembersToProject(projectId, token) {
        for (const userId of memberIds) {
            const response = await fetch(
                `http://localhost:8080/api/projects/${projectId}/members`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userId,
                    }),
                }
            );

            let responseData = null;

            try {
                responseData = await response.json();
            } catch {
                responseData = null;
            }

            if (!response.ok) {
                throw new Error(
                    responseData?.message ||
                    responseData?.error ||
                    `User with ID ${userId} could not be added.`
                );
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login", {
                replace: true,
            });

            return;
        }

        if (!formData.name.trim()) {
            setErrorMessage("Project name is required.");
            return;
        }

        setIsSaving(true);
        setErrorMessage("");

        try {
            const response = await fetch(
                "http://localhost:8080/api/projects",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        description: formData.description.trim(),
                    }),
                }
            );

            const createdProject = await response.json();

            console.log("Created project:", createdProject);

            if (!response.ok) {
                throw new Error(
                    createdProject.message ||
                    createdProject.error ||
                    "Project could not be created."
                );
            }

            if (memberIds.length > 0) {
                await addMembersToProject(createdProject.id, token);
            }

            navigate("/dashboard", {
                replace: true,
            });

        } catch (error) {
            setErrorMessage(
                error.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setIsSaving(false);
        }
    }

    function handleCancel() {
        navigate("/dashboard");
    }

    return (
        <main className="create-project-page">
            <section className="create-project-card">
                <div className="create-project-card__header">
                    <p className="create-project-card__eyebrow">
                        Project Management
                    </p>

                    <h1 className="create-project-card__title">
                        Create project
                    </h1>

                    <p className="create-project-card__description">
                        Add the main project information and optionally
                        include members using their user IDs.
                    </p>
                </div>

                <form
                    className="create-project-form"
                    onSubmit={handleSubmit}
                >
                    <div className="create-project-form__group">
                        <label
                            className="create-project-form__label"
                            htmlFor="project-name"
                        >
                            Project name
                        </label>

                        <input
                            id="project-name"
                            className="create-project-form__input"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter project name"
                            maxLength={100}
                            disabled={isSaving}
                            autoFocus
                        />
                    </div>

                    <div className="create-project-form__group">
                        <label
                            className="create-project-form__label"
                            htmlFor="project-description"
                        >
                            Description
                        </label>

                        <textarea
                            id="project-description"
                            className="create-project-form__textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the purpose of this project..."
                            rows={6}
                            maxLength={1000}
                            disabled={isSaving}
                        />

                        <span className="create-project-form__counter">
                            {formData.description.length}/1000
                        </span>
                    </div>

                    <div className="create-project-members">
                        <div className="create-project-members__heading">
                            <div>
                                <h2 className="create-project-members__title">
                                    Project members
                                </h2>

                                <p className="create-project-members__description">
                                    Add members using their user ID.
                                </p>
                            </div>
                        </div>

                        <div className="create-project-members__controls">
                            <input
                                className="create-project-form__input create-project-members__input"
                                type="number"
                                min="1"
                                step="1"
                                value={memberId}
                                onChange={handleMemberIdChange}
                                placeholder="Enter user ID"
                                disabled={isSaving}
                            />

                            <button
                                className="create-project-members__add-button"
                                type="button"
                                onClick={handleAddMember}
                                disabled={isSaving}
                            >
                                Add member
                            </button>
                        </div>

                        {memberIds.length > 0 && (
                            <div className="create-project-members__list">
                                {memberIds.map((id) => (
                                    <div
                                        className="create-project-members__item"
                                        key={id}
                                    >
                                        <span>
                                            User ID: <strong>{id}</strong>
                                        </span>

                                        <button
                                            className="create-project-members__remove-button"
                                            type="button"
                                            onClick={() =>
                                                handleRemoveMember(id)
                                            }
                                            disabled={isSaving}
                                            aria-label={`Remove user ${id}`}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {errorMessage && (
                        <div
                            className="create-project-form__error"
                            role="alert"
                        >
                            {errorMessage}
                        </div>
                    )}

                    <div className="create-project-form__actions">
                        <button
                            className="create-project-form__button create-project-form__button--cancel"
                            type="button"
                            onClick={handleCancel}
                            disabled={isSaving}
                        >
                            Cancel
                        </button>

                        <button
                            className="create-project-form__button create-project-form__button--save"
                            type="submit"
                            disabled={isSaving}
                        >
                            {isSaving
                                ? "Creating project..."
                                : "Create project"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default CreateProjectPage;