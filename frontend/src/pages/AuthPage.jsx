import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthPageChanger from "../components/authentication/AuthPageChanger";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";
import { Stack } from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ open }) => (open ? "100%" : 0)};
  height: 100vh;
  padding: ${({ open }) => (open ? "2rem" : 0)};
  transition: all 1s ease;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
    height: ${({ open }) => (open ? "100vh" : 0)};
  }
`;

function LoginRegPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");
  const redirect = searchParams.get("redirect");

  const { userAuthInfo } = useSelector((state) => state.userLogin);
  const [signupOpen, setSignupOpen] = useState(page === "sign-up");

  const signupSectionRef = useRef(null);
  const signinSectionRef = useRef(null);

  useEffect(() => {
    if (userAuthInfo?.id) {
      navigate(redirect ? `/${redirect}` : "/home", { replace: true });
    }
  }, [navigate, redirect, userAuthInfo]);

  useEffect(() => {
    setTimeout(() => {
      if (!signupOpen)
        signinSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      else {
        signupSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  }, [page, signupOpen]);

  const handlePageChange = () => {
    setSignupOpen(!signupOpen);
    navigate(
      `/?page=${signupOpen ? "sign-in" : "sign-up"}${
        redirect ? `&redirect=${redirect}` : ""
      }`
    );
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} minHeight={"100vh"}>
      <div ref={signupSectionRef} />

      <FormContainer open={signupOpen}>
        <RegisterForm reset={!signupOpen} />
      </FormContainer>

      <AuthPageChanger
        signupOpen={signupOpen}
        handlePageChange={handlePageChange}
      />

      <FormContainer open={!signupOpen}>
        <LoginForm reset={signupOpen} />
      </FormContainer>

      <div ref={signinSectionRef} />
    </Stack>
  );
}

export default LoginRegPage;
