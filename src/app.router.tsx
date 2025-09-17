import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { CreateUserDebtPage } from "./dashboard/pages/createUserDebt/CreateUserDebtPage";
import { UserDebtsPage } from "./dashboard/pages/userDebt/UserDebtsPage";
import { AuthenticatedRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";
import { lazy } from "react";

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('./dashboard/layouts/DashboardLayout'));

export const appRouter = createBrowserRouter([
    // Auth Routes
    {
        path: '/',
        element: (
            <NotAuthenticatedRoute>
                <AuthLayout />
            </NotAuthenticatedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/login" />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
    // Authenticated Routes
    {
        path: '/debts',
        element: (
            <AuthenticatedRoute>
                <DashboardLayout />
            </AuthenticatedRoute>
        ),
        children: [
            {
                index: true,
                element: <UserDebtsPage />,
            },
            {
                path: 'create',
                element: <CreateUserDebtPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
])
