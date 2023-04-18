import CommonIcons from "../../CommonIcons";
import React from "react";
import Button from "../Button/Button";
import { showSuccess, showError } from "../../../helpers/toast";

const ButtonUpload = (props) => {
  //! State
  const {
    accept = "",
    text,
    upload,
    isLoading,
    className,
    multiple = false,
    index,
    setFieldValue,
    data,
    keyFormData,
  } = props;

  const onSelectedFile =  (index,data,setFieldValue) => async (e) => {
    try {
      const target = e.target;
      const file = target.files;
      if(multiple) {
        if (file) {
          upload(file,index,data,setFieldValue);
          e.currentTarget.value = "";
        }
      }
      else {
        if (file) {
          upload(file);
          e.currentTarget.value = "";
        }
      }
     
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  // !Render
  return (
    <Button
      startIcon={<CommonIcons.FileUpload />}
      variant="contained"
      component="label"
      loading={isLoading}
      className={className}
    >
      {text}
      <input
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        onChange={onSelectedFile(index,data,setFieldValue)}
        data={data}
      />
    </Button>
  );
};

export default ButtonUpload;
