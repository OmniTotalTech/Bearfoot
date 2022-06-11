import React, { Component } from "react";
import api from "../../utils/api";
import slugify from "react-slugify";
import Modal from "react-modal";
import NewEmployeeModalBodyNew from "../../Components/Employee/NewEmployeeModalBodyNew";
import { newUser } from "../../redux/actions/auth";
import { connect } from "react-redux";
import ReactTable from "react-table";

class OrganizationManagement extends Component {
  state = {
    showNewInput: false,
    inputText: "",
    submitting: false,
    newUserText: "",
    selectedValue: "",
    selectedValue2: "",
    selectedOrg: {},
    orgArray: [],
    showEmployeesListModal: false,
    showEditModal: false
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
      console.log('LOADINGDAATA')
      await api
        .get("organizationManagement/")
        .then((response) => {
          console.log(response);
          this.setState({ orgArray: response.data, showEmployeesListModal: false });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    };
    const handleDisable = async (id) => {
      await api
        .delete("organizationManagement/" + id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.message);
        });
      reLoad();
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
    const filterCaseInsensitive = (filter, row) => {
      const id = filter.pivotId || filter.id;
      const content = row[id];
      if (typeof content !== 'undefined') {
        // filter by text in the table or if it's a object, filter by key
        if (typeof content === 'object' && content !== null && content.key) {
          return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
        } else {
          return String(content).toLowerCase().includes(filter.value.toLowerCase());
        }
      }

      return true;
    };
    const columns = [
      {
        Header: "Organization:",
        accessor: "orgName",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Manage",
        Cell: ((porps) => {
          return (
            <>
              <div className="w-full grid grid-cols-3">
                {/* {porps.original.orgName} */}
                <div>
                  <button onClick={() => this.setState({ showEmployeesListModal: true, selectedOrg: porps.original })} className="btn btn-danger w-full
                   mx-2 btn-block bg-gray-500 font-2xl text-white p-4">Employees</button>
                </div>
                <div className="w-full">
                  <button onClick={() => this.setState({ showEditModal: true })} className="btn btn-danger w-full
                   mx-2 btn-block bg-blue-500 font-2xl text-white p-4">Edit</button>
                </div>
                <div>
                  <button onClick={() => handleDisable(porps.original._id)} className="btn btn-danger w-full
                   mx-2 btn-block bg-red-500 font-2xl text-white p-4">Disable</button>
                </div>

              </div>
            </>
          )
        })
      },


      // {
      //   Header: "Approved",
      //   accessor: "isApproved",
      //   Cell: (porps) => {
      //     return <div>{switchStatement(porps.original.isApproved)}</div>;
      //   },
      //   // width: 100,
      // },

    ];
    const columnsEmployee = [

      {
        Header: "Name:",
        accessor: "name",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Email:",
        accessor: "email",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },

      {
        Header: "Phone:",
        accessor: "Phone",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },


      // {
      //   Header: "Approved",
      //   accessor: "isApproved",
      //   Cell: (porps) => {
      //     return <div>{switchStatement(porps.original.isApproved)}</div>;
      //   },
      //   // width: 100,
      // },

    ];

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
                  isOpen={this.state.showEmployeesListModal}
                  style={{ width: "100%" }}
                >
                  <button
                    className="text bg-gray-600 p-2 rounded text-white"
                    onClick={() => {
                      this.setState({ showEmployeesListModal: false });
                    }}
                  >
                    close
                  </button>
                  <div className="w-full">
                    <div className="container">
                      <h3>Name : {this.state.selectedOrg.orgName}</h3>
                      <button
                        onClick={() =>
                          this.setState({
                            showModal: true,
                            selectedValue: this.state.selectedOrg.orgName,
                            selectedValue2: this.state.selectedOrg._id,
                          })
                        }
                        className="bg-red-500 px-2 py-1 my-4 text-white rounded text-lg"
                      >
                        {" "}
                        + Add Users
                      </button>
                      {this.state.showModal ? (
                        <>
                          <NewEmployeeModalBodyNew
                            user={this.props.user}
                            selectedValue={this.state.selectedValue}
                            selectedValue2={this.state.selectedValue2}
                            newUser={this.props.newUser}
                            auth={this.props.auth}
                            org={this.state.selectedOrg.orgName}
                            setLocalState={(value) =>
                              this.setState({ modalMessage: value })
                            }
                            reLoad={reLoad}
                            closeModal={() => this.setState({ showModal: false })}
                          />
                        </>
                      ) : (
                        <>
                        </>)}
                      <h4>
                        <ReactTable
                          className="-striped -highlight"
                          data={
                            this.state.selectedOrg.franciseUsers?.length > 0
                              ? this.state.selectedOrg.franciseUsers
                              : []
                          }
                          filterable
                          defaultFilterMethod={filterCaseInsensitive}

                          columns={columnsEmployee}
                          defaultPageSize={50}
                        >
                          {(state, makeTable, instance) => {
                            this.reactTable = state.pageRows.map((modem) => {
                              return modem._original;
                            });
                            return <div>{makeTable()}</div>;
                          }}
                        </ReactTable>
                      </h4>


                    </div>
                  </div>
                </Modal>
                <Modal
                  {...this.props}
                  ariaHideApp={false}
                  isOpen={this.state.showEditModal}
                  style={{ width: "100%" }}
                >
                  <button
                    className="text bg-gray-600 p-2 rounded text-white"
                    onClick={() => {
                      this.setState({ showEditModal: false });
                    }}
                  >
                    close
                  </button>

                  <div className="w-full">
                    <div className="container mx-auto max-w-md text-center">
                      <h1 className="my-2" style={{ fontSize: 42 }}>Sorry! {this.state.selectedOrg.orgName} cannot be changed.</h1>
                      <h3 styles={{ fontSize: 32 }}>Unfortunately, the name of this franchise organization is unable to be modified, as data is tied to the slug generated. If you need records under a different name, you will have to create a new entity.</h3>
                    </div>
                  </div>
                </Modal>
                <ReactTable
                  className="-striped -highlight"
                  data={
                    this.state.orgArray.length > 0
                      ? this.state.orgArray
                      : []
                  }
                  filterable
                  defaultFilterMethod={filterCaseInsensitive}

                  columns={columns}
                  defaultPageSize={50}
                >
                  {(state, makeTable, instance) => {
                    this.reactTable = state.pageRows.map((modem) => {
                      return modem._original;
                    });
                    return <div>{makeTable()}</div>;
                  }}
                </ReactTable>

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
