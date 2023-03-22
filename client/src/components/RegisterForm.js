import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import CommonStyles from "./CommonStyles";
import { cloneDeepWith } from "lodash";
import { showError } from "../helpers/toast";
import { useAuth } from "../hooks/authentication/useAuthentication";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    wrapperForm: {
      margin: "100px 0 200px 0",
      paddingLeft: 0,
      width: "100%",
    },
    wrapper: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
      paddingLeft: "0px !important",
    },
    title: {
      fontSize: "66px",
      color: theme.palette.main,
      fontWeight: "900",
      marginBottom: "30px",
    },
    label: {
      fontSize: "14px",
      textTransform: "uppercase",
      color: theme.palette.label,
      fontWeight: "700",
      marginBottom: "10px",
    },
    btnRegister: {
      backgroundColor: theme.custom.background.button,
      minWidth: "40%",
      color: theme.palette.white,
      textTransform: "uppercase",
    },
    alignButton: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

const initValuesForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validateSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(20, "First name can not exceed 20 characters")
    .required("Field is required"),
  lastName: Yup.string()
    .max(20, "Last name can not exceed 20 characters")
    .required("Field is required"),
  email: Yup.string().email().required("Field is required"),
  password: Yup.string()
    .min(8, "Password is at least 8 characters long")
    .max(20, "Password can not exceed 20 characters")
    .required("Field is required"),
});

const RegisterForm = () => {
  //! State
  const classes = useStyles();
  const auth = useAuth();
  const { register } = auth;

  //! Function
  const onSubmit = async (values, actions) => {
    const trimValues = cloneDeepWith(values, (p) =>
      typeof p === "string" ? p.trim() : undefined
    );
    if (Object.values(trimValues).some((el) => el === "")) {
      showError("Invalid input data");
    } else {
      await register(trimValues);
      actions.resetForm();
    }
  };

  //! Render
  return (
    <Box>
      <Formik
        initialValues={initValuesForm}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, resetForm, error }) => {
          return (
            <Form>
              <Grid container spacing={2} className={classes.wrapperForm}>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  className={classes.wrapper}
                >
                  <CommonStyles.Typography
                    variant="h2"
                    className={classes.title}
                  >
                    Register
                  </CommonStyles.Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  className={classes.wrapper}
                >
                  <Grid item xs={12} md={5}>
                    <CommonStyles.Typography
                      variant="subtitle2"
                      className={classes.label}
                    >
                      First name
                    </CommonStyles.Typography>
                    <Field
                      component={CommonStyles.TextField}
                      name="firstName"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  className={classes.wrapper}
                >
                  <Grid item xs={12} md={5}>
                    <CommonStyles.Typography
                      variant="subtitle2"
                      className={classes.label}
                    >
                      Last name
                    </CommonStyles.Typography>
                    <Field component={CommonStyles.TextField} name="lastName" />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  className={classes.wrapper}
                >
                  <Grid item xs={12} md={5}>
                    <CommonStyles.Typography
                      variant="subtitle2"
                      className={classes.label}
                    >
                      Email
                    </CommonStyles.Typography>
                    <Field component={CommonStyles.TextField} name="email" />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  className={classes.wrapper}
                >
                  <Grid item xs={12} md={5}>
                    <CommonStyles.Typography
                      variant="subtitle2"
                      className={classes.label}
                    >
                      Password
                    </CommonStyles.Typography>
                    <Field
                      component={CommonStyles.TextField}
                      name="password"
                      type="password"
                      // showHidePassword
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  className={classes.wrapper}
                >
                  <Grid item xs={12} md={5} className={classes.alignButton}>
                    <CommonStyles.Button
                      variant="contained"
                      className={classes.btnRegister}
                      type="submit"
                    >
                      Register
                    </CommonStyles.Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
