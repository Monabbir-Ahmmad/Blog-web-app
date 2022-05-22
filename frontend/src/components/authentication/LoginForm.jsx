import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../actions/userActions";

const FormContainer = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  gap: 2rem;
`;

function LoginForm({ reset }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect");

  const [valueMissing, setValueMissing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { loading, error, userAuthInfo } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (reset) {
      setValueMissing(false);
      setValues({
        email: "",
        password: "",
      });
    }
  }, [reset]);

  useEffect(() => {
    if (userAuthInfo && Object.keys(userAuthInfo).length) {
      navigate(redirect ? `/${redirect}` : "/home");
    }
  }, [navigate, redirect, userAuthInfo]);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(values).every((key) => values[key])) {
      setValueMissing(false);
      dispatch(login(values.email, values.password));
    } else {
      setValueMissing(true);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography
        variant="h3"
        sx={{ textTransform: "uppercase" }}
        color="primary"
        textAlign={"center"}
      >
        Login
      </Typography>

      <Typography variant="h6" textAlign={"center"} color={"text.secondary"}>
        Login to view many interesting blogs and maybe write some of your own.
      </Typography>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        variant="outlined"
        label="Email"
        type={"email"}
        error={valueMissing && !values.email}
        helperText={
          valueMissing && !values.email ? "Please enter your email" : ""
        }
        value={values.email}
        onChange={handleChange("email")}
      />

      <TextField
        variant="outlined"
        label="Password"
        type={showPassword ? "text" : "password"}
        error={valueMissing && !values.password}
        helperText={
          valueMissing && !values.password ? "Please enter your password" : ""
        }
        value={values.password}
        onChange={handleChange("password")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="body2" textAlign={"center"} color={"text.secondary"}>
        By continuing, you agree to our User Agreement and Privacy Policy.
      </Typography>

      <Button variant="contained" size="large" type="submit" sx={{ mt: 3 }}>
        Sign in
      </Button>
    </FormContainer>
  );
}

export default LoginForm;
