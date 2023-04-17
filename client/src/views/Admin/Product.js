import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Box, InputAdornment, Grid, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CommonIcons from "../../components/CommonIcons";
import CommonStyles from "../../components/CommonStyles";
import { useGetListProducts } from "../../hooks/product/useGetListProducts";
import ProductModel from "../../Models/Product.model";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { useDeleteProduct } from "../../hooks/product/useDeleteProduct";
import { showError, showSuccess } from "../../helpers/toast";
import { useDeleteAllProducts } from "../../hooks/product/useDeleteAllProducts";
import useToggleDialog from "../../hooks/useToggleDialog";
import Pagination from "@mui/material/Pagination";

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

    inputSearch: {},
    autocomplete: {},
    wrapperInputSearch: {
      alignItems: "center",
    },
    containSearch: {
      padding: "20px 20px",
      alignItems: "center",
    },
    wrapperSortby: {
      alignItems: "center",
    },
    labelSortBy: {
      textAlign: "center",
    },
    gridInput: {
      marginRight: "20px",
    },
    gridBtnAdd: {
      display: "flex",
      justifyContent: "flex-end",
    },
    btn: {
      backgroundColor: theme.custom.background.button,
    },
    btnAdd: {
      marginRight: "10px",
      backgroundColor: theme.custom.background.button,
    },
    wrapperListProducts: {
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
    titleColor: {
      textAlign: "left",
      fontWeight: 600,
      marginBottom: "6px",
    },
    contentModal: {
      width: "350px",
    },
    pagination: {
      // margin: '20px 0'
    },
    centerImg: {
      margin: "0 auto",
    },
  };
});

