import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Box, Grid } from "@mui/material";
import CommonStyles from "../../components/CommonStyles";
import { useAddCategory } from "../../hooks/category/useAddCategory";
import { cloneDeepWith } from "lodash";
import { showError, showSuccess } from "../../helpers/toast";
import { useGetCategoryDetails } from "../../hooks/category/useGetCategoryDetails";
import { useParams } from "react-router-dom";
import { useUpdateCategory } from "../../hooks/category/useUpdateCategory";
import { useGetSizeDetails } from "../../hooks/size/useGetSizeDetails";
import { useUpdateSize } from "../../hooks/size/useUpdateSize";
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
    containerEditPage: {
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
    saveButton: {
      marginRight: "30px",
    },
  };
});

const EditSize = () => {
  //! State
  const classes = useStyles();
  const params = useParams();
  const queryClient = useQueryClient();
  const {
    data: resSizeDetails,
    isLoading: isLoadingDetail,
    refetch: refetchDetail,
  } = useGetSizeDetails(params.id, { enabled: !!params.id });
  const { isLoading: isLoadingEdit, mutateAsync: editSize } = useUpdateSize();

  const dataDetails = !isLoadingDetail ? resSizeDetails?.data?.size : {};

  const initialValues = {
    productSize: dataDetails.productSize,
  };
  const validationSchema = Yup.object().shape({
    productSize: Yup.string()
      .max(30, "Product size can not exceed 30 characters")
      .required("Field is required"),
  });

  //! Function
  const onSubmit = async (values, actions) => {
    try {
      const trimValues = cloneDeepWith(values, (p) =>
        typeof p === "string" ? p.trim() : undefined
      );
      if (Object.values(trimValues).some((el) => el === "")) {
        showError("Input contains special characters");
        return;
      }
      await editSize({ id: params.id, data: trimValues });
      await refetchDetail();
      await queryClient.refetchQueries([queryKeys.sizes]);
      showSuccess("Edit size successfully");
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const onCancel = (resetForm) => {
    resetForm();
  };

  //!Render
  return (
    <>
      <Box className={classes.wrapper}>
        <Box className={classes.containSidebar}>
          <Sidebar />
        </Box>
        <Box>
          <Navbar />
          <Box className={classes.containerEditPage}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnChange
              validateOnBlur
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ values, setFieldValue, resetForm, errors }) => {
                return (
                  <Form>
                    <CommonStyles.Typography
                      variant="h2"
                      className={classes.titlePage}
                    >
                      Edit size
                    </CommonStyles.Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6}>
                        <CommonStyles.Typography
                          variant="subtitle2"
                          className={classes.label}
                        >
                          Product size
                        </CommonStyles.Typography>
                        <Field
                          component={CommonStyles.TextField}
                          name="productSize"
                        />
                      </Grid>
                      <Grid container item xs={12} md={12}>
                        <CommonStyles.Button
                          type="submit"
                          variant="contained"
                          loading={isLoadingEdit}
                          className={classes.saveButton}
                        >
                          Save
                        </CommonStyles.Button>
                        <CommonStyles.Button
                          variant="outlined"
                          onClick={() => onCancel(resetForm)}
                          loading={isLoadingEdit}
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

export default EditSize;
