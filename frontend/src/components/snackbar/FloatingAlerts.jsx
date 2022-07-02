import React from "react";
import { useSelector } from "react-redux";
import AlertSnackbar from "./AlertSnackbar";

function FloatingAlerts() {
  const { success: profileUpdated } = useSelector(
    (state) => state.userProfileUpdate
  );

  const { success: passwordUpdated } = useSelector(
    (state) => state.userPasswordUpdate
  );

  const { success: blogPostSuccess } = useSelector((state) => state.postBlog);

  const { error: blogDeleteError, success: blogDeleteSuccess } = useSelector(
    (state) => state.personalBlogDelete
  );

  const { success: blogUpdateSuccess } = useSelector(
    (state) => state.personalBlogUpdate
  );

  return (
    <>
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
      <AlertSnackbar
        open={blogPostSuccess}
        severity={"success"}
        message={"Blog published successfully"}
      />
      <AlertSnackbar
        open={blogDeleteSuccess}
        severity={"success"}
        message={"Blog deleted successfully"}
      />
      <AlertSnackbar
        open={blogDeleteError}
        severity={"error"}
        message={blogDeleteError}
      />
      <AlertSnackbar
        open={blogUpdateSuccess}
        severity={"success"}
        message={"Blog updated successfully"}
      />
    </>
  );
}

export default FloatingAlerts;