const Product = () => {
  //! State
  const classes = useStyles();
  const navigate = useNavigate();
  const initialValues = {
    searchText: "",
    sortBy: "",
  };

  const [initialFilters, setInitialFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const [totalPage, setTotalPage] = useState();
  const search = searchParams?.get("search") || "";
  const [idDelete, setIdDelete] = useState();

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

  const header = ["ID", "Name", "Image", "Price", "Size", "Category", "Action"];

  const sortOptions = [
    { label: "Category", value: "category" },
    { label: "Size", value: "size" },
    { label: "Color", value: "color" },
    { label: "Classify", value: "classify" },
  ];

  const {
    data: resListProducts,
    isLoading: isLoadingList,
    refetch,
  } = useGetListProducts(initialFilters);
  const { isLoading: isLoadingDelete, mutateAsync: deleteProduct } =
    useDeleteProduct();
  const { isLoading: isLoadingDeleteAll, mutateAsync: deleteAllProducts } =
    useDeleteAllProducts();
  console.log("lis", resListProducts);
  const rowDatas =
    (!isLoadingList &&
      ProductModel.parseResponse(resListProducts?.data?.results?.data)) ||
    [];

  const pageCount = !isLoadingList && resListProducts?.data?.results?.pageCount;

  const transformData = (value) => {
    const newData = value.reduce((acc, cur) => {
      return {
        ...acc,
        [cur["color"]["colorName"]]: (
          acc[cur["color"]["colorName"]] || []
        ).concat(cur),
      };
    }, {});

    let results = [];
    for (let key in newData) {
      if (newData.hasOwnProperty(key)) {
        const newArr = newData[key].map((elm) => {
          return elm;
        });

        //     // const {size, inStock, quantity, ...rest} = newData[key]
        results.push({
          colorName: key,
          data: newArr,
        });
      }
    }
    return results;
  };

  //! Function
  useEffect(() => {
    console.log("in effect");
    setInitialFilters({
      ...initialFilters,
      page: Number(page),
      search: search,
    });
    setTotalPage(pageCount);
  }, [page, pageCount, search]);

  const onSubmit = (values, actions) => {
    console.log("values", values);
  };

  const handleChangePage = (event, page) => {
    console.log("oaaa", page);
    setSearchParams(createSearchParams({ page, search }));
  };

  console.log(
    "page",
    searchParams?.get("page"),
    page,
    initialFilters,
    totalPage,
    pageCount
  );
  console.log("render laiiii");

  const handleToggleModal = (id) => {
    toggleDelete();
    setIdDelete(id);
  };

  console.log("itemD", idDelete);

  const handleDelete = async () => {
    try {
      await deleteProduct(idDelete);
      await refetch();
      toggleDelete();
      showSuccess("Delete product successfully");
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  console.log("row",rowDatas)

  const handleDeleteAll = async () => {
    try {
      await deleteAllProducts();
      await refetch();
      toggleDeleteAll()
      showSuccess("Delete all products successfully");
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const renderTableBody = useCallback(
    () =>
      rowDatas?.map((item, index) => {
        const nextData = transformData(item?.sizeColor);
        return {
          id:
            rowDatas.indexOf(item) +
            1 +
            (resListProducts?.data?.results?.page - 1) * 10,
          name: (
            <CommonStyles.Typography variant="h4">
              {item?.name}
            </CommonStyles.Typography>
          ),
          image: (
            <Grid container sx={{ width: "200px" }}>
              {item?.images?.map((el) => {
                const imgLength = item?.images.length;
                return (
                  <Grid
                    item
                    xs={6}
                    className={
                      imgLength > 1 ? classes.imgItems : classes.centerImg
                    }
                  >
                    <img style={{ width: "50px" }} src={el} />
                  </Grid>
                );
              })}
            </Grid>
          ),

          price: (
            <CommonStyles.Typography variant="h4">
              ${item?.price}
            </CommonStyles.Typography>
          ),
          size: (
            <Box sx={{ width: "280px" }}>
              {nextData?.map((el) => {
                return (
                  <Box sx={{ margin: "0 0 6px 10px" }}>
                    <Box className={classes.titleColor}>{el.colorName}:</Box>
                    <Box>
                      {el?.data?.map((elm) => {
                        return (
                          <Box sx={{ marginBottom: "4px", textAlign: "start" }}>
                            <span>Size {elm?.size?.productSize}</span>
                            <span> - Instock: {elm?.inStock}</span>
                            <span> - Quantity: {elm?.quantity}</span>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ),
          category: (
            <CommonStyles.Typography variant="h4">
              {item?.category[0]?.name}
            </CommonStyles.Typography>
          ),
          action: (
            <Box
              sx={{ display: "flex", width: "120px", justifyContent: "center" }}
            >
              <Box className={classes.wrapperBtn} sx={{ marginRight: "8px" }}>
                <CommonIcons.Edit
                  className={classes.editIcon}
                  onClick={() =>
                    navigate(`${RouteBase.Product}/edit/${item?._id}`)
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
    [resListProducts]
  );

  //! Render
  if (isLoadingList) {
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
                        xs={5.5}
                        className={classes.wrapperInputSearch}
                      >
                        <Grid item xs={9} className={classes.gridInput}>
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
                            name="searchText"
                            className={classes.inputSearch}
                          />
                        </Grid>
                        <Grid item xs={2} className={classes.gridBtnSearch}>
                          <CommonStyles.Button
                            variant="contained"
                            className={classes.btn}
                          >
                            Search
                          </CommonStyles.Button>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={4}
                        className={classes.wrapperSortby}
                      >
                        <Grid item xs={4} className={classes.labelSortBy}>
                          <CommonStyles.Typography variant="h4">
                            Sort by
                          </CommonStyles.Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Field
                            component={CommonStyles.AutocompleteV2}
                            name="sortBy"
                            options={sortOptions}
                            className={classes.autocomplete}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={2.5} className={classes.gridBtnAdd}>
                        <CommonStyles.Button
                          variant="contained"
                          className={classes.btnAdd}
                          onClick={() => navigate(RouteBase.CreateProduct)}
                        >
                          Add shoe
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
            <Box className={classes.wrapperListProducts}>
              <CommonStyles.Table
                header={header}
                body={renderTableBody()}
              ></CommonStyles.Table>
              {rowDatas.length > 0 && (
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
            </Box>
            {shouldRenderDelete && (
              <CommonStyles.Modal
                open={openDelete}
                toggle={toggleDelete}
                className={classes.contentModal}
                header={"Delete product"}
                content={"Do you want to delete this product ?"}
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
                header={"Delete product"}
                content={"Do you want to delete all products ?"}
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
    </>
  );
};

export default Product;
