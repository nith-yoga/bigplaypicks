import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateTeam from "./pages/Dashboard/CreateTeam";
import League from "./pages/League/League";
import Navbar from "./components/Navbar/Navbar";
import JoinLeague from "./pages/League/JoinLeague";
import CreateLeague from "./pages/League/CreateLeague";
import Draft from "./pages/Draft/Draft";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path= "/JoinLeague" element={<JoinLeague />} />
        <Route path= "/CreateLeague" element={<CreateLeague />} />
        <Route path="/league/:id" element={<League />} />
        <Route path="/draft/:leagueId" element={<Draft />} />
      </Routes>
    </Router>
  );
}

export default App;