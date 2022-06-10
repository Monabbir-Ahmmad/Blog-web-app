import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../actions/userActions";
import { API_HOST } from "../../constants/apiLinks";
import ProfileImagePicker from "../imagePicker/ProfileImagePicker";

const genders = ["Male", "Female", "Other"];

function UpdateProfile({ openProfileEdit, handleProfileEditCancel }) {
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.userProfileUpdate);

  const [valueMissing, setValueMissing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (updateSuccess) {
      resetEdit();
    }
  }, [updateSuccess]);

  const onFileSelect = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user?.id) {
      setName(user?.name);
      setEmail(user?.email);
      setDateOfBirth(user?.dateOfBirth);
      setGender(user?.gender);
    }
  }, [user]);

  const resetEdit = () => {
    setValueMissing(false);
    setShowPassword(false);
    setName(user?.name);
    setEmail(user?.email);
    setDateOfBirth(user?.dateOfBirth);
    setGender(user?.gender);
    setProfilePic(null);
    setPassword("");

    handleProfileEditCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name,
      email,
      gender,
      dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
      password,
    };

    if (name && email && gender && dateOfBirth && password) {
      setValueMissing(false);

      const formData = new FormData();

      Object.keys(values).forEach((item) => {
        formData.append([item], values[item]);
      });

      if (profilePic) {
        formData.append("userProfileImage", profilePic);
      }

      dispatch(updateUserProfile(formData));
    } else {
      setValueMissing(true);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={openProfileEdit}
      onClose={resetEdit}
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <form id="profile-update-form" onSubmit={handleSubmit}>
          <Stack spacing={5}>
            {(loading || updateLoading) && <LinearProgress />}

            {(error || updateError) && (
              <Alert severity="error">{error || updateError}</Alert>
            )}

            {updateSuccess && (
              <Alert severity="success">Update Successful</Alert>
            )}

            <ProfileImagePicker
              onImageSelect={onFileSelect}
              image={profilePic}
              defaultImage={
                user?.profileImage && `${API_HOST}/${user?.profileImage}`
              }
            />

            <TextField
              fullWidth
              variant={"outlined"}
              label="Name"
              type={"text"}
              error={valueMissing && !name}
              helperText={valueMissing && !name ? "Please enter your name" : ""}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              variant={"outlined"}
              label="Email"
              type={"email"}
              error={valueMissing && !email}
              helperText={
                valueMissing && !email ? "Please enter your email" : ""
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              select
              variant={"outlined"}
              label="Gender"
              error={valueMissing && !gender}
              helperText={
                valueMissing && !gender ? "Please select your gender" : ""
              }
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {genders.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                disableFuture
                label="Date of Birth"
                value={dateOfBirth}
                onChange={(newValue) => setDateOfBirth(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant={"outlined"}
                    error={valueMissing && !dateOfBirth}
                    helperText={
                      valueMissing && !dateOfBirth
                        ? "Please enter your date of birth"
                        : ""
                    }
                  />
                )}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={showPassword ? "text" : "password"}
              error={valueMissing && !password}
              helperText={
                valueMissing && !password
                  ? "Please enter your password to confirm update"
                  : ""
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetEdit}>Cancel</Button>
        <Button type="submit" form="profile-update-form">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateProfile;
