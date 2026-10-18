import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";


function Trackmonitor() {

        const monitorid = useParams().monitorid;
        const [monitorData, setMonitorData] = useState(null);

        async function fetchMonitor() {
            setInterval(async () => {
                const response = await fetch(
                    `http://localhost:3000/dashboard/trackmonitor/${monitorid}`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
            );
                    const data = await response.json();
                setMonitorData(data);
            }, 5*1000);

            
        }

        
        useEffect(() => {
            fetchMonitor();
        }, []);
    return (
        <div>
            <h1>This is your monitor</h1>
            {monitorData && (
                <div>
                    <p>Status: {monitorData.statusCode}</p>
                    <p>Latency: {monitorData.latency}</p>
                    <p>Success: {String(monitorData.success)}</p>
                    <p>Checked At: {monitorData.checkedAt}</p>
                </div>
            )}

        </div>
    );
}

export default Trackmonitor


