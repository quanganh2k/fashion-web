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
import { useGetClassifyDetails } from "../../hooks/classification/useGetClassifyDetails";
import { useUpdateClassify } from "../../hooks/classification/useUpdateClassify";
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

const EditClassify = () => {
  //! State
  const classes = useStyles();
  const params = useParams();
  const queryClient = useQueryClient();
  const {
    data: resClassifyDetails,
    isLoading: isLoadingDetail,
    refetch: refetchDetail,
  } = useGetClassifyDetails(params.id, { enabled: !!params.id });
  const { isLoading: isLoadingEdit, mutateAsync: editClassify } =
    useUpdateClassify();

  const dataDetails = !isLoadingDetail ? resClassifyDetails?.data.classify : {};

  const initialValues = {
    name: dataDetails.name,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(30, "Name can not exceed 30 characters")
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
      await editClassify({ id: params.id, data: trimValues });
      await refetchDetail();
      await queryClient.refetchQueries([queryKeys.classify]);
      showSuccess("Edit classify successfully");
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
                      Edit classify
                    </CommonStyles.Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6}>
                        <CommonStyles.Typography
                          variant="subtitle2"
                          className={classes.label}
                        >
                          Name
                        </CommonStyles.Typography>
                        <Field component={CommonStyles.TextField} name="name" />
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

export default EditClassify;
