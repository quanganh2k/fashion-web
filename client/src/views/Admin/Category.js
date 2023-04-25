import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, InputAdornment, Grid, CircularProgress } from "@mui/material";
import CommonStyles from "../../components/CommonStyles";
import CommonIcons from "../../components/CommonIcons";
import { useGetListCategories } from "../../hooks/category/useGetListCategories";
import Pagination from "@mui/material/Pagination";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import useToggleDialog from "../../hooks/useToggleDialog";
import { useDeleteCategory } from "../../hooks/category/useDeleteCategory";
import { useDeleteAllCategories } from "../../hooks/category/useDeleteAllCategories";
import { showError, showSuccess } from "../../helpers/toast";
import { isArray } from "lodash";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    wrapper: {
      display: "grid",
      gridTemplateColumns: "280px 1fr",
      height: "100vh",
    },
    containSidebar: {
      backgroundColor: "#23282b",
    },
    containSearch: {
      padding: "20px 20px",
      alignItems: "center",
    },
    gridInputSearch: {
      marginRight: "20px",
    },
    btn: {
      backgroundColor: theme.custom.background.button,
    },
    btnAdd: {
      marginRight: "10px",
      backgroundColor: theme.custom.background.button,
    },
    wrapperListCategory: {
      padding: "0 20px",
    },
    editIcon: {
      color: "#3086c8",
    },
    deleteIcon: {
      color: "#f24625",
    },
    wrapperBtn: {
      width: "38px",
      height: "34px",
      padding: "4px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#e1e1e1",
        borderRadius: "20px",
      },
    },
    contentModal: {
      width: "350px",
    },
  };
});

