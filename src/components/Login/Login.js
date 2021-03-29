import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, handleSignOut, initializeLoginFramework, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const[newUser,setNewUser] = useState(false);
  const[user,setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    photo:'',
    error:'',
    success: false
  });
  initializeLoginFramework();
  
  const[loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

const handleResponse = ( res , redirect) => {
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
    history.replace(from);
  }
}  
  
const googleSignIn = () => {
  handleGoogleSignIn()
  .then((res) =>{
   handleResponse(res, true);
  })
}

const signOut = () => {
  handleSignOut()
  .then((res) =>{
    handleResponse(res, false);
  })
}
const fbSignIn = () => {
  handleFbSignIn()
  .then((res) =>{
    handleResponse(res, true);
    setLoggedInUser(res);
  })
}

  

   // from handle
   const handleChange = (event) =>{
    let isFieldValid =true;
    if(event.target.name === "email"){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === "password"){
      const isPasswordValid =event.target.value.length>6;
      const isPasswordHasNumber =/\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    } 
  }

// submit form
  const handleSubmit = (event) =>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then((res) =>{
        handleResponse(res, true);
      })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then((res) =>{
        handleResponse(res, true);
      })
    }
    event.preventDefault();
  }

  
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn && 
        <div>
        <h1>Welcome "{user.name}"</h1>
        <p>your mail: {user.email}</p>
        <img src={user.photo} alt=""/>
        </div>
      }
     {
       user.isSignedIn ? <button onClick={signOut}>Sign out</button>: <button onClick={googleSignIn}>Sign in</button>
     }
     <br/>
     <button onClick={fbSignIn}>Sign in with facebook</button>
         <h1>Our Own Authentication</h1>
          {/* <p>Name:{user.name}</p>
          <p>email:{user.email}</p>
          <p>password:{user.password}</p> */}
          <input type="checkbox" name="newUser" id="" onChange = {()=>setNewUser(!newUser)}/>
          <label htmlFor="newUser">New User Sign up </label> 
      <form onSubmit={handleSubmit}>
          {newUser &&<input type="text" onBlur={handleChange} name="name" placeholder="Your name" />}
          <br/>
          <input type="text" onBlur={handleChange} name="email" placeholder="Your email address" required/>
          <br/>
          <input type="password" onBlur={handleChange} name="password" id="" placeholder="Your password" required/>
          <br/>
          <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'created':'Logged in'} successfully. </p>
      }
    </div>
    
  );
}
export default Login;
