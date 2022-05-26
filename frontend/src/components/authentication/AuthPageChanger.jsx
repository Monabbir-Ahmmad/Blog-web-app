import styled from "@emotion/styled";
import { Box, Button, Fade, Stack, Typography, Zoom } from "@mui/material";
import AuthPageImage from "../../assets/loginPageImage.png";
import AppIcon from "../../icon/AppIcon";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 3rem;
  gap: 3rem;
  background-image: url(${AuthPageImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;
  transition: all 1s ease;
`;

function AuthPageChanger({ signupOpen, pageChangeHandler }) {
  return (
    <Container>
      <Zoom in={true} style={{ transitionDelay: "1s" }}>
        <Box
          width={150}
          height={150}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={"#fff"}
          borderRadius={100}
        >
          <AppIcon sx={{ fontSize: 100 }} />
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
              Sign up to get access to Writer
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
        onClick={pageChangeHandler}
      >
        {signupOpen ? "Sign in" : "Sign up"}
      </Button>
    </Container>
  );
}

export default AuthPageChanger;
