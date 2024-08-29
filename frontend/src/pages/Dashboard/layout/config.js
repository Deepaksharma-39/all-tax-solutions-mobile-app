import UserIcon from "@heroicons/react/24/solid/UserIcon";

import { SvgIcon } from "@mui/material";
import { EmojiTransportationSharp,FeaturedPlayList,DriveEta,GroupWork } from "@mui/icons-material";
import {  FaUsers,FaImages } from "react-icons/fa";


export const items = [
  {
    title: "Account",
    path: "/admin/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Border Price",
    path: "/admin/border",
    icon: (
      <SvgIcon fontSize="small">
        <EmojiTransportationSharp />
      </SvgIcon>
    ),
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: (
      <SvgIcon fontSize="small">
       <FaUsers />
      </SvgIcon>
    ),
  },
  {
    title: "Banner",
    path: "/admin/banners",
    icon: (
      <SvgIcon fontSize="small">
       <FaImages />
      </SvgIcon>
    ),
  },
  {
    title: "Insurance",
    path: "/admin/insurance",
    icon: (
      <SvgIcon fontSize="small">
       <FeaturedPlayList />
      </SvgIcon>
    ),
  },
  {
    title: "Car Listing",
    path: "/admin/cars",
    icon: (
      <SvgIcon fontSize="small">
       <DriveEta />
      </SvgIcon>
    ),
  },
  {
    title: "Job Listing",
    path: "/admin/jobs",
    icon: (
      <SvgIcon fontSize="small">
       <GroupWork />
      </SvgIcon>
    ),
  },
];
