import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../actions/userActions";
import ProfileDetails from "../components/profile/ProfileDetails";
import UpdatePassword from "../components/profile/UpdatePassword";
import UpdateProfile from "../components/profile/UpdateProfile";
import AlertSnackbar from "../components/snackbar/AlertSnackbar";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuthInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userDetails);
  const { success: profileUpdated } = useSelector(
    (state) => state.userProfileUpdate
  );
  const { success: passwordUpdated } = useSelector(
    (state) => state.userPasswordUpdate
  );

  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [openPasswordEdit, setOpenPasswordEdit] = useState(false);

  useEffect(() => {
    if (userAuthInfo?.token) {
      if (user?.id) {
      } else {
        dispatch(getUserDetails());
      }
    } else {
      navigate("/?page=sign-in&redirect=profile");
    }
  }, [dispatch, navigate, user, userAuthInfo]);

  const handleEditProfileClick = () => {
    setOpenProfileEdit(!openProfileEdit);
  };

  const handleEditPasswordClick = () => {
    setOpenPasswordEdit(!openPasswordEdit);
  };

  return (
    <>
      <Paper variant="outlined" sx={{ maxWidth: 400 }}>
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
    </>
  );
}

export default ProfilePage;
