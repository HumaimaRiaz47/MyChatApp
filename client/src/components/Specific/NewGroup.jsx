import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from 'react'
import { sampleUsers } from '../../Constants/SampleData';
import UserItem from '../shared/UserItem';
import {useInputValidation} from "6pp";

const NewGroup = () => {
  //console.log(sampleUsers);  // Checking whether data is available in sampleUsers and retrieving from there
  // video lefft at 2:52:48
  const groupName = useInputValidation("")

  const [members, setMembers] = useState (sampleUsers)
  const [selecetedmembers, setSelectedMembers] = useState ([])

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => 
      prev.includes(id)
      ? prev.filter((currElement)=>currElement !== id)
        : [...prev, id]
      );
  };

console.log(selecetedmembers); //Have to remove this later, it will show output in the console when add members is clicked
  const submitHandler = () => {};

  const closeHandler = () => {};
  
  return (
    <Dialog open onClose={closeHandler}>
    <Stack p={{xs: "1rem", sm: "2rem"}} width={"25rem"} spacing={"2rem"}>
      <DialogTitle textAlign={"center"} variant="h4">New Group</DialogTitle>

      <TextField 
      label="Group Name"
      value={groupName.value} 
      onChange={groupName.changeHandler} />

      <Typography varient= "body1" >Members</Typography>

        <Stack>
          {members.map((i) => (
            <UserItem 
            user={i} 
            key={i._id} 
            handler={selectMemberHandler}
            isAdded={selecetedmembers.includes(i._id)}
            />
          ))}
        </Stack>

     <Stack direction={"row"} justifyContent={"space-evenly"} >
      <Button variant="text" color="error" size="large">
          Cancel
      </Button>
      <Button variant="contained" color="primary" size="large" onClick={submitHandler}>
        Create
      </Button>
     </Stack>
    </Stack>
  </Dialog>
  );
};

export default NewGroup