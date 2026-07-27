import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router";

import Button from "../../components/ui/Button/Button.jsx";
import Logo from "../../components/ui/Logo/Logo.jsx";

import "./AuthPage.css";

function LoginPage() {
    function handleSubmit(event) {
        event.preventDefault();

        console.log("Login form submitted");
    }

    return (
        <main className="auth-page">
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
                    <span className="auth-card__eyebrow">Welcome back</span>

                    <h1>Login to your workspace</h1>

                    <p>
                        Enter your credentials to continue managing your projects and
                        tasks.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="login-email">Email address</label>

                        <div className="form-field__control">
                            <Mail size={18} />

                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <div className="form-field__label-row">
                            <label htmlFor="login-password">Password</label>

                            <button className="auth-form__text-button" type="button">
                                Forgot password?
                            </button>
                        </div>

                        <div className="form-field__control">
                            <LockKeyhole size={18} />

                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />
                        </div>
                    </div>

                    <label className="auth-form__checkbox">
                        <input name="rememberMe" type="checkbox" />
                        <span>Keep me signed in</span>
                    </label>

                    <Button variant="primary" size="large" type="submit">
                        Login
                    </Button>
                </form>

                <p className="auth-card__switch">
                    Don&apos;t have an account?
                    <Link to="/register">Create account</Link>
                </p>
            </section>
        </main>
    );
}

export default LoginPage;