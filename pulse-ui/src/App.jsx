import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Logout from "./pages/logout";
import Addmonitor from "./pages/addMonitor";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard/addMonitor" element={<Addmonitor/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

