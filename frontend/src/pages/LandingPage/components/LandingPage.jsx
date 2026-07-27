import {
  ArrowRight,
  CheckCircle2,
  Files,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";

import Button from "../../components/ui/Button/Button.jsx";
import LandingHeader from "./components/LandingHeader.jsx";
import ProductPreview from "./components/ProductPreview.jsx";

import "./LandingPage.css";

function LandingPage() {
  function handleLogin() {
    console.log("Navigate to login");
  }

  function handleCreateAccount() {
    console.log("Navigate to register");
  }

  function handleRequestDemo() {
    console.log("Open demo request");
  }

  return (
    <div className="landing-page">
      <LandingHeader />

      <main>
        <section className="hero-section">
          <div className="hero-section__content">
            <span className="hero-section__eyebrow">
              Modern project collaboration
            </span>

            <h1 className="hero-section__title">
              Bring your projects,
              <span> tasks and team</span>
              <br />
              into one workspace.
            </h1>

            <p className="hero-section__description">
              Plan projects, organize tasks, collaborate with your team and
              keep important documents together in a simple and focused
              workspace.
            </p>

            <div className="hero-section__actions">
              <Button
                variant="primary"
                size="large"
                onClick={handleLogin}
              >
                Login
                <ArrowRight size={18} />
              </Button>

              <Button
                variant="secondary"
                size="large"
                onClick={handleCreateAccount}
              >
                Create account
              </Button>

              <Button
                variant="ghost"
                size="large"
                onClick={handleRequestDemo}
              >
                Request demo
              </Button>
            </div>

            <ul className="hero-section__benefits">
              <li>
                <CheckCircle2 size={17} />
                Simple project organization
              </li>

              <li>
                <CheckCircle2 size={17} />
                Clear task tracking
              </li>

              <li>
                <CheckCircle2 size={17} />
                Secure team workspace
              </li>
            </ul>
          </div>

          <ProductPreview />
        </section>

        <section id="features" className="features-section">
          <div className="features-section__heading">
            <span>Everything you need</span>

            <h2>
              A clear workspace for your entire project
            </h2>

            <p>
              Keep the essential parts of project management connected,
              without unnecessary complexity.
            </p>
          </div>

          <div className="features-grid">
            <article className="feature-card">
              <span className="feature-card__icon">
                <LayoutDashboard size={22} />
              </span>

              <h3>Project overview</h3>

              <p>
                Follow project status, progress and important information
                from one organized dashboard.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-card__icon">
                <UsersRound size={22} />
              </span>

              <h3>Team collaboration</h3>

              <p>
                Add members, assign responsibilities and keep everyone
                aligned with the same goals.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-card__icon">
                <Files size={22} />
              </span>

              <h3>Documents together</h3>

              <p>
                Upload and organize the files that belong to each project
                directly inside its workspace.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© 2026 TaskFlow. Built for focused teams.</p>
      </footer>
    </div>
  );
}

export default LandingPage;