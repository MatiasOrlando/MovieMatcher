import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import { context } from "../../Context/Context";

const AppPagination = () => {
  const { setPage, page, pagination } = useContext(context);

  const handleChange = (page) => {
    setPage(parseInt(page));
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      {pagination && (
        <Pagination
          onChange={(e) => {
            handleChange(e.target.textContent);
          }}
          page={page}
          count={5}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 4px",
              "&.Mui-selected": {
                backgroundColor: "white",
                color: "black",
              },
            },
            "& .MuiPaginationItem-previous": {
              marginRight: "4px",
            },
            "& .MuiPaginationItem-next": {
              marginLeft: "4px",
            },
          }}
        />
      )}
    </div>
  );
};

export default AppPagination;
