import { Box, Stack, Typography } from "@mui/material";

function ProfileItem({ icon, header, text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      {icon}
      <Stack spacing={1}>
        <Typography variant="body2" color={"text.secondary"}>
          {header}
        </Typography>
        <Typography variant="body1">{text}</Typography>
      </Stack>
    </Box>
  );
}

export default ProfileItem;
