import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";


function Trackmonitor() {

    const monitorid = useParams().monitorid;

    async function fetchMonitor () {
        const response = await fetch(`http://localhost:3000/dashboard/trackmonitor/${monitorid}`, {method: "GET", credentials: "include"});
        const data = await response.json();
        console.log(data);
        return 0;
    }

        fetchMonitor();
        
        // yet to display stats data on frontend

    return (
        <div>
            <h1>This is your monitor</h1>
            
            

        </div>
    );
}

export default Trackmonitor


