import { Description } from '@mui/icons-material';
import React from 'react'
import {Helmet} from "react-helmet-async";

const Title = ({title= "ChatApp",
    Description = "Semester Project Chat App"  
  }) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name="Description" content ={Description}/>
        </Helmet>
    );
};


export default Title;