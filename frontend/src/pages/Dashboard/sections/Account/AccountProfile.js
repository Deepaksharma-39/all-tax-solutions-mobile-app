import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const userData = JSON.parse(localStorage.getItem("userData"));
export const AccountProfile = () => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={""}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        />
        <Typography gutterBottom variant="h5">
          {userData?.fullname}
        </Typography>

        <Typography color="text.secondary" variant="body2">
          {"India"}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);
