import { lazy } from 'react';

const pages = [
  { path: '/', Component: lazy(() => import('./Home/Home.page')) },

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
  {
    path: '/sign-up',
    Component: lazy(() => import('./sign-up/SignUp.page')),
  },
  {
    path: '/reset-password',
    Component: lazy(() => import('./reset-password/ResetPassword.page')),
  },
  {
    path: '/one-time-password',
    Component: lazy(() => import('./one-time-password/OneTimePassword.page')),
  },
  {
    path: '/lock-screen',
    Component: lazy(() => import('./lock-screen/LockScreen.page')),
  },
  {
    path: '/forgot-password',
    Component: lazy(() => import('./forgot-password/ForgotPassword.page')),
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
  {
    path: '/sign-in',
    Component: lazy(() => import('./sign-in/SignIn.page')),
  },
];

export default pages;
