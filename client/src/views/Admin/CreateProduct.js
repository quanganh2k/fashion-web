import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Formik, Form, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import Sidebar from "../../components/Sidebar";
import { Box, CircularProgress, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import CommonStyles from "../../components/CommonStyles";
import CommonIcons from "../../components/CommonIcons";
import { useGetListCategories } from "../../hooks/category/useGetListCategories";
import { useGetListClassify } from "../../hooks/classification/useGetListClassify";
import { useGetListColors } from "../../hooks/color/useGetListColors";
import { useGetListSizes } from "../../hooks/size/useGetListSizes";
import FilePreview from "../../components/CommonStyles/FilePreview";
import { cloneDeep, cloneDeepWith, flattenDepth, isArray } from "lodash";
import { useAddProduct } from "../../hooks/product/useAddProduct";
import { showError, showSuccess } from "../../helpers/toast";
import { useUploadImage } from "../../hooks/uploadImage/useUploadImage";
import { useQueryClient } from "react-query";
import { queryKeys } from "../../constants/queryKeys";

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
    containerCreatePage: {
      padding: "44px 20px 20px",
    },
    titlePage: {
      marginBottom: "20px",
      fontWeight: "500",
      color: "#1fc7eb",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "500",
    },
    wrapperAction: {
      display: "flex",
      alignItems: "center",
    },
    actionAdd: {
      marginRight: "20px",
      cursor: "pointer",
      color: "#1fc7eb",
    },
    actionDelete: {
      cursor: "pointer",
      color: "#f24625",
    },
    uploadBtn: {
      marginBottom: "20px",
    },
    previewImg: {
      display: "flex",
      marginRight: "30px",
    },
    imgDisplay: {
      width: "100px",
      height: "100px",
    },
    removeImg: {
      width: "20px !important",
      height: "20px !important",
      marginLeft: "15px",
    },
    saveButton: {
      marginRight: "30px",
    },
  };
});

