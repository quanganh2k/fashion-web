import React, { useState, useEffect, Fragment } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import ProductModel from "../../../../Models/Product.model";
import EachProduct from "./EachProducts";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    listProducts: {
      padding: "0 100px 40px",
      marginBottom: "30px",
    },
    productItem: {},
    imgProduct: {
      width: "100%",
      objectFit: "cover",
      height: "470px",
    },
    linkItem: {
      textDecoration: "none",
      margin: "10px 0",
      display: "block",
    },
    productName: {
      color: `${theme.palette.text1}`,
      letterSpacing: "0.3px",
      "&:hover": {
        color: theme.custom.background.button,
      },
    },
    containPriceColor: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    price: {
      color: `${theme.palette.main}`,
      fontSize: "18px",
    },
    containColor: {
      display: "flex",
    },
    color: {
      color: `${theme.palette.main}`,
      fontSize: "18px",
    },
    itemColor: {
      marginLeft: "6px",
      padding: "4px 10px",
      border: "1px solid #000",
      "&:hover": {
        border: `1px solid ${theme.custom.background.button}`,
        "& h4": {
          color: `${theme.custom.background.button} !important`,
        },
      },
    },
  };
});

const Products = ({ data, isLoading, isLoadingMore }) => {
  //! State
  const classes = useStyles();
  console.log("__dataProducts", data);
  console.log("redoddd", isLoading, isLoadingMore);

  //! Function

  //! Render
  if (!isLoading && !isLoadingMore && data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "40px",
          color: "#1b1919",
          fontSize: "26px",
          fontWeight: 600,
        }}
      >
        No data
      </Box>
    );
  }

  return (
    <Box className={classes.listProducts}>
      {!isLoadingMore ? (
        !isLoading ? (
          <Grid container spacing={3} sx={{ position: "relative" }}>
            {(ProductModel.parseResponse(data) || [])?.map((elm) => {
              return (
                <Fragment key={elm?._id}>
                  <EachProduct item={elm} />
                </Fragment>
              );
            })}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )
      ) : (
        <>
          <Grid container spacing={3} sx={{ position: "relative" }}>
            {(ProductModel.parseResponse(data) || [])?.map((elm) => {
              return (
                <Fragment key={elm?._id}>
                  <EachProduct item={elm} />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-50px !important",
                      left: "48%",
                      fontSize: "26px",
                      fontWeight: 600,
                      color: "#1b1919",
                    }}
                  >
                    Loading...
                    {/* <Box sx={{width: '100px', height: '100px', color: 'red'}}></Box> */}
                    {/* <CircularProgress /> */}
                  </Box>
                </Fragment>
              );
            })}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default React.memo(Products);
