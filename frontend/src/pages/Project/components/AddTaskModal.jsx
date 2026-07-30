import { useState } from "react";

import "./AddTaskModal.css";

function AddTaskModal({ project,
                          onClose,
                          onTasksUpdated,}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [deadline, setDeadline] = useState("");

    const [createdTaskId, setCreatedTaskId] = useState(null);
    const [userId, setUserId] = useState("");

    const [isCreating, setIsCreating] = useState(false);
    const [isAssigning, setIsAssigning] = useState(false);

    const [createError, setCreateError] = useState("");
    const [assignError, setAssignError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function readBackendError(response, fallbackMessage) {
        try {
            const data = await response.json();

            return data.message || data.error || fallbackMessage;
        } catch {
            return fallbackMessage;
        }
    }

    async function handleCreateTask(event) {
        event.preventDefault();

        try {
            setIsCreating(true);
            setCreateError("");
            setAssignError("");
            setSuccessMessage("");

            const token = sessionStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/tasks",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: title.trim(),
                        description: description.trim(),
                        priority,
                        deadline,
                        projectId: project.id,
                    }),
                }
            );

            if (!response.ok) {
                const message = await readBackendError(
                    response,
                    "Could not create the task."
                );

                throw new Error(message);
            }

            const createdTask = await response.json();

            setCreatedTaskId(createdTask.id);
            setSuccessMessage(
                `Task created successfully. Task ID: ${createdTask.id}`
            );
            await onTasksUpdated?.();
        } catch (error) {
            setCreateError(error.message);
        } finally {
            setIsCreating(false);
        }
    }

    async function handleAssignTask() {
        if (!createdTaskId) {
            setAssignError("Create the task first.");
            return;
        }

        if (!userId) {
            setAssignError("Enter the user ID.");
            return;
        }

        try {
            setIsAssigning(true);
            setAssignError("");
            setSuccessMessage("");

            const token = sessionStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/tasks/${createdTaskId}/assign`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: Number(userId),
                    }),
                }
            );

            if (!response.ok) {
                const backendMessage = await readBackendError(
                    response,
                    "Could not assign the task."
                );

                if (
                    backendMessage ===
                    "User is not part of the project"
                ) {
                    throw new Error(
                        "This user is not a member of the project."
                    );
                }

                if (backendMessage === "User not found") {
                    throw new Error(
                        "No user was found with this ID."
                    );
                }

                if (
                    backendMessage ===
                    "Only creator can assign users"
                ) {
                    throw new Error(
                        "Only the task creator can assign this task."
                    );
                }

                throw new Error(backendMessage);
            }

            setSuccessMessage("Task assigned successfully.");
            await onTasksUpdated?.();
            setUserId("");
        } catch (error) {
            setAssignError(error.message);
        } finally {
            setIsAssigning(false);
        }
    }

    return (
        <div
            className="add-task-modal"
            onMouseDown={onClose}
        >
            <div
                className="add-task-modal__box"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="add-task-modal__header">
                    <div>
                        <span>Add task</span>
                        <h2>Create a project task</h2>
                    </div>

                    <button
                        type="button"
                        className="add-task-modal__close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleCreateTask}>
                    <div className="add-task-modal__field">
                        <label htmlFor="task-title">
                            Title
                        </label>

                        <input
                            id="task-title"
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Task title"
                            disabled={Boolean(createdTaskId)}
                            required
                        />
                    </div>

                    <div className="add-task-modal__field">
                        <label htmlFor="task-description">
                            Description
                        </label>

                        <textarea
                            id="task-description"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                            placeholder="Task description"
                            rows="4"
                            disabled={Boolean(createdTaskId)}
                            required
                        />
                    </div>

                    <div className="add-task-modal__row">
                        <div className="add-task-modal__field">
                            <label htmlFor="task-priority">
                                Priority
                            </label>

                            <select
                                id="task-priority"
                                value={priority}
                                onChange={(event) =>
                                    setPriority(
                                        event.target.value
                                    )
                                }
                                disabled={Boolean(
                                    createdTaskId
                                )}
                                required
                            >
                                <option value="LOW">
                                    Low
                                </option>

                                <option value="MEDIUM">
                                    Medium
                                </option>

                                <option value="HIGH">
                                    High
                                </option>
                            </select>
                        </div>

                        <div className="add-task-modal__field">
                            <label htmlFor="task-deadline">
                                Deadline
                            </label>

                            <input
                                id="task-deadline"
                                type="datetime-local"
                                value={deadline}
                                onChange={(event) =>
                                    setDeadline(
                                        event.target.value
                                    )
                                }
                                disabled={Boolean(
                                    createdTaskId
                                )}
                                required
                            />
                        </div>
                    </div>

                    {createError && (
                        <p className="add-task-modal__error">
                            {createError}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="add-task-modal__primary"
                        disabled={
                            isCreating ||
                            Boolean(createdTaskId)
                        }
                    >
                        {isCreating
                            ? "Creating..."
                            : createdTaskId
                                ? "Task created"
                                : "Create task"}
                    </button>
                </form>

                <div className="add-task-modal__divider" />

                <div className="add-task-modal__assign">
                    <div className="add-task-modal__field">
                        <label htmlFor="task-user-id">
                            Assign member by user ID
                        </label>

                        <input
                            id="task-user-id"
                            type="number"
                            value={userId}
                            onChange={(event) =>
                                setUserId(event.target.value)
                            }
                            placeholder="Enter user ID"
                            min="1"
                            disabled={!createdTaskId}
                        />
                    </div>

                    {assignError && (
                        <p className="add-task-modal__error">
                            {assignError}
                        </p>
                    )}

                    {successMessage && (
                        <p className="add-task-modal__success">
                            {successMessage}
                        </p>
                    )}
                </div>

                <div className="add-task-modal__actions">
                    <button
                        type="button"
                        className="add-task-modal__cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="add-task-modal__primary"
                        onClick={handleAssignTask}
                        disabled={
                            !createdTaskId ||
                            !userId ||
                            isAssigning
                        }
                    >
                        {isAssigning
                            ? "Assigning..."
                            : "Assign task"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTaskModal;