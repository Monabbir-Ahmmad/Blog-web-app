import React from "react";
import { useSelector } from "react-redux";
import AlertSnackbar from "./AlertSnackbar";

function FloatingAlerts() {
  const profileUpdate = useSelector((state) => state.userProfileUpdate);

  const passwordUpdate = useSelector((state) => state.userPasswordUpdate);

  const postBlog = useSelector((state) => state.postBlog);

  const personalBlogDelete = useSelector((state) => state.personalBlogDelete);

  const personalBlogUpdate = useSelector((state) => state.personalBlogUpdate);

  return (
    <>
      <AlertSnackbar
        open={profileUpdate?.success}
        severity={"success"}
        message={"Profile updated successfully"}
      />
      <AlertSnackbar
        open={passwordUpdate?.success}
        severity={"success"}
        message={"Password updated successfully"}
      />
      <AlertSnackbar
        open={postBlog?.success}
        severity={"success"}
        message={"Blog published successfully"}
      />
      <AlertSnackbar
        open={personalBlogDelete?.success}
        severity={"success"}
        message={"Blog deleted successfully"}
      />
      <AlertSnackbar
        open={personalBlogDelete?.error}
        severity={"error"}
        message={personalBlogDelete?.error}
      />
      <AlertSnackbar
        open={personalBlogUpdate?.success}
        severity={"success"}
        message={"Blog updated successfully"}
      />
    </>
  );
}

export default FloatingAlerts;
