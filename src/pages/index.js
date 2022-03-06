import { lazy } from 'react';

const pages = [
  {
    path: '/under-maintenance',
    Component: lazy(() => import('./under-maintenance/UnderMaintenance.page')),
  },
  {
    path: '/unauthorized-access',
    Component: lazy(() =>
      import('./unauthorized-access/UnauthorizedAccess.page')
    ),
  },
  // {
  //   path: '/sign-up',
  //   Component: lazy(() => import('./sign-up/SignUp.page')),
  // },
  {
    path: '/lock-screen',
    Component: lazy(() => import('./lock-screen/LockScreen.page')),
  },

  {
    path: '/email-verification',
    Component: lazy(() =>
      import('./email-verification/EmailVerification.page')
    ),
  },
  {
    path: '/account-suspended',
    Component: lazy(() => import('./account-suspended/AccountSuspended.page')),
  },
  // {
  //   path: '/sign-in',
  //   Component: lazy(() => import('./sign-in/SignIn.page')),
  // },
  {
    path: '/one-time-password',
    Component: lazy(() => import('./one-time-password/OneTimePassword.page')),
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
