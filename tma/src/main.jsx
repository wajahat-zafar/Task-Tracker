import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './routes/root';
import TaskList from './routes/tasklist';
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";  


const router = createBrowserRouter ([
  {
    path:"/",
    element: <Root />,
    children:[
      {
      path: "/",
      element: <TaskList />,

      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
