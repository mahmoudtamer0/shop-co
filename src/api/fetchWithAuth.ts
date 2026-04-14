export const fetchWithAuth = async (url: string, options: any = {}) => {
    let token = localStorage.getItem("token");
    console.log("called")

    let response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            ...options.headers,
            authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        console.log("token expired")

        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/users/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const refreshData = await refreshRes.json();
        if (refreshRes.ok) {
            console.log("refreshed")
            localStorage.setItem("token", refreshData.accessToken);

            response = await fetch(url, {
                ...options,
                credentials: "include",
                headers: {
                    ...options.headers,
                    authorization: `Bearer ${refreshData.accessToken}`,
                },
            });
        } else {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    }

    return response;
};