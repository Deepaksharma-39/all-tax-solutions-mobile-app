import React from "react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Box,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = useLocation();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 3 }}>
        
        <Box
         component={ReactRouterLink}
         to="/admin/dashboard"
          sx={{
            textDecoration:"none",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            p: "12px",
          }}
        >
          <div>
            <Typography color="neutral.400" variant="subtitle1">
              All Tax 
            </Typography>
            <Typography color="neutral.400" variant="body2">
              Solutions
            </Typography>
          </div>
          <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
            <ChevronUpDownIcon />
          </SvgIcon>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {items.map((item) => {
            const active = item.path ? pathname === item.path : false;

            return (
              <SideNavItem
                active={active}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      ></Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
