"use client";

import { TableProps } from "../Table";

const MSWTableStyles: Partial<TableProps> = {
  variant: "clean",
  hover: false,
  tableStyles: {
    borderCollapse: "separate",
    borderSpacing: "0 12px",
  },
  tableHeaderCellStyles: {
    color: "#85a0ad",
    borderBottom: "none",
    padding: "12px 12px 0 18px",
  },
  tableCellStyles: {
    backgroundColor: "#fff",
    borderBottom: "none",
    position: "relative",

    "&:not(:first-child)": {
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: "20px",
        bottom: "20px",
        width: "1px",
        background: "#e6eef2",
        left: "-10px",
      },
    },
    "&:first-child": {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    "&:last-child": {
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
    },
  },
  tableRowStyles: {
    boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.03)",
    borderRadius: "10px",
  },
};

export default MSWTableStyles;
