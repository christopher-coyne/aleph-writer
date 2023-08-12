import { HomePage } from "../features/misc";
import { Works } from "../features/texts";
import { WorksList } from "../features/workslist";

export const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/works",
    element: <WorksList />,
  },
  {
    path: "/works/:id",
    element: <Works />,
  },
];
