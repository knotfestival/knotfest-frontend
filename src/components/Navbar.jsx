import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../context/UserContext.jsx"; // IMPORTANTE: Importar o hook useUserContext

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const { user, logout } = useUserContext();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <Link to="/">
                <img src="/knotfestwhite.png" alt="Knotfest logo" className="logo" />
            </Link>

            <div className={`nav-links ${isOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/lineup" onClick={() => setIsOpen(false)}>LineUp</Link>
                <Link to="/tickets" onClick={() => setIsOpen(false)}>Tickets</Link>
                <Link to="/survey" onClick={() => setIsOpen(false)}>Survey</Link>

                {user ? (
                    <>
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                            Profile
                        </Link>

                        <button
                            className="registerbtn"
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>SignUp</Link>
                        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    </>
                )}
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
}

export default Navbar;