import {
    CalendarDays,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

function ProjectTaskBoard({
                              tasks = [],
                              error = "",
                              onTasksUpdated,
                              allowDragAndDrop = false,
                          }) {
    /*
     * groupBy stabileste cum sunt impartite taskurile:
     *
     * "status"   -> TODO, IN_PROGRESS, DONE
     * "priority" -> LOW, MEDIUM, HIGH
     */
    const [groupBy, setGroupBy] = useState("status");

    /*
     * draggedTask retine taskul care este tras in acel moment.
     *
     * Cand nu tragem nimic, valoarea este null.
     */
    const [draggedTask, setDraggedTask] = useState(null);

    /*
     * dragError retine o eventuala eroare aparuta
     * cand incercam sa schimbam statusul unui task.
     */
    const [dragError, setDragError] = useState("");

    /*
     * isUpdating ne spune daca un request de update
     * este deja trimis catre backend.
     *
     * Il folosim pentru a evita mai multe mutari
     * facute in acelasi timp.
     */
    const [isUpdating, setIsUpdating] = useState(false);

    /*
     * displayedTasks este lista folosita efectiv
     * pentru afisarea taskurilor in coloane.
     *
     * Nu folosim direct tasks pentru mutarea vizuala,
     * deoarece vrem ca taskul sa se mute imediat,
     * fara sa asteptam raspunsul backend-ului.
     */
    const [displayedTasks, setDisplayedTasks] =
        useState(tasks);

    /*
     * Cand pagina parinte primeste taskuri noi
     * de la backend, sincronizam lista locala.
     */
    useEffect(() => {
        setDisplayedTasks(tasks);
    }, [tasks]);

    /*
     * Selectam taskurile pentru fiecare coloana de status.
     */
    const todoTasks = displayedTasks.filter(
        (task) => task.status === "TODO"
    );

    const progressTasks = displayedTasks.filter(
        (task) => task.status === "IN_PROGRESS"
    );

    const doneTasks = displayedTasks.filter(
        (task) => task.status === "DONE"
    );

    /*
     * Selectam taskurile pentru fiecare coloana de prioritate.
     */
    const lowPriorityTasks = displayedTasks.filter(
        (task) => task.priority === "LOW"
    );

    const mediumPriorityTasks = displayedTasks.filter(
        (task) => task.priority === "MEDIUM"
    );

    const highPriorityTasks = displayedTasks.filter(
        (task) => task.priority === "HIGH"
    );

    /*
     * Formateaza deadline-ul intr-o forma usor de citit.
     */
    function formatDeadline(deadline) {
        if (!deadline) {
            return "No deadline";
        }

        return new Date(deadline).toLocaleDateString(
            "en-GB"
        );
    }

    /*
     * Construieste initialele utilizatorului asignat.
     *
     * Exemplu:
     * Emilia Dobre -> ED
     */
    function getInitials(assignedUser) {
        if (!assignedUser) {
            return "?";
        }

        const firstInitial =
            assignedUser.firstName?.charAt(0) || "";

        const lastInitial =
            assignedUser.lastName?.charAt(0) || "";

        if (firstInitial || lastInitial) {
            return `${firstInitial}${lastInitial}`.toUpperCase();
        }

        /*
         * Daca nu exista nume, luam primele doua
         * caractere din email.
         */
        return (
            assignedUser.email
                ?.substring(0, 2)
                .toUpperCase() || "?"
        );
    }

    /*
     * Se executa cand utilizatorul incepe
     * sa traga un card.
     */
    function handleDragStart(event, task) {
        /*
         * Drag-and-drop-ul este permis doar daca:
         *
         * 1. pagina a trimis allowDragAndDrop=true;
         * 2. taskurile sunt grupate dupa status;
         * 3. nu exista deja un update in desfasurare.
         */
        if (
            !allowDragAndDrop ||
            groupBy !== "status" ||
            isUpdating
        ) {
            event.preventDefault();
            return;
        }

        /*
         * Retinem taskul care este tras.
         */
        setDraggedTask(task);

        /*
         * Stergem o eroare veche, daca exista.
         */
        setDragError("");

        /*
         * Ii spunem browserului ca operatia
         * este o mutare.
         */
        event.dataTransfer.effectAllowed = "move";

        /*
         * Salvam id-ul taskului in obiectul
         * intern al browserului pentru drag-and-drop.
         */
        event.dataTransfer.setData(
            "text/plain",
            String(task.id)
        );
    }

    /*
     * Se executa cand operatia de drag se termina.
     */
    function handleDragEnd() {
        setDraggedTask(null);
    }

    /*
     * Se executa cand un task este tras
     * deasupra unei coloane.
     */
    function handleDragOver(event) {
        /*
         * Coloana accepta taskuri doar daca
         * drag-and-drop-ul este activ.
         */
        if (
            !allowDragAndDrop ||
            groupBy !== "status" ||
            !draggedTask
        ) {
            return;
        }

        /*
         * Fara preventDefault, browserul nu permite drop.
         */
        event.preventDefault();

        /*
         * Cursorul arata ca taskul va fi mutat.
         */
        event.dataTransfer.dropEffect = "move";
    }

    /*
     * Se executa cand taskul este lasat
     * intr-o coloana.
     *
     * newStatus reprezinta statusul coloanei
     * in care taskul a fost lasat.
     */
    async function handleDrop(event, newStatus) {
        event.preventDefault();

        /*
         * Oprim functia daca:
         *
         * - drag-and-drop-ul nu este permis;
         * - nu suntem in modul status;
         * - nu exista un task tras;
         * - taskul este pus in aceeasi coloana;
         * - un update este deja in desfasurare.
         */
        if (
            !allowDragAndDrop ||
            groupBy !== "status" ||
            !draggedTask ||
            draggedTask.status === newStatus ||
            isUpdating
        ) {
            setDraggedTask(null);
            return;
        }

        /*
         * Salvam lista veche.
         *
         * O folosim pentru rollback daca backend-ul
         * refuza modificarea.
         */
        const previousTasks = displayedTasks;

        /*
         * Salvam id-ul inainte sa golim draggedTask.
         */
        const taskId = draggedTask.id;

        /*
         * Mutare optimista:
         *
         * schimbam statusul local imediat,
         * astfel incat taskul sa apara instant
         * in noua coloana.
         */
        setDisplayedTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                    }
                    : task
            )
        );

        /*
         * Taskul nu mai este tras dupa drop.
         */
        setDraggedTask(null);

        /*
         * Stergem orice eroare veche.
         */
        setDragError("");

        /*
         * Blocam temporar alte mutari.
         */
        setIsUpdating(true);

        try {
            /*
             * Tokenul este salvat in sessionStorage.
             */
            const token =
                sessionStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Authentication token is missing."
                );
            }

            /*
             * Trimitem noul status catre backend.
             */
            const response = await fetch(
                `http://localhost:8080/api/tasks/${taskId}`,
                {
                    method: "PUT",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

            /*
             * Daca backend-ul raspunde cu eroare,
             * citim mesajul din response.
             */
            if (!response.ok) {
                const responseText =
                    await response.text();

                console.error(
                    "Task update failed:",
                    response.status,
                    responseText
                );

                throw new Error(
                    responseText ||
                    "Could not update task status."
                );
            }

            /*
             * Dupa update, cerem paginii parinte
             * sa reincarce taskurile din backend.
             *
             * Semnul ?. inseamna ca functia este apelata
             * doar daca a fost trimisa prin props. - dar blocheaza experient aui
             */
          //  await onTasksUpdated?.(); - am avea 2 redesenari
        } catch (updateError) {
            console.error(updateError);

            /*
             * Daca requestul esueaza, readucem lista
             * la forma existenta inainte de mutare.
             */
            setDisplayedTasks(previousTasks);

            setDragError(
                updateError.message ||
                "Could not update task status."
            );
        } finally {
            /*
             * Aceasta parte se executa indiferent
             * daca requestul a reusit sau nu.
             */
            setIsUpdating(false);
        }
    }

    /*
     * Aceasta functie construieste un singur card.
     *
     * article este containerul principal al taskului.
     */
    function renderTaskCard(task) {
        return (
            <article
                key={task.id}
                className={`project-task-card ${
                    task.status === "DONE"
                        ? "project-task-card--done"
                        : ""
                } ${
                    draggedTask?.id === task.id
                        ? "project-task-card--dragging"
                        : ""
                }`}
                /*
                 * Cardul poate fi tras doar:
                 *
                 * - in pagina care permite acest lucru;
                 * - cand gruparea este dupa status;
                 * - cand nu exista un update activ.
                 */
                draggable={
                    allowDragAndDrop &&
                    groupBy === "status" &&
                    !isUpdating
                }
                onDragStart={(event) =>
                    handleDragStart(event, task)
                }
                onDragEnd={handleDragEnd}
            >
                <span className="project-task-card__tag">
                    {task.priority}
                </span>

                <h3 className="project-task-card__title">
                    {task.title}
                </h3>

                <div className="project-task-card__footer">
                    <span className="project-task-card__status">
                        {task.status === "TODO" && (
                            <CalendarDays size={14} />
                        )}

                        {task.status ===
                            "IN_PROGRESS" && (
                                <Clock3 size={14} />
                            )}

                        {task.status === "DONE" && (
                            <CheckCircle2 size={14} />
                        )}

                        {task.status === "DONE"
                            ? "Completed"
                            : formatDeadline(
                                task.deadline
                            )}
                    </span>

                    <span
                        className="project-task-card__avatar"
                        title={
                            task.assignedUser?.firstName ||
                            task.assignedUser?.lastName
                                ? `${
                                    task.assignedUser
                                        .firstName ?? ""
                                } ${
                                    task.assignedUser
                                        .lastName ?? ""
                                }`.trim()
                                : task.assignedUser
                                    ?.email ??
                                "Unassigned"
                        }
                    >
                        {getInitials(
                            task.assignedUser
                        )}
                    </span>
                </div>
            </article>
        );
    }

    return (
        <section className="project-task-board">
            <div className="project-task-board__header">
                <div>
                    <p className="project-task-board__eyebrow">
                        Project workflow
                    </p>

                    <h2 className="project-task-board__title">
                        Tasks
                    </h2>

                    <p className="project-task-board__description">
                        View all tasks assigned to this
                        project.
                    </p>

                    <div className="project-task-board__filters">
                        <button
                            type="button"
                            className={`project-task-board__filter ${
                                groupBy === "status"
                                    ? "project-task-board__filter--active"
                                    : ""
                            }`}
                            onClick={() =>
                                setGroupBy("status")
                            }
                        >
                            Status
                        </button>

                        <button
                            type="button"
                            className={`project-task-board__filter ${
                                groupBy === "priority"
                                    ? "project-task-board__filter--active"
                                    : ""
                            }`}
                            onClick={() =>
                                setGroupBy("priority")
                            }
                        >
                            Priority
                        </button>
                    </div>
                </div>
            </div>

            {/* Eroare primita de la pagina parinte */}
            {error && (
                <p className="project-task-board__error">
                    {error}
                </p>
            )}

            {/* Eroare aparuta la mutarea unui task */}
            {dragError && (
                <p className="project-task-board__error">
                    {dragError}
                </p>
            )}

            {groupBy === "status" ? (
                <div className="project-task-board__columns">
                    {/* Coloana TODO */}
                    <div
                        className="project-task-column"
                        /*
                         * Evenimentele sunt atasate doar
                         * daca drag-and-drop-ul este permis.
                         */
                        onDragOver={
                            allowDragAndDrop
                                ? handleDragOver
                                : undefined
                        }
                        onDrop={
                            allowDragAndDrop
                                ? (event) =>
                                    handleDrop(
                                        event,
                                        "TODO"
                                    )
                                : undefined
                        }
                    >
                        <div className="project-task-column__heading">
                            <span className="project-task-column__dot project-task-column__dot--todo" />

                            <span className="project-task-column__name">
                                To do
                            </span>

                            <strong className="project-task-column__count">
                                {todoTasks.length}
                            </strong>
                        </div>

                        {todoTasks.map((task) =>
                            renderTaskCard(task)
                        )}
                    </div>

                    {/* Coloana IN_PROGRESS */}
                    <div
                        className="project-task-column"
                        onDragOver={
                            allowDragAndDrop
                                ? handleDragOver
                                : undefined
                        }
                        onDrop={
                            allowDragAndDrop
                                ? (event) =>
                                    handleDrop(
                                        event,
                                        "IN_PROGRESS"
                                    )
                                : undefined
                        }
                    >
                        <div className="project-task-column__heading">
                            <span className="project-task-column__dot project-task-column__dot--progress" />

                            <span className="project-task-column__name">
                                In progress
                            </span>

                            <strong className="project-task-column__count">
                                {progressTasks.length}
                            </strong>
                        </div>

                        {progressTasks.map((task) =>
                            renderTaskCard(task)
                        )}
                    </div>

                    {/* Coloana DONE */}
                    <div
                        className="project-task-column"
                        onDragOver={
                            allowDragAndDrop
                                ? handleDragOver
                                : undefined
                        }
                        onDrop={
                            allowDragAndDrop
                                ? (event) =>
                                    handleDrop(
                                        event,
                                        "DONE"
                                    )
                                : undefined
                        }
                    >
                        <div className="project-task-column__heading">
                            <span className="project-task-column__dot project-task-column__dot--done" />

                            <span className="project-task-column__name">
                                Done
                            </span>

                            <strong className="project-task-column__count">
                                {doneTasks.length}
                            </strong>
                        </div>

                        {doneTasks.map((task) =>
                            renderTaskCard(task)
                        )}
                    </div>
                </div>
            ) : (
                /*
                 * In modul priority nu permitem drop.
                 *
                 * Aceste coloane sunt doar pentru afisare.
                 */
                <div className="project-task-board__columns">
                    {/* Coloana LOW */}
                    <div className="project-task-column">
                        <div className="project-task-column__heading">
                            <span className="project-task-column__dot project-task-column__dot--low" />

                            <span className="project-task-column__name">
                                Low
                            </span>

                            <strong className="project-task-column__count">
                                {lowPriorityTasks.length}
                            </strong>
                        </div>

                        {lowPriorityTasks.map((task) =>
                            renderTaskCard(task)
                        )}
                    </div>

                    {/* Coloana MEDIUM */}
                    <div className="project-task-column">
                        <div className="project-task-column__heading">
                            <span className="project-task-column__dot project-task-column__dot--medium" />

                            <span className="project-task-column__name">
                                Medium
                            </span>

                            <strong className="project-task-column__count">
                                {mediumPriorityTasks.length}
                            </strong>
                        </div>

                        {mediumPriorityTasks.map((task) =>
                            renderTaskCard(task)
                        )}
                    </div>

                    {/* Coloana HIGH */}
                    <div className="project-task-column">
                        <div className="project-task-column__heading">
                            <span className="project-task-column__dot project-task-column__dot--high" />

                            <span className="project-task-column__name">
                                High
                            </span>

                            <strong className="project-task-column__count">
                                {highPriorityTasks.length}
                            </strong>
                        </div>

                        {highPriorityTasks.map((task) =>
                            renderTaskCard(task)
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProjectTaskBoard;