import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom';

export default function FormDialog() {
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
  const handlesend = async () => {
    
    const user=localStorage.getItem('user');
      await fetch(`http://127.0.0.1:8000/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          "message_content":document.getElementById("message").value,
          "message_user":user,
          "message_reciver":doctor,
          }),
        }).then((res)=>res.json()).then((data)=>{
      setreponse(data)
      handleAffiche()
      setTimeout(() => window.location.reload(true),1000)  
    })}

  return (
    <div>
      <CssButton type="submit" variant="contained" sx={{ width: 200, height: 50,margin:"30px" }} onClick={handleClickOpen}>
        Send a Message
      </CssButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact</DialogTitle>
        <DialogContent>			
				<textarea placeholder="Message" class="field" id="message" cols={80} rows={20}></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} class="btn" >Cancel</Button>
          <button class="btn" onClick={handlesend}>Send</button>
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