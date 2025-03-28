import React from "react";
import { Drawer, useMediaQuery } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";


import "./Sidebar.css";

const Sidebar = ({ openSidebar, setopenSidebar }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const listData = [
    { name: "Dashboard", path: "/", icon: <DashboardIcon sx={{color:"white"}}  /> },
    { name: "Hospital", path: "/hospital", icon: <PeopleIcon sx={{color:"white"}} /> },
   
  ];

 

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={openSidebar}
      onClose={() => setopenSidebar(false)}
      sx={{
        width: 234,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 234,
          boxSizing: "border-box",

          background:
            "linear-gradient(to right, #3DAFBC , #0297A7 )",        },
      }}
    >
      <div className="drawerContainer">
        {/* Logo Section */}
        <div className="logoSection">
          <h1>Scriza</h1>
          <hr />
        </div>

        {/* Menu Items */}
        <div className="itemSections">
          {listData.map((item, index) => (
            <NavLink
              style={{ color: "black", textDecoration: "none" }}
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? "listData active" : "listData"
              }
              onClick={() => isMobile && setopenSidebar(false)}
            >
              <div className="listItem">
                {item.icon}
                <p>{item.name}</p>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Logout Section */}
        <div  className="logoutSection">
          <LogoutIcon />
          <p>Logout</p>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
