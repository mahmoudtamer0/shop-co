import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token)
            const redirectTo =
                localStorage.getItem("redirectAfterLogin") || "/";

            localStorage.removeItem("redirectAfterLogin");

            // setTimeout(() => {
            //     navigate(redirectTo, { replace: true });
            // }, 100);
        } else {
            navigate("/login");
        }
    }, []);

    return <h3>Logging you in...</h3>;
}

export default AuthSuccess;