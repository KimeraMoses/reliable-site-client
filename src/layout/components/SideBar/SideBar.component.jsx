import React from 'react';
import Data from '../../../db.json';
import SideLinks from './SideLinks.component';
import './SideBar.styles.scss';

export function SideBar({ hideSide }) {
  return (
    <div
      className={`sidebar bg-custom-secondary transition-all pt-[20px] ${
        hideSide ? 'w-[95px]' : 'w-[300px]'
      }`}
    >
      <ul className="p-0">
        {Data.pages.dashboard.sidebar.map(({ name, path, icon }) => (
          <SideLinks name={name} path={path} icon={icon} hideSide={hideSide} />
        ))}
      </ul>
    </div>
  );
}
