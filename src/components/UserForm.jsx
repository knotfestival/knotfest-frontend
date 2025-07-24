import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function UserForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        favoriteArtist: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleInternalSubmit = (e) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(e);
        }
    };

    const formFields = [
        { id: "username", label: "Username", type: "text" },
        { id: "password", label: "Password", type: "password" },
        { id: "email", label: "Email", type: "email" },
        { id: "favoriteArtist", label: "Favorite Artist", type: "text" }
    ];

    const location = useLocation();

    useEffect(() => {
        if (location.state?.email) {
            setFormData(prevState => ({
                ...prevState,
                email: location.state.email
            }));
        }
    }, [location.state]);


    return (
        <form onSubmit={handleInternalSubmit}>
            {formFields.map(field => <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                />
            </div>)}
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
}

export default UserForm;