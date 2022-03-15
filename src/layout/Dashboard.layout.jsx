import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { element, bool } from "prop-types";
import { useMediaQuery } from "react-responsive";
import { SideBar, TopBar } from "./components";
import classes from "./Dashboard.layout.module.css";
import Data from "../db.json";

export function DashboardLayout({ children, hide }) {
  const [active, setActive] = useState("");

  const { pathname } = useLocation();

  const lessThanDesktop = useMediaQuery({
    query: "(max-width: 900px)",
  });
  const [hideSide, setHideSide] = useState(!!lessThanDesktop);

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
      <div className={classes.notifications__bar}>
        <div>Logged In as AAA</div>
        <div><Link to={'/admin/sign-in'}>Switch to Admin</Link></div>
      </div>
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
