import React, { useEffect, useState } from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const Header = ({ openSidebar, setopenSidebar }) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setopenSidebar(!openSidebar); // Toggle sidebar
  };


  

  

  return (
    <div className="header">
      <div className="leftItems">
        {/* Menu Icon */}
        <div className="menuIcon">
          <Tooltip title="Toggle Sidebar">
            <MenuIcon fontSize="medium" />
          </Tooltip>
        </div>
        <div className="leftItem-2">
          <h3>Dashboard</h3>
        </div>
      </div>

      <div className="rightItems">
        {/* Search Bar */}
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
           
            placeholder="Search for vendors"
            type="search"
          />
        </div>

        {/* Notification and User Info */}
        <div className="rightItem-2">
          <div className="notification">
            <Tooltip title="Notifications">
              <NotificationsIcon
                fontSize="small"
                className="notificationIcon"
              />
            </Tooltip>
          </div>
          <div className="userImage">
           
              <Avatar className="avtarPic" />
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
