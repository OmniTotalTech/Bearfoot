import React, { Component, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  verifyUserPhone,
  verifyCode,
  loadUser,
  updateUser,
} from "../../redux/actions/auth";
import { connect } from "react-redux";

class UpdateEmployeeInfoForm extends Component {
  state = {
    phone: "",
    password: "",
    retypedPassword: "",
    isSamePassword: null,
    isCodeSent: false,
    isCodeValid: null,
    code: null,
  };

  setPassword(e) {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  }

  setRetypedPassword(e) {
    this.setState({ retypedPassword: e.target.value });
  }

  setPhone(e) {
    console.log("ere", e);
    this.setState({ phone: e });
  }
  setCode(e) {
    this.setState({ code: e.target.value });
  }

  verificationCodeProcess = async () => {
    await this.props.verifyUserPhone(this.state.phone),
      this.setState({ isCodeSent: true });
  };
  load = () => {
    this.verifyCode(() => {
      this.props.loadUser();
    });
  };
  verifyCode = async () => {
    await this.props.verifyCode(this.state.code, this.state.phone);
  };

  render() {
    const updateForm = () => {
      if (this.state.password == this.state.retypedPassword) {
        console.log(this.state);
        this.setState({ isSamePassword: true });
        console.log("HEY THIS IS WHERE IT NEEDS TO PATCH");
        const body = {
          password: this.state.password,
        };
        this.props.updateUser(body);
      } else {
        this.setState({ isSamePassword: false });
      }
    };
    return (
      <div>
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md mx-4">
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 rounded-t mt-4">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                />

                <h1 className="text-gray-600">Update Account</h1>
              </div>
            </div>
          </div>
          <div className="bg-white space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Name</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <div className="w-full inline-flex border">
                  <input
                    type="text"
                    className="w-full focus:outline-none text-gray-600 p-2"
                    value={this.props.name}
                  />
                </div>
              </div>
            </div>

            <hr />
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Email</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <div className="w-full inline-flex border">
                  <input
                    type="email"
                    className="w-full focus:outline-none text-gray-700 p-2"
                    value={this.props.email}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Phone Number</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <div className="inline-flex border">
                  {this.props.auth.user.isPhoneVerified ? (
                    <div>
                      Your phone is verified as: {this.props.auth.user.phone}
                    </div>
                  ) : (
                    <Example setPhone={(e) => this.setPhone(e)} />
                  )}
                </div>
                {this.props.auth.verification.statusText == "Accepted" ? (
                  <div></div>
                ) : isValidPhoneNumber(this.state.phone) ? (
                  <div>
                    {this.state.isCodeSent ? (
                      <div>
                        <label className={"label text-lg text-bold text-italic"}>Enter Verification Code Sent to Your Phone:</label>
                        <input
                          className="border my-4"
                          onChange={(e) => this.setCode(e)}
                        />
                        <br/>
                        {this.props.auth.verification.name == "Error" ? "Unable to verify code. It is character and case sensitive!" : ""}
                        <br/>
                        <button
                          onClick={() => this.verifyCode()}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Verify Code
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => this.verificationCodeProcess()}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-4"
                        >
                          Send Verification Code
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <hr />
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Password</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <div className="w-full inline-flex border mb-4">
                  <input
                    type="password"
                    className="w-full focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Enter new password"
                    onChange={(e) => this.setPassword(e)}
                  />
                </div>
                <div className="w-full inline-flex border">
                  <input
                    type="password"
                    className="w-full focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Retype password"
                    onChange={(e) => this.setRetypedPassword(e)}
                  />
                </div>
                {this.state.isSamePassword != false ? (
                  //is the same password
                  <div></div>
                ) : (
                  // is not the same password
                  <div className="text-red-500">
                    Sorry, passwords do not match.
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="w-full p-4 text-right text-gray-500">
              {this.props.auth.user.isPhoneVerified ? (
                <button
                  onClick={() => {
                    updateForm();
                  }}
                  className="inline-flex text bg-red-700 p-2 rounded text-white"
                  type="submit"
                >
                  Submit
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Example(props) {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState();
  return (
    <PhoneInput
      defaultCountry="US"
      placeholder="Enter phone number"
      value={value}
      onChange={(e) => props.setPhone(e)}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    verifyUserPhone: (phone) => dispatch(verifyUserPhone(phone)),
    verifyCode: (code, phone) => dispatch(verifyCode(code, phone)),
    loadUser: () => dispatch(loadUser()),
    updateUser: (body) => dispatch(updateUser(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(UpdateEmployeeInfoForm);
