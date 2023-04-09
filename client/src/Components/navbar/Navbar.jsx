import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { grey, yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getEventsByName} from "../../Redux/actions";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { getAuth } from "firebase/auth";
import './Navbar.css';
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
import Searchbar from "./Searchbar";
import Prem from "../Premium/Premium";

import Donations from "../Donations/Donations"
import logogrande from '../../Logos/logogrande.png'
import AboutUs from "../AboutUs/AboutUs";
const NavBar = () => {
  const [AvatarImage, setAvatar] = useState();
  const dispatch = useDispatch();
  const { user, logOut } = useUserAuth();
  const token = user.accessToken;

  useEffect(() => {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${user.email}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config)
      .then((user) => {
        setAvatar(user.data.image);
      })
      .catch(function (err) {
      });
  }, []);

  ///LOGOUT
  function signOut() {
    logOut();
    localStorage.clear();
  }

  const handleInputEvents = (e) => {
    // console.log(e.target.value);
    dispatch(getEventsByName(token, e.target.value));
  };

  return (
    <AppBar sx={{ bgcolor: "custom.dark" }} id='navbar' position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <div>
            <Link to={"/home"}>
              <img id='logoHome' src={logogrande} alt='logo'/>
            </Link>
          </div>
        
          {window.location.href === `https://social-networking-mo5slyom2-alejoavendanio.vercel.app/events` ? (
            <TextField
              placeholder="Search events..."
              id="barrabusquedaEvents"
              onChange={handleInputEvents}
            />
            ) : (
              <Searchbar/>
            )}
        </Toolbar>

        <Toolbar>

          <Prem/>

          <Donations />

          <Link to="/chat">
            <IconButton color="secondary">
              <ChatOutlinedIcon />
            </IconButton>
          </Link>
            
          <AboutUs/>

          <IconButton color="secondary" onClick={signOut}>
            <LogoutIcon />
          </IconButton>

          <Link to={`/profile/${user.email}`}>
            <Button sx={{ ml: "35px", borderRadius: "25px", height: 50 }}>
              <Avatar src={AvatarImage}></Avatar>
            </Button>
          </Link>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
