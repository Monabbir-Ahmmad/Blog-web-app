import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import { FiEye as Visibility, FiEyeOff as VisibilityOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { updateUserPassword } from "../../actions/userActions";

function UpdatePassword({ openPasswordEdit, handlePasswordEditCancel }) {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.userPasswordUpdate
  );

  const [valueMissing, setValueMissing] = useState(false);

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (success) {
      resetEdit();
    }
  }, [success]);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = (prop) => (e) => {
    setShowPassword({ ...showPassword, [prop]: !showPassword[prop] });
  };

  const resetEdit = () => {
    setValueMissing(false);

    setShowPassword({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });

    setValues({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    handlePasswordEditCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.keys(values).every((key) => values[key]) &&
      values.newPassword === values.confirmNewPassword
    ) {
      setValueMissing(false);
      dispatch(updateUserPassword(values.oldPassword, values.newPassword));
    } else {
      setValueMissing(true);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={openPasswordEdit}
      onClose={resetEdit}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <form id="password-update-form" onSubmit={handleSubmit}>
          <Stack spacing={4} pt={3}>
            {loading && <LinearProgress />}

            {error && <Alert severity="error">{error}</Alert>}

            {success && <Alert severity="success">Update successful</Alert>}

            <TextField
              variant="outlined"
              label="Current Password"
              autoComplete="on"
              type={showPassword.oldPassword ? "text" : "password"}
              error={valueMissing && !values.oldPassword}
              helperText={
                valueMissing && !values.oldPassword
                  ? "Please enter your current password"
                  : ""
              }
              value={values.oldPassword}
              onChange={handleChange("oldPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword("oldPassword")}
                    >
                      {showPassword.oldPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="New Password"
              autoComplete="on"
              type={showPassword.newPassword ? "text" : "password"}
              error={valueMissing && !values.newPassword}
              helperText={
                valueMissing && !values.newPassword
                  ? "Please enter your new password"
                  : ""
              }
              value={values.newPassword}
              onChange={handleChange("newPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword("newPassword")}
                    >
                      {showPassword.newPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="Confirm New Password"
              autoComplete="on"
              type={showPassword.confirmNewPassword ? "text" : "password"}
              error={
                valueMissing &&
                (!values.confirmNewPassword ||
                  values.newPassword !== values.confirmNewPassword)
              }
              helperText={
                valueMissing &&
                (!values.confirmNewPassword ||
                  values.newPassword !== values.confirmNewPassword)
                  ? "Please confirm your new password"
                  : ""
              }
              value={values.confirmNewPassword}
              onChange={handleChange("confirmNewPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword("confirmNewPassword")}
                    >
                      {showPassword.confirmNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetEdit}>Cancel</Button>
        <Button type="submit" form="password-update-form">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdatePassword;
