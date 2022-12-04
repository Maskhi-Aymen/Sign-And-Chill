import * as React from 'react';
import { styled } from '@mui/material/styles';
import Article from '../components/content/Article';
import TodoList from './ToDoList';
import ReactLoading from "react-loading";
import { useState , useEffect } from 'react';


export default function Content({}) {
    const [data,setdata]=useState([]);
    const [isLoaded,setIsLoaded]=useState(false);
    const user= localStorage.getItem('user');
  
    useEffect(()=>{
      if(!isLoaded){
       fetch("http://localhost:8000/publication").then(response=>
         response.json()
         )
       .then(dataS=>{
         setIsLoaded(true)
         setdata(dataS)
         })
       .catch(err=>{
         console.log(err)
       })
       
     }
    },[])

    return (
        <div className='yellocard'>
        <div >
        <TodoList/>
                
            </div></div>
    );
}

