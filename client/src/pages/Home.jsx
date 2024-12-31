import React from 'react' //starting at 5:25 vid: 1:03:00
import AppLayout from '../components/Layout/AppLayout';
import { Box, Typography } from '@mui/material';
import { grayColor } from '../Constants/colors';
const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"2rem"} variant= "h5" textAlign={"center"}
    >Select a Friend to Chat</Typography>
    </Box>
  )
}

export default AppLayout() (Home);