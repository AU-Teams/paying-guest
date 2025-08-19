import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
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
import OAuthSuccess from "./components/OAuthSuccess";

function App() {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <div className="app-layout">
            <BrowserRouter>
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/policy" element={<Policy />} />
                        <Route path="/terms" element={<Terms />} />
                        {!isLoggedIn && <Route path="/login" element={<Login />} />}
                        {!isLoggedIn && <Route path="/signup" element={<Signup />} />}
                        {isLoggedIn && <Route path="/addtenant" element={<AddTenants />} />}
                        {isLoggedIn && <Route path="/alltenants" element={<AllTenants />} />}
                        {isLoggedIn && <Route path="/update/:id" element={<UpdateTenants />} />}
                        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
                        {isLoggedIn && <Route path="/password" element={<ForgotPassword />} />}
                        <Route path="/oauth-success" element={<OAuthSuccess />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;