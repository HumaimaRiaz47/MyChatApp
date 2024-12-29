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
import React from 'react'
import { sampleUsers } from '../../Constants/SampleData';
import UserItem from '../shared/UserItem';
const NewGroup = () => {

  const selectMemberHandler = () => {

  };
  return (
    <Dialog open>
    <Stack p={{xs: "1rem", sm: "2rem"}} width={"25rem"}>
      <DialogTitle>New Group</DialogTitle>

      <TextField />
      <Typography>
        Members
      </Typography>

        <Stack>
          {sampleUsers.map((i) => (
            <UserItem user={i} key={i._id} handler={selectMemberHandler}/>
          ))}
        </Stack>

     <Stack direction={"row"}>
      <button varient="text" color="error">
          Cancel
      </button>
      <button varient="contained">
        Create
      </button>
     </Stack>
    </Stack>
  </Dialog>
  );
};

export default NewGroup