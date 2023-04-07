import { createBrowserRouter } from "react-router-dom";
import Main from "./Layout/Main";
import Home from "./Home/Home";
import PostPage from "./PostPage/PostPage";
import CreatePost from "./CreatePost/CreatePost";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import AuthorRoute from "./PrivateRoute/AuthorRoute";

export const router = createBrowserRouter([
    {path: '/', element: <Main></Main>, children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/postpage/:id',
            element: <PostPage></PostPage>,
            loader: ({params})=> fetch(`https://blog-server-jade.vercel.app/blog/${params.id}`)
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/Register',
            element: <Register/>
        },
        {
            path: '/createpost',
            element: <AuthorRoute><CreatePost></CreatePost></AuthorRoute>
        },
        {
            path: '/edit/:id',
            element: <CreatePost></CreatePost>,
            loader: ({params})=> fetch(`https://blog-server-jade.vercel.app/blog/${params.id}`)
        }
    ]}
])