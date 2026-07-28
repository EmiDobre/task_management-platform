import { useOutletContext } from "react-router";

function MyProjectsPage() {
    //citeste datele trimise de layout prin componenta context layout
    const { currentUser } = useOutletContext();

    return (
        <main className="dashboard-main">
            <span className="dashboard-main__eyebrow">
                My workspace
            </span>

            <h1 className="dashboard-main__title">
                Welcome back, {currentUser.fullName}!
            </h1>

            <p className="dashboard-main__description">
                Your projects will appear here after you create or join one.
            </p>
        </main>
    );
}

export default MyProjectsPage;