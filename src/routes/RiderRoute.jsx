import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import ForbiddenPage from "../pages/ForbiddenPage/ForbiddenPage";


const RiderRoute = ({ children }) => {
    const {user, loading } = useAuth()
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'rider') {
        return <ForbiddenPage></ForbiddenPage>
    }

    return children;
};

export default RiderRoute;