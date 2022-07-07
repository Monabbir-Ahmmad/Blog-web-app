import { Box, Button, Fade, Stack, Typography, Zoom } from "@mui/material";

import AppIcon from "../icon/AppIcon";
import AuthPageImage from "../../assets/loginPageImage.png";

function AuthPageChanger({ signupOpen, handlePageChange }) {
  return (
    <Stack
      sx={{
        width: 1,
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        gap: 4,
        backgroundImage: `url(${AuthPageImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "center",
        transition: "all 1s ease",
      }}
    >
      <Zoom in={true} style={{ transitionDelay: "1s" }}>
        <Box
          width={100}
          height={100}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={"#fff"}
          borderRadius={100}
        >
          <AppIcon sx={{ fontSize: 70 }} />
        </Box>
      </Zoom>

      {signupOpen && (
        <Fade in={signupOpen} {...(signupOpen ? { timeout: 2000 } : {})}>
          <Stack spacing={4}>
            <Typography variant="h2" color={"#fff"}>
              Already a user?
            </Typography>
            <Typography variant="h4" color={"#fff"}>
              Login to read or write many interesting blogs
            </Typography>
          </Stack>
        </Fade>
      )}

      {!signupOpen && (
        <Fade in={!signupOpen} {...(!signupOpen ? { timeout: 2000 } : {})}>
          <Stack spacing={4}>
            <Typography variant="h2" color={"#fff"}>
              New here?
            </Typography>
            <Typography variant="h4" color={"#fff"}>
              Sign up to get access to <strong>Writer</strong>
            </Typography>
          </Stack>
        </Fade>
      )}

      <Button
        variant="outlined"
        size="large"
        sx={{
          px: 10,
          color: "#fff",
          border: "3px solid white",
          borderRadius: 100,
          transition: "all 300ms ease",
          "&:hover": {
            border: "3px solid white",
            bgcolor: "white",
            color: "primary.main",
          },
        }}
        onClick={handlePageChange}
      >
        {signupOpen ? "Sign in" : "Sign up"}
      </Button>
    </Stack>
  );
}

export default AuthPageChanger;
