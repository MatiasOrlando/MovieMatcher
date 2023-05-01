import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { context } from "../../Context/Context";

const SearchBar = () => {
  const { setSearchTerm, handleSubmit } = useContext(context);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { xs: 300, sm: 320, md: 440, lg: 640 },
      }}
      onSubmit={handleSubmit}
      name="search"
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search a movie..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onSubmit={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
