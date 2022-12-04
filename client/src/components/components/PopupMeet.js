import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom';

export default function TakeMeet() {
  const [open, setOpen] = React.useState(false);
  const doctor=useParams()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [reponse, setreponse] = useState('');
  const handleAffiche = () => {
    setOpen(false)
   setOpenAlert(true)
 };
 const [openAlert, setOpenAlert] = useState(false);
 const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
axios.post(`http://localhost:8000/activity/$`, JSON.stringify(
      {
        'activity_name':data.get('title'),
        'activity_type': data.get('type'),
        'activity_time': data.get('time'),
        'activity_date': dayjs(data.get('date')).format("YYYY-MM-DD"),
      }
    ),{
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer " 
       }
     })
     .then((json) => {
      setreponse(json.data)
      handleAffiche()
     })
     .catch((err) => console.log(err));
  
 



};



  return (
    <div>
      <CssButton type="submit" variant="contained" sx={{ width: 200, height: 50,margin:"30px" }} onClick={handleClickOpen}>
      Appointment
      </CssButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Appointment</DialogTitle>
        <DialogContent>			
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                  <Grid container spacing={2}>

                    
                      <Grid item xs={12} sm={6}>
                          <CssTextField
                              required
                              id="date"
                              name="date"
                              label="Date"
                              type="date"
                              InputLabelProps={{shrink: true,}}
                              fullWidth
                              autoComplete="off"
                              variant="outlined"
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <CssTextField
                              required
                              id="time"
                              name="time"
                              label="Hour"
                              type="time"
                              InputLabelProps={{shrink: true,}}
                              fullWidth
                              autoComplete="off"
                              variant="outlined"
                          />
                      </Grid>                      <Grid item xs={12} >
                          <CssTextField
                              required
                              id="remarks"
                              name="Remarks"
                              label="Remarks"
                              fullWidth
                              autoComplete="given-name"
                              variant="outlined"
                          />
                      </Grid>
                  </Grid>
          </Container>
      </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} class="btn" >Cancel</Button>
          <button class="btn" onClick={handleSubmit}>Confirm</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


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