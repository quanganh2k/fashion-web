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
    saveButton: {
      marginRight: "30px",
    },
  };
});

const CreateCategory = () => {
  //! State
  const classes = useStyles();
  const initialValues = {
    name: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(30, "Category name can not exceed 30 characters")
      .required("Field is required"),
  });

  const { isLoading: isLoadingAdd, mutateAsync: addCategory } =
    useAddCategory();

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
      await addCategory(trimValues);
      actions.resetForm();
      showSuccess("Create category successfully");
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
          <Box className={classes.containerCreatePage}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnChange
              validateOnBlur
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue, resetForm, errors }) => {
                return (
                  <Form>
                    <CommonStyles.Typography
                      variant="h2"
                      className={classes.titlePage}
                    >
                      Create new category
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
                          loading={isLoadingAdd}
                          className={classes.saveButton}
                        >
                          Save
                        </CommonStyles.Button>
                        <CommonStyles.Button
                          variant="outlined"
                          onClick={() => onCancel(resetForm)}
                          loading={isLoadingAdd}
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

export default CreateCategory;
