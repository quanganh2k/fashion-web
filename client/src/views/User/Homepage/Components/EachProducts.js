import React, { useState, useEffect, Fragment } from "react";
import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import CommonStyles from "../../../../components/CommonStyles";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
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
      cursor: "pointer",
      "&:hover": {
        border: `1px solid ${theme.custom.background.button}`,
        "& h4": {
          color: `${theme.custom.background.button} !important`,
        },
      },
    },
    itemColorActive: {
      marginLeft: "6px",
      padding: "4px 10px",
      border: `1px solid ${theme.custom.background.button}`,

      cursor: "pointer",
      backgroundColor: theme.custom.background.button,
      "& h4": {
        color: theme.custom.background.white,
      },
      "&:hover": {
        border: `1px solid ${theme.custom.background.button}`,
        backgroundColor: theme.custom.background.white,
        "& h4": {
          color: `${theme.custom.background.button} !important`,
        },
      },
    },
  };
});

const EachProduct = ({ item }) => {
  //! State
  const classes = useStyles();
  const [product, setProduct] = useState(item);
  const [imgArr, setImgArr] = useState(item.sizeColor[0].images);
  const [imgSrc, setImgSrc] = useState(item.sizeColor[0].images[0]);
  const [colorSelected, setColorSelected] = useState(
    item.sizeColor[0].color._id
  );

  //! Function
  const handleChangeColor = (colorDetails) => {
    const itemsColor = item?.sizeColor?.filter(
      (el) => el?.color?._id === colorDetails?._id
    );
    const itemHasImage = itemsColor.find((el) => el.images.length > 0);
    const nextImgSrc = itemHasImage.images[0];
    setImgSrc(nextImgSrc);
    setImgArr(itemHasImage.images);
    setColorSelected(colorDetails?._id);
  };

  const onHover = (e, img) => {
    e.currentTarget.src = img;
  };
  const offHover = (e, img) => {
    e.currentTarget.src = img;
  };

  //! Render
  return (
    <Grid item xs={3} md={3}>
      <Box className={classes.productItem}>
        <Box>
          <Link to="#">
            <img
              src={imgSrc}
              alt={item?.name}
              id={item?.name}
              className={classes.imgProduct}
              onMouseOver={
                imgArr?.length > 1 ? (e) => onHover(e, imgArr[1]) : undefined
              }
              onMouseOut={
                imgArr?.length > 1 ? (e) => offHover(e, imgArr[0]) : undefined
              }
            />
          </Link>
        </Box>
        <Box>
          <Link to="#" className={classes.linkItem}>
            <CommonStyles.Typography
              variant="h4"
              className={classes.productName}
            >
              {item?.name}
            </CommonStyles.Typography>
          </Link>
        </Box>
        <Box className={classes.containPriceColor}>
          <Box>
            <CommonStyles.Typography variant="h4" className={classes.price}>
              ${item?.price}
            </CommonStyles.Typography>
          </Box>
          <Box className={classes.containColor}>
            {item?.colorDetails?.map((el) => {
              return (
                <Box
                  className={
                    el?._id === colorSelected
                      ? classes.itemColorActive
                      : classes.itemColor
                  }
                  onClick={() => handleChangeColor(el)}
                >
                  <CommonStyles.Typography
                    variant="h4"
                    className={classes.color}
                  >
                    {el?.colorName}
                  </CommonStyles.Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default EachProduct;
