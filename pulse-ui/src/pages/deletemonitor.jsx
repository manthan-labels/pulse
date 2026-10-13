import React from 'react';
import { useParams } from 'react-router-dom';

function Deletemonitor() {
    const monitorid = useParams().monitorid;

    async function handleSubmit(e) {
        e.preventDefault();

        //const monitorToDelete = monitorModel.find({
        //    _id: monitorid
        //});
        //monitorToDelete will be monitor objeact


        const response = await fetch(`http://localhost:3000/dashboard/deleteMonitor/${monitorid}`, {method: "POST", credentials: "include", headers: {"Content-Type": "application/json"}});

        const data = await response.json();
        console.log(data);

        window.location.href = "/dashboard";
    }

    return (
        <div>
            <h1>Are you sure you want to delete this monitor?</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Yes, delete monitor</button>
            </form>
        </div>
    );
}

export default Deletemonitor

