import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function MusicCard({ last_name, name,id ,avatar,address,vale}) {
  const theme = useTheme(); 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);

  // references



  const mainIconColor = theme.palette.mode === 'dark' ? '#9D8189' : '#9D8189';
  const lightIconColor =
    theme.palette.mode === 'dark' ? '#9D8189' : '#9D8189';

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Link to={"doctor/"+id} onClick={()=>{
         localStorage.setItem("doctor",vale)
      }}>
    <Widget>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
       
        <Avatar alt="UserAvatar" src={avatar} sx={{ width: 100, height: 100 }} variant="rounded" />
        
        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Doctor
          </Typography>
          <Typography noWrap>
            <b>{name} {last_name}</b>
          </Typography>
          <Typography noWrap letterSpacing={-0.25}>
          {address}
          </Typography>
        </Box>
      </Box>
  
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: -2,
        }}
      >
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3,
        }}
      >
        
      </Box>
     
    </Widget></Link>
    
  </Box>
  );
}

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100, 
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});
/*    
      */