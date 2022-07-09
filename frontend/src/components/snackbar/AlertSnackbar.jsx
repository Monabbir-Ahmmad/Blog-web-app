import { Alert as MuiAlert, Snackbar } from "@mui/material";

import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertSnackbar({ open, autoHideDuration = 6000, severity, message }) {
  return (
    <Snackbar
      open={Boolean(open)}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertSnackbar;
