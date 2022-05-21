import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../actions/userActions";

const FormContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  gap: 2rem;
`;
function LoginForm() {
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
    console.log(userAuthInfo);
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
        Login to view many interesting blogs and maybe write some of your own
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

      <Button variant="contained" size="large" type="submit" sx={{ mt: 4 }}>
        Sign in
      </Button>
    </FormContainer>
  );
}

export default LoginForm;
