import React, { useState } from "react";
import { userProvider } from "../../store/store";

import { GrClose } from "react-icons/gr";
import { change, login, register } from "../../services/authService";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

function Modal({ type, setAuthModalActive }) {
  const { currentUser, setCurrentUser } = userProvider();
  const [accountType, setAccountType] = useState("1");
  const [userType, setUserType] = useState("1");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gallery_title, setGalleryTitle] = useState("");
  const [gallery_description, setGalleryDescription] = useState("");
  const [legal_image, setLegalImage] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
  });
  const _closeModal = () => {
    setAuthModalActive({
      login: false,
      register: false,
      modal: false,
    });
  };

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
      _closeModal();
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

      _closeModal();
      location.reload();
      // Boom baby!
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const changeMutation = useMutation(change, {
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.response.data.error);
    },
    onSuccess: (data, variables, context) => {
      _closeModal();
      window.location.href = "/";
      // Boom baby!
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
  return (
    <div className="auth-modal">
      <div className="modal-container">
        <div className="close-btn" onClick={() => _closeModal()}>
          <GrClose />
        </div>
        {type.login ? (
          <>
            <h3>Log In</h3>
            <p>WELCOME TO RIA BID</p>
            <div className="input-container">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name=""
                id=""
                placeholder="E-mail"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name=""
                id=""
                placeholder="Password"
              />
              <div className="action-wrapper">
                <div className="keep-wrapper">
                  <strong
                    onClick={() =>
                      setAuthModalActive({
                        login: false,
                        register: false,
                        forgot: true,
                      })
                    }
                  >
                    Forgot Password?
                  </strong>
                </div>
                {/*<div className="forget">Forgot password?</div>*/}
              </div>
            </div>
            {/*<div className="modal-btn-container">
              <button
                className="btn btn-fb"
                onClick={() => {
                  setCurrentUser({
                    isAuthenticated: true,
                    token: "1",
                  });
                  _closeModal();
                }}
              >
                Facebook
              </button>
              <button
                className="btn btn-gmail"
                onClick={() => {
                  setCurrentUser({
                    isAuthenticated: true,
                    token: "1",
                  });
                  _closeModal();
                }}
              >
                G mail
              </button>
              </div>*/}
            <button
              className="btn-signup"
              onClick={() => {
                loginMutation.mutate({ email, password });
              }}
            >
              Sign In
            </button>
            <p className="href-signup">
              Not a member yet?{" "}
              <strong
                onClick={() =>
                  setAuthModalActive({ login: false, register: true })
                }
              >
                Sign Up
              </strong>
            </p>
          </>
        ) : type.forgot ? (
          <>
            <h3>Reset Password</h3>

            <div className="input-container" style={{ width: "100%" }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="E-mail"
              />
            </div>

            <button
              className="btn-signup"
              onClick={() => {
                changeMutation.mutate({ email });
              }}
            >
              Send
            </button>
            <p className="href-signup">
              Not a member yet?{" "}
              <strong
                onClick={() =>
                  setAuthModalActive({ login: false, register: true })
                }
              >
                Sign Up
              </strong>
            </p>
          </>
        ) : (
          <>
            <h3>Create an account</h3>
            <div className="input-container">
              <div className="wrapper">
                <input
                  value="1"
                  type="radio"
                  onChange={(e) => setAccountType(e.target.value)}
                  name="type"
                  id="option-1"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="type"
                  id="option-2"
                  value="2"
                  onChange={(e) => {
                    setAccountType(e.target.value);
                    setUserType(1);
                  }}
                />
                <input
                  type="radio"
                  name="type"
                  id="option-3"
                  value="3"
                  onChange={(e) => setAccountType(e.target.value)}
                />

                <label htmlFor="option-1" className="option option-1">
                  <span>Buyer</span>
                </label>
                <label htmlFor="option-2" className="option option-2">
                  <span>Artist</span>
                </label>
                <label htmlFor="option-3" className="option option-3">
                  <span>Seller</span>
                </label>
              </div>
              <span className="error">{error.name}</span>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
                id="name"
                placeholder="First Name"
              />
              <span className="error">{error.lastname}</span>
              <input
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
              />
              <span className="error">{error.email}</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                placeholder="E-mail"
              />
              <span className="error">{error.password}</span>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              {userType == 2 ? (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Gallery Location"
                ></input>
              ) : null}

              {userType == 2 ? (
                <input
                  type="text"
                  value={gallery_title}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  placeholder="Gallery Title"
                ></input>
              ) : null}

              {userType == 2 ? (
                <input
                  type="text"
                  value={gallery_description}
                  onChange={(e) => setGalleryDescription(e.target.value)}
                  placeholder="Gallery Description"
                ></input>
              ) : null}

              {userType == 2 ? (
                <input
                  name="legal_image"
                  onChange={(e) => setLegalImage(e.target.files[0])}
                  type="file"
                ></input>
              ) : null}
              {accountType == 1 || accountType == 3 ? (
                <div className="wrapper">
                  <input
                    type="radio"
                    name="legal"
                    id="option-5"
                    defaultChecked
                    value="1"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <input
                    value="2"
                    type="radio"
                    name="legal"
                    id="option-6"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <label htmlFor="option-5" className="option option-5">
                    <span>Physical</span>
                  </label>
                  <label htmlFor="option-6" className="option option-6">
                    <span>Gallery</span>
                  </label>
                </div>
              ) : null}

              <div className="keep-wrapper-signup">
                <input type="checkbox" name="" id="" />
                <span className="terms-span">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </div>
            </div>
            <button
              className="btn-signup"
              onClick={() => {
                if (userType == 2) {
                  const data = new FormData();
                  data.append("account_type", accountType);
                  data.append("user_type", userType);
                  data.append("name", name);
                  data.append("lastname", lastname);
                  data.append("email", email);
                  data.append("location", location);
                  data.append("password", password);
                  data.append("legal_image", legal_image);
                  data.append("gallery_title", gallery_title);
                  data.append("gallery_description", gallery_description);
                  registerMutation.mutate(data);
                } else {
                  const data = {
                    account_type: accountType,
                    user_type: userType,
                    name,
                    lastname,
                    email,
                    password,
                  };

                  registerMutation.mutate(data);
                }
              }}
            >
              Sign Up
            </button>
            <p className="href-signup">
              Are you already a member?{" "}
              <strong
                onClick={() =>
                  setAuthModalActive({ login: true, register: false })
                }
              >
                Sign In
              </strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
