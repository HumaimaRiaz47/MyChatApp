import React, { memo } from 'react'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleNotifications } from '../../Constants/SampleData';

const Notifications = () => {

const friendRequestHandler = ({_id, accept}) => {

}


  return (
    <Dialog open>
      <Stack p={{xs: "1rem", sm: "2rem"}} maxwidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {
          sampleNotifications.length > 0 ? (
            sampleNotifications.map((sender, _id) => (
              <NotificationItem sender={sender} 
              _id={_id} 
              handler={friendRequestHandler}
              key={_id}
              />
            ))
          ) : ( 
          <Typography textAlign={"center"}>0 Notifications</Typography>

          )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request.`}
          

          
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>


  );
});

export default Notifications;