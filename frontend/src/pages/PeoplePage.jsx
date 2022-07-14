import {
  Alert,
  Grid,
  IconButton,
  InputBase,
  LinearProgress,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import PeopleItem from "../components/people/PeopleItem";
import { BiSearch as SearchIcon } from "react-icons/bi";
import { getUserList } from "../actions/userActions";

function PeoplePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const sort = parseInt(searchParams.get("sort") || "0");
  const page = parseInt(searchParams.get("page") || "1");

  const [searchText, setSearchText] = useState("");

  const { loading, error, users, pageCount } = useSelector(
    (state) => state.userList
  );

  useEffect(() => {
    setSearchText(keyword);
    dispatch(getUserList(page, sort, keyword));
  }, [dispatch, sort, page, keyword]);

  const handleSortByChange = (e) => {
    navigate(
      `/people?page=1&sort=${e.target.value}${
        keyword.trim() ? `&keyword=${encodeURIComponent(keyword.trim())}` : ""
      }`
    );
  };

  const handleSearch = () => {
    setSearchText(searchText.trim());
    navigate(
      `/people?page=1&sort=${sort}${
        searchText.trim()
          ? `&keyword=${encodeURIComponent(searchText.trim())}`
          : ""
      }`
    );
  };

  return (
    <Stack rowGap={3}>
      <Paper
        variant="outlined"
        sx={{
          p: "2px 2px",
          display: "flex",
          alignItems: "center",
          maxWidth: 500,
          width: 1,
          borderRadius: 100,
        }}
      >
        <InputBase
          placeholder="Search People"
          sx={{ pl: 2, flex: 1 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <IconButton color={"primary"} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
        <Typography variant="h5" flex={1}>
          Peoples
        </Typography>
        <TextField
          select
          size="small"
          variant={"outlined"}
          value={sort}
          label="Sort by"
          onChange={handleSortByChange}
        >
          <MenuItem value={0}>Name: Ascending</MenuItem>
          <MenuItem value={1}>Name: Descending</MenuItem>
        </TextField>
      </Stack>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && !users?.length && (
        <Alert severity="info">Nothing To Show</Alert>
      )}

      <Grid container spacing={3} columns={{ xs: 1, sm: 2, lg: 3, xl: 5 }}>
        {users.map((user) => (
          <Grid key={user?.id} item xs={1}>
            <PeopleItem user={user} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        variant="outlined"
        color="primary"
        sx={{ alignSelf: "center", my: 5 }}
        page={page}
        count={pageCount}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/people?page=${item.page}&sort=${sort}${
              keyword.trim()
                ? `&keyword=${encodeURIComponent(keyword.trim())}`
                : ""
            }`}
            {...item}
          />
        )}
      />
    </Stack>
  );
}

export default PeoplePage;
