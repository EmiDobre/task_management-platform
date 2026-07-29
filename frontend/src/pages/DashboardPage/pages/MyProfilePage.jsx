import { Mail, Shield, UserRound } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router";
import { useState } from "react";
import "../pages/MyProfilePage.css";


function MyProfilePage() {
    const { currentUser, setCurrentUser } = useOutletContext();

    //nume
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(currentUser.fullName);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //parola
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    //mail
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState(currentUser.email);
    const [isSavingEmail, setIsSavingEmail] = useState(false);
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate();

    //nume nu in acc timp cu modiifcare mail
    function handleEdit() {
        setFullName(currentUser.fullName);
        setErrorMessage("");
        setIsEditing(true);

        setIsChangingEmail(false);
        setEmailError("");
    }

    function handleCancel() {
        setFullName(currentUser.fullName);
        setErrorMessage("");
        setIsEditing(false);
    }

    //request schimbare nume
    async function handleSave() {
        const trimmedFullName = fullName.trim();

        if (!trimmedFullName) {
            setErrorMessage("Full name is required.");
            return;
        }

        const token = sessionStorage.getItem("token");

        try {
            setIsSaving(true);
            setErrorMessage("");

            const response = await fetch(
                "http://localhost:8080/api/users/me/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        fullName: trimmedFullName,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Profile could not be updated."
                );
            }

            setCurrentUser(data);
            setFullName(data.fullName);
            setIsEditing(false);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    }

    //parola:
    function handleStartPasswordChange() {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordError("");
        setPasswordSuccess("");
        setIsChangingPassword(true);
    }

    function handleCancelPasswordChange() {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordError("");
        setPasswordSuccess("");
        setIsChangingPassword(false);
    }

    function validatePasswordForm() {
        if (!currentPassword) {
            return "Current password is required.";
        }

        if (!newPassword) {
            return "New password is required.";
        }

        if (newPassword.length < 4) {
            return "New password must contain at least 4 characters.";
        }

        if (newPassword !== confirmNewPassword) {
            return "New password and confirmation do not match.";
        }

        if (currentPassword === newPassword) {
            return "New password must be different from the current password.";
        }

        return "";
    }

    //request schimbare parola:
    async function handleChangePassword() {
        const validationError = validatePasswordForm();

        if (validationError) {
            setPasswordError(validationError);
            setPasswordSuccess("");
            return;
        }

        const token = sessionStorage.getItem("token");

        try {
            setIsSavingPassword(true);
            setPasswordError("");
            setPasswordSuccess("");

            const response = await fetch(
                "http://localhost:8080/api/users/me/password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Password could not be changed."
                );
            }

            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setIsChangingPassword(false);

            setPasswordSuccess(
                data.message || "Password changed successfully."
            );
        } catch (error) {
            setPasswordError(error.message);
        } finally {
            setIsSavingPassword(false);
        }
    }

    //mail
    function handleStartEmailChange() {
        setIsEditing(false);
        setErrorMessage("");

        setNewEmail(currentUser.email);
        setEmailError("");
        setIsChangingEmail(true);
    }

    function handleCancelEmailChange() {
        setNewEmail(currentUser.email);
        setEmailError("");
        setIsChangingEmail(false);
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);
    }

    //request schimbare mail
    async function handleChangeEmail() {
        const trimmedEmail = newEmail.trim();

        if (!trimmedEmail) {
            setEmailError("Email address is required.");
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        if (
            trimmedEmail.toLowerCase() ===
            currentUser.email.toLowerCase()
        ) {
            setEmailError(
                "The new email must be different from the current email."
            );
            return;
        }

        const token = sessionStorage.getItem("token");

        try {
            setIsSavingEmail(true);
            setEmailError("");

            const response = await fetch(
                "http://localhost:8080/api/users/me/email",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        email: trimmedEmail,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Email address could not be changed."
                );
            }

            sessionStorage.removeItem("token");
            setCurrentUser(null);

            navigate("/login", {
                replace: true,
                state: {
                    message:
                        "Email changed successfully. Please log in with your new email address.",
                },
            });
        } catch (error) {
            setEmailError(error.message);
        } finally {
            setIsSavingEmail(false);
        }
    }

    const initials = currentUser.fullName
        .split(" ")
        .map((namePart) => namePart[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <main className="dashboard-main">
            <span className="dashboard-main__eyebrow">
                Account settings
            </span>

            <h1 className="dashboard-main__title">
                My Profile
            </h1>

            <p className="dashboard-main__description">
                View and manage your personal account information.
            </p>

            <section className="profile-card">
                <div className="profile-card__header">
                    <div className="profile-card__avatar">
                        {initials}
                    </div>

                    <div>
                        <h2 className="profile-card__name">
                            {currentUser.fullName}
                        </h2>

                        <p className="profile-card__subtitle">
                            Personal account information
                        </p>
                    </div>
                </div>

                <div className="profile-card__details">
                    <div className="profile-detail">
                        <div className="profile-detail__icon">
                            <UserRound size={19} />
                        </div>

                        <div className="profile-detail__content">
        <span className="profile-detail__label">
            Full name
        </span>

                            {isEditing ? (
                                <div className="profile-detail__edit-form">
                                    <input
                                        className="profile-detail__input"
                                        type="text"
                                        value={fullName}
                                        onChange={(event) =>
                                            setFullName(event.target.value)
                                        }
                                        disabled={isSaving}
                                    />

                                    <div className="profile-detail__actions">
                                        <button
                                            className="profile-card__cancel-button profile-detail__small-button"
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={isSaving}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="profile-card__edit-button profile-detail__small-button"
                                            type="button"
                                            onClick={handleSave}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="profile-detail__display">
                                    <p className="profile-detail__value">
                                        {currentUser.fullName}
                                    </p>

                                    <button
                                        className="profile-detail__action-button"
                                        type="button"
                                        onClick={handleEdit}
                                        disabled={isChangingEmail}
                                    >
                                        Change name
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="profile-detail">
                        <div className="profile-detail__icon">
                            <Mail size={19} />
                        </div>

                        <div className="profile-detail__content">
        <span className="profile-detail__label">
            Email address
        </span>

                            {isChangingEmail ? (
                                <div className="profile-detail__edit-form">
                                    <input
                                        className="profile-detail__input"
                                        type="email"
                                        value={newEmail}
                                        onChange={(event) =>
                                            setNewEmail(event.target.value)
                                        }
                                        disabled={isSavingEmail}
                                        autoComplete="email"
                                    />

                                    {emailError && (
                                        <p className="profile-detail__error">
                                            {emailError}
                                        </p>
                                    )}

                                    <p className="email-change__notice">
                                        After changing your email, you will need
                                        to log in again using the new address.
                                    </p>

                                    <div className="profile-detail__actions">
                                        <button
                                            className="profile-card__cancel-button profile-detail__small-button"
                                            type="button"
                                            onClick={handleCancelEmailChange}
                                            disabled={isSavingEmail}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="profile-card__edit-button profile-detail__small-button"
                                            type="button"
                                            onClick={handleChangeEmail}
                                            disabled={isSavingEmail}
                                        >
                                            {isSavingEmail
                                                ? "Saving..."
                                                : "Save"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="profile-detail__display">
                                    <p className="profile-detail__value">
                                        {currentUser.email}
                                    </p>

                                    <button
                                        className="profile-detail__action-button"
                                        type="button"
                                        onClick={handleStartEmailChange}
                                        disabled={isEditing}
                                    >
                                        Change email
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="profile-detail">
                        <div className="profile-detail__icon">
                            <Shield size={19} />
                        </div>

                        <div>
                            <span className="profile-detail__label">
                                Role
                            </span>

                            <p className="profile-detail__value">
                                {currentUser.role}
                            </p>
                        </div>
                    </div>
                </div>

                {errorMessage && (
                    <p className="profile-card__error">
                        {errorMessage}
                    </p>
                )}

            </section>

            <section className="profile-card security-card">
                <div className="profile-card__header">
                    <div className="profile-detail__icon">
                        <Shield size={19} />
                    </div>

                    <div>
                        <h2 className="profile-card__name">
                            Password
                        </h2>

                        <p className="profile-card__subtitle">
                            Update the password used to access your account.
                        </p>
                    </div>
                </div>

                {isChangingPassword ? (
                    <div className="password-form">
                        <div className="password-form__field">
                            <label htmlFor="current-password">
                                Current password
                            </label>

                            <input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(event) =>
                                    setCurrentPassword(event.target.value)
                                }
                                disabled={isSavingPassword}
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="password-form__field">
                            <label htmlFor="new-password">
                                New password
                            </label>

                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                                disabled={isSavingPassword}
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="password-form__field">
                            <label htmlFor="confirm-new-password">
                                Confirm new password
                            </label>

                            <input
                                id="confirm-new-password"
                                type="password"
                                value={confirmNewPassword}
                                onChange={(event) =>
                                    setConfirmNewPassword(event.target.value)
                                }
                                disabled={isSavingPassword}
                                autoComplete="new-password"
                            />
                        </div>

                        {passwordError && (
                            <p className="password-form__error">
                                {passwordError}
                            </p>
                        )}

                        <div className="profile-card__actions password-form__actions">
                            <button
                                className="profile-card__cancel-button"
                                type="button"
                                onClick={handleCancelPasswordChange}
                                disabled={isSavingPassword}
                            >
                                Cancel
                            </button>

                            <button
                                className="profile-card__edit-button"
                                type="button"
                                onClick={handleChangePassword}
                                disabled={isSavingPassword}
                            >
                                {isSavingPassword
                                    ? "Changing password..."
                                    : "Save password"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="password-change__display">
                        <button
                            className="profile-detail__action-button"
                            type="button"
                            onClick={handleStartPasswordChange}
                        >
                            Change password
                        </button>
                    </div>
                )}

                {passwordSuccess && (
                    <p className="profile-card__success">
                        {passwordSuccess}
                    </p>
                )}
            </section>

        </main>
    );
}

export default MyProfilePage;