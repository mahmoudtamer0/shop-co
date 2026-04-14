import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Otp.css";

export default function Otp() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [activeForSuccess, setActiveForSuccess] = useState(false);
    const [responseErrMsg, setResponseErrMsg] = useState("")
    const [responseSuccMsg, setResponseSuccMsg] = useState("")
    const [seconds, setSeconds] = useState(40);
    const [canResend, setCanResend] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (seconds === 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const handleResend = async () => {
        try {
            setActive(true)

            setCanResend(false);
            setSeconds(40);
            const email = localStorage.getItem("emailToVerify")
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/resend-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const data = await response.json()

            if (!response.ok) {
                setResponseErrMsg(data.message || "Something went wrong")
                return;
            }

            setActive(false)
            setResponseErrMsg("")
            setActiveForSuccess(true)
            setResponseSuccMsg("otp resended successfuly")

        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            setActive(true)
            setLoading(true);

            setResponseErrMsg("")
            setActiveForSuccess(false)
            setResponseSuccMsg("")

            if (!otp) {
                setResponseErrMsg("OTP is required")
                return;
            }

            if (otp.length !== 6) {
                setResponseErrMsg("OTP must be 6 digits")
                return;
            }
            const email = localStorage.getItem("emailToVerify")

            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (!response.ok) {
                setResponseErrMsg(data.message || "Something went wrong")
                setLoading(false)
                return;
            }

            localStorage.setItem("token", data.accesstoken);

            const redirectTo = location.state?.from?.pathname || "/";

            navigate(redirectTo, { replace: true });



        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-pageOtp">
            <div className="auth-left">
                <div className="auth-left-content">
                    <div className="brand-logo">SHOP.CO</div>
                    <h1 className="auth-tagline">Verify Your Email</h1>
                    <p className="auth-sub">
                        Enter the 6-digit code sent to your email to activate your account.
                    </p>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>OTP Verification</h2>
                        <p>Check your email for the code</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={`field-group ${error ? "has-error" : ""}`}>
                            <label>OTP Code</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter 6 digits"
                                maxLength={6}
                            />
                            <div className="resend-wrapper">
                                {canResend ? (
                                    <button type="button" onClick={handleResend} className="resend-btn">
                                        Resend OTP
                                    </button>
                                ) : (
                                    <span className="resend-text">
                                        Resend OTP in {seconds}s
                                    </span>
                                )}
                            </div>
                            {error && <span className="error-msg">{error}</span>}
                        </div>
                        <div>
                            <span className="success-msg">{activeForSuccess && responseSuccMsg.length > 0 ? responseSuccMsg : null}</span>
                        </div>
                        <div>
                            <span className="error-msg">{active && responseErrMsg.length > 0 ? responseErrMsg : null}</span>
                        </div>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? <span className="spinner white" /> : "Verify"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}