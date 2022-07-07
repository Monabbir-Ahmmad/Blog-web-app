import {
  Avatar,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FiCalendar as CalendarIcon,
  FiEdit as EditIcon,
  FiMail as EmailIcon,
  FiKey as KeyIcon,
} from "react-icons/fi";

import { API_HOST } from "../../constants/apiLinks";
import { RiNewspaperLine as BlogCountIcon } from "react-icons/ri";
import { BiCake as CakeIcon } from "react-icons/bi";
import { BsGenderAmbiguous as GenderIcon } from "react-icons/bs";
import ProfileItem from "./ProfileItem";
import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";
import moment from "moment";
import { stringToColour } from "../../utils/utilities";
import { useSelector } from "react-redux";
import { useState } from "react";

function ProfileDetails() {
  const theme = useTheme();

  const { userAuthInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userDetails);

  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [openPasswordEdit, setOpenPasswordEdit] = useState(false);

  const handleEditProfileClick = () => {
    setOpenProfileEdit(!openProfileEdit);
  };

  const handleEditPasswordClick = () => {
    setOpenPasswordEdit(!openPasswordEdit);
  };

  return (
    <Stack spacing={2} p={3}>
      <Avatar
        alt={user?.name}
        src={
          user?.profileImage
            ? `${API_HOST}/${user?.profileImage}`
            : "broken.png"
        }
        sx={{
          width: 160,
          height: 160,
          fontSize: 100,
          bgcolor: stringToColour(user?.name ? user?.name : ""),
          alignSelf: "center",
        }}
      />

      <Typography variant="h4" color={"primary"} textAlign={"center"}>
        {user?.name}
      </Typography>

      <Divider />

      <ProfileItem
        icon={<EmailIcon color={theme.palette.primary.main} fontSize={24} />}
        header={"Email"}
        text={user?.email}
      />

      <Divider />

      <ProfileItem
        icon={<CalendarIcon color={theme.palette.primary.main} fontSize={24} />}
        header={"Age"}
        text={
          user?.dateOfBirth &&
          moment().diff(user?.dateOfBirth, "years", false) + " years"
        }
      />

      <Divider />

      <ProfileItem
        icon={<GenderIcon color={theme.palette.primary.main} fontSize={24} />}
        header={"Gender"}
        text={user?.gender}
      />

      <Divider />

      <ProfileItem
        icon={<CakeIcon color={theme.palette.primary.main} fontSize={24} />}
        header={"Date of Birth"}
        text={
          user?.dateOfBirth && moment(user?.dateOfBirth).format("MMMM Do, YYYY")
        }
      />

      <Divider />

      <ProfileItem
        icon={
          <BlogCountIcon color={theme.palette.primary.main} fontSize={24} />
        }
        header={"Total Posts"}
        text={user?.blogCount}
      />

      {userAuthInfo?.id === user?.id && (
        <>
          <Divider />

          <Button
            fullWidth
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditProfileClick}
          >
            Edit Profile
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<KeyIcon />}
            onClick={handleEditPasswordClick}
          >
            Change Password
          </Button>

          <UpdateProfile
            openProfileEdit={openProfileEdit}
            handleProfileEditCancel={handleEditProfileClick}
          />
          <UpdatePassword
            openPasswordEdit={openPasswordEdit}
            handlePasswordEditCancel={handleEditPasswordClick}
          />
        </>
      )}
    </Stack>
  );
}

export default ProfileDetails;
