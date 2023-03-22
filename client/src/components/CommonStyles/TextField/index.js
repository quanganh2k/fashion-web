import * as React from 'react';
import {
  IconButton,
  InputAdornment,
  TextField as TextFieldMui,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {  getIn } from 'formik';
import {  makeStyles } from '@mui/styles';
import classNames from 'classnames';



const useStyles = makeStyles((theme) => {
  return {
    rootInput: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '10',

      '& > label': {
        marginBottom: 8,
        fontWeight: 600,
        // paddingLeft: '40px',
      },

      '& .label-input': {
        fontWeight: '600',
        fontSize: '16px',
        color: '#4d4d4d',
        paddingLeft: '40px',
      },
    },

    textField: {
      width: '100%',
      margin: '0 auto',

      '& div': {
        borderRadius: '30px !important',
        background: '#fff',
       

        '& fieldset': {},
        '& input': {
          padding: '18px 25px',
          borderRadius: '30px !important',
          
        },
        '& input:-internal-autofill-selected': {
          backgroundColor: "red !important",
          color: "red !important"
        }
      },
    },

    passwordInput: {
      width: '100%',
      margin: '0 auto',

      '& div': {
        borderRadius: '30px !important',
        background: '#E8F0FE',
       

        '& fieldset': {},
        '& input': {
          padding: '18px 25px',
          borderRadius: '30px !important',
        },
      },
    },

    textFieldMulti: {
      width: '100%',
      margin: '0 auto',

      '& div': {
        borderRadius: '30px !important',
        background: '#fff',
        paddingLeft: '40px',

        '& fieldset': {},
        '& input': {
          borderRadius: '30px !important',
        },
      },
    },

    inputStyle: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        display: 'none',
      },
    },
  };
});

const TextField = (props) => {
  // !State
  const classes = useStyles();
  const {
    label,
    labelMui,
    type = 'text',
    onKeyDown,
    fullWidth = false,
    field,
    form,
    className,
    size,
    onFocus,
    showHidePassword = false,
    width,
    afterOnChange,
    rows,
    ...rest
  } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const { onChange, onBlur, name, value } = field || {};
  const { errors, touched } = form || {};

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  // !Function
  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, [setShowPassword]);

  const handleMouseDownPassword = (
    event
  ) => {
    event.preventDefault();
  };

  const onCheckType = () => {
    if (showHidePassword) {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const handleChange = (e) => {
    onChange && onChange(e);
    if (afterOnChange) {
      afterOnChange(e);
    }
  };

  // !Render
  return (
    <div className={classes.rootInput}>
      {!!label && (
        <label className="label-input" htmlFor={name}>
          {label}
        </label>
      )}

      <TextFieldMui
        {...rest}
        maxRows={25}
        variant="outlined"
        name={name}
        label={labelMui}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        value={value}
        size={size}
        fullWidth={fullWidth}
        sx={{ width: `${width}` }}
        onBlur={onBlur}
        className={classNames(
          props.multiline ? classes.textFieldMulti : classes.textField,
          showHidePassword ? classes.passwordInput : classes.textField,
          className,
        )}
        onChange={handleChange}
        autoComplete="off"
        type={onCheckType()}
        InputProps={{
          classes: { input: classes.inputStyle },
          autoComplete: 'off',
          endAdornment: showHidePassword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={isTouched && Boolean(errorMessage)}
        helperText={isTouched && errorMessage}
      />
    </div>
  );
};

export default React.memo(TextField);
