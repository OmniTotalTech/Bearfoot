import React, { Component } from "react";
import api from "../../utils/api";
import slugify from "react-slugify";
import Modal from "react-modal";
import NewEmployeeModalBodyNew from "../../Components/Employee/NewEmployeeModalBodyNew";
import { newUser } from "../../redux/actions/auth";
import { connect } from "react-redux";

class OrganizationManagement extends Component {
  state = {
    showNewInput: false,
    inputText: "",
    submitting: false,
    newUserText: "",
    selectedValue: "",
    selectedValue2: "",
    orgArray: [],
  };
  async componentDidMount() {
    await api
      .get("organizationManagement/")
      .then((response) => {
        console.log(response);
        this.setState({ orgArray: response.data });
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  }
  render() {
    const reLoad = async () => {
      await api
        .get("organizationManagement/")
        .then((response) => {
          console.log(response);
          this.setState({ orgArray: response.data });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    };
    const handleDelete = async (id, id2) => {
      await api
        .delete("organizationManagement/" + id2 + "/" + id)
        .then((res) => {
          console.log(res);
          this.setState({ showModal: false });
        })
        .catch((error) => {
          console.log(error.message);
        });
      reLoad();
    };
    const newOrgSubmit = async () => {
      let body = { orgName: slugify(this.state.inputText) };

      await api
        .post("organizationManagement/", body)
        .then((res) => {
          console.log(res);
          this.props.navigation.navigate("SuccessScreen");
          this.setState({
            showNewInput: false,
            inputText: "",
            submitting: false,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    return (
      <div className="container overflow-scroll mx-auto">
        <div className="mx-auto w-full text-center">
          <div>
            {this.state.submitting ? (
              <div>Submitting new organization...</div>
            ) : this.state.showNewInput ? (
              <>
                <button
                  onClick={() =>
                    this.setState({ showNewInput: false, inputText: "" })
                  }
                  className="bg-red-500 px-2 py-1 my-4 text-white rounded text-lg"
                >
                  {" "}
                  X{" "}
                </button>
                <div>
                  <div className="text-lg">Name of Organization: </div>
                  <input
                    onChange={(e) =>
                      this.setState({ inputText: e.target.value })
                    }
                    className="shadow-lg border w-3/4 px-4 py-2"
                  />
                  <div className="my-4 ">
                    Formatted name :{" "}
                    {this.state.inputText.length > 0
                      ? slugify(this.state.inputText)
                      : null}
                  </div>
                  <div>
                    <button
                      onClick={
                        (() => this.setState({ submitting: true }),
                        newOrgSubmit)
                      }
                      className="px-4 py-2 text-white bg-red-500 rounded"
                    >
                      Create!
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => this.setState({ showNewInput: true })}
                  className="bg-red-500 px-2 py-1 my-4 text-white rounded text-lg"
                >
                  {" "}
                  +{" "}
                </button>
                <div>Add a New Organization</div>
              </>
            )}
            <div>
              {this.state.modalMessage ? (
                <div>
                  <span className="italic font-bold">
                    {this.state.modalMessage}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div>
            {this.state.orgArray.length > 0 ? (
              <div className="my-4">
                <Modal
                  {...this.props}
                  ariaHideApp={false}
                  isOpen={this.state.showModal}
                  style={{ width: "100%" }}
                >
                  <button
                    className="text bg-gray-600 p-2 rounded text-white"
                    onClick={() => {
                      this.setState({ showModal: false });
                    }}
                  >
                    close
                  </button>
                  <div className="w-full">
                    <div className="container">
                      <NewEmployeeModalBodyNew
                        user={this.props.user}
                        selectedValue={this.state.selectedValue}
                        selectedValue2={this.state.selectedValue2}
                        newUser={this.props.newUser}
                        auth={this.props.auth}
                        org={this.state.selectedValue}
                        setLocalState={(value) =>
                          this.setState({ modalMessage: value })
                        }
                        reLoad={reLoad}
                        closeModal={() => this.setState({ showModal: false })}
                      />
                    </div>
                  </div>
                </Modal>
                {this.state.orgArray.map((item) => (
                  <>
                    <div className="bg-gray-700 text-black-700 text-white  text-lg px-4 py-2 my-4">
                      <button
                        onClick={() =>
                          this.setState({
                            showModal: true,
                            selectedValue: item.orgName,
                            selectedValue2: item._id,
                          })
                        }
                        className="bg-red-500 px-2 py-1 my-4 text-white rounded text-lg"
                      >
                        {" "}
                        + Add Users
                      </button>
                      <div>
                        {/* <button
                          onClick={() =>
                            this.setState({
                              showModal: true,
                              selectedValue: item.orgName,
                              selectedValue2: item._id,
                            })
                          }
                          className="bg-red-500 px-2 py-1  text-white rounded text-lg"
                        >
                          {" "}
                          - Retire Organization
                        </button> */}
                      </div>

                      <div>Organization : {item.orgName}</div>
                      <div>
                        Organization Users :
                        {item.franciseUsers.length > 0 ? (
                          <div className="text-md">
                            {item.franciseUsers.map((subItem, i) => (
                              <>
                                {i + 1}){console.log(subItem)}
                                {subItem.role == 7 ? (
                                  <div>(CORPORATE ACCOUNT)</div>
                                ) : (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDelete(subItem._id, item._id)
                                      }
                                      className="bg-red-500 px-2 py-1 my-4 text-white rounded text-lg mx-2"
                                    >
                                      {" "}
                                      Remove
                                    </button>
                                  </>
                                )}
                                <div>{subItem.name}</div>
                                <div>{subItem.email}</div>
                                <div>{subItem.phone}</div>
                              </>
                            ))}
                          </div>
                        ) : (
                          <div>No Admin Users Added Yet...</div>
                        )}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <div>No Orgs Created Yet.</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    auth: state.auth,
    adminEmployeeManagement: state.adminEmployeeManagement,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    newUser: (body) => dispatch(newUser(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(OrganizationManagement);
