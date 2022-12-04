import { BrowserRouter as Router, Switch, Route,useHistory,Redirect } from "react-router-dom";
import React from "react";
import SignInSide from './pages/SignInSide';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Notes from './pages/Notes.js'
import NewPlan from "./pages/NewPlan";
import Content from './pages/content';
import Doctor from "./pages/Doctor";
import Media from './pages/Media';
import Contact from './pages/Contact.js';
import TodoList from "./pages/ToDoList";
import Registration from './pages/Registration';
import { useEffect } from "react";
import Privacy from "./pages/Privacy";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Account from './pages/Account'
import Home from "./pages/Home.js";
import UserList from "./pages/UserList";
import User from "./pages/UserUpdate";
import NewUser from "./pages/NewUser";
import MessagesList from "./pages/MessagesList";
import PlansList from "./pages/PlansList";
import Plan from "./pages/PlanUpsate";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from './pages/NewPassword';
import ProtectedRoute from "./ProtectedRoute";
import Error404 from "./pages/Error";
import GeneralConditions from "./pages/GeneralConditions";
import { useState } from "react";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
function Routing() {
  const history= useHistory(); 
  const userid = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");
  const [user,setuser]=useState(userid);
  const [usertype,setusertype]=useState(admin);
 
  useEffect(() => {
  const us = localStorage.getItem("user");
  const ad = localStorage.getItem("admin");

   
  }, []);

  const handleChange =(id,ad)=>{
    setuser(id);
    setusertype(ad);
  }

  return (
<div>
<Router>
  
      
      <div className="container">
        <Switch><Route exact path={'/'} component={() => <SignInSide  userid={(id,ad)=>handleChange(id,ad)}/> } />
        <Route exact path={'/signin'} component={() => <SignInSide userid={(id,ad)=>handleChange(id,ad)}  /> } />
        <Route exact path={'/error'} component={() => <Error404 />} /> 
        <Route exact path={'/registre'} component={() => <Registration />} />
        <Route exact path={'/resetpassword'} component={() => <ForgetPassword />} />
        <Route exact path={"/newpassword/:userId"}><NewPassword /></Route>

 
        <Route exact path={"/home"}  component={() => <ProtectedRoute user={user}  admin={usertype}><Navbar/><Content /></ProtectedRoute>}/>
        <Route exact path={"/account"}  component={() => <ProtectedRoute user={user} admin={usertype}><Navbar /><Account /></ProtectedRoute>}/>
        <Route exact path={"/doctor/:id"}  component={() => <ProtectedRoute user={user} admin={usertype}><Navbar /><Doctor /></ProtectedRoute>}/>
        <Route exact path={"/doctor"} component={() => <ProtectedRoute user={user} admin={usertype}><Navbar /><Media/></ProtectedRoute>}/>
        <Route exact path={"/notes"}component={() => <ProtectedRoute user={user} admin={usertype}><Navbar /><Notes/></ProtectedRoute>}/>
        <Route exact path={"/contact"} component={() =><ProtectedRoute user={user} admin={usertype}><Navbar /> <Contact/></ProtectedRoute>}/>
        <Route exact path={"/Todo"} component={() => <ProtectedRoute user={user} admin={usertype}><Navbar /><TodoList/></ProtectedRoute>}/>
        <Route exact path={"/privacy"} component={() => <ProtectedRoute user={user} admin={usertype}><Navbar /><Privacy/></ProtectedRoute>}/>
        <Route exact path={"/general-conditions"} component={() => <ProtectedRoute user={user} admin={usertype}><Navbar /><GeneralConditions/></ProtectedRoute>}/>
 
        <Route exact path={"/admin"}  component={() => <ProtectedRouteAdmin user={user} admin={usertype}><Topbar /><Sidebar /><Home /></ProtectedRouteAdmin>}   />
        <Route exact path={"/users"}component={() => <ProtectedRouteAdmin user={user} admin={usertype}><Topbar /><Sidebar /><UserList /></ProtectedRouteAdmin>}/>
        <Route exact path="/user/:userId"component={() => <ProtectedRouteAdmin user={user} admin={usertype}><Topbar /><Sidebar />  <User /></ProtectedRouteAdmin>}  />
        <Route exact path="/newUser" component={() => <ProtectedRouteAdmin user={user} admin={usertype}><Topbar /><Sidebar /><NewUser /></ProtectedRouteAdmin>}  />
        <Route exact path="/newPlan"component={() => <ProtectedRouteAdmin user={user} admin={usertype}><Topbar /><Sidebar /><NewPlan /></ProtectedRouteAdmin>}  />
        <Route exact path="/plans"component={() => <ProtectedRouteAdmin user={user} admin={usertype}><Topbar /><Sidebar /><PlansList /></ProtectedRouteAdmin>}  />
        <Route exact path="/plan/:planId"component={() => <ProtectedRouteAdmin user={user} admin={usertype}><Topbar /><Sidebar /><Plan /></ProtectedRouteAdmin>}  />
        <Route exact path="/messages"component={() => <ProtectedRouteAdmin user={user} admin={usertype}><Topbar /><Sidebar /><MessagesList /></ProtectedRouteAdmin>}  />
        
        <Footer/>
        
        </Switch>
        

      </div>
    </Router>
    </div>
  );
}

export default Routing;

/**
import ForgetPassword from "./pages/ForgetPassword";
 *  if (user && detect === 1) {
      if (
        !history.location.pathname.startsWith("/cours") &&
        !history.location.pathname.startsWith("/tests") &&
        !history.location.pathname.startsWith("/test") &&
        !history.location.pathname.startsWith("/avis") &&
        !history.location.pathname.startsWith("/reset") &&
        !history.location.pathname.startsWith("/emplois")
      ) {
        history.push("/");
      }
    } else if (user && detect === 2) {
      if (
        !history.location.pathname.startsWith("/emplois") &&
        !history.location.pathname.startsWith("/home") 
      ) {
        history.push("/");
      }
    } else if (user && detect === 3) {
      if (
        !history.location.pathname.startsWith("/emplois") &&
        !history.location.pathname.startsWith("/home") 
      ) {
        history.push("/");
      }
    } else {
      if (
        !history.location.pathname.startsWith("/reset") &&
        !history.location.pathname.startsWith("/forgot-password") &&
        !history.location.pathname.startsWith("/sign-in") &&
        !history.location.pathname.startsWith("/admin")
      ) {
        history.push("/");
      }
    }
 */