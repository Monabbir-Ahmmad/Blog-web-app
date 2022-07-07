import {
  Alert,
  Grid,
  IconButton,
  InputBase,
  LinearProgress,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BlogItem from "../components/blog/BlogItem";
import { BiSearch as SearchIcon } from "react-icons/bi";
import { getBlogList } from "../actions/blogActions";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const [searchText, setSearchText] = useState("");

  const { loading, error, blogs, pageCount } = useSelector(
    (state) => state.blogList
  );

  useEffect(() => {
    setSearchText(decodeURIComponent(keyword));
    dispatch(getBlogList(page, keyword));
  }, [dispatch, keyword, page]);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    setSearchText(searchText.trim());
    navigate(
      `/home?page=1${
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
          placeholder="Search Blogs"
          sx={{ pl: 2, flex: 1 }}
          value={searchText}
          onChange={handleSearchInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <IconButton color={"primary"} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Typography variant="h5">Blogs</Typography>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && !blogs?.length && (
        <Alert severity="info">Nothing To Show</Alert>
      )}

      <Grid container spacing={3} columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}>
        {blogs.map((blog) => (
          <Grid key={blog?.id} item xs={1}>
            <BlogItem blog={blog} />
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
            to={`/home?page=${item.page}${
              keyword ? `&keyword=${encodeURIComponent(keyword.trim())}` : ""
            }`}
            {...item}
          />
        )}
      />
    </Stack>
  );
}

export default HomePage;
