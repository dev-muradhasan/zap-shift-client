import { FadeLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#eef0f1]">
                <FadeLoader color="#36d7b7" />
            </div>
        );
    }

    if(!user){
        return <Navigate to={'/signin'}></Navigate>
    }


    return children;
};

export default PrivateRoute;