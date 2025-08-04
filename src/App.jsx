import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import AddTenants from "./components/AddTenants";
import AllTenants from "./components/AllTenants";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/Signup";
import Footer from './components/Footer';
import UpdateTenants from "./components/UpdateTenants";
import Policy from "./components/Policy"
import Terms from "./components/Terms"
import Landing from "./components/Landing";
import Profile from "./components/Profile";

function App() {
    return (
        <div className="app-layout">
            <BrowserRouter>
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/password" element={<ForgotPassword />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/addtenant" element={<AddTenants />} />
                        <Route path="/alltenants" element={<AllTenants />} />
                        <Route path="/policy" element={<Policy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/update/:id" element={<UpdateTenants />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;