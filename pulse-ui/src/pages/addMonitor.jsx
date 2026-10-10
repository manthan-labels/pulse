import React from 'react';
import { useState } from 'react';

function Addmonitor() {

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [expectedStatusCode, setExpectedStatusCode] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const monitorData = {name, url, expectedStatusCode};

        const response = await fetch("http://localhost:3000/dashboard/addMonitor", {method: "POST", credentials: "include", headers: {"Content-Type": "application/json"}, body: JSON.stringify(monitorData)});

        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /><br/>
                <input placeholder='API endpoint url' value={url} onChange={(e) => setUrl(e.target.value)}/><br/>
                <input placeholder='Expected status code e.g. 200' value={expectedStatusCode} onChange={(e) => setExpectedStatusCode(e.target.value)} /><br/><br/>
                <button type="submit" onClick={() => window.location.href="/dashboard"}>Create</button>
            </form>
        </div>
    )
}

export default Addmonitor

