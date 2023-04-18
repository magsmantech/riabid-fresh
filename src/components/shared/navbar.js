import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ln from "../../assets/logo-new.svg";
import chat from "../../assets/icons/chat.svg";
import { userProvider } from "../../store/store";
import { logout } from "../../services/authService";
import { useMutation } from "react-query";
import { change, login, register } from "../../services/authService";
import { toast } from "react-toastify";
function Navbar() {

  console.log('navbar mounted');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      window.location.href ='/search?search=' + searchValue;
    }
   }
  const redirect = (e) => { 
      window.location.href ='/search?search=' + searchValue;    
   }

   const [mobileShow, setMobileShow] = useState(false);
   const [name, setName] = useState("");
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
  });

  const { currentUser, setCurrentUser } = userProvider();
  const [navActive, setNavActive] = useState(false);
  const [authActive, setAuthActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [vW, setVW] = useState(0);
  const [regMode, setRegMode] = useState(2);
  
  const [authModalActive, setAuthModalActive] = useState({
    login: false,
    register: false,
  });

  const registerMutation = useMutation(register, {
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      // An error happened!
      setError(error.response.data);
    },
    onSuccess: (data, variables, context) => {
      window.location.href = "/approveemail";
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const loginMutation = useMutation(login, {
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.response.data.error);
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (data, variables, context) => {
      setCurrentUser({
        isAuthenticated: true,
        token: data,
      });

      window.location.reload();
      // Boom baby!
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const pathName = useLocation().pathname || null;
  const searchRef = useRef(null);

  return (   
    <>
    <nav className="navbar navbar-expand-lg">
    <Link className="logo-container navbar-brand col-md-5" to="/">
          <img className="logo" src={ln} alt="logo" />
    </Link>

  <div className={mobileShow ? "collapse navbar-collapse show" : "collapse navbar-collapse"} >
    <ul className="navbar-nav mr-auto"> 
      <li className="nav-item">
                <NavLink
                className="nav-link"
                  to={`/artists`}
                  activeClassName="active-item"
                  // style={{
                  //   color: pathName == "/artists" ? "#fbb03b " : "black",
                  // }}
                >
                  ARTISTS
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                className="nav-link"
                  to={`/store`}
                  activeClassName="active-item"
                  // style={{
                  //   color: pathName == "/store" ? "#fbb03b " : "black",
                  // }}
                >
                  ARTWORKS
                </NavLink>
              </li>            
              <li className="nav-item">
                <NavLink
                className="nav-link"
                  to={`/galleries`}
                  activeClassName="active-item"
                  // style={{
                  //   color: pathName == "/galleries" ? "#fbb03b " : "black",
                  // }}
                >
                  GALLERIES
                </NavLink>
              </li>   
    </ul>
  </div>
  <div className="ml-auto groupItems">

            <span className="searchIcon" onClick={(e) =>{  e.preventDefault(); setSearchActive(!searchActive); setAuthActive(false);  }}></span>
      
          <Link  to="/dashboard/favorites" >           
            <span className="frameIcon"></span>
          </Link>
          <Link to="/cart">
              <span className='cart-btn'></span>
            </Link>

            <Link to="/dashboard" onClick={(e) =>{ if(!currentUser.isAuthenticated){ e.preventDefault(); setAuthActive(!authActive);setSearchActive(false);}  }}>
              <span className={
                    authActive ? "user-btn active" : "user-btn"
                  } ></span>
            </Link>
  </div>

  <button className="mobile_menu" onClick={(e)=>{setMobileShow(!mobileShow)}}>MENU</button>
</nav>
<div className={
                  authActive || searchActive
                    ? "headerBg active"
                    : "headerBg"
                }
                onClick={(e) => { setAuthActive(false);setSearchActive(false);} }
              ></div>


<div className={
                  searchActive
                    ? "loginHeader active"
                    : "loginHeader"
                }
              >
                <div className="row">
                  <div className="col-md-2">
<ul>
  <li></li>
  <li className='active' >Search</li> 
  <li></li>
</ul>
</div>


<div className="offset-md-3 col-md-6 regPage searchPage active">       
              <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  name="search"
                  id="search"
                  placeholder="Search"
                />     
                </div>       
            <div className='col-md-1'>
            <button
            className="search"
            onClick={(e) => {
              redirect(e);
            }}
            >
              Search
            </button>
            </div>

</div>
</div>



<div className={
                  authActive
                    ? "loginHeader active"
                    : "loginHeader"
                }
              >
                <div className="row">
                  <div className='col-md-5'>
<ul>
  <li className={
                  regMode == 1
                    ? "active"
                    : ""
                } onClick={(e)=>setRegMode(1)} >Log in</li>
  <li className={
                  regMode == 2
                    ? "active"
                    : ""
                } onClick={(e)=>setRegMode(2)}>Sign up</li>
  <li>Or continue with <a href="#">Google</a> <a href="#">Apple</a> <a href="#">Facebook</a></li>
</ul>
</div>

<div className="regPage active col-md-6">

          <div className="regInputs">
            <div className={regMode == 1 ? "inputs loginInputs" : "inputs"}>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
                id="name"
                placeholder="Name"
                className={
                  regMode == 1
                    ? "noVisible"
                    : "inputActive"
                }
              />  

            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                placeholder="E-mail"
              />

            <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <p className={
                  regMode == 1
                    ? "noVisible"
                    : "inputActive"
                }>By clicking Sign Up you agree to RIABID’S Terms of Use and Privacy Policy and to receiving emails from RIABID</p>
              </div>
              
        </div>

</div>
<div className="col-md-1">
  
<button
            className={
              regMode == 2
                ? "register"
                : "noVisible"
            }
              onClick={() => {               
                  const data = new FormData();        
                  data.append("name", name);
                  data.append("email", email);
                  data.append("password", password);
                  registerMutation.mutate(data);               
              }}
            >
              Sign Up
            </button>

            <button
            className={
              regMode == 1
                ? "register"
                : "noVisible"
            }
            onClick={() => {
              loginMutation.mutate({ email, password });
            }}
            >
              Log in
            </button>
</div>
</div>
</div>




<img
              className="chatIcon"
              src={chat}
              alt="chat-btn"
            />
</>
  );
}

export default Navbar;