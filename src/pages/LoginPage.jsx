import api from "../services/api.js";
import {useState} from "react";
import {useUserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";


function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useUserContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = new FormData()

        body.append("email", email);
        body.append("password", password);

        await api.post("/login", body);

        let user = (await api.get("/user/logged")).data;
        context.setUser(user);
        navigate("/");

    }

    return (
        <div className="login">
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"></label>
                <input id="email" type="email" value={email}
                       onChange={(e) => {
                           setEmail(e.target.value);
                       }} placeholder="Email"/>

                <label htmlFor="password"></label>
                <input id="password" type="password" value={password}
                       onChange={(e) => {
                           setPassword(e.target.value);
                       }} placeholder="Password"/>

                <input id="submit" type="submit" value="Login" />
            </form>

        </div>

    )
}

export default LoginPage;