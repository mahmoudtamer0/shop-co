




export const fetchWithAuth = async (url: string, options: any = {}) => {
    let token = localStorage.getItem("token");

    let response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            ...options.headers,
            authorization: `Bearer ${token}`,
        },
    });

    // لو التوكن خلص
    if (response.status === 401) {

        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/users/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const refreshData = await refreshRes.json();
        console.log(refreshData)
        if (refreshRes.ok) {
            // update token
            localStorage.setItem("token", refreshData.accessToken);

            // retry request
            response = await fetch(url, {
                ...options,
                credentials: "include",
                headers: {
                    ...options.headers,
                    authorization: `Bearer ${refreshData.accessToken}`,
                },
            });
        } else {
            // refresh token فشل → logout
            // localStorage.removeItem("token");
            // window.location.href = "/login";
        }
    }

    return response;
};