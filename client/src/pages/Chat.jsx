import React, {Fragment, useRef} from 'react'
import AppLayout from '../components/Layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { grayColor } from '../Constants/colors';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import { blue } from "../Constants/colors";
import FileMenu from '../components/Dialogs/FileMenu';
import { sampleMessage } from '../Constants/SampleData';
import MessageComponent from '../components/Shared/MessageComponent';

const user = {
  _id: "sdfsdfsdf",
  name: "Humaima Riaz"
  
}


const Chat = () => {
  const containerRef = useRef(null);

const FileMenuRef = useRef(null)

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height="90%"
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form 
        style={{
          height: "10%",
      }}
      >

      <Stack 
  direction="row" 
  height="100%"
  padding="1rem"
  alignItems="center"
  spacing={2} // Add spacing between the children
>
<IconButton
  sx={{
    backgroundColor: "lightgray", // Set the background color
    transform: "rotate(30deg)", // Rotate the icon
    color: "white", // Set the color of the icon or text inside
    "&:hover": {
      backgroundColor: "primary.main", // Optional: change background color on hover
    },
  }}

>
  <AttachFileIcon />
</IconButton>

  {/* Input Box */}
  <InputBox 
    placeholder="Type Message Here..." 
    sx={{
      flexGrow: 1, // Ensures the input box takes up the remaining space
      borderRadius: "8px", // Optional: Rounded corners
      padding: "0.5rem",    // Optional: Padding for better aesthetics
    }}
  />

  {/* Send Button */}
  <IconButton 
    type="submit"
    sx={{
      transform: "rotate(-30deg)", // Use transform instead of rotate property
      backgroundColor: "blue",
      color: "white",
      padding: "0.5rem",
      "&:hover": {
        bgcolor: "primary.dark",
      },
    }}
  >
    <SendIcon />
  </IconButton>
</Stack>

      </form>

      <FileMenu />

    </Fragment>
  );
};

export default AppLayout() (Chat);