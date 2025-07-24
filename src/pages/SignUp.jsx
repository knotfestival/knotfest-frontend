import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api.js";

function SignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        favoriteArtist: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            await api.post("/signup", formData);
            navigate("/login");
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error creating account. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="username" 
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    required
                />
                <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email"
                    required
                />
                <input 
                    type="password" 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="password"
                    required
                />
                <input 
                    type="text" 
                    id="favoriteArtist" 
                    value={formData.favoriteArtist}
                    onChange={handleChange}
                    placeholder="favorite artist"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Signup"}
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default SignUp;