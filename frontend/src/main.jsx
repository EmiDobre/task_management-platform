import { StrictMode } from "react"; //identificari de pb in development
import { createRoot } from "react-dom/client"; //functia care contecteaza la dom browser
import { BrowserRouter } from "react-router"; //componenta care urmareste url ul

import App from "./App.jsx"; //componenta principala app
import "./index.css"; //stilurile globale

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);