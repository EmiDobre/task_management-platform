import { useOutletContext } from "react-router";

function MyProfilePage() {
    const { currentUser } = useOutletContext();

    return (
        <main className="dashboard-main">
            <span className="dashboard-main__eyebrow">
                Account settings
            </span>

            <h1 className="dashboard-main__title">
                My Profile
            </h1>

            <p className="dashboard-main__description">
                View and update your personal information.
            </p>

            <div>
                <p>
                    <strong>Full name:</strong> {currentUser.fullName}
                </p>

                <p>
                    <strong>Email:</strong> {currentUser.email}
                </p>

                <p>
                    <strong>Role:</strong> {currentUser.role}
                </p>
            </div>
        </main>
    );
}

export default MyProfilePage;