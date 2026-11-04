import Loading from "../../../components/Loading/Loading";
import useRole from "../../../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const MyDashboard = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "rider") {
    return <RiderDashboard></RiderDashboard>;
  } else {
    return <UserDashboard></UserDashboard>;
  }
};

export default MyDashboard;
