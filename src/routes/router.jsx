import { createBrowserRouter } from "react-router";
import { auth } from "../Firebase/Firebase.init";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/Auth/SignIn/SignIn";
import SignUp from "../pages/Auth/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import Loading from "../components/Loading/Loading";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcel from "../pages/Dashboard/MyParcel/MyParcel";
import MyDashboard from "../pages/Dashboard/MyDashboard/MyDashboard";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRider from "../pages/Dashboard/ApproveRider/ApproveRider";
import ParcelDetails from "../pages/Dashboard/ParcelDetails/ParcelDetails";
import RiderDetails from "../pages/Dashboard/RiderDetails/RiderDetails";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import axios from "axios";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import TrackParcel from "../pages/TrackParcel/TrackParcel";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        hydrateFallbackElement: <Loading></Loading>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('/serviceCenters.json').then(res => res.json()),
            },
            {
                path: '/about',
                Component: AboutUs,
            },
            {
                path: '/track-parcel/:trackingId',
                element: <TrackParcel></TrackParcel>,
            },
            {
                path: '/rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json()),
            },
            {
                path: "*",
                element: <ErrorPage />
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/signin',
                Component: SignIn
            },
            {
                path: '/signup',
                Component: SignUp
            },
            {
                path: "*",
                element: <ErrorPage />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <MyDashboard></MyDashboard>
            },
            {
                path: 'my_parcel',
                element: <MyParcel></MyParcel>
            },
            {
                path: 'parcel',
                element: <SendParcel></SendParcel>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json()),
            },
            {
                path: "parcels/:id",
                element: (
                    <PrivateRoute>
                        <ParcelDetails />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`http://localhost:3000/parcels/${params.id}`)
            },
            {
                path: "riders/:id",
                element: (
                    <PrivateRoute>
                        <RiderDetails />
                    </PrivateRoute>
                ),
                // loader: ({ params }) =>
                //     fetch(`http://localhost:3000/riders/${params.id}`)
                loader: async ({ params }) => {
                    const user = auth.currentUser;
                    if (!user) {
                        throw new Error("User is not logged in");
                    }
                    const token = await user.getIdToken();
                    const res = await axios.get(
                        `http://localhost:3000/riders/${params.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return res.data;
                },
            },
            {
                path: "payment-success",
                element: <PaymentSuccess />,
            },
            {
                path: "payment-cancel",
                element: <PaymentCancel />,
            },
            {
                path: "payment-history",
                element: <PaymentHistory />,
            },
            {
                path: 'approve-rider',
                element: <AdminRoute><ApproveRider></ApproveRider></AdminRoute>
            },
            {
                path: 'users-management',
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
            },
            {
                path: 'assign-rider',
                element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
            },
            {
                path: 'assigned-deliveries',
                element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
            },
            // {
            //     path: "invoices",
            //     element: <Invoices />,
            // },
            // {
            //     path: "stores",
            //     element: <Stores />,
            // },
            // {
            //     path: "pricing",
            //     element: <PricingPlan />,
            // },
            // {
            //     path: "settings",
            //     element: <Settings />,
            // },
            // {
            //     path: "change-password",
            //     element: <ChangePassword />,
            // },
            // {
            //     path: "help",
            //     element: <Help />,
            // },
            {
                path: "*",
                element: <ErrorPage />
            },
        ]
    },
]);