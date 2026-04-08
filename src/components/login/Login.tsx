import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

interface LoginForm {
    email: string;
    password: string;
}

interface Errors {
    email?: string;
    password?: string;
}

export default function Login() {
    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [active, setActive] = useState(false)
    const [responseErrMsg, setResponseErrMsg] = useState("")

    const validate = () => {
        const err: Errors = {};

        if (!form.email) {
            err.email = "Email is required";
        }

        if (!form.password) {
            err.password = "Password is required";
        }

        setErrors(err);

        return Object.keys(err).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof Errors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setActive(true)
            setLoading(true);


            console.log(form)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            const data = await response.json();

            if (!response.ok) {
                setResponseErrMsg(data.message || "Something went wrong")
                console.log("error")
            }

            console.log(data);

            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    const handleGoogle = () => {
        setGoogleLoading(true);

        window.location.href = `${import.meta.env.VITE_API_URL}/users/google`;
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-content">
                    <div className="brand-logo">SHOP.CO</div>
                    <h1 className="auth-tagline">
                        Find Clothes That Matches Your Style
                    </h1>
                    <p className="auth-sub">
                        Join thousands of fashion lovers and discover your perfect look.
                    </p>
                    <div className="auth-stats">
                        <div className="stat">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">Brands</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">2,000+</span>
                            <span className="stat-label">Products</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">30,000+</span>
                            <span className="stat-label">Customers</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Welcome back</h2>
                        <p>Sign in to your account to continue</p>
                    </div>

                    <button
                        className="google-btn"
                        onClick={handleGoogle}
                        disabled={googleLoading}
                    >
                        {googleLoading ? (
                            <span className="spinner" />
                        ) : (
                            <svg className="google-icon" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                        )}
                        {!googleLoading && "Continue with Google"}
                        {googleLoading && "Signing in..."}
                    </button>

                    <div className="divider">
                        <span>or sign in with email</span>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className={`field-group ${errors.email ? "has-error" : ""}`}>
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                            </div>
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>

                        <div className={`field-group ${errors.password ? "has-error" : ""}`}>
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <span className="error-msg">{errors.password}</span>}
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span className="checkmark" />
                                Remember me
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <div>
                            <span className="error-msg">{active && responseErrMsg.length > 0 ? responseErrMsg : null}</span>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? <span className="spinner white" /> : "Sign In"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account?{" "}
                        <Link to="/register">Create one free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}