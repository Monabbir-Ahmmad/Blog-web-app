import { Cake, CalendarMonth, Edit, Email, Key, Wc } from "@mui/icons-material";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { API_HOST } from "../../constants/apiLinks";
import { stringToColour } from "../../utils/utilities";
import ProfileItem from "./ProfileItem";

function ProfileDetails({ handleEditProfileClick, handleEditPasswordClick }) {
  const { user } = useSelector((state) => state.userDetails);

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

      <Typography variant="h4" color="primary" textAlign={"center"}>
        {user?.name}
      </Typography>

      <Divider />

      <ProfileItem
        icon={<Email color="primary" fontSize="large" />}
        header={"Email"}
        text={user?.email}
      />

      <Divider />

      <ProfileItem
        icon={<CalendarMonth color="primary" fontSize="large" />}
        header={"Age"}
        text={moment().diff(user?.dateOfBirth, "years", false) + " years"}
      />

      <Divider />

      <ProfileItem
        icon={<Wc color="primary" fontSize="large" />}
        header={"Gender"}
        text={user?.gender}
      />

      <Divider />

      <ProfileItem
        icon={<Cake color="primary" fontSize="large" />}
        header={"Date of Birth"}
        text={moment(user?.dateOfBirth).format("MMMM Do, YYYY")}
      />

      <Divider />

      <Button
        fullWidth
        variant="outlined"
        startIcon={<Edit />}
        onClick={handleEditProfileClick}
      >
        Edit Profile
      </Button>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<Key />}
        onClick={handleEditPasswordClick}
      >
        Change Password
      </Button>
    </Stack>
  );
}

export default ProfileDetails;
