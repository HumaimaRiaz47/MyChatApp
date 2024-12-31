import React from 'react';
import Header from './Header';
import Title from '../Shared/Title';
import {Grid2} from "@mui/material"
import ChatList from '../Specific/ChatList';
import { sampleChats } from '../../Constants/SampleData';
import { useParams } from 'react-router-dom';
import Profile from '../Specific/Profile';

const AppLayout = () => (WrappedComponent) => {
  return (props) => {

  const params = useParams();
    const chatId = params.chatId;


const handleDeleteChat = (e, _id, groupChat) => {
  e.preventDefault();
  console.log("Delete Chat", _id, groupChat);
};


    return(
      <>
      <Title />
      <Header />

        <Grid2 container height={"calc(100vh - 4rem)" } >

          <Grid2 size={{sm:4, md:3}} sx={{display: {xs: "none", sm: "block"},}} height={"100%"}>
            <ChatList 
              chats={sampleChats} 
              chatId={chatId} 
              handleDeleteChat={handleDeleteChat}
              
          />
          </Grid2>
          <Grid2 size={{xs:12, sm:8, md: 5, lg:6}} height={"100%"} >
            <WrappedComponent{...props}/>
          </Grid2>
          <Grid2 size={{md: 4, lg:3}} sx={{display: {xs: "none", md: "block"}, 
          padding:"2rem",}} bgcolor="red" height={"100%"}>
            <Profile />
          </Grid2>

        </Grid2>

      </>
    );
  };
};

export default AppLayout;