import React, {lazy, memo, useEffect, Suspense} from 'react'
import {Box, Drawer, Grid2, IconButton, Stack, TextField, Tooltip, Typography, Button, Backdrop } from "@mui/material"
import { Add as AddIcon, Delete as DeleteIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon, Edit as EditIcon, Done as DoneIcon } from "@mui/icons-material"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/Shared/AvatarCard'
import { sampleChats, sampleUsers } from '../Constants/SampleData'
import UserItem from '../components/shared/UserItem'
import { bgGradient } from '../Constants/colors'

const confirmDeleteDialog = lazy(()=> import ("../components/Dialogs/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(()=> import ("../components/Dialogs/AddMemberDialog"));

const isAddMember = false;

const Groups = () => {

  const chatId = useSearchParams()[0].get("group");
//console.log(chatId);

const navigate = useNavigate ();

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const navigateBack = () => {
    navigate("/")
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);
  const [IsEdit, setIsEdit] = useState(false);
  const[ConfirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [groupName, setGroupName] = useState("Group Name");
  const [groupNameUpdatedVAlue, setGroupNameUpdatedValue] = useState("");


  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedVAlue)
    
  };

  const openConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  };
  const closeConfirmDeleteHandler= () => {
    setConfirmDeleteDialog(false);
  } 

  const openAddMemberHandler=()=>{
    console.log("Add Member")
  };

  const deleteHandler= () => {
    console.log("DElete handler");
  };

  const removeMemberHandler = (id) => {
    console.log("Remove Member", id);
  };
  useEffect(() => {
    
    if (chatId) {
      setGroupName (`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return ( )=>{
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }
  }, [chatId]);
  const IconBtns = (
    <>

    <Box 
      sx={{
        display: {
          xs: "block",
          sm: "none",
          position: "fixed",
          right: "1rem",
          top: "1rem"
        }
      }}
    >
    <IconButton onClick={handleMobile}>
      <MenuIcon />
    </IconButton>
    

    </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0, 0, 0, 0.6)",
            },
          }}
          onClick={navigateBack}
          >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>

    </>
);

const GroupName = (
<Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}> 
  { IsEdit ? (
    <> 
    <TextField value={groupNameUpdatedVAlue}
    onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
     />
    <IconButton
        onClick={(updateGroupName)}
      > <DoneIcon />
      </IconButton>
    </>
  ) : (
    <>
      <Typography variant="h4">{groupName}</Typography>
      <IconButton
        onClick={() => setIsEdit(true)}
      >
        <EditIcon />
      </IconButton>
    </>
  )}
</Stack>
    );
    
    const ButtonGroup = (
      <Stack
        direction={{
          xs: "column-reverse",
          sm: "row",
        }}
        spacing={"1rem"}
        p={{
          xs: "0",
          sm: "1rem",
          md: "1rem 4rem",
        }}
      >
        <Button
          size="large"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={openConfirmDeleteHandler}
        >
          Delete Group
        </Button>
        <Button
          size="large"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddMemberHandler}
        >
          Add Member
        </Button>
      </Stack>
    );
  
  return (
    <Grid2 container height={"100vh"}>
      <Grid2
        size={{sm:4}}
        sx={{
          display:{
            xs: "none",
            sm: "block",
          },
        }}
        >
          <GroupList myGroups={sampleChats} chatId={chatId}/>
        </Grid2>

        <Grid2 size={{xs:12, sm:8}} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem"
          }}
        >
          {IconBtns}

          {
            groupName &&( 
            <> 
              {GroupName}
                <Typography
                  margin={"2rem"}
                  alignSelf={"flex-start"}
                  variant="body1"
                >
                  Members
                </Typography>

                <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members */}
              {sampleUsers.map((i) => (
                <UserItem user={i} 
                key={i._id}
                isAdded 
                styling={{
                  boxShadow: "0 0 0.5rem rgba(0,0,0,0.4)",
                  padding:"1rem 2rem",
                  borderRadius: "0.5rem",
                }} 
                  handler={removeMemberHandler} />
              ))}
            </Stack>
            
            {ButtonGroup}

            </>
          )}          
        </Grid2>

        {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      { /*before around 4:30{confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}*/}

      <Drawer sx={{
        display:{
          xs: "Block",
          sm: "none",
        },
        
      }}
      open={isMobileMenuOpen} 
      onClick={handleMobileClose}> 
        <GroupList width={"50vw"} myGroups={sampleChats} chatId={chatId} /></Drawer>
    </Grid2>
  );
;}
const GroupList = ({w="100%", myGroups=[], chatId}) => (
  <Stack width={w} overflow={"auto"} height={"100%"} sx={{
    backgroundImage: bgGradient,
    height: "100vh",
    
  }}  >
   { myGroups.length > 0 ? (
    myGroups.map((group) =>(
    <GroupListItem group={group} chatId={chatId} key={group._id} />
  ))
   ):(
    <Typography textAlign={"center"} padding={"1rem"}> 
    No Groups 
    </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;