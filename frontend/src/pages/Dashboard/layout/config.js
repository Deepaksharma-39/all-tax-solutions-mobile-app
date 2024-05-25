import UserIcon from "@heroicons/react/24/solid/UserIcon";

import { SvgIcon } from "@mui/material";
import { EmojiTransportationSharp } from "@mui/icons-material";
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
  }
];