const Category = () => {
  //! State
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [idDelete, setIdDelete] = useState();
  const initialValues = {
    search: searchParams?.get("search") || "",
  };
  const header = ["ID", "Name", "Action"];
  const [initialFilters, setInitialFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [dataCategory, setDataCategory] = useState([]);

  const page = searchParams?.get("page") || 1;
  const [totalPage, setTotalPage] = useState();
  const search = searchParams?.get("search") || "";
  const {
    open: openDelete,
    toggle: toggleDelete,
    shouldRender: shouldRenderDelete,
  } = useToggleDialog();
  const {
    open: openDeleteAll,
    toggle: toggleDeleteAll,
    shouldRender: shouldRenderDeleteAll,
  } = useToggleDialog();

  const {
    data: resListCategory,
    isLoading: isLoadingList,
    refetch,
    isRefetching,
  } = useGetListCategories(initialFilters);

  const { isLoading: isLoadingDelete, mutateAsync: deleteCategory } =
    useDeleteCategory();
  const { isLoading: isLoadingDeleteAll, mutateAsync: deleteAllCategories } =
    useDeleteAllCategories();

  const pageCount = !isLoadingList && resListCategory?.data?.results?.pageCount;

  //! Function
  useEffect(() => {
    if (!isLoadingList && resListCategory?.data?.results?.data !== undefined) {
      setDataCategory(resListCategory?.data?.results?.data);
    }
  }, [resListCategory]);

  useEffect(() => {
    setInitialFilters({
      ...initialFilters,
      page: Number(page),
      search: search,
    });
    setTotalPage(pageCount);
  }, [page, pageCount, search]);

  const handleToggleModal = (id) => {
    toggleDelete();
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      if (
        initialFilters.page > 1 &&
        isArray(dataCategory) &&
        dataCategory.length === 1
      ) {
        await deleteCategory(idDelete);
        toggleDelete();
        navigate(`${RouteBase.Category}?page=${initialFilters.page - 1}`);
        showSuccess("Delete category successfully");
      } else {
        await deleteCategory(idDelete);
        await refetch();
        toggleDelete();
        showSuccess("Delete category successfully");
      }
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllCategories();
      await refetch();
      toggleDeleteAll();
      showSuccess("Delete all categories successfully");
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const handleChangePage = (event, page) => {
    setSearchParams(createSearchParams({ page, search }));
  };

  const renderTableBody = useCallback(
    () =>
      dataCategory?.map((item, index) => {
        return {
          id:
            dataCategory.indexOf(item) +
            1 +
            (resListCategory?.data?.results?.page - 1) * 10,
          name: (
            <CommonStyles.Typography variant="h4">
              {item.name}
            </CommonStyles.Typography>
          ),
          action: (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box className={classes.wrapperBtn} sx={{ marginRight: "8px" }}>
                <CommonIcons.Edit
                  className={classes.editIcon}
                  onClick={() =>
                    navigate(`${RouteBase.Category}/edit/${item?._id}`)
                  }
                />
              </Box>
              <Box className={classes.wrapperBtn}>
                <CommonIcons.Delete
                  className={classes.deleteIcon}
                  onClick={() => handleToggleModal(item._id)}
                />
              </Box>
            </Box>
          ),
        };
      }),
    [dataCategory]
  );

  const onSubmit = (values, actions) => {
    setSearchParams(
      createSearchParams({ search: values.search.trim(), page: 1 })
    );
  };

  //! Render
  if (isLoadingList || isRefetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box className={classes.wrapper}>
        <Box className={classes.containSidebar}>
          <Sidebar />
        </Box>
        <Box>
          <Navbar />
          <Box>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {(props) => {
                return (
                  <Form>
                    <Grid container className={classes.containSearch}>
                      <Grid
                        container
                        item
                        xs={6}
                        md={6}
                        sx={{ alignItems: "center" }}
                      >
                        <Grid
                          item
                          xs={8}
                          md={8}
                          className={classes.gridInputSearch}
                        >
                          <Field
                            component={CommonStyles.TextField}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CommonIcons.Search />
                                </InputAdornment>
                              ),
                            }}
                            placeholder="Enter keywords"
                            name="search"
                            className={classes.inputSearch}
                          />
                        </Grid>
                        <Grid item xs={3} md={3}>
                          <CommonStyles.Button
                            variant="contained"
                            className={classes.btn}
                            type="submit"
                          >
                            Search
                          </CommonStyles.Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={6} md={6} sx={{ textAlign: "end" }}>
                        <CommonStyles.Button
                          variant="contained"
                          className={classes.btnAdd}
                          onClick={() => navigate(RouteBase.CreateCategory)}
                        >
                          Add category
                        </CommonStyles.Button>
                        <CommonStyles.Button
                          variant="contained"
                          className={classes.btn}
                          onClick={toggleDeleteAll}
                        >
                          Delete all
                        </CommonStyles.Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
            <Box className={classes.wrapperListCategory}>
              <CommonStyles.Table header={header} body={renderTableBody()} />
              {dataCategory.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "30px 0",
                  }}
                >
                  <Pagination
                    className={classes.pagination}
                    color="primary"
                    count={totalPage}
                    shape="rounded"
                    siblingCount={1}
                    boundaryCount={1}
                    onChange={handleChangePage}
                    page={initialFilters?.page}
                  />
                </Box>
              )}
              {shouldRenderDelete && (
                <CommonStyles.Modal
                  open={openDelete}
                  toggle={toggleDelete}
                  className={classes.contentModal}
                  header={"Delete category"}
                  content={"Do you want to delete this category ?"}
                  footer={
                    <>
                      <CommonStyles.Button
                        variant="contained"
                        loading={isLoadingDelete}
                        className={classes.btn}
                        onClick={handleDelete}
                      >
                        Yes
                      </CommonStyles.Button>
                      <CommonStyles.Button
                        loading={isLoadingDelete}
                        onClick={() => {
                          toggleDelete();
                        }}
                      >
                        No
                      </CommonStyles.Button>
                    </>
                  }
                />
              )}
              {shouldRenderDeleteAll && (
                <CommonStyles.Modal
                  open={openDeleteAll}
                  toggle={toggleDeleteAll}
                  className={classes.contentModal}
                  header={"Delete category"}
                  content={"Do you want to delete all categories ?"}
                  footer={
                    <>
                      <CommonStyles.Button
                        variant="contained"
                        loading={isLoadingDeleteAll}
                        className={classes.btn}
                        onClick={handleDeleteAll}
                      >
                        Yes
                      </CommonStyles.Button>
                      <CommonStyles.Button
                        loading={isLoadingDeleteAll}
                        onClick={() => {
                          toggleDeleteAll();
                        }}
                      >
                        No
                      </CommonStyles.Button>
                    </>
                  }
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Category;
