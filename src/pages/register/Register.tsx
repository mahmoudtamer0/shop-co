import { useState } from "react";
import "./register.css";
import type { RegisterForm, Errors } from "../../types/form";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState<RegisterForm>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [active, setActive] = useState(false)
    const [responseErrMsg, setResponseErrMsg] = useState("")
    const navigate = useNavigate();



    const validate = (): boolean => {
        const newErrors: Errors = {};
        if (!form.name.trim()) newErrors.name = "name is required";
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email address";
        }
        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
        }
        if (!form.agreeTerms) {
            newErrors.agreeTerms = "You must agree to the terms";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        if (errors[name as keyof Errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setActive(true)
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);



        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })

        const data = await response.json();

        if (!response.ok) {
            setResponseErrMsg(data.message || "Something went wrong")
            setLoading(false);
            return;
        }
        localStorage.setItem("emailToVerify", form.email)


        setLoading(false);
        navigate("/verify-otp")
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setGoogleLoading(false);
        alert("Google sign-up triggered!");
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-content">
                    <div className="brand-logo">SHOP.CO</div>
                    <h1 className="auth-tagline">Start Your Style Journey Today</h1>
                    <p className="auth-sub">
                        Create a free account and get access to thousands of premium fashion brands.
                    </p>
                    <ul className="perks-list">
                        <li>
                            <span className="perk-icon">✦</span>
                            Exclusive member discounts & early access
                        </li>
                        <li>
                            <span className="perk-icon">✦</span>
                            Personalized style recommendations
                        </li>
                        <li>
                            <span className="perk-icon">✦</span>
                            Fast & free returns on all orders
                        </li>
                        <li>
                            <span className="perk-icon">✦</span>
                            Save your wishlist & track orders
                        </li>
                    </ul>
                    <div className="auth-stats">
                        <div className="stat">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">Brands</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">30K+</span>
                            <span className="stat-label">Customers</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Create your account</h2>
                        <p>It's free and only takes a minute</p>
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
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        )}
                        {!googleLoading && "Continue with Google"}
                        {googleLoading && "Creating account..."}
                    </button>

                    <div className="divider">
                        <span>or register with email</span>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="name-row">
                            <div className={`field-group ${errors.name ? "has-error" : ""}`}>
                                <label htmlFor="lastName">Last Name</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.name && <span className="error-msg">{errors.name}</span>}
                            </div>
                        </div>

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
                                    placeholder="Min. 8 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
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

                        <div className={`field-group ${errors.confirmPassword ? "has-error" : ""}`}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <input
                                    id="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Repeat your password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    aria-label={showConfirm ? "Hide password" : "Show password"}
                                >
                                    {showConfirm ? (
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
                                {form.confirmPassword && form.password === form.confirmPassword && (
                                    <svg className="match-icon" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </div>
                            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
                        </div>

                        <div className={`terms-group ${errors.agreeTerms ? "has-error" : ""}`}>
                            <label className="terms-label">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={form.agreeTerms}
                                    onChange={handleChange}
                                />
                                <span className="checkmark" />
                                <span>
                                    I agree to the{" "}
                                    <a href="#" className="terms-link">Terms of Service</a>
                                    {" "}and{" "}
                                    <a href="#" className="terms-link">Privacy Policy</a>
                                </span>
                            </label>
                            {errors.agreeTerms && <span className="error-msg">{errors.agreeTerms}</span>}
                        </div>
                        <div>
                            <span className="error-msg">{active && responseErrMsg.length > 0 ? responseErrMsg : null}</span>
                        </div>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? <span className="spinner white" /> : "Create Account"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <a href="/login">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}