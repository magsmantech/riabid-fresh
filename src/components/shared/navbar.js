import React, { useState, useRef, useEffect,useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ln from "../../assets/logo-new.svg";
import chat from "../../assets/icons/chat.svg";
import closeMenu from "../../assets/icons/closeMenu.svg";
import searchIcon from '../../assets/icons/search_icon.svg';
import google from '../../assets/icons/google.svg';
import apple from '../../assets/icons/apple.svg';
import facebook from '../../assets/icons/facebook.svg';
import closePopup from '../../assets/icons/close_popup.svg';
import { userProvider } from "../../store/store";
import { logout } from "../../services/authService";
import { useMutation } from "react-query";
import { change, login, register,favorites, googleAuth } from "../../services/authService";
import { toast } from "react-toastify";
import { getMyBiography } from "../../services/dashboardService";
import { useQuery } from "react-query";
import { AppContext } from './../../App';
import { useGoogleLogin  } from '@react-oauth/google';
import axios from 'axios';


function Navbar() {
  const { showMenu,setShowMenu } = useContext(AppContext)


  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if(tokenResponse){
      //console.log('Google login successful', tokenResponse);
      // axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse?.access_token}`, {
      //                   headers: {
      //                       Authorization: `Bearer ${tokenResponse?.access_token}`,
      //                       Accept: 'application/json'
      //                   }
      //               })
      //               .then((res) => {
      //                   console.log(res.data)
      //               })
      //               .catch((err) => console.log(err));

      googleAuth(tokenResponse?.access_token).then(res =>{
        // console.log('res')
        // console.log(res)
        setCurrentUser({
          isAuthenticated: true,
          token: res,
        });
        localStorage.setItem('token',res);
        window.location.reload();
      });
      
    }

      


    },
    onError: () => {
      console.error('Google login failed');
      // Handle login errors here
    },
  });

   const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      window.location.href ='/search?search=' + searchValue;
    }
   }
  const redirect = (e) => { 
      window.location.href ='/search?search=' + searchValue;    
   }

   const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};


   const [mobileShow, setMobileShow] = useState(false);
   const [isShown, setIsShown] = useState(false);
   const [name, setName] = useState("");
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [accountType, setAccountType] = useState("1");
  const [userType, setUserType] = useState("1");
  const { currentUser, setCurrentUser } = userProvider();
  const [navActive, setNavActive] = useState(false);
  const [authActive, setAuthActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [vW, setVW] = useState(0);
  const [regMode, setRegMode] = useState(2);
  const [loginPopup,setLoginPopup] = useState(false);
  const [signUpPopup,setSignupPopup] = useState(false);
  const [forgotPopup,setForgotPopup] = useState(false);
  const [err,setErr] = useState("");

  const { isLoading, errorBio, data } = useQuery("bio", getMyBiography, {refetchOnWindowFocus: false,});


  useEffect(() => {    
    document.querySelector('body').addEventListener('scroll', handleScroll);
    return () => {
      document.querySelector('body').removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(()=>{
      if(showMenu){
        setAuthActive(true);
      }
  },[showMenu])

  useEffect(() => {   
    setMobileShow(false);
  }, []);

  useEffect(()=>{
    if(authActive){
      setShowMenu(true)
    }else{
      setShowMenu(false)
    }

    if(authActive && window.innerWidth < 769){
      document.body.scrollTop = 0;
    }
  },[authActive])

  const handleScroll = (event) => {
    if(document.getElementsByClassName('collapse navbar-collapse show').length > 0){
      setMobileShow(false);
    }
  };


  const favoriteMutation = useMutation(favorites, {             
    onSuccess: (data) => {
      localStorage.setItem('favorites',data.data);
    }
  });
  useEffect(() => {
    if(!localStorage.getItem('favorites')){
      if(currentUser.isAuthenticated){
        favoriteMutation.mutate();
      }else{
        localStorage.setItem('favorites',[]);
      }
    }
  },[])
  
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
      if(error.response.data.email.length > 0){
        toast.error(error.response.data.email[0]);
        setErr(error.response.data.email[0])
      }
      if(error.response.data.name.length > 0){
        toast.error(error.response.data.name[0]);
        setErr(error.response.data.name[0])
      }
      if(error.response.data.password.length > 0){
        toast.error(error.response.data.password[0]);
        setErr(error.response.data.password[0])
      }
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
      console.log(error.response.data.error)
      setErr(error.response.data.error)
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (data, variables, context) => {
      setErr("");
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


  const forgotMutation = useMutation(change, {
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      //toast.error(error.response.data.error);
      console.log(error.response.data.email)
      console.log(error.response.data.error)
      setErr(error.response.data.email)
      //console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (data, variables, context) => {
      //setErr("");
      console.log(data);
      setErr(data.message);
      setEmail('');
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
    <Link className="logo-container navbar-brand col-md-2" to="/">
          <img className="logo" src={ln} alt="logo" />
    </Link>
    <div className='col-md-2 searchInput'>
      <input className="search" name="search" onChange={(e) => setSearchValue(e.target.value)}  placeholder="Search by artist or artwork" />
      <img src={searchIcon} className="icon" onClick={(e) => {
              redirect(e);
            }}/>
    </div>
    <div className="col-md-1 navOffsetHide"></div>

  <div className={mobileShow ? "collapse navbar-collapse show" : "collapse navbar-collapse"} >
    <ul className="navbar-nav mr-auto"> 
    <li className="nav-item">
                <NavLink
                className="nav-link"
                onClick={()=>{setMobileShow(false)}}
                  to={`/auctions`}
                  activeClassName="active-item"
                  // style={{
                  //   color: pathName == "/artists" ? "#fbb03b " : "black",
                  // }}
                >
                  AUCTIONS
                </NavLink>
              </li>

      <li className="nav-item">
                <NavLink
                className="nav-link"
                
                onClick={()=>{setMobileShow(false)}}
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
                  
                onClick={()=>{setMobileShow(false)}}
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
                  
                onClick={()=>{setMobileShow(false)}}
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
  <div className="col-md-2 groupItems">
      <div className="row">
           
      <div className='col-md-6'>
          <Link className="frameBtn" to="/dashboard?tab=4" >           
            <span className="frameIcon"></span>
          </Link>
          <Link className="cartBtn" to="/cart" onClick={(e)=> {if(!currentUser.isAuthenticated){ e.preventDefault(); setAuthActive(!authActive);setSearchActive(false);}  }}>
              <span className='cart-btn'></span>
            </Link>

            <Link className={!currentUser.isAuthenticated ? "oLogIn decorationNone " : " decorationNone "} to="/dashboard" onClick={(e) =>{ if(!currentUser.isAuthenticated){ e.preventDefault(); setLoginPopup(true);  }  }}>
              <span className={
                    authActive || currentUser.isAuthenticated ? "user-btn active" : "user-btn"
                  } ></span>

                   <span className="profileName">{data?.data?.artist_name}</span>
            </Link>
    
       </div>     
 

      <div className={!currentUser.isAuthenticated ? 'col-md-6 flexing' : 'col-md-6 flexing flexEnd'} >
      {!currentUser.isAuthenticated ? 
        <>
          <button className={isShown || loginPopup ? "actionButtons signUpButton singupInactive" : "actionButtons signUpButton" } id="signUpButton" onClick={(e) =>{ setSignupPopup(true); setLoginPopup(false); }}>Sign up</button>
          <button className={loginPopup ? "actionButtons logInBtn loginActive" : 'actionButtons logInBtn'} id="logInBtn" onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} onClick={(e) =>{ setLoginPopup(true); setSignupPopup(false) }}>Log In</button>
        </>
      :
        <button className="actionButtons LogOut" onClick={(e) =>{  logout(); window.location.href = "/"; }}>Log out</button>
      }
      </div>

    </div>


    <div className={loginPopup ? "loginPopup active" : "loginPopup"}>
                  <div className="popupHead">
                    <h1>Log in to collect art by Georgian artists <img src={closePopup} className="closePopup" onClick={(e)=>setLoginPopup(false)}  /></h1>
                    <input name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
/>
                    <input name="password" type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <a href="#" className="forgot" onClick={(e)=>{e.preventDefault(); setLoginPopup(false); setForgotPopup(true)}}>Forgot Password?</a>
                  </div>

                  <div>
                    <p className={err.length > 0 ? "text red" : "text"}>{err}</p>
                    <button className="submit"       onClick={() => {
              loginMutation.mutate({ email, password });
            }}
>LOG IN</button>


                    <p className="dontH">Don’t have an account? <a href="#" onClick={(e)=>{e.preventDefault(); setLoginPopup(false);setSignupPopup(true)}}>Sign up</a></p>
                     <p className="or">Or continue with</p>
                    <ul>
                      <li><a href="#" onClick={()=>{googleLogin()}}><img src={google} /></a></li>
                 {/*      <li><a href="#"><img src={apple} /></a></li>
                      <li><a href="#"><img src={facebook} /></a></li> */ }
                    </ul>  
                  </div>
      </div>


      <div className={forgotPopup ? "forgotPopup active" : "forgotPopup"}>
                  <div className="popupHead">
                    <h1>Forgot Password <img src={closePopup} className="closePopup" onClick={(e)=>setForgotPopup(false)}  /></h1>
                    <input name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
/>
                  
                  </div>

                  <div>
                    <p className={err.length > 0 ? "text red" : "text"}>{err}</p>
                    <button className="submit"       onClick={(e) => { e.preventDefault();
              forgotMutation.mutate({ email });
            }}
>RESET</button>


                    <p className="dontH">Don’t have an account? <a href="#" onClick={(e)=>{e.preventDefault(); setForgotPopup(false);setSignupPopup(true)}}>Sign up</a></p>
              
                  </div>
      </div>



      
    <div className={signUpPopup ? "signUpPopup active" : "signUpPopup"}>
                  <div className="popupHead">
                    <h1>Sign up to collect art by Georgian artists <img src={closePopup} className="closePopup" onClick={(e)=>setSignupPopup(false)}  /></h1>


          {/* <div className="regPage regpagMarging  ">
             
                  <label htmlFor="option-4" className="option option-4">
                  <input
                      value="1"
                      type="radio"
                      onChange={(e) => setUserType(1)}
                      name="user_type"
                      id="option-4"
                      defaultChecked
                    />
                      <span className={userType == '1' ? 'typeActive' : ''}>Physical</span>
                    </label>

                  <label htmlFor="option-5" className="option option-5">
                  <input
                      value="2"
                      type="radio"
                      onChange={(e) => setUserType(2)}
                      name="user_type"
                      id="option-5"                      
                    />
                      <span className={userType == '2' ? 'typeActive' : ''}>Gallery</span>
                    </label>                  
              
          </div> */}


                    <input name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                    <input name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input name="password" placeholder="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    

                    
                    <div className="regPage regpagMarging">
         
                  <label htmlFor="option-1" className="option option-1">
                  <input
                      value="1"
                      type="radio"
                      onChange={(e) => setAccountType(e.target.value)}
                      name="type"
                      id="option-1"
                      defaultChecked
                    />
                      <span className={accountType == 1 ? 'typeActive' : ''}>Buyer</span>
                    </label>

                  <label htmlFor="option-2" className="option option-2">
                  <input
                      value="2"
                      type="radio"
                      onChange={(e) => setAccountType(e.target.value)}
                      name="type"
                      id="option-2"                      
                    />
                      <span className={accountType == 2 ? 'typeActive' : ''}>Artist</span>
                    </label>
                    <label htmlFor="option-3" className="option option-3">
                  <input
                      value="3"
                      type="radio"
                      onChange={(e) => setAccountType(e.target.value)}
                      name="type"
                      id="option-3"                      
                    />
                      <span className={accountType == 3 ? 'typeActive' : ''}>Seller</span>
                    </label>
            
          </div>
          
                  </div>

                  <div>
                    <p className={err.length > 0 ? "text red" : 'text'}>{err ? err : "By clicking Sign Up you agree to RIABID’S Terms of Use and Privacy Policy and to receiving emails from RIABID" }</p>
                    <button className="submit" onClick={() => {               
                  const data = new FormData();        
                  data.append("name", name);
                  data.append("email", email);
                  data.append("password", password);
                  data.append("account_type", accountType);
                  data.append("user_type", userType);
                  registerMutation.mutate(data);               
              }}>SIGN UP</button>
                    <p className="dontH">Already have an account? <a href="#" onClick={(e)=>{e.preventDefault(); setSignupPopup(false);setLoginPopup(true)}}>Log in</a></p>
                     <p className="or">Or continue with</p>
                    <ul>
                      <li><a href="#" onClick={()=>{googleLogin()}}><img src={google} /></a></li>
                     {/*  <li><a href="#"><img src={apple} /></a></li>
                      <li><a href="#"><img src={facebook} /></a></li>  */}
                    </ul> 
                  </div>
      </div>


  </div>



  <button className="mobile_menu" onClick={(e)=>{setMobileShow(!mobileShow);setAuthActive(false);setSearchActive(false);}}>MENU</button>
</nav>
<div className={
                  authActive || searchActive
                    ? "headerBg active"
                    : "headerBg"
                }
                onClick={(e) => { setAuthActive(false);setSearchActive(false);} }
              ></div>






<div className={
                  authActive
                    ? "loginHeader active"
                    : "loginHeader"
                }
              >
                <img src={closeMenu} className="closeMenu" onClick={(e) => { setAuthActive(false);setSearchActive(false);} } />
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

<div className={regMode == 2 ? "regPage active col-md-6 regpagMarging" : "regPage active col-md-6"}>
          <div className={regMode == 2 ? "regInputs" : "hide"}>
              <div className='inputs'>
                  <label htmlFor="option-1" className="option option-1">
                  <input
                      value="1"
                      type="radio"
                      onChange={(e) => setAccountType(e.target.value)}
                      name="type"
                      id="option-1"
                      defaultChecked
                    />
                      <span className={accountType == 1 ? 'typeActive' : ''}>Buyer</span>
                    </label>

                  <label htmlFor="option-2" className="option option-2">
                  <input
                      value="2"
                      type="radio"
                      onChange={(e) => setAccountType(e.target.value)}
                      name="type"
                      id="option-2"                      
                    />
                      <span className={accountType == 2 ? 'typeActive' : ''}>Artist</span>
                    </label>
                    <label htmlFor="option-3" className="option option-3">
                  <input
                      value="3"
                      type="radio"
                      onChange={(e) => setAccountType(e.target.value)}
                      name="type"
                      id="option-3"                      
                    />
                      <span className={accountType == 3 ? 'typeActive' : ''}>Seller</span>
                    </label>
                </div>
          </div>
          <div className={regMode == 2 ? "regInputs secondL" : "secondL hide"}>
              <div  className={accountType != 2 ? "inputs" : "hide"}>
                  <label htmlFor="option-4" className="option option-4">
                  <input
                      value="1"
                      type="radio"
                      onChange={(e) => setUserType(1)}
                      name="user_type"
                      id="option-4"
                      defaultChecked
                    />
                      <span className={userType == '1' ? 'typeActive' : ''}>Physical</span>
                    </label>

                  <label htmlFor="option-5" className="option option-5">
                  <input
                      value="2"
                      type="radio"
                      onChange={(e) => setUserType(2)}
                      name="user_type"
                      id="option-5"                      
                    />
                      <span className={userType == '2' ? 'typeActive' : ''}>Gallery</span>
                    </label>                  
                </div>
          </div>
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
                  data.append("account_type", accountType);
                  data.append("user_type", userType);
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