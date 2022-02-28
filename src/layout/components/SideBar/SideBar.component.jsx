import React from 'react';
import Data from '../../../db.json';
import SideLinks from './SideLinks.component';
import './SideBar.styles.scss';

export function SideBar() {
  return (
    <div className="sidebar bg-custom-secondary" style={{ width: '300px' }}>
      <ul className="p-0">
        {Data.pages.dashboard.sidebar.map((name) => (
          <SideLinks name={name} path={name} />
        ))}
      </ul>
    </div>
  );
}
