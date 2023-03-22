import React from "react";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    footerContainer: {
      backgroundColor: theme.custom.background.footerBackground,
      border: '1px solid #ececec',
      padding: "50px 150px",
    },
    footerItems: {
      fontSize: "14px",
      color: theme.palette.textFooter,
      letterSpacing: "1px",
    },
    timeOpen: {
      display: "flex",
      justifyContent: "space-between",
    },
    linkFooter: {
      textDecoration: "none",
      color: theme.palette.textFooter,
      "&:hover": {
        color: theme.custom.background.button,
      },
    },
    createdBy : {
      padding: '30px 0',
      color: "#8e8590",
      textAlign: 'center',
      fontSize: '14px'
    },
    author: {
      color: theme.custom.background.button,
    }
  };
});
const Footer = () => {
  //! State
  const classes = useStyles();

  //! Render
  return (
    <Box>
      <Box className={classes.footerContainer}>
        <Grid container columnSpacing={2}>
          <Grid container item xs={6} md={3} rowSpacing={2}>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              Trung Hoà, Cầu Giấy, Việt Nam
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              +0986861234
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              fashionshop@gmail.com
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              elessishop@gmail.com
            </Grid>
          </Grid>
          <Grid container item xs={6} md={3} rowSpacing={2}>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              <Link to="#" className={classes.linkFooter}>
                Contact us
              </Link>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              <Link to="#" className={classes.linkFooter}>
                Designers
              </Link>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              <Link to="#" className={classes.linkFooter}>
                Shipping & Delivery
              </Link>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              <Link to="#" className={classes.linkFooter}>
                Privacy Policy
              </Link>
            </Grid>
          </Grid>
          <Grid container item xs={6} md={3} rowSpacing={2}>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              <Link to="#" className={classes.linkFooter}>
                Store Location
              </Link>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              <Link to="#" className={classes.linkFooter}>
                My Account
              </Link>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              <Link to="#" className={classes.linkFooter}>
                Orders Tracking
              </Link>
            </Grid>
            <Grid item xs={12} md={12} className={classes.footerItems}>
              <Link to="#" className={classes.linkFooter}>
                FAQs
              </Link>
            </Grid>
          </Grid>
          <Grid container item xs={6} md={3} rowSpacing={2}>
            <Grid item xs={12} md={12} className={classes.timeOpen}>
              <div className={classes.footerItems}>Monday - Friday</div>
              <div className={classes.footerItems}>08:00 - 20:00</div>
            </Grid>
            <Grid item xs={12} md={12} className={classes.timeOpen}>
              <div className={classes.footerItems}>Saturday</div>
              <div className={classes.footerItems}>09:00 - 21:00</div>
            </Grid>
            <Grid item xs={12} md={12} className={classes.timeOpen}>
              <div className={classes.footerItems}>Sunday</div>
              <div className={classes.footerItems}>13:00 - 22:00</div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.createdBy}>
        &copy; 2023 Created by <span className={classes.author}>Lai Quang Anh</span>. Front - end Developer in VietNam
      </Box>
    </Box>
  );
};

export default Footer;
