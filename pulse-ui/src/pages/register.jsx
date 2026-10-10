import React from 'react';
import { useState } from 'react';

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const userData = {username, email, password};

        const response = await fetch("http://localhost:3000/register", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(userData)});

        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)
                
                }/><br/>
                <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <br/>
                <button type="submit">Register</button>  
            </form>
        </div>
    );
}

export default Register

