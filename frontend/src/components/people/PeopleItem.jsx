import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";

import { API_HOST } from "../../constants/apiLinks";
import { RiUser6Line as UserIcon } from "react-icons/ri";
import { stringToColour } from "../../utils/utilities";
import { useNavigate } from "react-router-dom";

function PeopleItem({ user }) {
  const navigate = useNavigate();

  const handleViewProfileClick = () => {
    navigate(`/profile/${user?.id}`);
  };

  return (
    <Paper variant="outlined">
      <Stack spacing={2} p={3} alignItems={"center"}>
        <Avatar
          alt={user?.name}
          src={
            user?.profileImage
              ? `${API_HOST}/${user?.profileImage}`
              : "broken.png"
          }
          sx={{
            height: 100,
            width: 100,
            fontSize: 60,
            bgcolor: stringToColour(user?.name),
          }}
        />
        <Typography variant="h6">{user?.name}</Typography>
        <Typography variant="body1" color={"text.secondary"}>
          {user?.email}
        </Typography>
        <Typography variant="h6">{user?.blogCount} Posts</Typography>
        <Button
          variant="outlined"
          startIcon={<UserIcon />}
          onClick={handleViewProfileClick}
        >
          View Profile
        </Button>
      </Stack>
    </Paper>
  );
}

export default PeopleItem;
