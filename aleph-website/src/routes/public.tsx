import { HomePage } from "../features/misc";
import { Works } from "../features/texts";

export const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/works/:id',
    element: <Works />,
  },
]