import { lazy } from 'react';

const pages = [
  { path: '/', Component: lazy(() => import('./Home/Home.page')) },
];

export default pages;
