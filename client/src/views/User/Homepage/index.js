import React, {  useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import banner1 from "../../../assets/h6-banner1_360x.jpg";
import banner2 from "../../../assets/h6-banner2_360x.jpg";
import banner3 from "../../../assets/h6-banner3_360x.jpg";
import banner4 from "../../../assets/h6-banner4-1_360x.jpg";
import banner5 from "../../../assets/h6-banner5_360x.jpg";
import CommonStyles from "../../../components/CommonStyles";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { RouteBase } from "../../../constants/routeUrl";
import { useGet } from "../../../store/useCached";
import { queryKeys } from "../../../constants/queryKeys";
import ProductContent from "./Components/ProductContent";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    imgBanner: {
      height: "500px",
      width: "100%",
    },
    wrapperMainContent: {
      marginTop: "50px",
    },
    textTitle: {
      fontSize: "24px",
      fontWeight: "600",
      textTransform: "uppercase",
      textAlign: "center",
      marginBottom: "20px",
      color: theme.palette.label,
    },
    listTab: {
      display: "flex",
      justifyContent: "center",
      listStyle: "none",
      marginBottom: "30px",
    },
    tabItem: {
      color: "#CCCCCC",
      margin: "0 30px",
      textTransform: "uppercase",
      padding: "6px 0",
      cursor: "pointer",
      fontWeight: "550",
      "&:hover": {
        color: "#4c463e",
        borderBottom: "2px solid #4c463e",
      },
    },
    tabItemActive: {
      color: "#4c463e",
      padding: "6px 0",
      borderBottom: "2px solid #4c463e",
      fontWeight: "550",
      margin: "0 30px",
      textTransform: "uppercase",
      padding: "6px 0",
      cursor: "pointer",
    },
  };
});

const HomepageLayout = () => {
  //! State
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const dataClassify = useGet(queryKeys.classify) || [];
  const tabOnUrl = searchParams.get("tab");
  const navigate = useNavigate();
  const location = useLocation();

  //! Function
  const handleChangeTab = (item) => {
    setSearchParams(createSearchParams({ tab: item.name }));
  };

  useEffect(() => {
    if (location.pathname === "/" && location.search === "") {
      navigate(`${RouteBase.Homepage}?tab=All`, { replace: true });
    }
  }, []);

  //! Render
  return (
    <>
      <Header />
      <Box>
        <Box className={classes.wrapperBanner}>
          <Grid container>
            <Grid item xs={2.4} md={2.4}>
              <img src={banner1} alt="Banner" className={classes.imgBanner} />
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <img src={banner2} alt="Banner" className={classes.imgBanner} />
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <img src={banner3} alt="Banner" className={classes.imgBanner} />
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <img src={banner4} alt="Banner" className={classes.imgBanner} />
            </Grid>
            <Grid item xs={2.4} md={2.4}>
              <img src={banner5} alt="Banner" className={classes.imgBanner} />
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.wrapperMainContent}>
          <Box>
            <CommonStyles.Typography variant="h4" className={classes.textTitle}>
              Trendy item
            </CommonStyles.Typography>
            <ul className={classes.listTab}>
              {dataClassify.map((el) => {
                return (
                  <li
                    key={el._id}
                    className={
                      tabOnUrl === el.name
                        ? classes.tabItemActive
                        : classes.tabItem
                    }
                    onClick={() => handleChangeTab(el)}
                  >
                    {el.name}
                  </li>
                );
              })}
            </ul>
          </Box>
        </Box>
      </Box>

      {dataClassify.map((el) => {
        if (tabOnUrl === el.name) {
          return <ProductContent />;
        }

        return null;
      })}

      <Footer />
    </>
  );
};

export default HomepageLayout;
