import { Avatar, IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'
import {Add as AddIcon} from "@mui/icons-material"

const UserItem = (user, handler, handlerIsLoading) => {

    const {name, _id, avatar} = user;
  return (
    <ListItem>
        <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}
            >
            <Avatar />
{/*Typography isn't working as it should* vid 2:23 onwards*/}
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
            color: "black",
            bgcolor: "yellow"
          }}
        >
          {name}
        </Typography>

            <IconButton 
            size="small"
            sx={{bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                    bgcolor: "primary.dark"
                }
            }}
            onClick={() => handler(_id)} disabled={handlerIsLoading}>
                <AddIcon />
            </IconButton>


        </Stack>
    </ListItem>
  )
}

export default memo(UserItem);