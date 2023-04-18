
import {
  Autocomplete as AutoCompletedMui,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import {  getIn } from 'formik';
import { isArray, isEmpty, toString } from 'lodash';
import { memo, useCallback, useMemo } from 'react';
import ArrowDropDown from '../../../icons/ArrowDropDown';

const useStyles = makeStyles((theme) => {
  return {
    textField: {
      width: '100%',
      margin: '0 auto',

      '& .MuiInputBase-root': {
        '& .MuiInputBase-input': {
          marginLeft: '25px',
        },
        '& .MuiAutocomplete-endAdornment': {
          right: '25px',
        },
      },

      '& label': {
        color: '#B0ACAC',
      },
      '& div': {
        borderRadius: '26px !important',
        background: '#fff',
      },
    },
  };
});



const Autocomplete = (props) => {
  //! State
  const classes = useStyles();
  const {
    labelFieldName = 'label',
    valueFieldName = 'value',
    form,
    field,
    label,
    className,
    placeholder,
    multiple,
    onChangeReset,
    afterOnChange,
    disabled,
    ...rest
  } = props;
  const { errors, touched } = form;
  const { name, value } = field;

  const isTouched = getIn(touched, name);
  const errorMessage = getIn(errors, name);

  const selectedValue = useMemo(() => {
    if (multiple) {
      if (typeof value != 'object') return null;

      const selectedOptionValues = value?.map?.((el) => {
        if (typeof el != 'object') {
          const labelName = props?.options.find(
            (item) => toString(item?.[valueFieldName]) === toString(el),
          );

          return {
            [labelFieldName]: labelName?.[labelFieldName],
            [valueFieldName]: el,
          };
        }
        return {
          [labelFieldName]: el?.[labelFieldName],
          [valueFieldName]: el?.[valueFieldName],
        };
      });

      return selectedOptionValues ?? null;
    }

    return (
      props?.options?.find?.((item) => item?.[valueFieldName] == value) ??
      null
    );
  }, [value, props?.options]);

  //! Function
  const handleUpdateChange = useCallback(
    (_, selection, reason, detail) => {
      const selectOption = {
        single: !isEmpty(selection) ? selection?.[valueFieldName] : null,
        multiple:
          !isEmpty(selection) && isArray(selection)
            ? selection?.map(({ label, value }) => value)
            : [],
      };

      const changeEvent = {
        target: {
          name: field?.name,
          value: multiple ? selectOption.multiple : selectOption.single,
        },
      };

      field && field.onChange(changeEvent);
      afterOnChange && afterOnChange(selection, detail?.option?.value);
      onChangeReset && onChangeReset();
    },
    [selectedValue, value, afterOnChange, onChangeReset, props?.options],
  );

  if (multiple) {
    return (
      <AutoCompletedMui
        {...field}
        {...rest}
        multiple
        filterSelectedOptions
        value={selectedValue ?? []}
        disabled={disabled}
        onChange={handleUpdateChange}
        popupIcon={!disabled ? <ArrowDropDown /> : null}
        getOptionLabel={(option) => option?.[labelFieldName]}
        isOptionEqualToValue={(option, optionValue) =>
          option?.[valueFieldName] == optionValue?.[valueFieldName]
        }
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              className={classNames(classes.textField, className)}
              placeholder={placeholder}
              label={label}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'off',
              }}
              error={isTouched && Boolean(errorMessage)}
              helperText={isTouched && errorMessage}
            />
          );
        }}
      />
    );
  }

  //! Render
  return (
    <AutoCompletedMui
      {...field}
      {...rest}
      disabled={disabled}
      value={selectedValue}
      popupIcon={!disabled ? <ArrowDropDown /> : null}
      onChange={handleUpdateChange}
      getOptionLabel={(option) => option?.[labelFieldName] || ''}
      isOptionEqualToValue={(option) =>
        option?.[valueFieldName] === selectedValue?.[valueFieldName]
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            className={classNames(classes.textField, className)}
            placeholder={placeholder}
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off',
            }}
            error={isTouched && Boolean(errorMessage)}
            helperText={isTouched && errorMessage}
          />
        );
      }}
    />
  );
};

export default memo(Autocomplete);
