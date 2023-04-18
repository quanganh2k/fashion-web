import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import CommonStyles from "./CommonStyles";
import shoeImage from "../assets/icons8-shoe-96.png";
import categoryImage from "../assets/icon-category.png";
import colorImage from "../assets/icons8-color-swatch-48.png";
import sizeImage from "../assets/icon-size.png";
import orderImage from "../assets/icons8-purchase-order.png";
import genderImage from "../assets/icons8-gender-64.png";
import { NavLink } from "react-router-dom";
import { RouteBase } from "../constants/routeUrl";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    wrapperTitle: {
      padding: "40px 0",
      textAlign: "center",
      borderBottom: `1px solid ${theme.palette.white}`,
    },
    titleSidebar: {
      color: theme.palette.white,
      textTransform: "uppercase",
      fontWeight: "500",
    },
    wrapperList: {
      marginTop: "30px",
    },
    listItem: {
      padding: "10px",
      display: "flex",
      alignItems: "center",
    },
    wrapperItem: {
      display: "flex",
      alignItems: "center",
    },
    textListItem: {
      color: theme.palette.white,
      fontSize: "20px",
    },

    icon: {
      width: "48px !important",
      height: "48px !important",
      marginRight: "34px",
    },
    link: {
      display: "block",
      width: "100%",
      textDecoration: "none",
      padding: "4px 20px",
    },
    active: {
      display: "block",
      width: "100%",
      textDecoration: "none",
      padding: "4px 20px",
      backgroundColor: "#00adc1",
    },
    sideBar: {
      position: 'fixed', 
      zIndex: 1,
      top: 0 ,
      left: 0,
      overflowX: 'hidden',
      height: '100%',
      width: '280px',
      backgroundColor: "#23282b",
    
    }
  };
});

const Sidebar = () => {
  //! State
  const classes = useStyles();

  //! Render
  return (
    <Box className={classes.sideBar}>
      <Box className={classes.wrapperTitle}>
        <CommonStyles.Typography variant="h2" className={classes.titleSidebar}>
          Admin
        </CommonStyles.Typography>
      </Box>
      <Box className={classes.wrapperList}>
        <ul>
          <li className={classes.listItem}>
            <NavLink
              to={`${RouteBase.Product}`}
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              <Box className={classes.wrapperItem}>
                <img src={shoeImage} alt="Shoe icon" className={classes.icon} />
                <div className={classes.textListItem}>Shoe</div>
              </Box>
            </NavLink>
          </li>
          <li className={classes.listItem}>
            <NavLink
              to={RouteBase.Category}
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              <Box className={classes.wrapperItem}>
                <img
                  src={categoryImage}
                  alt="Category icon"
                  className={classes.icon}
                  style={{ color: "#fff !important" }}
                />
                <div className={classes.textListItem}>Category</div>
              </Box>
            </NavLink>
          </li>

          <li className={classes.listItem}>
            <NavLink
              to='/2'
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              <Box className={classes.wrapperItem}>
                <img src={sizeImage} alt="Size icon" className={classes.icon} />
                <div className={classes.textListItem}>Size</div>
              </Box>
            </NavLink>
          </li>

          <li className={classes.listItem}>
            <NavLink
              to='/3'
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              <Box className={classes.wrapperItem}>
                <img
                  src={colorImage}
                  alt="Color icon"
                  className={classes.icon}
                />
                <div className={classes.textListItem}>Color</div>
              </Box>
            </NavLink>
          </li>
          <li className={classes.listItem}>
            <NavLink
              to='/4'
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              <Box className={classes.wrapperItem}>
                <img
                  src={genderImage}
                  alt="Gender icon"
                  className={classes.icon}
                />
                <div className={classes.textListItem}>Classification</div>
              </Box>
            </NavLink>
          </li>
          <li className={classes.listItem}>
            <NavLink
              to='/5'
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              <Box className={classes.wrapperItem}>
                <img
                  src={orderImage}
                  alt="Order icon"
                  className={classes.icon}
                />
                <div className={classes.textListItem}>Order</div>
              </Box>
            </NavLink>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
