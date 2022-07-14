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
import {
  FiCalendar as CalenderIcon,
  FiEye as Visibility,
  FiEyeOff as VisibilityOff,
} from "react-icons/fi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

import { API_HOST } from "../../constants/apiLinks";
import DateAdapter from "@mui/lab/AdapterMoment";
import ProfileImagePicker from "../imagePicker/ProfileImagePicker";
import moment from "moment";
import { updateUserProfile } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { genders } from "../../utils/utilities";

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
      closeEdit();
    }
  }, [updateSuccess]);

  useEffect(() => {
    resetState();
  }, [user]);

  const onImageSelect = (imageFile) => {
    if (imageFile) {
      setProfilePic({
        file: imageFile,
        image: URL.createObjectURL(imageFile),
      });
    }
  };

  const onImageDelete = () => {
    setProfilePic(null);
  };

  const resetState = () => {
    setValueMissing(false);
    setShowPassword(false);
    setPassword("");
    if (user?.id) {
      setName(user?.name);
      setEmail(user?.email);
      setDateOfBirth(user?.dateOfBirth);
      setGender(user?.gender);
      setProfilePic({
        image: user?.profileImage && `${API_HOST}/${user?.profileImage}`,
      });
    }
  };

  const closeEdit = () => {
    resetState();
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

      if (profilePic?.file) {
        formData.append("userProfileImage", profilePic.file);
      } else if (!profilePic?.image) {
        formData.append("removeProfileImage", 1);
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
      onClose={closeEdit}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
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
              onImageSelect={onImageSelect}
              onImageDelete={onImageDelete}
              image={profilePic?.image}
              sx={{ alignSelf: "center" }}
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
                components={{ OpenPickerIcon: CalenderIcon }}
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
              autoComplete="on"
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
        <Button onClick={closeEdit}>Cancel</Button>
        <Button type="submit" form="profile-update-form">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateProfile;
