import Logo from "../../../components/ui/Logo/Logo.jsx";

function LandingHeader() {
    return (
        <header className="landing-header">
            <Logo />

            <nav
                className="landing-header__navigation"
                aria-label="Main navigation"
            >
                <a href="#features">Features</a>
                <a href="#workspace">Workspace</a>
                <a href="#about">About</a>
            </nav>
        </header>
    );
}

export default LandingHeader;