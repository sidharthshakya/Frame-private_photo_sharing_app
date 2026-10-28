import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./features/auth/ui/pages/Login";
import Register from "./features/auth/ui/pages/Register";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World....</div>,
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children:[
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            }
        ]
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;