import React from 'react';
import { useEffect } from 'react';

function Logout() {

    async function fetchLogout () {
        await fetch("http://localhost:3000/logout", {method: "GET", credentials: "include"});
    }

        useEffect(() => {
        fetchDashboard();
            }, []);

    window.location.href = "/login";

    return (
        <div>

        </div>
    );
}

export default Logout


