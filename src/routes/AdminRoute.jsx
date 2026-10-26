import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import ForbiddenPage from "../pages/ForbiddenPage/ForbiddenPage";


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {role, roleLoading} = useRole();

    if (loading || !user || roleLoading){
        return <Loading></Loading>
    }

    if(role !== 'admin'){
        return <ForbiddenPage></ForbiddenPage>
    }

    return children;
};

export default AdminRoute;