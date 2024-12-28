import React from 'react';
import Header from './Header';
import Title from '../Shared/Title';
import {Grid2} from "@mui/material"
import ChatList from '../Specific/ChatList';
import { sampleChats } from '../../Constants/SampleData';

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return(
      <>
      <Title />
      <Header />

        <Grid2 container height={"calc(100vh - 4rem)" } >

          <Grid2 size={{sm:4, md:3}} sx={{display: {xs: "none", sm: "block"},}} height={"100%"}>
            <ChatList chats={sampleChats} />
          </Grid2>
          <Grid2 size={{xs:12, sm:8, md: 5, lg:6}} height={"100%"} bgcolor="primary.main">
            <WrappedComponent{...props}/>
          </Grid2>
          <Grid2 size={{md: 4, lg:3}} sx={{display: {xs: "none", md: "block"}, 
          padding:"2rem",}} bgcolor="red" height={"100%"}>
            Third
          </Grid2>

        </Grid2>

      </>
    );
  };
};

export default AppLayout;