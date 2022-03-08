import { lazy } from 'react';

const pages = [
  {
    path: '/unauthorized-access',
    Component: lazy(() =>
      import('./unauthorized-access/UnauthorizedAccess.page')
    ),
  },
  {
    path: '/lock-screen',
    Component: lazy(() => import('./lock-screen/LockScreen.page')),
  },
];

export const dashboardPages = [
  {
    path: '/dashboard',
    Component: lazy(() => import('./Dashboard/Home/Home.page')),
  },
  {
    path: '/dashboard/about',
    Component: lazy(() => import('./Dashboard/About/About.page')),
  },
  {
    path: '/dashboard/editor',
    Component: lazy(() => import('./Dashboard/Editor/Editor.page')),
  },
];

export default pages;
export const Error404 = lazy(() => import('./error-404/Error404.page'));
