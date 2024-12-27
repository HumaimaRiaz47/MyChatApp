import React from 'react';
import Header from "./header";
import Title from '../Shared/Title';
import {Grid2} from "@mui/material"

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return(
      <>
      <Title />
      <Header />

        <Grid2 container height={"calc(100vh - 4rem)" } >

          <Grid2 size={4} bgcolor="primary.main">
            First
          </Grid2>
          <Grid2 size={4} bgcolor="primary.main">
            <WrappedComponent{...props}/>
          </Grid2>
          <Grid2 size={4} bgcolor="primary.main">
            Third
          </Grid2>

        </Grid2>

      </>
    );
  };
};

export default AppLayout;