import { useState } from "react";
import {
    ChevronDown,
    UserPlus,
    Users,
    X,
} from "lucide-react";

function ManageMembersPopover({ project, onProjectUpdated }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const [memberId, setMemberId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const members = project?.members ?? [];

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setIsSubmitting(true);
            setSubmitError("");

            const token = sessionStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/projects/${project.id}/members`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: Number(memberId),
                    }),
                }
            );

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("Invalid user ID.");
                }

                if (response.status === 401) {
                    throw new Error("You are not authenticated.");
                }

                if (response.status === 403) {
                    throw new Error(
                        "You do not have permission to add members."
                    );
                }

                if (response.status === 404) {
                    throw new Error("Project or user not found.");
                }

                throw new Error("Could not add the member.");
            }

            await onProjectUpdated();

            setMemberId("");
            setShowAddMember(false);
        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleClose() {
        setIsOpen(false);
        setShowAddMember(false);
        setMemberId("");
    }

    return (
        <div className="members-popover">
            <button
                className="members-popover__trigger"
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                aria-expanded={isOpen}
            >
                <Users size={17} />

                <span>Manage members</span>

                <ChevronDown
                    className={`members-popover__chevron ${
                        isOpen ? "members-popover__chevron--open" : ""
                    }`}
                    size={15}
                />
            </button>

            {isOpen && (
                <div className="members-popover__panel">
                    <div className="members-popover__header">
                        <div>
                            <span className="members-popover__eyebrow">
                                Project team
                            </span>

                            <h3>Members</h3>
                        </div>

                        <button
                            className="members-popover__close"
                            type="button"
                            onClick={handleClose}
                            aria-label="Close members panel"
                        >
                            <X size={17} />
                        </button>
                    </div>

                    <div className="members-popover__summary">
                        <Users size={17} />

                        <span>
                            {members.length}{" "}
                            {members.length === 1 ? "member" : "members"}
                        </span>
                    </div>

                    <div className="members-popover__list">
                        {members.length === 0 ? (
                            <div className="members-popover__empty">
                                No members have been added yet.
                            </div>
                        ) : (
                            members.map((member) => {
                                const isOwner =
                                    member.id === project?.owner?.id;

                                const initial =
                                    member.fullName?.charAt(0)?.toUpperCase() ||
                                    member.email?.charAt(0)?.toUpperCase() ||
                                    "?";

                                return (
                                    <div
                                        className="members-popover__member"
                                        key={member.id}
                                    >
                                        <div className="members-popover__avatar">
                                            {initial}
                                        </div>

                                        <div className="members-popover__member-info">
                                            <div className="members-popover__member-name">
                                                <span>
                                                    {member.fullName ||
                                                        "Unnamed member"}
                                                </span>

                                                {isOwner && (
                                                    <span className="members-popover__owner">
                                                        Owner
                                                    </span>
                                                )}
                                            </div>

                                            <span className="members-popover__email">
                                                {member.email}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {showAddMember ? (
                        <form
                            className="members-popover__form"
                            onSubmit={handleSubmit}
                        >
                            <div className="members-popover__form-header">
                                <div>
                <span className="members-popover__eyebrow">
                    New project member
                </span>

                                    <h4>Add member</h4>
                                </div>

                                <button
                                    className="members-popover__close"
                                    type="button"
                                    onClick={() => {
                                        setShowAddMember(false);
                                        setMemberId("");
                                    }}
                                    aria-label="Close add member form"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="members-popover__field">
                                <label htmlFor="project-member-id">
                                    User ID
                                </label>

                                <input
                                    id="project-member-id"
                                    type="number"
                                    value={memberId}
                                    onChange={(event) =>
                                        setMemberId(event.target.value)
                                    }
                                    placeholder="Enter user ID"
                                    min="1"
                                    required
                                />

                                {submitError && (
                                    <p className="members-popover__error">
                                        {submitError}
                                    </p>
                                )}

                            </div>

                            <div className="members-popover__form-actions">
                                <button
                                    className="members-popover__cancel"
                                    type="button"
                                    onClick={() => {
                                        setShowAddMember(false);
                                        setMemberId("");
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="members-popover__submit"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Adding..." : "Add member"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            className="members-popover__add"
                            type="button"
                            onClick={() => setShowAddMember(true)}
                        >
                            <UserPlus size={17} />
                            Add member
                        </button>
                    )}

                </div>
            )}
        </div>
    );
}

export default ManageMembersPopover;