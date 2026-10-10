import React from 'react';
import { useState } from 'react';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const userData = {username, password};

        const response = await fetch("http://localhost:3000/login", {method: "POST", credentials: "include", headers: {"Content-Type": "application/json"}, body: JSON.stringify(userData)});

        const data = await response.json();
        console.log(data);

        window.location.href = "/dashboard";
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
                <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <br/>
                <button type="submit">Login</button>  
            </form>
        </div>
    );
}

export default Login


