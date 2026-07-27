import {
    ArrowLeft,
    LockKeyhole,
    Mail,
    UserRound,
} from "lucide-react";
import { Link } from "react-router";

import Button from "../../components/ui/Button/Button.jsx";
import Logo from "../../components/ui/Logo/Logo.jsx";

import "../LoginPage/AuthPage.css";

function RegisterPage() {
    function handleSubmit(event) {
        event.preventDefault();

        console.log("Register form submitted");
    }

    return (
        <main className="auth-page auth-page--register">
            <div className="auth-page__decoration auth-page__decoration--top" />
            <div className="auth-page__decoration auth-page__decoration--bottom" />

            <section className="auth-card">
                <div className="auth-card__header">
                    <Link className="auth-card__back" to="/">
                        <ArrowLeft size={17} />
                        Back home
                    </Link>

                    <Logo />
                </div>

                <div className="auth-card__intro">
                    <span className="auth-card__eyebrow">Start organizing</span>

                    <h1>Create your account</h1>

                    <p>
                        Create a workspace where you can organize projects, tasks and
                        documents.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="register-name">Full name</label>

                        <div className="form-field__control">
                            <UserRound size={18} />

                            <input
                                id="register-name"
                                name="name"
                                type="text"
                                placeholder="Your full name"
                                autoComplete="name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="register-email">Email address</label>

                        <div className="form-field__control">
                            <Mail size={18} />

                            <input
                                id="register-email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="register-password">Password</label>

                        <div className="form-field__control">
                            <LockKeyhole size={18} />

                            <input
                                id="register-password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="register-confirm-password">
                            Confirm password
                        </label>

                        <div className="form-field__control">
                            <LockKeyhole size={18} />

                            <input
                                id="register-confirm-password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Repeat your password"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>

                    <label className="auth-form__checkbox">
                        <input name="acceptTerms" type="checkbox" required />

                        <span>
              I agree to the terms and privacy policy
            </span>
                    </label>

                    <Button variant="primary" size="large" type="submit">
                        Create account
                    </Button>
                </form>

                <p className="auth-card__switch">
                    Already have an account?
                    <Link to="/login">Login</Link>
                </p>
            </section>
        </main>
    );
}

export default RegisterPage;