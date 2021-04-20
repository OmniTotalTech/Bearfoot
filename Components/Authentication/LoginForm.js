import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import PlusImage from "../../assets/images/Red_Black_Glow_Paw.svg";
import Modal from "react-modal";
import api from "../../utils/api";
import BackButton2 from "../BackButton2";
import ParticlesBg from "particles-bg";
import icon from "./icon";
import "./style.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactCardFlip from "react-card-flip";

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const [resetCode, setResetCode] = React.useState("");
  const [viewSet, setViewSet] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [fmessage, fsetMessage] = React.useState("");
  const [flipped, setFlipped] = React.useState(false);
  const [resetPassword, setResetPassword] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    var body = {
      email: `${email}`,
      password: `${password}`,
    };

    props.login(body);
  };

  const handleClick2 = () => {
    setViewSet(0);
  };

  function handleClick(e) {
    e.preventDefault();
    setFlipped(!flipped);
  }
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  const useStyles = makeStyles((theme) => ({
    // "@global": {
    //   body: {
    //     backgroundColor: theme.palette.common.white,
    //   },
    // },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const sendVerificationCode = async (event) => {
    event.preventDefault();
    setIsSending(!isSending);

    console.log(resetEmail);
    let body = {
      email: resetEmail,
    };
    await api
      .post("/auth/forgotpassword/", body)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setMessage(response.data.data);
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
    setIsSending(false);
    setResetEmail("");
  };

  const showEnterCodeScreen = (number) => {
    setViewSet(number);
  };
  let config = {
    // num: [4, 7],
    // rps: 0.1,
    // radius: [5, 40],
    // life: [1.5, 3],
    // v: [2, 3],
    // tha: [-50, 50],
    // alpha: [0.6, 0],
    // scale: [0.1, 0.9],
    // body: icon,
    // custom: "ball",
    // background: "black",
    // position: "all",
    //color: ["random", "#ff0000"],
    // color: "#ff0000",
    // cross: "dead",
    color: "#000000",
    // random: 2,
    // width: 10,
  };

  const verifyCode = async (event) => {
    event.preventDefault();

    let body = { password: resetPassword };

    await api
      .put("/auth/resetpassword/" + resetCode, body)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          fsetMessage("Your password is now reset");
        } else {
          fsetMessage("There was an error. Check your code and password.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const classes = useStyles();

  return (
    <>
      <div className="bubbels">
        <>
          <div className="w-screen h-screen flex flex-col bg-black justify-center items-center mx-auto ">
            {" "}
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="w-full mx-auto text-center  py-4 my-2  z-40">
              <img className="mx-auto h-48 w-48 z-40" src={PlusImage} />
              <h1 className="my-8 font-display font-bold text-4xl text-white  text-center z-40">
                <p className=""> Bearfoot Pools</p>
              </h1>
              <div className="container mx-auto  w-3/4 p-2">
                <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                  {/* <div class="custom-shape-divider-bottom-1618247041 bg-white">
                    <svg
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1200 120"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        class="shape-fill"
                      ></path>
                    </svg>
                    <form className="z-15" onSubmit={handleSubmit}>
                      <div className="relative">
                        <i className="fa fa-user absolute text-primarycolor text-xl"></i>

                        <input
                          type="text"
                          placeholder="E-mail"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className=" border-b-2 font-display  transition-all duration-500 text-lg p-1 rounded"
                        />
                      </div>
                      <div className="relative mt-8">
                        <i className="fa fa-lock absolute text-primarycolor text-xl"></i>
                        <input
                          type="password"
                          placeholder="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className=" border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg p-1  rounded"
                        />
                      </div>
                      <a
                        href="#"
                        className="py-3 z-20 px-3 bg-primarycolor rounded-full text-black-300 font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
                      >
                        <button className="mt-4 px-4 py-2  z-20 rounded bg-black text-white z-20">
                          <p className="shadow-lg"> Login</p>
                        </button>
                      </a>
                      <br />
                      <div className="z-20">
                        <a
                          href="#"
                          onClick={() => setModalOpen(true)}
                          className="self-end mt-4 text-white font-bold z-20 "
                        >
                          Forgot password?
                        </a>
                      </div>
                    </form>
                    <button onClick={handleClick}>Click to flip</button>
                  </div> */}
                  <div>
                    <form className="z-15" onSubmit={handleSubmit}>
                      <div className="relative">
                        <i className="fa fa-user absolute text-primarycolor text-xl"></i>

                        <input
                          type="text"
                          placeholder="E-mail"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className=" border-b-2 font-display  transition-all duration-500 text-lg p-1 rounded z-40"
                        />
                      </div>
                      <div className="relative mt-8">
                        <i className="fa fa-lock absolute text-primarycolor text-xl"></i>
                        <input
                          type="password"
                          placeholder="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className=" border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 text-lg p-1  rounded"
                        />
                      </div>
                      <div className="text-white text-italic italic mt-2">
                        {props.auth.error ? (
                          <div>{props.auth.error}</div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <a
                        href="#"
                        className="py-3 z-20 px-3 bg-primarycolor rounded-full text-black-300 font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
                      >
                        <button className="mt-4 px-4 py-2  z-20 rounded bg-red-700 text-white z-50">
                          <p className="shadow-lg"> Login</p>
                        </button>
                      </a>
                      <br />
                      {/* <div className="z-20">
                        <a
                          href="#"
                          onClick={() => setModalOpen(true)}
                          className="self-end mt-4 text-white font-bold z-20 "
                        >
                          Forgot password?
                        </a>
                      </div> */}{" "}
                      <button
                        className="self-end mt-4 text-white font-bold z-20 "
                        onClick={handleClick}
                      >
                        Need Help?
                      </button>
                    </form>
                  </div>
                  {/* second one */}
                  <div className="max-w-lg mx-auto">
                    {viewSet == 0 ? (
                      <div>
                        <form>
                          <div className="mx-auto container max-w-md mx-4">
                            <div className="">
                              <form onSubmit={handleSubmit}>
                                <div className=" space-y-4 md:space-y-0 w-full p-4 text-white items-center">
                                  <h1 className="text-lg">Reset Password</h1>
                                  <h2 className=" max-w-sm mx-auto">
                                    Please enter your email, and we will send a
                                    reset code to verify your identity.
                                  </h2>
                                  {/* {inputsMap(inputs)} */}
                                  <input
                                    placeholder="example@email.com"
                                    name="resetEmail"
                                    type="email"
                                    value={resetEmail}
                                    onChange={(e) =>
                                      setResetEmail(e.target.value)
                                    }
                                    className="border w-full my-4 text-black"
                                  />{" "}
                                  {message ? <div>{message}</div> : <div></div>}
                                  <div className="w-full text-gray-500">
                                    {" "}
                                    {isSending ? (
                                      <div>Sending Your Code...</div>
                                    ) : (
                                      <button
                                        className="inline-flex text bg-red-700 p-2 rounded text-white my-2"
                                        type="submit"
                                        onClick={sendVerificationCode}
                                      >
                                        Send Verification Code
                                      </button>
                                    )}
                                  </div>
                                  <button
                                    className="inline-flex text bg-red-700 p-2 rounded text-white my-2"
                                    onClick={() => showEnterCodeScreen(1)}
                                  >
                                    I have my code already
                                  </button>
                                </div>
                                <div>
                                  <button
                                    className="inline-flex text  p-2 rounded text-white font-bold"
                                    onClick={handleClick}
                                  >
                                    Login
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </form>
                      </div>
                    ) : viewSet == 1 ? (
                      <>
                        {/* <BackButton2 handleClick={handleClick2} /> */}
                        <button
                          className="inline-flex text bg-red-700 p-2 rounded text-white"
                          onClick={handleClick2}
                        >
                          "I dont have a code..."
                        </button>
                        <form onSubmit={verifyCode}>
                          <div className="my-2">
                            <div className="text-white">Code:</div>
                            <input
                              type="text"
                              placeholder="Enter Your Code Here..."
                              name="resetCode"
                              value={resetCode}
                              onChange={(e) => setResetCode(e.target.value)}
                              className="border w-full"
                            />

                            <div className="text-white">
                              New Password (Minimum 8 Characters):
                            </div>
                            <input
                              placeholder="Enter Your Password Here..."
                              name="resetPassword"
                              type="password"
                              value={resetPassword}
                              onChange={(e) => setResetPassword(e.target.value)}
                              className="border w-full"
                            />
                            {fmessage ? (
                              <div className="text-white">{fmessage}</div>
                            ) : (
                              <div></div>
                            )}
                            {resetPassword.length > 8 ? (
                              <button
                                className="inline-flex text bg-red-700 p-2 rounded text-white my-2"
                                type="submit"
                              >
                                Update Password
                              </button>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </form>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </ReactCardFlip>
              </div>{" "}
            </div>
          </div>
          <div>
            {" "}
            <Modal
              {...props}
              ariaHideApp={false}
              isOpen={isModalOpen}
              style={{ width: "100%" }}
            >
              <button
                className="text bg-gray-600 p-2 rounded text-white"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Close
              </button>
              {viewSet == 0 ? (
                <div>
                  <form>
                    <div className="mx-auto container max-w-2xl mx-4">
                      <div className="bg-white space-y-6 mt-4">
                        <form onSubmit={handleSubmit}>
                          <div className=" space-y-4 md:space-y-0 w-full px-1 items-center">
                            <h1 className="text-lg">Reset Password</h1>
                            <h2 className=" max-w-sm mx-auto">
                              Please enter your email, and we will send a reset
                              code to verify your identity.
                            </h2>
                            {/* {inputsMap(inputs)} */}
                            <input
                              placeholder="example@email.com"
                              name="resetEmail"
                              type="email"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              className="border w-full"
                            />
                            <div className="w-full text-gray-500">
                              <button
                                className="inline-flex text bg-red-700 p-2 rounded text-white my-2"
                                type="submit"
                                onClick={sendVerificationCode}
                              >
                                Send Verification Code
                              </button>
                            </div>
                            <button
                              className="inline-flex text bg-red-700 p-2 rounded text-white my-2"
                              onClick={() => showEnterCodeScreen(1)}
                            >
                              I have my code already
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </form>
                </div>
              ) : viewSet == 1 ? (
                <>
                  <BackButton2 handleClick={handleClick2} />
                  <button
                    className="text-white bg-red-500"
                    onClick={handleClick2}
                  >
                    "I dont have a code..."
                  </button>
                  <form onSubmit={verifyCode}>
                    <div className="text-white">
                      <div className="text-white">Code:</div>
                      <input
                        type="text"
                        placeholder="Enter Your Code Here..."
                        name="resetCode"
                        type="text"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className="border w-full"
                      />

                      <div className="text-white">New Password :</div>
                      <input
                        placeholder="Enter Your Password Here..."
                        name="resetPassword"
                        type="password"
                        value={resetPassword}
                        onChange={(e) => setResetPassword(e.target.value)}
                        className="border w-full"
                      />
                      {fmessage ? <div>{fmessage}</div> : <div></div>}
                      <button
                        className="bg-red-500 text-white p-2"
                        type="submit"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div></div>
              )}
            </Modal>
          </div>
        </>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (body) => dispatch(login(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
