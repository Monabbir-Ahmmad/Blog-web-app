import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { FiEye as Visibility, FiEyeOff as VisibilityOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { login } from "../../actions/authActions";
import styled from "@emotion/styled";

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

  const { loading, error } = useSelector((state) => state.userLogin);

  const [valueMissing, setValueMissing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (reset) {
      setValueMissing(false);
      setValues({
        email: "",
        password: "",
      });
    }
  }, [reset]);

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
        autoComplete="on"
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
