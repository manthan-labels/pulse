import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Dashboard() {

    const [monitors, setMonitors] = useState([]);

    async function fetchDashboard () {
        const response = await fetch("http://localhost:3000/dashboard", {method: "GET", credentials: "include"});
        const data = await response.json();
        setMonitors(data);
    }

            useEffect(() => {
            fetchDashboard();
                }, []);

    return (
        <div>
            <h1>This is your dashboard</h1>
            <h2>Your monitors:</h2>

            {monitors.map((monitor) => (<div key={monitor._id}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkef3M6S34ScEHEqenN6v5B4e1fBfjEWTlHBntu6fSeA&s" onClick={() => window.location.href=`/dashboard/trackmonitor/${monitor._id}`} /> 
                <p>{monitor.name}</p>
            </div>))}

            <button onClick={() => window.location.href = "/dashboard/addMonitor"}>Add monitor</button>
        </div>
    );
}

export default Dashboard


