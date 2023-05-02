import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { context } from "../../Context/Context";

const AppPagination = () => {
  const { setPage, page, pagination } = useContext(context);

  const handleChange = (event, page) => {
    setPage(+page);
    window.scrollTo(0, 0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      {pagination && (
        <Pagination
          onChange={handleChange}
          page={page}
          count={300}
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
    </Box>
  );
};

export default AppPagination;
