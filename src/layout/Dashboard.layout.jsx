import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { element, bool } from 'prop-types';
import { SideBar, TopBar } from './components';
import Data from '../db.json';

export function DashboardLayout({ children, hide }) {
  const [hideSide, setHideSide] = useState('');
  const [active, setActive] = useState('');

  const { pathname } = useLocation();

  useEffect(() => {
    const activeLink = Data.pages.dashboard.sidebar.filter((sideItem) => {
      return sideItem.path === pathname;
    });
    setActive(activeLink[0]);
  }, [pathname]);

  const toggleSide = () => {
    setHideSide((state) => !state);
  };

  return (
    <div className="w-full md:min-h-screen">
      <TopBar hide={hide} hideSide={hideSide} toggleSide={toggleSide} />
      <div className="flex">
        {!hide && (
          <div className="col-auto">
            <SideBar hideSide={hideSide} />
          </div>
        )}
        <div className="col">
          <div className="bg-[#1A1A27] p-4 md:px-6">
            <h2 className="text-xl font-normal text-white">{active?.name}</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: element.isRequired,
  hide: bool,
};

DashboardLayout.defaultProps = {
  hide: false,
};
