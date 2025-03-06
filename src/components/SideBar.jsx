import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default function SideBar({ isOpen, data }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`p-2 sticky mt-4 top-0 left-0 z-10 flex flex-col gap-1 overflow-y-auto`}
      style={{ transition: "width 0.3s" }}
    >
      {data?.map((item, index) => (
        <div
          key={index}
          className={`flex items-center p-2 cursor-pointer gap-4 hover:bg-primary-foreground rounded-md ${
            location.pathname === item.directory ? "bg-primary-foreground" : ""
          }`}
          style={{ justifyContent: isOpen ? "" : "center" }}
          onClick={() => navigate(item.directory)}
        >
          {item.icon}
          {isOpen ? <span>{item.name}</span> : null}
        </div>
      ))}
    </div>
  );
}