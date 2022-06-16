import { Alert, Grid, LinearProgress, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPersonalBlogs } from "../actions/blogActions";
import { getUserDetails } from "../actions/userActions";
import BlogItem from "../components/blog/BlogItem";
import ProfileDetails from "../components/profile/ProfileDetails";
import UpdatePassword from "../components/profile/UpdatePassword";
import UpdateProfile from "../components/profile/UpdateProfile";
import AlertSnackbar from "../components/snackbar/AlertSnackbar";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuthInfo } = useSelector((state) => state.userLogin);
  const { success: profileUpdated } = useSelector(
    (state) => state.userProfileUpdate
  );
  const { success: passwordUpdated } = useSelector(
    (state) => state.userPasswordUpdate
  );
  const { loading, error, blogs } = useSelector((state) => state.personalBlogs);

  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [openPasswordEdit, setOpenPasswordEdit] = useState(false);

  useEffect(() => {
    if (userAuthInfo?.token) {
      dispatch(getUserDetails());
    } else {
      navigate("/?page=sign-in&redirect=profile");
    }
  }, [dispatch, navigate, userAuthInfo]);

  useEffect(() => {
    dispatch(getPersonalBlogs());
  }, [dispatch]);

  const handleEditProfileClick = () => {
    setOpenProfileEdit(!openProfileEdit);
  };

  const handleEditPasswordClick = () => {
    setOpenPasswordEdit(!openPasswordEdit);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "start" }}
      spacing={3}
    >
      <Paper
        variant="outlined"
        sx={{
          maxWidth: { xs: "100%", md: 400 },
          width: "100%",
          height: "min-content",
        }}
      >
        <ProfileDetails
          handleEditProfileClick={handleEditProfileClick}
          handleEditPasswordClick={handleEditPasswordClick}
        />
        <UpdateProfile
          openProfileEdit={openProfileEdit}
          handleProfileEditCancel={handleEditProfileClick}
        />
        <UpdatePassword
          openPasswordEdit={openPasswordEdit}
          handlePasswordEditCancel={handleEditPasswordClick}
        />
        <AlertSnackbar
          open={profileUpdated}
          severity={"success"}
          message={"Profile updated successfully"}
        />
        <AlertSnackbar
          open={passwordUpdated}
          severity={"success"}
          message={"Password updated successfully"}
        />
      </Paper>

      <Stack width={"100%"}>
        {loading && <LinearProgress width={100} />}

        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3} columns={{ xs: 1, lg: 2 }}>
          {blogs.map((blog, index) => (
            <Grid key={index} item xs={1}>
              <BlogItem blog={blog} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default ProfilePage;
