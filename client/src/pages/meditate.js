import * as React from 'react';
import WelcomePlan from '../components/meditate/MeditateCarde';
import '../assets/styles/welcomePlan.css';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect,useState } from 'react';
import ReactLoading from "react-loading";
const theme = createTheme({
  status: {
    danger: '#fffff',
  },
  palette: {
    primary: {
      main: '#9D8189',
      darker: '#053e85',
    },
    neutral: {
      main: '#F4ACB7',
      contrastText: '#f4acb7d3',
    },
  },
});
export default function Meditate() {
  const [datamd,setdatamd]=useState([]);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!isLoaded){
     fetch("http://localhost:8000/plan").then(response=>
       response.json()
       )
     .then(data=>{
       setIsLoaded(true)
       setdatamd(data)
       })
     .catch(err=>{
       console.log(err)
     })
     
   }
  })
  return (
  <ThemeProvider theme={theme}>
    <div className='yellocard'>
  <div >
     
     {isLoaded ? (<div className='containerPlan'>
      {datamd.filter((val) => {
    return val.plan_name;
}).map((val, key) => {
    return (<div key='val.plan_id' >
        <Link to={'/todo/'+val.plan_name}>
     <WelcomePlan title={val.plan_name} intro={val.plan_type} />
   </Link> </div>)
})}</div>):<ReactLoading
                  height={"150px"}
                  width={"150px"}
                  color={"#FFCAD4"}
                  className="loading"
                  type="bars"
             
                /> }



    </div></div></ThemeProvider>
  );
}
