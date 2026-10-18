import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


function Trackmonitor() {
    const { monitorid } = useParams();
    const [monitorData, setMonitorData] = useState(null);

    useEffect(() => {
        let isActive = true;

        async function fetchMonitor() {
            try {
                const response = await fetch(
                    `http://localhost:3000/dashboard/trackmonitor/${monitorid}`,
                    { method: "GET", credentials: "include" }
                );
                if (!response.ok) {
                    throw new Error(`Monitor request failed (${response.status})`);
                }
                const data = await response.json();
                if (isActive) setMonitorData(data);
            } catch (error) {
                console.error('Failed to fetch monitor stats:', error);
            }
        }

        fetchMonitor();
        const intervalId = setInterval(fetchMonitor, 5 * 1000);

        return () => {
            isActive = false;
            clearInterval(intervalId);
        };
    }, [monitorid]);

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


