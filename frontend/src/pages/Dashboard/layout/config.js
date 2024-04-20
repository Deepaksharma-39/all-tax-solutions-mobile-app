import UserIcon from "@heroicons/react/24/solid/UserIcon";

import { SvgIcon } from "@mui/material";
import { EmojiTransportationSharp } from "@mui/icons-material";
import {  FaUsers } from "react-icons/fa";


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
    title: "Customers",
    path: "/admin/customer",
    icon: (
      <SvgIcon fontSize="small">
       <FaUsers />
      </SvgIcon>
    ),
  }
];
