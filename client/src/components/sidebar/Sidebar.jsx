import "./sidebar.css";
import React from "react";
import {LineStyle,Timeline,TrendingUp,PermIdentity,Storefront,CollectionsBookmark,AssistantOutlined,DynamicFeed,ChatBubbleOutline,WorkOutline,MusicNote,Report,
} from "@material-ui/icons";
import { Drawer } from "@mui/material";
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from "react-router-dom";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'; 


export default function Sidebar() {
  
  return (
    <div className="sidebar">
      
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                contacts
              </li>
            </Link>
            <Link to="/plans" className="link">
              <li className="sidebarListItem">
                <DateRangeIcon className="sidebarIcon" />
                Day Plan
              </li>
            </Link>
            <Link to="/messages" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
/*
         
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
*/