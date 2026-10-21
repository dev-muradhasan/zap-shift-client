import { createBrowserRouter } from "react-router";
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
                path: '/rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>
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