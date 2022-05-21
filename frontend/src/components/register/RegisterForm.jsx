import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import ProfileImagePicker from "../imagePicker/ProfileImagePicker";

const genders = ["Male", "Female", "Other"];

const FormContainer = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  gap: 1rem;
`;

function RegisterForm({ reset }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [valueMissing, setValueMissing] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (reset) {
      setValueMissing(false);
      setName("");
      setEmail("");
      setProfilePic(null);
      setDateOfBirth("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [reset]);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleClickShowPassword = (prop) => (e) => {
    setShowPassword({ ...showPassword, [prop]: !showPassword[prop] });
  };

  const onFileSelect = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name,
      email,
      image: profilePic,
      gender,
      dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
      password,
    };

    if (
      name &&
      email &&
      gender &&
      dateOfBirth &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setValueMissing(false);

      const formData = new FormData();

      Object.keys(values).forEach((item) => {
        formData.append([item], values[item]);
      });

      dispatch(register("user", formData));
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
        Signup
      </Typography>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <ProfileImagePicker onImageSelect={onFileSelect} image={profilePic} />

      <TextField
        variant="outlined"
        label="Name"
        type={"text"}
        error={valueMissing && !name}
        helperText={valueMissing && !name ? "Name cannot be empty" : ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        variant="outlined"
        label="Email"
        type={"email"}
        error={valueMissing && !email}
        helperText={valueMissing && !email ? "Email cannot be empty" : ""}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        variant="outlined"
        label="Gender"
        select
        error={valueMissing && !gender}
        helperText={valueMissing && !gender ? "Gender cannot be empty" : ""}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        {genders.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          disableFuture
          label="Date of Birth"
          value={dateOfBirth}
          onChange={(newValue) => setDateOfBirth(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              error={valueMissing && !dateOfBirth}
              helperText={
                valueMissing && !dateOfBirth
                  ? "Date of birth cannot be empty"
                  : ""
              }
            />
          )}
        />
      </LocalizationProvider>

      <TextField
        variant="outlined"
        label="Password"
        type={showPassword.password ? "text" : "password"}
        error={valueMissing && !password}
        helperText={valueMissing && !password ? "Password cannot be empty" : ""}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword("password")}>
                {showPassword.password ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        variant="outlined"
        label="Confirm Password"
        type={showPassword.confirmPassword ? "text" : "password"}
        error={
          valueMissing && (!confirmPassword || password !== confirmPassword)
        }
        helperText={
          valueMissing && (!confirmPassword || password !== confirmPassword)
            ? "Please confirm your password"
            : ""
        }
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword("confirmPassword")}>
                {showPassword.confirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="body2" textAlign={"center"} color={"text.secondary"}>
        By continuing, you are setting up an account and agree to our User
        Agreement and Privacy Policy.
      </Typography>

      <Button variant="contained" size="large" type="submit" sx={{ mt: 2 }}>
        Create account
      </Button>

      {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
    </FormContainer>
  );
}

export default RegisterForm;
