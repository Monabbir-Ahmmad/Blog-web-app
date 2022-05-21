import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Grow, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/register/RegisterForm";
import LoginPageImage from "../assets/loginPageImage.png";

const GoToSignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 3rem;
  gap: 3rem;
  background-image: url(${LoginPageImage});
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  width: 100%;
  transition: all 1s ease;

  @media (max-width: 900px) {
    height: 100vh;
  }
`;

const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ signupOpen }) => (signupOpen ? 0 : "2rem")};
  transition: all 1s ease;
  overflow: hidden;

  @media (min-width: 901px) {
    width: ${({ signupOpen }) => (signupOpen ? 0 : "100%")};
  }
  @media (max-width: 900px) {
    height: ${({ signupOpen }) => (signupOpen ? 0 : "100vh")};
  }
`;

const RegFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ signupOpen }) => (signupOpen ? "2rem" : 0)};
  transition: all 1s ease;
  overflow: hidden;

  @media (min-width: 901px) {
    width: ${({ signupOpen }) => (signupOpen ? "100%" : 0)};
  }

  @media (max-width: 900px) {
    height: ${({ signupOpen }) => (signupOpen ? "100vh" : 0)};
  }
`;

function LoginRegPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");

  const [signupOpen, setSignupOpen] = useState(page === "sign-up");

  const loginSectionRef = useRef(null);
  const regSectionRef = useRef(null);

  const pageChangeHandler = (e) => {
    setSignupOpen(!signupOpen);
    navigate(`/?page=${signupOpen ? "sign-in" : "sign-up"}`);
  };

  useEffect(() => {
    setTimeout(() => {
      if (!signupOpen)
        loginSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      else {
        regSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  }, [page]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      minHeight={"100vh"}
      sx={{ transform: `translateX(${signupOpen ? "0" : "0"})` }}
    >
      <div ref={regSectionRef} />
      <RegFormContainer signupOpen={signupOpen}>
        <RegisterForm />
      </RegFormContainer>
      <GoToSignupContainer>
        {signupOpen && (
          <Grow in={signupOpen} {...(signupOpen ? { timeout: 1000 } : {})}>
            <Stack spacing={4}>
              <Typography variant="h2" color={"#fff"}>
                Already have an account?
              </Typography>
              <Typography variant="h4" color={"#fff"}>
                Login to read or write blogs
              </Typography>
            </Stack>
          </Grow>
        )}
        {!signupOpen && (
          <Grow in={!signupOpen} {...(!signupOpen ? { timeout: 1000 } : {})}>
            <Stack spacing={4}>
              <Typography variant="h2" color={"#fff"}>
                New here?
              </Typography>
              <Typography variant="h4" color={"#fff"}>
                Sign up to get access to blog world
              </Typography>
            </Stack>
          </Grow>
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
      </GoToSignupContainer>

      <LoginFormContainer signupOpen={signupOpen}>
        <LoginForm />
      </LoginFormContainer>
      <div ref={loginSectionRef} />
    </Stack>
  );
}

export default LoginRegPage;
