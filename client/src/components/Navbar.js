import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/authServices";
import { isEmpty } from "lodash";
import { useAuth } from "../hooks/authentication/useAuthentication";
import { RouteBase } from "../constants/routeUrl";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    wrapper: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 20px",
      backgroundColor: theme.custom.background.button,
    },
    icon: {
      marginLeft: "10px",
      color: theme.custom.background.white,
    },

    containProfile: {
      position: "relative",
      "&:hover $itemNav": {
        display: "block",
      },
      "&::after": {
        position: "absolute",
        content: '""',
        width: "50px",
        height: "20px",
        top: "20px",
        right: "-8px",
        backgroundColor: "transparent",
      },
    },
    itemNav: {
      top: "39px",
      right: "0",
      display: "none",
      position: "absolute",
      backgroundColor: "#25cee7",
      padding: "8px 24px",
      color: theme.custom.background.white,
      zIndex: '99'
    },
    profileItems: {
      marginBottom: "6px",
      cursor: "pointer",
      textDecoration: "none",
      color: theme.custom.background.white,
      display: "block",
      padding: "4px 8px",
    },
    logoutItems: {
      cursor: "pointer",
      padding: "4px 8px",
      color: theme.custom.background.white,
      padding: "4px 8px",
    },
  };
});

const Navbar = () => {
  //! State
  const classes = useStyles();
  const auth = useAuth();
  const { isLogged, userInfo, logout } = auth;
  const navigate = useNavigate();

  //! Function
  const handleLogout = async () => {
    await logout();
    const response = authServices.getUserLocalStorage();
    if (isEmpty(response)) {
      navigate(RouteBase.Login);
    }
  };

  //! Render
  return (
    <Box className={classes.wrapper}>
      <NotificationsIcon className={classes.icon} />
      <Box className={classes.containProfile}>
        <PersonIcon className={classes.icon} />
        <Box className={classes.itemNav}>
          <Link className={classes.profileItems}>Profile</Link>
          <Box className={classes.logoutItems} onClick={handleLogout}>
            Logout
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
