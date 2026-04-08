import { Navigate } from "react-router-dom";

function ProtectOtpRoute({ children }: any) {
    const emailToVerify = localStorage.getItem("emailToVerify");

    if (!emailToVerify) {
        return <Navigate to="/register" />;
    }

    return children;
}

export default ProtectOtpRoute;