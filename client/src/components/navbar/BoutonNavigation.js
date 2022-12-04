import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import homeicon from '../../assets/images/o.images/Asset_8icon_PCD.png';
import doctoricon from '../../assets/images/o.images/st.png';
import noteicon from '../../assets/images/o.images/Asset_5icon_PCD.png';
import { Link } from "react-router-dom";

const theme = createTheme({
    status: {
      danger: '#F4ACB7',
    },
    palette: {
      primary: {
        main: '#FFE5D9',
        darker: '#F4ACB7',
      },
      neutral: {
        main: '#053e85',
        contrastText: '#D8E2DC',
      },
    },
  });
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('welcome');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
    <BottomNavigation  sx={{  backgroundColor:'#F4ACB7', color:'#ffff'}} className='navbotton' value={value} onChange={handleChange}>
    <Link to={"/home"}>  
      <BottomNavigationAction  
        label="Home"
        value="Home"
        icon={<img src={homeicon}  className='navbaricon' ></img>}
        
      />
      </Link>

      <Link to={"/doctor"}>
            <BottomNavigationAction
        label="Doctor"
        value="Doctor"
        icon={<img src={doctoricon}  className='navbaricon' ></img>}
      /></Link>
      <Link to={"/notes"}>
            <BottomNavigationAction
        label="Notes"
        value="notes"
        icon={<img src={noteicon}  className='navbaricon' ></img>}
      /></Link>
    </BottomNavigation></ThemeProvider> 
  );
}