const CreateProduct = () => {
  //! State
  const classes = useStyles();
  const queryClient = useQueryClient();
  const filters = {
    page: 1,
    limit: 100,
  };

  const inititalValues = {
    name: "",
    price: "",
    category: "",
    classify: "",
    description: "",
    sizeColor: [{ color: "", size: "", quantity: "", inStock: "", images: [] }],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(30, "Product name can not exceed 30 characters")
      .required("Field is required"),
    price: Yup.number()
      .min(1, "Product price must be greater than 0")
      .required("Field is required")
      .typeError("Quantity must be a number"),
    category: Yup.string().required("Field is required"),
    classify: Yup.string().required("Field is required"),
    description: Yup.string().required("Field is required"),
    sizeColor: Yup.array()
      .of(
        Yup.object().shape({
          color: Yup.string().required("Field is required"),
          size: Yup.string().required("Field is required"),
          quantity: Yup.number()
            .min(1, "Quantity must be greater than 0")
            .max(5000, "Quantity must not exceed 5000 products")
            .required("Field is required")
            .typeError("Quantity must be a number"),
        })
      )
      .required("You need to fill in the size, color"),
  });

  const { data: resCategory, isLoading: isLoadingCategory } =
    useGetListCategories(filters);

  const { data: resClassify, isLoading: isLoadingClassify } =
    useGetListClassify(filters);

  const { data: resColor, isLoading: isLoadingColor } =
    useGetListColors(filters);

  const { data: resSize, isLoading: isLoadingSize } = useGetListSizes(filters);
  const { isLoading: isLoadingAdd, mutateAsync: addProduct } = useAddProduct();
  const { isLoading: isLoadingUpload, mutateAsync: uploadImage } =
    useUploadImage();

  const categoryOptions =
    resCategory?.data?.results?.data?.map((elm) => {
      return {
        label: elm.name,
        value: elm._id,
      };
    }) ?? [];

  const classifyOptions =
    resClassify?.data?.results?.data?.map((elm) => {
      return {
        label: elm.name,
        value: elm._id,
      };
    }) ?? [];

  const colorOptions =
    resColor?.data?.results?.data?.map((elm) => {
      return {
        label: elm.colorName,
        value: elm._id,
      };
    }) ?? [];

  const sizeOptions =
    resSize?.data?.results?.data?.map((elm) => {
      return {
        label: elm.productSize,
        value: elm._id,
      };
    }) ?? [];

  //! Function
  const onSubmit = async (values, actions) => {
    try {
      const arrImages = values.sizeColor.map((el) => el.images);
      const hasImgUpload = values?.sizeColor.some(
        (elm) => elm.images.length > 0
      );

      let nextData = cloneDeep(values);
      if (hasImgUpload) {
        const flatImages = flattenDepth(arrImages);
        var bodyFormData = new FormData();
        for (let i = 0; i < flatImages.length; i++) {
          const image = flatImages[i];
          bodyFormData.append("image", image);
        }

        const responseImg = await uploadImage(bodyFormData);
        const arrImgLinks = responseImg?.data?.images?.image;

        for (let i = 0; i < nextData.sizeColor.length; i++) {
          const eachSizeColor = nextData.sizeColor[i];

          for (let j = 0; j < eachSizeColor.images.length; j++) {
            let eachImg = eachSizeColor.images[j];
            if (
              eachImg?.name ===
              arrImgLinks.find((elm) => elm.name === eachImg?.name).name
            ) {
              eachSizeColor.images[j] = arrImgLinks.find(
                (elm) => elm.name === eachImg?.name
              )?.url?.url;
            }
          }
        }
      }

      const trimValues = cloneDeepWith(nextData, (p) =>
        typeof p === "string" ? p.trim() : undefined
      );
      if (Object.values(trimValues).some((el) => el === "")) {
        showError("Input contains special characters");
        return;
      }
      await addProduct(trimValues);
      await queryClient.refetchQueries([queryKeys.products]);
      actions.resetForm();
      showSuccess("Create product successfully");
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const onCancel = (resetForm) => {
    resetForm();
  };

  const handleDeleteImg = (indexOfImage, values, index, setFieldValue) => {
    const nextValues = cloneDeep(values);
    nextValues.sizeColor[index].images.splice(indexOfImage, 1);

    setFieldValue(
      `sizeColor[${index}].images`,
      nextValues.sizeColor[index].images
    );
  };

  const handleUpload = (files, index, imgArr, setFieldValue) => {
    const fileLength = files?.length || 0;

    if (fileLength) {
      let arrImages = [];
      for (let i = 0; i < fileLength; i++) {
        const file = files[i];

        if (file) {
          arrImages.push(file);
          const newArr = imgArr.concat(arrImages);
          setFieldValue(`sizeColor[${index}].images`, newArr);
        }
      }
    }
  };

  //! Render
  if (
    isLoadingCategory ||
    isLoadingClassify ||
    isLoadingColor ||
    isLoadingSize
  ) {
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
          <Box className={classes.containerCreatePage}>
            <Formik
              initialValues={inititalValues}
              validationSchema={validationSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue, resetForm, errors }) => {
                return (
                  <Form>
                    <CommonStyles.Typography
                      variant="h2"
                      className={classes.titlePage}
                    >
                      Create new product
                    </CommonStyles.Typography>
                    <Grid container spacing={3}>
                      <Grid container item xs={12} md={12} columnSpacing={4}>
                        <Grid item xs={4} md={4}>
                          <CommonStyles.Typography
                            variant="subtitle2"
                            className={classes.label}
                          >
                            Name
                          </CommonStyles.Typography>
                          <FastField
                            component={CommonStyles.TextField}
                            name="name"
                          />
                        </Grid>
                        <Grid item xs={4} md={4}>
                          <CommonStyles.Typography
                            variant="subtitle2"
                            className={classes.label}
                          >
                            Price
                          </CommonStyles.Typography>
                          <FastField
                            component={CommonStyles.TextField}
                            name="price"
                          />
                        </Grid>
                      </Grid>

                      <Grid container item xs={12} md={12} columnSpacing={4}>
                        <Grid item xs={4} md={4}>
                          <CommonStyles.Typography
                            variant="subtitle2"
                            className={classes.label}
                          >
                            Category
                          </CommonStyles.Typography>
                          <FastField
                            component={CommonStyles.AutocompleteV2}
                            name="category"
                            options={categoryOptions || []}
                          />
                        </Grid>
                        <Grid item xs={4} md={4}>
                          <CommonStyles.Typography
                            variant="subtitle2"
                            className={classes.label}
                          >
                            Classification
                          </CommonStyles.Typography>
                          <FastField
                            component={CommonStyles.AutocompleteV2}
                            name="classify"
                            options={classifyOptions || []}
                          />
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} md={12}>
                        <FieldArray
                          name="sizeColor"
                          render={(arrayHelpers) => (
                            <Box sx={{ width: "100%" }}>
                              {values.sizeColor &&
                                values.sizeColor.length > 0 &&
                                values.sizeColor.map((item, index) => {
                                  const images = values.sizeColor[index].images;

                                  return (
                                    <React.Fragment key={index}>
                                      <Grid
                                        container
                                        item
                                        xs={12}
                                        md={12}
                                        columnSpacing={3}
                                        sx={{ marginBottom: "20px" }}
                                      >
                                        <Grid item xs={2.5} md={2.5}>
                                          <CommonStyles.Typography
                                            variant="subtitle2"
                                            className={classes.label}
                                          >
                                            Color
                                          </CommonStyles.Typography>
                                          <FastField
                                            component={
                                              CommonStyles.AutocompleteV2
                                            }
                                            name={`sizeColor[${index}].color`}
                                            options={colorOptions || []}
                                          />
                                        </Grid>
                                        <Grid item xs={2.5} md={2.5}>
                                          <CommonStyles.Typography
                                            variant="subtitle2"
                                            className={classes.label}
                                          >
                                            Size
                                          </CommonStyles.Typography>
                                          <FastField
                                            component={
                                              CommonStyles.AutocompleteV2
                                            }
                                            name={`sizeColor[${index}].size`}
                                            options={sizeOptions || []}
                                          />
                                        </Grid>
                                        <Grid item xs={2.5} md={2.5}>
                                          <CommonStyles.Typography
                                            variant="subtitle2"
                                            className={classes.label}
                                          >
                                            Quantity
                                          </CommonStyles.Typography>
                                          <FastField
                                            component={CommonStyles.TextField}
                                            name={`sizeColor[${index}].quantity`}
                                          />
                                        </Grid>
                                        <Grid item xs={2.5} md={2.5}>
                                          <CommonStyles.Typography
                                            variant="subtitle2"
                                            className={classes.label}
                                          >
                                            In stock
                                          </CommonStyles.Typography>
                                          <FastField
                                            component={CommonStyles.TextField}
                                            name={`sizeColor[${index}].inStock`}
                                          />
                                        </Grid>

                                        <Grid
                                          container
                                          item
                                          xs={2}
                                          md={2}
                                          className={classes.wrapperAction}
                                        >
                                          <CommonIcons.AddIcon
                                            onClick={() => {
                                              arrayHelpers.push({
                                                color: "",
                                                size: "",
                                                quantity: "",
                                                inStock: "",
                                                images: [],
                                              });
                                            }}
                                            className={classes.actionAdd}
                                          />
                                          {values.sizeColor.length > 1 && (
                                            <CommonIcons.Delete
                                              onClick={() => {
                                                arrayHelpers.remove(index);
                                              }}
                                              className={classes.actionDelete}
                                            />
                                          )}
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        sx={{ marginBottom: "20px" }}
                                      >
                                        <CommonStyles.ButtonUpload
                                          text={"Upload file"}
                                          upload={(
                                            files,
                                            index,
                                            images,
                                            setFieldValue
                                          ) =>
                                            handleUpload(
                                              files,
                                              index,
                                              images,
                                              setFieldValue
                                            )
                                          }
                                          // keyFormData={"image"}
                                          accept="image/png,image/jpeg,image/svg,image/webp"
                                          multiple
                                          index={index}
                                          setFieldValue={setFieldValue}
                                          data={images}
                                          className={classes.uploadBtn}
                                        />
                                      </Grid>
                                      <Grid container item xs={12} md={12}>
                                        <FilePreview
                                          images={
                                            values.sizeColor[index]?.images
                                          }
                                          onDeleteEachImage={(indexOfImage) => {
                                            handleDeleteImg(
                                              indexOfImage,
                                              values,
                                              index,
                                              setFieldValue
                                            );
                                          }}
                                        />
                                      </Grid>
                                    </React.Fragment>
                                  );
                                })}
                            </Box>
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={6}
                        sx={{ paddingTop: "0 !important" }}
                      >
                        <CommonStyles.Typography
                          variant="subtitle2"
                          className={classes.label}
                        >
                          Description
                        </CommonStyles.Typography>
                        <FastField
                          component={CommonStyles.TextAreaField}
                          name="description"
                          minRows={10}
                        />
                      </Grid>
                      <Grid container item xs={12} md={12}>
                        <CommonStyles.Button
                          type="submit"
                          variant="contained"
                          loading={isLoadingUpload || isLoadingAdd}
                          className={classes.saveButton}
                        >
                          Save
                        </CommonStyles.Button>
                        <CommonStyles.Button
                          variant="outlined"
                          onClick={() => onCancel(resetForm)}
                          loading={isLoadingUpload || isLoadingAdd}
                        >
                          Cancel
                        </CommonStyles.Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateProduct;
