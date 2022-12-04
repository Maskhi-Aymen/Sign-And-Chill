import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MusicList from '../components/player/menulist';


const theme = createTheme({
  status: {
    danger: '#9D818A',
  },
  palette: {
    primary: {
      main: '#F4ACB7',
      darker: '#9D818A',
    },
    neutral: {
      main: '#9D818A',
      contrastText: '#9D818A',
    },
  },
});

export default function Media() {
  return (
   
    <ThemeProvider theme={theme}>
     <div className='yellocard'>
    <Box sx={{ backgroundColor:'#FFE5D9' , width: '100%', minHeight:'100%' }}>
 

          <MusicList/>
    
    </Box></div></ThemeProvider>
  );
}
