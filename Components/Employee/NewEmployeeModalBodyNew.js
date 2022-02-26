import React, { Component } from "react";
import { Picker } from "@react-native-picker/picker";
import api from "../../utils/api";

class NewEmployeeModalBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      organization: undefined,
      isError: false,
      error: null,
      successMessage: false,
      isHOA: false,
      responseMsg: null,
    };
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.setHOA = this.setHOA.bind(this);
  }

  setSelectedValue(value) {
    console.log(value);
    this.setState({ organization: value });
  }
  setEmail(e) {
    this.setState({ email: e.target.value });
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  setHOA(e) {
    this.setState({ isHOA: e.target.checked });
    console.log(e.target.checked);
  }
  resetState() {
    this.setState({
      email: "",
      name: "",
      organization: undefined,
      isError: false,
      error: null,
      successMessage: false,
    });
  }
  async submitNewUser(e) {
    e.preventDefault();

    let body = {
      name: this.state.name,
      email: this.state.email,
      title: "Franchise Owner",
      organizations: [],
      isHOA: false,
      _id: this.props.selectedValue2,
    };

    this.props.reLoad();
    body.organizations.push({ orgName: this.props.org });

    console.log(body)

    await api
      .request({
        method: "POST",
        url: "auth/register/franchise/new",
        data: body,
      })
      .then((res) => {
        this.setState({ responseMsg: res.data.message });
        console.log(res.data);
        this.props.setLocalState(res.data.message);
        this.props.reLoad();
        this.props.closeModal();
      })
      .catch((error) => {
        console.log(error);

        this.setState({ responseMsg: "Email or name is invalid. Check your submission" });

        console.log(error);
      });
  }
  render() {
    return (
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md mx-4">
        <form>
          <div className="bg-black-100 p-4 border-t-2 bg-opacity-5 rounded-t p-4 overflow-scroll">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                    alt="..."
                    style={{ height: "50px", width: "50px" }}
                    className="shadow rounded-full float-left align-middle border-none object-contain"
                  />
                </div>

                <h1 className="text-black-600">New Account</h1>
              </div>
            </div>
          </div>
          <div className="bg-white space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-black-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-black-400">Email</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-black-100 bg-opacity-50">
                    <svg
                      fill="none"
                      className="w-6 text-black-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="w-11/12 focus:outline-none focus:text-black-600 p-2"
                    placeholder="email@example.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.setEmail}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-black-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <label className="text-sm text-black-400">Full name</label>
                  <div className="w-full inline-flex border">
                    <div className="w-1/12 pt-2 bg-black-100">
                      <svg
                        fill="none"
                        className="w-6 text-black-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-11/12 focus:outline-none focus:text-black-600 p-2"
                      placeholder="Employee Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.setName}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-black-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm">Group info</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <label className="text-sm text-black-400">Organization</label>
                  <div className="w-full inline-flex border">
                    <div className="w-1/12 pt-2 bg-black-100">
                      <svg
                        fill="none"
                        className="w-6 text-black-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <Picker
                      selectedValue={this.state.selectedValue}
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(v) => this.setSelectedValue(v)}
                    >
                      <Picker.Item
                        label={this.props.selectedValue}
                        value={this.props.selectedValue}
                      />
                    </Picker>
                  </div>
                </div>
              </div>{" "}
              <div>
                {this.state.responseMsg != null ? (
                  <div>{this.state.responseMsg}</div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <hr /> {this.state.successMessage ? "User has been submitted" : ""}
            {this.props.auth.otherMessage ===
              "Request failed with status code 500"
              ? "something went wrong. check to make sure user doesn't already exist, and that your information is entered correctly"
              : ""}
            <div className="w-full p-4 text-right text-black-500">
              <button
                className="inline-flex text bg-red-700 p-2 rounded text-white"
                type="submit"
                onClick={(e) => this.submitNewUser(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewEmployeeModalBody;
