import {AppBar, Box, IconButton, Toolbar, Typography, Tooltip, dividerClasses, Backdrop} from "@mui/material";
import { black } from "../../Constants/colors";
import {blue} from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import {Add as AddIcon, 
    Menu as MenuIcon, 
    Search as SearchIcon, 
    Group as GroupIcon, 
    Logout as LogoutIcon, 
    Notifications as NotificationsIcon
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import React, {Suspense, lazy, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";

const SearchDialog = lazy(() => import("../Specific/Search"));
const NotificationDialog = lazy(() => import ("../Specific/Notifications"));
const NewGroupDialog = lazy(() => import ("../Specific/NewGroup"));


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const[isMobile, setIsMobile] = useState(false);
    const[isSearch, setIsSearch] = useState(false);
    const[isNewGroup, setIsNewGroup] = useState(false);
    const[isNotification, setIsNotification] = useState(false);



    const handleMobile = () =>{
        setIsMobile((prev) => !prev);
    };
    const openSearch = () =>{
        setIsSearch((prev) => !prev);
    }
    const openNewGroup = () =>{
        setIsNewGroup((prev) => !prev);
    };

    const openNotification = () =>{
        setIsNotification((prev) => !prev);
    };

    const navigateToGroup = () => navigate ("/groups");

    const logoutHandler = async () => {

        try {
            const {data} = await axios.get(`${server}/api/v1/user/logout`, {withCredentials: true})
            dispatch(userNotExists())
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || "something went wrong")
        }

    }

  return (
    <>
        <Box sx={{ flexGrow: 1 }} height={"4rem"}>
    <AppBar
        position="static"
        sx={{
        bgcolor: "blue",
        }}
    >
        <Toolbar>
        <Typography
            variant="h6"
            sx={{
            display: { xs: "none", sm: "block" },
            }}
        >
            Semester Project Chat App
        </Typography>

        <Box 
        sx={{
            display: {xs:"block", sm: "none"},
        }}
        >
            <IconButton color="inherit" size="large" onClick={handleMobile}>
                <MenuIcon />
            </IconButton>
        </Box>
        <Box 
        sx={{flexGrow:1,
        }}
        />
        <Box>
        <IconButton color="inherit" size="large" onClick={openSearch}>
    <SearchIcon />
</IconButton>

<IconButton color="inherit" size="large" onClick={openNewGroup}>
    <AddIcon />
</IconButton>




        <IconButton title={"Manage Groups"} onClick={navigateToGroup}>
            <GroupIcon />
        </IconButton>

        <IconButton title={"Notifications"} onClick={openNotification}>
            <NotificationsIcon />
        </IconButton>

        <IconButton title={"Logout"} onClick={logoutHandler}>
            <LogoutIcon />
        </IconButton>
                </Box>


                </Toolbar>
            </AppBar>
        </Box>

    
    {isSearch && (
        <Suspense fallback={ <Backdrop open />  }>
    <SearchDialog />
    </Suspense>)}

    {isNotification && (
        <Suspense fallback={ <Backdrop open />  }>
    <NotificationDialog />
    </Suspense>)}

    {isNewGroup && (
        <Suspense fallback={ <Backdrop open />  }>
    <NewGroupDialog />
    </Suspense>)}
    </>
  );
};

const IconBtn = ({title, icon, onClick}) => {
    return(
        <Tooltip title={title}>
            <IconButton color = "inherit" size = "large" onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}


   
export default Header