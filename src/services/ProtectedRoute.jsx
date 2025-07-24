import {useUserContext} from "../context/UserContext.jsx";
import {Link, Navigate} from "react-router-dom";

function ProtectedRoute({children}) {

    const{ user } = useUserContext();

    if(!user) return <Link to={"/signup"}></Link>;

    return children;
}

export default ProtectedRoute;