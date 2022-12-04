import {
  CalendarToday,
  MailOutline,
  PermIdentity
} from "@material-ui/icons";
import * as React from 'react';
import { Card } from "@mui/material";
import { TextField,Button } from "@material-ui/core";
import dayjs from 'dayjs';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import "../assets/styles/user.css";
import { useState} from "react";
import Box from '@mui/material/Box';
import { useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import SelectAvatar from "../components/components/SelectAvatarNewUser";


const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#F4ACB7',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#F4ACB7',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#F4ACB7',
    },
    '&:hover fieldset': {
      borderColor: '#F4ACB7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F4ACB7',
    },
  },
});

export default function UserEdit() {
  const user =JSON.parse(localStorage.getItem("userSelected"));
  const history =useHistory(); 
   const [data, setData] = useState([]);
    const [isLoaded,setIsLoaded]=useState(false);
    useEffect(()=>{
      if(!isLoaded){
       fetch(`http://localhost:8000/messages`).then(response=>
         response.json()
         )
       .then(dataM=>{
         setIsLoaded(true)
         setData(dataM)
         })
       .catch(err=>{
         console.log(err)
       })
      
     }
  
    },[])
  const [photo, setphoto] = useState(user['user_avatar'])
 
  const chooseAvatar= (e)=>{
      setphoto(e)
    }
const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget); 
  axios.put("http://localhost:8000/user", JSON.stringify(
      {
        'user_id':user['user_id'],
        'user_name':data.get('firstName'),
        'user_Lastname': data.get('lastName'),
        'admin': currency,
        'user_mail': data.get('email'),
        'user_password': data.get('password'),
        'user_avatar':photo,
        'user_dateOfJoin':dayjs(user['user_dateOfJoin']).format('YYYY-MM-DD'),
      }
    ),{
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer "
       }
     })
     .catch((err) => console.log(err));
   };

  const [currency, setCurrency] = React.useState(user['admin']);

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };


  return (
    <div className="user">
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user["user_avatar"]}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user["user_name"]+" "+ user["user_Lastname"]}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Personal Information</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_name"]+" "+ user["user_Lastname"]}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_date_birth"]}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_mail"]}</span>
            </div>
            <span className="userShowTitle"> Account Details</span>
            <div className="userShowInfo">
              <PersonPinIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_type"]}</span>
            </div>
            <div className="userShowInfo">
            <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_dateOfJoin"]}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate" style={{height:"600px"}}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
        {data.filter((val) => {
    return val.message_user;
}).map((val, key) => {
    return (<div key='message_date' >
        <Card sx={{ Width: "9%", borderRadius: 2, border: '1px #9D8189 solid', }} className="chat_you">{val.message_content}</Card></div>)})}
        <Card sx={{ borderRadius: 2, border: '1px #9D8189 solid',position:'absolute',bottom:12 }} className="chat_me">
                                   <Grid item  >
                          <TextField
                              required
                              id="message"
                              name="Message"
                              label="Message"
                              fullWidth
                              autoComplete="given-name"
                              variant="outlined"
                          /><button class="btn" onClick={handleSubmit}>Send</button>
                      </Grid></Card>
                </Box>
               
          
          
        </div>
      </div>
    </div>
  );
}
const currencies = [
  {
      value: true,
      label: 'Admin',
  },
  {
      value: false,
      label: 'Simple user',
  },
];
  /**
   * <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_mail"]}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
   */