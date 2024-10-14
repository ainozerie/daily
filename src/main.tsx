import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App/App';
import Tasks from './Tasks/Tasks';
import NewTask from './Tasks/NewTask';
import TaskCard from './Tasks/TaskCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <div>Promo</div>
      },
      {
        path: 'tasks',
        element: <Tasks />
      },
      {
        path: 'tasks/:id',
        element: <TaskCard />
      },
      {
        path: 'tasks/new',
        element: <NewTask />
      },
      {
        path: 'login',
        element: <p>Oops, still in progress...</p>
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
