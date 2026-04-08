import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);

            setTimeout(() => {
                navigate("/", { replace: true });
            }, 100);
        } else {
            navigate("/login");
        }
    }, []);

    return <h3>Logging you in...</h3>;
}

export default AuthSuccess;