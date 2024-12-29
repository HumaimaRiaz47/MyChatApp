import React, { useState } from 'react'
import{Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material"
import {CameraAlt as CameraAltIcon, Gradient, PermPhoneMsg, TypeSpecimen} from "@mui/icons-material"
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import {useFileHandler, useInputValidation, useStrongPassword} from '6pp';
import { usernameValidator } from '../utils/validatorts';
import { blue, pink } from '@mui/material/colors';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);


const toggleLogin = () => setIsLogin((prev)=> !prev);

const name = useInputValidation("");
const bio = useInputValidation("");
const username = useInputValidation("", usernameValidator);
const password = useStrongPassword();

const avatar = useFileHandler("single");

const handleLogin = (e) => {
  e.preventDefault();
};

const handleSignUp = (e) => {
  e.preventDefault();
};

  return (
      
    <Container component={"main"} 
    maxWidth="xs" 
    sx={{height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}
    >
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLogin ? (
        <>
          <Typography variant="h5">Login</Typography>
          <form style={{
            Width: "100%",
            marginTop: "1rem",
        }}
        onSubmit={handleLogin}

        >
            <TextField
            required 
            fullWidth 
            label= "Username"
            margin='normal'
            variant='outlined'
            value={username.value}
            onChange={username.changeHandler}
            />

        <TextField
            required 
            fullWidth 
            label= "Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password.value}
            onChange={password.changeHandler}
            />

        <Button 
            sx={{marginTop: "1rem",}}
            varient="contained" 
            color="primary" 
            type="submit"
            fullWidth>
                Loginhh
        </Button>

        <Typography textAlign={"center"} m={"1rem"}>
            OR</Typography>
            <Button 
                fullWidth
                varient="Text" 
                onClick={toggleLogin}
                >
                    Sign Up Instead
            </Button>

                    
          </form>
        </>
      ) : (

        <>
          <Typography variant="h5">Sign Up</Typography>
          <form style={{
            Width: "100%",
            marginTop: "1rem",
        }}
        onSubmit={handleSignUp}
        >

        <Stack
        position={"relative"}
        width={"10rem"}
        margin={"auto"}
        >
    <Avatar
        sx={{width: "10rem",
            height: "10rem",
            objectFit: "contain",
        }}
        src={avatar.preview}
        />

        {avatar.error && (
              <Typography m={"1rem"}
              width={"fit-content"}
              color="error"
              varient="caption">
                {avatar.error}
              </Typography>
            )
        }

        <IconButton 
        sx={{
            position: "absolute",
            botom:"0",
            right:"0",
            bgcolor: "rgb(255, 255, 255, 0.5)",
            ":hover":{bgcolor: "rgb(255, 255, 255, 0.7)"},
        }}
            component="label">
            <>
            <CameraAltIcon />
            <VisuallyHiddenInput type="file" onChange={avatar.changeHandler}/>
            </>
        </IconButton>
        </Stack>

        <TextField
            required 
            fullWidth 
            label= "Name"
            margin='normal'
            variant='outlined'
            value={name.value}
            onChange={name.changeHandler}

            />

<TextField
            required 
            fullWidth 
            label= "Bio"
            margin='normal'
            variant='outlined'
            value={bio.value}
            onChange={bio.changeHandler}
            />

            <TextField
            required 
            fullWidth 
            label= "Username"
            margin='normal'
            variant='outlined'
            value={username.value}
            onChange={username.changeHandler}
            />
          {
            username.error && (
              <Typography color="error" variant="caption">
                {username.error}
              </Typography>
            )
          }

        <TextField
            required 
            fullWidth 
            label= "Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password.value}
            onChange={password.changeHandler}
            />

            {password.error && (
              <Typography color="error" varient="caption">
                {password.error}
              </Typography>
              )
            }

        <Button 
            sx={{marginTop: "1rem",}}
            varient="contained" 
            color="primary" 
            type="submit"
            fullWidth>
                Sign Up
        </Button>

        <Typography textAlign={"center"} m={"1rem"}>
            OR</Typography>
            <Button 
                fullWidth
                varient="Text" 
                onClick={toggleLogin}
                >
                    Log In Instead
            </Button>

                    
          </form>
        </>

      )}
    </Paper>
  </Container>

  );
};

export default Login;