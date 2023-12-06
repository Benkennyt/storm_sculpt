import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import LandingPage from "../features/home/LandingPage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {element: <LandingPage/>, path: ''}
        ]
    }
]

export const router = createBrowserRouter(routes)