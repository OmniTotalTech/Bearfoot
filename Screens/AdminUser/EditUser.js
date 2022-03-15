import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../redux/actions/auth";
import api from "../../utils/api";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, Card } from "react-native";
import BackButton from "../../Components/BackButton";
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { name: "", role: 0}, value: 1, deletePrompt: false, isDisabledReason: "", initSearch: false, searchType: "employee", tableVisible: false, searchData: [], addSearch: false, addNewSearchText: '', searchDataRcvd: [] };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePoolSearchStart = this.handlePoolSearchStart.bind(this)
    this.handlePoolSearchEnd = this.handlePoolSearchEnd.bind(this);

    this.handlePoolSearchText = this.handlePoolSearchText.bind(this);
  }
  componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    await api
      .get("/users/" + this.props.route.params.id)
      .then((response) => {
        console.log("userRole", response.data.data.role);
        this.setState({
          user: response.data.data,
          value: response.data.data.role,
        });
      })
      .catch((err) => console.log(err));
  }

  onChange(val) {
    console.log(val);
    this.setState({ value: val });
  }
  submit = async (e) => {
    e.preventDefault();
    console.log(this.state.value);
    const body = {
      role: this.state.value,
    };
    console.log(body)
    await api
      .patch("/users/" + this.props.route.params.id, body)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
    this.props.navigation.navigate("SuccessScreen");
  };

  handleUserDelete(id) {
    api.patch(`/users/${id}`, { isDisabled: true, isDisabledReason: this.state.isDisabledReason })
      .then((res) => {
        console.log(res.data);
        this.props.navigation.navigate("SuccessScreenAll")
      }).catch((err) => console.log(err))
  }

  submitSearch = async () => {
    await api.get("/assignedPools/" + this.state.user._id + "/" + this.state.searchType)
      .then((response) => {
        console.log(response.data);
        this.setState({ tableVisible: true, searchData: response.data })

      })

  }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSearchChange(event) {
    this.setState({
      searchType: event.target.value
    })
  }

  handlePoolSearchStart() {
    this.setState({
      addSearch: true,
    })
  }
  handlePoolSearchEnd() {
    this.setState({
      addSearch: false
    })
  }
  async handlePoolSearchText() {
    await api.get("/poolSearch/" + this.state.addNewSearchText)
      .then((response) => {
        console.log(response.data)
        this.setState({
          initSearch: true,
          searchDataRcvd: response.data
        })
      })
  }
  roles = [
    {
      name: "Employee",
      value: 1,
    },
    {
      name: "Manager",
      value: 3,
    },
    {
      name: "Area Manager",
      value: 4,
    },
  ];

  sortChoices = ["employee", "manager"]

  SwitchResult(role) {
  console.log("role", role)
    switch (role) {
      case 1:
        return "Employee"
      case 3:
        return "Manager"
      case 4:
        return "Area Manager"
      case 6:
        return "Franchise User"
      case 7:
        return "Organization User"
      case 666:
        return "Super Developer"
      default:
        return "Role Not Set."
    }
  }

  whichIsChecked(role, compare) {
    if (role == compare) return true
    else return false
  }
  render() {
    const { tableVisible, initSearch, searchData, addSearch, addNewSearchText, searchDataRcvd } = this.state;

    return (
      <>
        <ScrollView>
          <BackButton navigation={this.props.navigation} />

          <div className="container mx-auto p-4 rounded-br-lg my-8">
            <p className="text-md">
              You are now managing
              <span className="text-red-500 mx-2">{this.state.user.name}</span>
            </p>
            <div className="container mx-auto text-center rounded-br-lg">
              <div className="bg-white mt-4 rounded-br-lg rounded-bl-lg rounded-tr-lg ">
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                    alt="..."
                    style={{ height: "250px", width: "250px" }}
                    className="shadow rounded-full w-full mx-auto"
                  />
                </div>
                <div className="text-lg  p-2">{this.state.user.name}</div>
                <div className="text-lg  p-2">{this.state.user.phone}</div>
                <div className="text-lg  p-2">{this.state.user.email}</div>
              </div>
            </div>
            {this.props.user.role > 3? (
              <>
                <p className="text-md">Current Role: {this.SwitchResult(this.state.value)}</p>
                <p className="text-md pt-4 -pb-1" style={{ fontSize: 24 }}>Assign Role:</p>
                <form>
                <div className="bg-white mt-4 grid grid-cols-3">
                  {/* <select
                onChange={this.handleChange}
                value={this.state.value}
                className=" text-sm"
              >
                {this.roles.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </select> */}


                  <div className="card px-4 my-4 bg-gray-200  mx-2">
                    <div className="card-header text-red-500  ">
                      <input type="radio" onChange={e => this.setState({user: {role : e.target.value}, value: e.target.value})} checked={this.whichIsChecked(this.state.user.role, 1)} value={1} />
                      <h3 className="text-2xl">Employee</h3>
                    </div>
                    <p className="text-md">A general purpose classification for users who need minimal permissions to get started with operations. These users can be assigned to pools as either employees, managers, or either forms of driver.</p>
                  </div>
                  <div className="card px-4 my-4 bg-gray-200 mx-2">
                    <div className="card-header text-red-500">
                      <input type="radio" onChange={e => this.setState({user: {role : e.target.value}, value: e.target.value})}  value={3} checked={this.whichIsChecked(this.state.user.role, 3)}  value={3}/>
                      <h3 className="text-2xl">Manager</h3>
                    </div>
                    <p className="text-md">An elevated permission role intended to extend specific pool operation functions. These users can view records as well as view more privledged information.</p>
                  </div>
                  <div className="card px-4 my-4 bg-gray-200  mx-2">
                    <div className="card-header text-red-500">
                      <input type="radio"  onChange={e => this.setState({user: {role : e.target.value}, value: e.target.value})} checked={this.whichIsChecked(this.state.user.role, 4)} value={4} />
                      <h3 className="text-2xl">Area Manager</h3>
                    </div>
                    <p className="text-md">The highest level of employee access. This permits access to areas within organizations the user is assigned to, as well as records and other higher level management access.</p>
                  </div>
                  <br />
                  <button
                    onClick={(e) => this.submit(e)}
                    className="bg-red-500 p-2 m-2 text-white rounded"
                  >
                    Update
                  </button>
                </div>
                </form>
              </>
            ) : (
              <div></div>
            )}

            <div className="mt-4">

              <h1 className="font-weight-900" style={{ fontSize: 24 }}>Pools Assigned to User</h1>

              <div className="my-4 ">

                {addSearch ? (
                  <>
                    <div className="bg-white">
                      <div className="my-4 ">

                        <button
                          onClick={this.handlePoolSearchEnd}
                          className="bg-red-500 p-2  text-white rounded"
                        >
                          - Add to a pool
                        </button>
                      </div>
                      <br />
                      <p style={{ "fontSize": 24 }} className="font-weight-500 text-lg-left">Search Pools By Name:{' '}</p>
                      <input className="my-4 border shadow-lg border-primary" type="text" value={addNewSearchText} onChange={(e) => this.setState({ addNewSearchText: e.target.value })} />
                      <br />
                      <button
                        onClick={this.handlePoolSearchText}
                        className="bg-red-500 p-2 mb-2 mx-2 text-white rounded"
                      >
                        Search for Pools
                      </button>

                      {searchDataRcvd.length > 0 ? (
                        <div style={{ "maxHeight": 400, "overflow": "scroll" }} className="p-4 bg-gray-400 m-4">

                          {searchDataRcvd.map((item, i) => (
                            <>
                              <p className="header">{i + 1}){' '}</p>
                              <div className="rounded bg-white p-2 my-1">
                                <p style={{ fontSize: 24 }} className="display-1">
                                  {item.pool_name}
                                </p>
                                <p style={{ fontSize: 20 }} className="display-1">
                                  <i>{item.pool_address}</i>
                                </p>
                                <p style={{ fontSize: 14 }} className="display-1">
                                  Organization: {item.pool_organization}
                                </p>
                                <p style={{ fontSize: 14 }} className="display-1">
                                  Area: {item.area_name}
                                </p>
                                {item.pool_employees.includes(this.state.user._id) ?
                                  (<p className="text-red-500">Already an Employee</p>) : (
                                    <button onClick={() => this.handleAddToPoolClick(item._id, "employee")} className="btn p-2 rounded text-white font-lg bg-red-500 btn-danger">Add To Pool (Employee)</button>
                                  )}
                                {item.pool_managers.includes(this.state.user._id) ? (
                                  <p className="text-red-500">Already a Manager</p>) : (
                                  <button onClick={() => this.handleAddToPoolClick(item._id, "manager")} className="btn p-2 rounded text-white font-lg bg-red-500 btn-danger">Add To Pool (Manager)</button>
                                )}
                              </div>
                            </>
                          ))}
                        </div>
                      ) : (initSearch ? (<p>no results.</p>) : (<></>))}
                    </div>
                  </>
                ) : (<>
                  <button
                    onClick={this.handlePoolSearchStart}
                    className="bg-red-500 p-2  text-white rounded"
                  >
                    + Add to a pool
                  </button>


                </>


                )

                }
              </div>
              <br />
              <div className="bg-white p-4">
                <button
                  onClick={this.submitSearch}
                  className="bg-red-500 p-2 m-2 text-white rounded"
                >
                  + Search
                </button>
                <select
                  onChange={this.handleSearchChange}
                  value={this.state.searchType}
                  className=" text-sm"
                  defaultValue={"employee"}
                >
                  {this.sortChoices.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="container mx-auto mb-4">

            {tableVisible ? (
              <>
                {searchData.length > 0 ? (<p style={{ "fontSize": "24px" }} className=" display text-lg-left font-lg">Pools for user</p>) : (<p>No Pools Found</p>)}

                <div style={{ "maxHeight": 350, "overflow": "scroll" }} className="p-4 bg-gray-300">
                  {searchData.map((item, i) => (
                    <>
                      <p className="header">{i + 1}){' '}</p>
                      <div className="rounded bg-white p-2 my-1">
                        <p style={{ fontSize: 24 }} className="display-1">
                          {item.pool_name}
                        </p>
                        <p style={{ fontSize: 20 }} className="display-1">
                          <i>{item.pool_address}</i>
                        </p>
                        <p style={{ fontSize: 14 }} className="display-1">
                          Organization: {item.pool_organization}
                        </p>
                        <p style={{ fontSize: 14 }} className="display-1">
                          Area: {item.area_name}
                        </p>
                        <button onClick={() => this.handleRemoveFromPoolClick(item._id)} className="btn p-2 rounded text-white font-lg bg-red-500 btn-danger">remove from pool</button>
                      </div>


                    </>
                  ))}
                </div>
              </>
            ) : (<div></div>)}
            {this.props.user.role > 5 ? (
            <div className="mt-4">
              <h1 className="font-weight-900" style={{ fontSize: 24 }}>Delete This User</h1>
              <p className="text-sm">Deleting this user will archive their information, and disable their user account.</p>
              {this.state.deletePrompt ? (
                <>

                  <textarea className="w-full" onChange={(e) => this.setState({ isDisabledReason: e.target.value })} row={2} />

                  <button
                    onClick={() => this.setState({ deletePrompt: false })}
                    className="bg-blue-500 p-2 m-2 text-white rounded"
                  >
                    Cancel
                  </button>
                  {this.state.isDisabledReason.length > 10 ? (
                    <button
                      onClick={() => this.handleUserDelete(this.state.user._id)}
                      className="bg-red-500 p-2 m-2 text-white rounded"
                    >
                      Press to Continue Deleting This User
                    </button>
                  ) : (<></>)}

                </>
              ) : (
                <button
                  onClick={() => this.setState({ deletePrompt: true })}
                  className="bg-red-500 p-2 m-2 text-white rounded"
                >
                  Do you want to delete this user?
                </button>
              )}

            </div>
                ):(<></>)}

          </div>

        </ScrollView>
      </>
    );
  }

  async handleRemoveFromPoolClick(_id) {
    await api.patch(`/assignedPools/${this.state.user._id}/${this.state.searchType}/${_id}`)
      .then(response => {
        this.submitSearch();
      })
  }

  async handleAddToPoolClick(_id, type) {
    await api.post(`/assignedPools/${this.state.user._id}/${type}/${_id}`)
      .then(response => {
        this.handlePoolSearchText()
      })

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDisptachToProps)(EditUser);
