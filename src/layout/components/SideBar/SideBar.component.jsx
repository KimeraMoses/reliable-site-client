import React from "react";
import Data from "../../../db.json";
import SideLinks from "./SideLinks.component";
import QRCode from "react-qr-code";
import "./SideBar.styles.scss";
import { useSelector } from "react-redux";

export function SideBar({ hideSide }) {
  const authenticatorUri = useSelector((state) => state.auth.authUri);
  return (
    <div
      className={`sidebar bg-custom-secondary transition-all pt-[20px] ${
        hideSide ? "w-[95px]" : "w-[300px]"
      }`}
    >
      <ul className="p-0">
        {Data.pages.dashboard.sidebar.map(({ name, path, icon }) => (
          <SideLinks name={name} path={path} icon={icon} hideSide={hideSide} />
        ))}
      </ul>
      {!hideSide && (
        <div className="qr__code">
          <QRCode value={authenticatorUri} title="Scan QR Code to Enable MFA" />
        </div>
      )}
    </div>
  );
}
