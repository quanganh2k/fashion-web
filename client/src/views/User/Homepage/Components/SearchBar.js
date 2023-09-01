import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import CommonStyles from "../../../../components/CommonStyles";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useGet } from "../../../../store/useCached";
import { createSearchParams, useSearchParams } from "react-router-dom";
import Dialog from "../../../../components/CommonStyles/Dialog";
import { cloneDeep, isArray, uniq } from "lodash";
import storageService from "../../../../services/storageService";

//1. Tao ra state recentSearch const [recentSearch, setRecentSearch] = useState(JSON.parse(localStorage.getItem('123')));
//2. xu ly tren recentSearch
//3. onClickSearch => - setRecentSearch / saveLocalStorage

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    btnSearch: {
      marginLeft: "20px",
      padding: "12px 40px !important",
    },
    inputSearch: {},
    iconClose: {
      fontSize: "30px",
      color: "#fff",
    },
    dropdown: {
      backgroundColor: theme.custom.background.white,
      borderRadius: "20px",
      width: "80%",
      marginTop: "2px",
      padding: "18px 0",
      display: "none",
    },
    dropdownRow: {
      padding: "8px 25px",
      cursor: "pointer",
      display: "flex",
      "&:hover": {
        backgroundColor: "#efefef",
      },
    },
    wrapperIconDelete: {
      display: "flex",
      alignItems: "center",
    },
    iconDelete: {
      color: "#ccc",
      fontSize: "20px",
    },
    searchRecent: {
      flex: "1",
    },
    textSearch: {
      color: "#1b1919",
    },
  };
});

const SuggestionContainer = ({
  valueSearch = "",
  resultRecent,
  onChooseRecentSearch,
  deleteRecentSearch,
}) => {
  //! State
  const classes = useStyles();

  if (!isArray(resultRecent)) {
    return null;
  }

  //! Function
  const resultRecentFilterBySearch = (resultRecent || [])
    .filter((el) => el.toLowerCase().includes(valueSearch.toLowerCase()))
    .slice(0, 5);

  if (resultRecentFilterBySearch.length === 0) {
    return null;
  }

  //! Render
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        width: "80%",
        marginTop: "2px",
        padding: "18px 0",
      }}
      className="dropdownList"
      id="dropdown"
    >
      {resultRecentFilterBySearch.map((elm) => {
        return (
          <Box key={elm} className={classes.dropdownRow}>
            <Box
              onClick={(e) => {
                e.stopPropagation();
                onChooseRecentSearch(elm);
              }}
              className={classes.searchRecent}
            >
              <CommonStyles.Typography
                variant="h4"
                className={classes.textSearch}
              >
                {elm}
              </CommonStyles.Typography>
            </Box>
            <Box
              className={classes.wrapperIconDelete}
              onClick={() => deleteRecentSearch(elm)}
            >
              <CloseIcon className={classes.iconDelete} />
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

//! Main Container
const SearchBar = ({ open, onClose, isFocus, setIsFocus }) => {
  //! State
  const classes = useStyles();
  const formikRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const setFiltersProducts = useGet("product-list-filters");
  const search = searchParams.get("search");

  const [resultRecent, setResultRecent] = useState(
    storageService.getRecentSearch()
  );

  useEffect(() => {
    if (search) {
      setResultRecent((prev) => {
        const nextResultRecent = cloneDeep(prev);
        const isSearchIncluded = nextResultRecent.some(
          (el) => el.toLowerCase() === search.toLowerCase()
        );

        if (!isSearchIncluded) {
          nextResultRecent.unshift(search);
          storageService.saveRecentSearch(nextResultRecent);
        }

        return nextResultRecent;
      });
    }
  }, [search]);

  //! Function
  const onSubmit = (values) => {
    if (values.search.trim()) {
      setResultRecent((prev) => {
        const nextResultRecent = cloneDeep(prev);
        nextResultRecent.unshift(values.search);
        storageService.saveRecentSearch(nextResultRecent);

        return uniq(nextResultRecent);
      });
    }

    setSearchParams(
      createSearchParams({ tab: "All", search: values.search.trim() })
    );
    setFiltersProducts((prev) => ({
      ...prev,
      search: values.search.trim(),
      page: 1,
    }));

    onClose();
  };

  const onChooseRecentSearch = (item) => {
    formikRef.current.setFieldValue("search", item);
    setIsFocus(false);
  };

  const deleteRecentSearch = (item) => {
    setResultRecent((prev) => {
      let nextResultRecent = cloneDeep(prev);
      nextResultRecent = nextResultRecent.filter((el) => el !== item);

      storageService.saveRecentSearch(nextResultRecent);

      return nextResultRecent;
    });
  };

  //! Render
  return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          search: "",
        }}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <div style={{ marginBottom: "20px", textAlign: "end" }}>
                <CloseIcon onClick={onClose} className={classes.iconClose} />
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ width: "80%" }}>
                  <Field
                    component={CommonStyles.TextField}
                    name="search"
                    placeholder="Enter keyword"
                    className={classes.inputSearch}
                    onFocus={() => {
                      setIsFocus(true);
                    }}
                    onBlur={() => {
                      // setIsFocus(false);
                    }}
                  />
                </div>

                <CommonStyles.Button
                  variant="contained"
                  className={classes.btnSearch}
                  type="submit"
                >
                  Search
                </CommonStyles.Button>
              </div>

              {isFocus && (
                <SuggestionContainer
                  valueSearch={values.search}
                  resultRecent={resultRecent}
                  onChooseRecentSearch={onChooseRecentSearch}
                  deleteRecentSearch={deleteRecentSearch}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default React.memo(SearchBar);
