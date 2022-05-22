import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";
import AuthPageChanger from "../components/authentication/AuthPageChanger";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";

const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ signupOpen }) => (signupOpen ? 0 : "100%")};
  height: 100vh;
  padding: ${({ signupOpen }) => (signupOpen ? 0 : "2rem")};
  transition: all 1s ease;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
    height: ${({ signupOpen }) => (signupOpen ? 0 : "100vh")};
  }
`;

const RegFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ signupOpen }) => (signupOpen ? "100%" : 0)};
  height: 100vh;
  padding: ${({ signupOpen }) => (signupOpen ? "2rem" : 0)};
  transition: all 1s ease;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
    height: ${({ signupOpen }) => (signupOpen ? "auto" : 0)};
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
    <Stack direction={{ xs: "column", md: "row" }} minHeight={"100vh"}>
      <div ref={regSectionRef} />
      <RegFormContainer signupOpen={signupOpen}>
        <RegisterForm reset={!signupOpen} />
      </RegFormContainer>

      <AuthPageChanger
        signupOpen={signupOpen}
        pageChangeHandler={pageChangeHandler}
      />

      <LoginFormContainer signupOpen={signupOpen}>
        <LoginForm reset={signupOpen} />
      </LoginFormContainer>
      <div ref={loginSectionRef} />
    </Stack>
  );
}

export default LoginRegPage;
