import React from "react";
import CommonStyles from "./CommonStyles";
import { Box, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { makeStyles } from "@mui/styles";
import logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authentication/useAuthentication";
import authServices from "../services/authServices";
import { isEmpty } from "lodash";
import { RouteBase } from "../constants/routeUrl";

const useStyles = makeStyles((theme) => {
  return {
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      backgroundColor: theme.custom.background.button,
      padding: "12px 40px",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
    },
    headerWithIcons: {
      color: theme.custom.background.white,
      marginRight: "12px",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      fontSize: "18px",
      cursor: "pointer",
    },
    phoneNumber: {
      color: theme.custom.background.white,
      fontSize: "12px",
      lineHeight: "18px",
    },
    span: {
      marginLeft: "8px",
      borderBottom: `thin solid rgba(255,255,255, 0.4)`,
      fontSize: "12px",
      letterSpacing: "2px",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
    },
    text: {
      color: theme.custom.background.white,
      textTransform: "uppercase",
      fontSize: "12px",
      lineHeight: "18px",
    },
    wrapperNav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "96px",
      backgroundColor: theme.custom.background.white,
      padding: "0px 40px",
      position: "relative",
    },
    navBarList: {
      display: "flex",
      gap: "20px",
      listStyle: "none",
    },
    navBarItems: {
      "& a": {
        height: "50px",
        display: "block",
        lineHeight: "50px",
        textDecoration: "none",
        color: theme.palette.textNav,
        textTransform: "uppercase",
        fontWeight: 600,
        fontSize: "20px",
        "&:hover": {
          color: theme.custom.background.button,
        },
      },
    },
    wrapperImg: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    imgLogo: {
      padding: "10px 0",
      display: "block",
      height: "100%",
    },
    headerCart: {
      display: "flex",
      alignItems: "center",
    },
    headerCartIcon: {
      color: theme.palette.textNav,
      fontSize: "28px",
      marginLeft: "14px",
      cursor: "pointer",
    },
    showDropdown: {
      display: "none",
      width: "160px",
      position: "absolute",
      top: "65px",
      right: "-68px",
      padding: "10px 14px",
      backgroundColor: theme.custom.background.white,
      boxShadow: "1px 1px  2px rgba(129,129,129,.25)",
      border: "1px solid rgba(129,129,129,.25)",
    },
    wrapperLoginIcon: {
      position: "relative",
      "&:hover $showDropdown": {
        display: "block",
      },
      "&::after": {
        position: "absolute",
        content: '""',
        width: "70px",
        height: "42px",
        backgroundColor: "transparent",
        bottom: "-32px",
        left: "-4px",
      },
    },
    link: {
      textDecoration: "none",
    },
    itemLink: {
      color: theme.palette.textNav,
    },
    wrapperWishList: {
      position: "relative",
      "& .numberWishList": {
        position: "absolute",
        top: "-5px",
        right: "-9px",
        backgroundColor: theme.custom.background.button,
        borderRadius: "50%",
        padding: "0px 8px",
        fontSize: "12px",
        color: theme.custom.background.white,
      },
    },
    wrapperCartIcon: {
      position: "relative",
      "& .numberCartItem": {
        position: "absolute",
        top: "-5px",
        right: "-9px",
        backgroundColor: theme.custom.background.button,
        borderRadius: "50%",
        padding: "0px 8px",
        fontSize: "12px",
        color: theme.custom.background.white,
      },
    },
  };
});

const Header = () => {
  //! State
  const classes = useStyles();
  const auth = useAuth();
  const { isLogged, userInfo, logout } = auth;
  const navigate = useNavigate();
  const infoStorage = authServices.getUserLocalStorage()


  //!Function
  const handleLogout = async () => {
    await logout();
    const response = authServices.getUserLocalStorage();
    if (isEmpty(response)) {
      navigate(RouteBase.Login);
    }
  };

  //! Render
  return (
    <>
      <Box className={classes.headerContainer}>
        <Box className={classes.headerLeft}>
          <Box className={classes.headerWithIcons}>
            <FacebookIcon
              className={classes.icon}
              sx={{ marginRight: "8px" }}
            />
            <InstagramIcon className={classes.icon} />
          </Box>
          <Box className={classes.headerWithPhone}>
            <CommonStyles.Typography
              variant="h4"
              className={classes.phoneNumber}
            >
              Call: <span className={classes.span}>+0986861234</span>
            </CommonStyles.Typography>
          </Box>
        </Box>
        <Box className={classes.headerRight}>
          <CommonStyles.Typography
            variant="h4"
            className={classes.text}
            sx={{ marginRight: "10px" }}
          >
            English
          </CommonStyles.Typography>
          <CommonStyles.Typography variant="h4" className={classes.text}>
            USD
          </CommonStyles.Typography>
        </Box>
      </Box>
      <Box className={classes.wrapperNav}>
        <Box className={classes.navBar}>
          <ul className={classes.navBarList}>
            <li className={classes.navBarItems}>
              <NavLink to="#">Demo</NavLink>
            </li>
            <li className={classes.navBarItems}>
              <NavLink to="#">Demo</NavLink>
            </li>
            <li className={classes.navBarItems}>
              <NavLink to="#">Demo</NavLink>
            </li>
            <li className={classes.navBarItems}>
              <NavLink to="#">Demo</NavLink>
            </li>
          </ul>
        </Box>
        <Box className={classes.wrapperImg}>
          <Link to="#">
            <img className={classes.imgLogo} src={logo} alt="Logo shop" />
          </Link>
        </Box>
        <Box className={classes.headerCart}>
          <Box>
            <SearchIcon className={classes.headerCartIcon} />
          </Box>

          <Box className={classes.wrapperLoginIcon}>
            <PersonIcon className={classes.headerCartIcon} />
            <Box className={classes.showDropdown}>
              {isLogged ? (
                <>
                  <Box>
                    <Link to="#" className={classes.link}>
                      <CommonStyles.Typography
                        variant="h4"
                        className={classes.itemLink}
                        sx={{ paddingBottom: "6px" }}
                      >
                        {infoStorage?.user?.role === 1 ? (
                          <span>Hello, Admin</span>
                        ) : (
                          <span>{`Hello, ${infoStorage?.user?.lastName} ${infoStorage?.user?.firstName}`}</span>
                        )}
                      </CommonStyles.Typography>
                    </Link>
                  </Box>
                  <Box>
                    <CommonStyles.Typography
                      variant="h4"
                      className={classes.itemLink}
                      onClick={handleLogout}
                      sx={{ cursor: "pointer" }}
                    >
                      Logout
                    </CommonStyles.Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <Link to={`${RouteBase.Login}`} className={classes.link}>
                      <CommonStyles.Typography
                        variant="h4"
                        className={classes.itemLink}
                        sx={{ paddingBottom: "6px" }}
                      >
                        Login
                      </CommonStyles.Typography>
                    </Link>
                  </Box>
                  <Box>
                    <Link to={`${RouteBase.Register}`} className={classes.link}>
                      {" "}
                      <CommonStyles.Typography
                        variant="h4"
                        className={classes.itemLink}
                      >
                        Register
                      </CommonStyles.Typography>
                    </Link>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box className={classes.wrapperWishList}>
            <FavoriteBorderIcon className={classes.headerCartIcon} />
            <span className="numberWishList">0</span>
          </Box>
          <Box className={classes.wrapperCartIcon}>
            <ShoppingCartIcon className={classes.headerCartIcon} />
            <span className="numberCartItem">0</span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
