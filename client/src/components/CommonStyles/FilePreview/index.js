import React from "react";
import removeIcon from "../../../assets/remove-icon.png";
import { isArray } from "lodash";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    wrapperImg: {
      display: "flex",
      margin: "0 30px 20px 0",
    },
    iconDelete: {
      width: "20px",
      height: "20px",
      marginLeft: "15px",
    },
  };
});

const FilePreview = ({ images, linkImages, onDeleteEachImage }) => {
  //! State
  const classes = useStyles();

  //! Function

  //! Render
  if (isArray(images) && images.length > 0) {
    return images?.map((el, index) => {
      const isLinkUrl = typeof el === "string";
      return isLinkUrl ? (
        <div key={el} className={classes.wrapperImg}>
          <div>
            <img src={el} width="100px" height="100px" alt="Upload " />
          </div>
          <div>
            <img
              src={removeIcon}
              alt="Delete img"
              onClick={() => onDeleteEachImage && onDeleteEachImage(index)}
              className={classes.iconDelete}
            />
          </div>
        </div>
      ) : (
        <div key={el.name} className={classes.wrapperImg}>
          <div>
            <img
              src={URL.createObjectURL(el)}
              width="100px"
              height="100px"
              alt="Upload "
            />
          </div>
          <div>
            <img
              src={removeIcon}
              alt="Delete img"
              onClick={() => onDeleteEachImage && onDeleteEachImage(index)}
              className={classes.iconDelete}
            />
          </div>
        </div>
      );
    });
  }

  return <div />;
};

export default React.memo(FilePreview);
