import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useOutletContext,
} from "react-router";
import "../pages/MyProjectPage.css";

function MyProjectsPage() {
    /*
     * Luam utilizatorul curent din DashboardLayout.
     */
    const { currentUser } = useOutletContext();

    /*
     * useNavigate ne permite sa schimbam pagina
     * atunci cand utilizatorul apasa pe un proiect.
     */
    const navigate = useNavigate();

    /*
     * Aici pastram proiectele primite din backend.
     */
    const [projects, setProjects] = useState([]);

    /*
     * Ne spune daca proiectele se incarca.
     */
    const [isLoading, setIsLoading] = useState(true);

    /*
     * Aici pastram un eventual mesaj de eroare.
     */
    const [error, setError] = useState("");

    /*
     * La prima afisare a paginii incarcam proiectele.
     */
    useEffect(() => {
        fetchMyProjects();
    }, []);

    async function fetchMyProjects() {
        setIsLoading(true);
        setError("");

        try {
            /*
             * Tokenul aplicatiei este salvat in sessionStorage.
             */
            const token =
                sessionStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Authentication token is missing."
                );
            }

            /*
             * Schimba doar acest URL daca endpoint-ul tau
             * pentru proiectele utilizatorului este diferit.
             */
            const response = await fetch(
                "http://localhost:8080/api/users/me/projects",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const responseText =
                    await response.text();

                throw new Error(
                    responseText ||
                    "Could not load projects."
                );
            }

            const data = await response.json();

            /*
             * Unele endpoint-uri trimit direct lista.
             * Altele o trimit intr-un camp numit projects.
             *
             * Codul accepta ambele variante.
             */
            if (Array.isArray(data)) {
                setProjects(data);
            } else if (Array.isArray(data.projects)) {
                setProjects(data.projects);
            } else {
                setProjects([]);
            }
        } catch (fetchError) {
            console.error(fetchError);

            setError(
                fetchError.message ||
                "Could not load projects."
            );
        } finally {
            setIsLoading(false);
        }
    }

    /*
     * Deschide pagina proiectului folosind id-ul sau.
     *
     * Exemplu:
     * proiect cu id 1 ->
     * /dashboard/projects/1
     */
    function openProject(projectId) {
        navigate(
            `/dashboard/projects/${projectId}`
        );
    }

    /*
     * Formateaza o data pentru afisare.
     */
    function formatDate(date) {
        if (!date) {
            return "No deadline";
        }

        return new Date(date).toLocaleDateString(
            "en-GB"
        );
    }

    /*
     * Creeaza initialele unui membru.
     *
     * Emilia Dobre -> ED
     */
    function getMemberInitials(member) {
        const firstInitial =
            member?.firstName?.charAt(0) || "";

        const lastInitial =
            member?.lastName?.charAt(0) || "";

        if (firstInitial || lastInitial) {
            return `${firstInitial}${lastInitial}`.toUpperCase();
        }

        return (
            member?.email
                ?.substring(0, 2)
                .toUpperCase() || "?"
        );
    }

    /*
     * Unele raspunsuri pot folosi members,
     * iar altele projectMembers.
     *
     * Functia accepta ambele variante.
     */
    function getProjectMembers(project) {
        if (Array.isArray(project.members)) {
            return project.members;
        }

        if (
            Array.isArray(
                project.projectMembers
            )
        ) {
            return project.projectMembers;
        }

        return [];
    }

    return (
        <main className="dashboard-main my-projects-page">
            <span className="dashboard-main__eyebrow">
                My workspace
            </span>

            <h1 className="dashboard-main__title">
                Welcome back,{" "}
                {currentUser.fullName}!
            </h1>

            <p className="dashboard-main__description">
                View the projects you created or
                joined.
            </p>

            {isLoading && (
                <p className="my-projects-page__message">
                    Loading projects...
                </p>
            )}

            {error && (
                <p className="my-projects-page__error">
                    {error}
                </p>
            )}

            {!isLoading &&
                !error &&
                projects.length === 0 && (
                    <div className="my-projects-page__empty">
                        <h2>No projects yet</h2>

                        <p>
                            Your projects will appear
                            here after you create or
                            join one.
                        </p>
                    </div>
                )}

            {!isLoading &&
                !error &&
                projects.length > 0 && (
                    <section className="my-projects-grid">
                        {projects.map((project) => {
                            const members =
                                getProjectMembers(
                                    project
                                );

                            return (
                                <article
                                    key={project.id}
                                    className="my-project-card"
                                    /*
                                     * Cardul poate fi accesat si
                                     * folosind tastatura.
                                     */
                                    role="button"
                                    tabIndex={0}
                                    onClick={() =>
                                        openProject(
                                            project.id
                                        )
                                    }
                                    onKeyDown={(event) => {
                                        if (
                                            event.key ===
                                            "Enter" ||
                                            event.key ===
                                            " "
                                        ) {
                                            openProject(
                                                project.id
                                            );
                                        }
                                    }}
                                >
                                    <div className="my-project-card__header">
                                        <span className="my-project-card__label">
                                            Project
                                        </span>

                                        <span className="my-project-card__status">
                                            {project.status ||
                                                "ACTIVE"}
                                        </span>
                                    </div>

                                    <h2 className="my-project-card__title">
                                        {project.name ||
                                            project.title}
                                    </h2>

                                    <p className="my-project-card__description">
                                        {project.description ||
                                            "No description available."}
                                    </p>



                                    <div className="my-project-card__footer">
                                        <div>
                                            <span className="my-project-card__members-label">
                                                Members
                                            </span>

                                            <div className="my-project-card__members">
                                                {members
                                                    .slice(
                                                        0,
                                                        5
                                                    )
                                                    .map(
                                                        (
                                                            member,
                                                            index
                                                        ) => (
                                                            <span
                                                                key={
                                                                    member.id ||
                                                                    member.email ||
                                                                    index
                                                                }
                                                                className="my-project-card__avatar"
                                                                title={
                                                                    member.fullName ||
                                                                    `${member.firstName || ""} ${member.lastName || ""}`.trim() ||
                                                                    member.email
                                                                }
                                                            >
                                                                {getMemberInitials(
                                                                    member
                                                                )}
                                                            </span>
                                                        )
                                                    )}

                                                {members.length ===
                                                    0 && (
                                                        <span className="my-project-card__no-members">
                                                        No members
                                                    </span>
                                                    )}

                                                {members.length >
                                                    5 && (
                                                        <span className="my-project-card__more-members">
                                                        +
                                                            {members.length -
                                                                5}
                                                    </span>
                                                    )}
                                            </div>
                                        </div>

                                        <span className="my-project-card__open">
                                            Open project →
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}
        </main>
    );
}

export default MyProjectsPage;