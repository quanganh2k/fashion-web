import { CheckBox } from "@mui/icons-material";
import {
  Table as TableMui,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { isEmpty } from "lodash";
import React from "react";
import CommonStyles from "..";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    tableContainer: {
      borderRadius: "15px",
      border: "1px solid #EBEBEB",
      "& 	.MuiTableCell-root": {
        fontSize: "16px",
      },
      "&::-webkit-scrollbar": {
        height: "6px",
      },
      // maxHeight: '55vh',
    },
    tableHead: {
      backgroundColor: "#fff",
      borderBottom: "1px solid #EBEBEB",
      "& 	.MuiTableCell-root": {
        color: theme.custom?.background.title,
        fontWeight: "600",
      },
    },
    tableBodyRow: {
      borderBottom: "1px solid #EBEBEB",
      "& .MuiTableCell-root": {
        borderBottom: "none",
      },
    },
    noData: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

const Table = (props) => {
  //! State
  const {
    header,
    body,
    hasCheckbox,
    handleCheckBox,
    checkedData,
    checkedRow,
    isLoading,
    className,
  } = props;
  const classes = useStyles();

  //! Function
  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <TableMui stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableRow>
              {hasCheckbox && (
                <TableCell
                  padding="checkbox"
                  sx={{ paddingLeft: "10px" }}
                ></TableCell>
              )}
              {header.map((header, index) => {
                return (
                  <TableCell
                    align="center"
                    key={`table-cell-header-${index}`}
                    className={className}
                  >
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {isEmpty(body) ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className={classes.noData}>No data</div>
                </TableCell>
              </TableRow>
            ) : (
              body?.map((row) => {
                const isDisabled = !isEmpty(
                  checkedData?.filter((el) => {
                    return el.id === row.id;
                  }) ?? null
                );

                const isCheck =
                  !isEmpty(
                    checkedRow?.find((el) => {
                      return el.id === row.id;
                    })
                  ) ?? null;

                return (
                  <TableRow
                    key={`row-${row.id}`}
                    className={classes.tableBodyRow}
                    hover
                  >
                    {hasCheckbox && (
                      <TableCell
                        padding="checkbox"
                        sx={{ paddingLeft: "10px" }}
                        onClick={() => {
                          handleCheckBox && !isDisabled && handleCheckBox(row);
                        }}
                      >
                        <CommonStyles.CheckBox
                          checked={isCheck}
                          disabled={isDisabled}
                        />
                      </TableCell>
                    )}
                    {Object.entries(row).map(([cellName, cellValue]) => {
                      if (cellName !== "questions") {
                        return (
                          <TableCell
                            align="center"
                            key={`cell-${cellName}`}
                            className={className}
                          >
                            {cellValue}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </TableMui>
      </TableContainer>
    </>
  );
};

export default Table;
