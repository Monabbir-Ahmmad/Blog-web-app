import AlertSnackbar from "./AlertSnackbar";
import { useSelector } from "react-redux";

function FloatingAlerts() {
  const profileUpdate = useSelector((state) => state.userProfileUpdate);

  const passwordUpdate = useSelector((state) => state.userPasswordUpdate);

  const postBlog = useSelector((state) => state.postBlog);

  const blogDelete = useSelector((state) => state.blogDelete);

  const blogUpdate = useSelector((state) => state.blogUpdate);

  const commentPost = useSelector((state) => state.commentPost);

  const commentUpdate = useSelector((state) => state.commentUpdate);

  const commentDelete = useSelector((state) => state.commentDelete);

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
        open={blogDelete?.success}
        severity={"success"}
        message={"Blog deleted successfully"}
      />
      <AlertSnackbar
        open={blogDelete?.error}
        severity={"error"}
        message={blogDelete?.error}
      />
      <AlertSnackbar
        open={blogUpdate?.success}
        severity={"success"}
        message={"Blog updated successfully"}
      />
      <AlertSnackbar
        open={commentPost?.error}
        severity={"error"}
        message={commentPost?.error}
      />
      <AlertSnackbar
        open={commentUpdate?.error}
        severity={"error"}
        message={commentUpdate?.error}
      />
      <AlertSnackbar
        open={commentDelete?.error}
        severity={"error"}
        message={commentDelete?.error}
      />
    </>
  );
}

export default FloatingAlerts;
