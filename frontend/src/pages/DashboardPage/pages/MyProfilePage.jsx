import { Mail, Shield, UserRound } from "lucide-react";
import { useOutletContext } from "react-router";
import "../pages/MyProfilePage.css";

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
                View and manage your personal account information.
            </p>

            <section className="profile-card">
                <div className="profile-card__header">
                    <div className="profile-card__avatar">
                        {currentUser.fullName
                            .split(" ")
                            .map((namePart) => namePart[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
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

                        <div>
                            <span className="profile-detail__label">
                                Full name
                            </span>

                            <p className="profile-detail__value">
                                {currentUser.fullName}
                            </p>
                        </div>
                    </div>

                    <div className="profile-detail">
                        <div className="profile-detail__icon">
                            <Mail size={19} />
                        </div>

                        <div>
                            <span className="profile-detail__label">
                                Email address
                            </span>

                            <p className="profile-detail__value">
                                {currentUser.email}
                            </p>
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

                <div className="profile-card__footer">
                    <button
                        className="profile-card__edit-button"
                        type="button"
                    >
                        Edit profile
                    </button>
                </div>
            </section>
        </main>
    );
}

export default MyProfilePage;