import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/home/Home";

export const myRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
           path: '/',
           element: <Home/>
        },
      ]  
    }
])