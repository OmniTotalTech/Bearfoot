import React, { Component } from "react";
import Modal from "react-modal";
import EmployeeList from "./Admin/ManagerList";
import api from "../utils/api";
class SearchAndAssign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      employeeList: [],
    };
  }
  openModal() {
    this.setState({ isModalOpen: true });

    console.log(this.state);
    console.log(this.props);
  }
  closeModal() {
    this.setState({ isModalOpen: false });
    console.log(this.props);
    this.props.fetchPoolById(this.props.poolId);
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
  }
  async handleSubmit(e, props) {
    e.preventDefault();

    if (this.props.title == "managers") {
      await api
        .get(
          "users/orgEmployees/" +
          this.props.orgName +
          "/" +
          this.state.searchTerm
        )
        .then((response) => {
          console.log(response);
          this.setState({ employeeList: response.data.data });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    } else {
      console.log(this.state);
      await api
        .get(`users/orgEmployees/${this.props.orgName}/${this.state.searchTerm}/search`)
        .then((response) => {
          console.log(response);
          this.setState({ employeeList: response.data.data });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    }
  }
  render() {
    console.log(this.props);
    return (
      <>
        <div className={"w-full"}>
          <div className={"mx-auto container bg-red-500"}>
        <p className="text-3xl text-left bold px-4 text-white">
          {this.props.title}
          <button
            onClick={() => {
              this.openModal();
            }}
            className="px-2 my-4 mx-2 bg-red-700 text-left text-white rounded"
          >
            +
          </button>
        </p>
          </div>
        </div>
        <Modal
          {...this.props}
          isOpen={this.state.isModalOpen}
          style={{ width: "100%" }}
        >
          <button
            className="text bg-gray-600 p-2 rounded text-white"
            onClick={() => {
              this.closeModal();
            }}
          >
            close
          </button>

          <form onSubmit={() => this.handleSubmit(event, this.props)}>
            <div className="mx-auto container max-w-2xl shadow-md mx-4">
              <div className="bg-white space-y-6 mt-4">
                <div>
                  <p className={"text-xl"}>Search for employees in the Organization: {this.props.orgName}</p>
                  <p className={"text-md text-light"}>You can only assign employees that are in this organization.</p>
                </div>

                <input
                  onChange={(e) => this.handleChange(e)}
                  className="w-full p-2"
                  placeholder="Search By Name"
                />
              </div>
              <div >
                <button
                    type="submit"
                    className="bg-red-500 text-white p-2 rounded text-md my-2"
                >
                  Search Name
                </button>
              </div>
            </div>

          </form>
          <div className="container max-w-3xl ">

            <EmployeeList
              assignGroup={this.props.title}
              poolId={this.props.poolId}
              closeModal={() => this.closeModal()}
              employees={this.state.employeeList}
            />
          </div>
        </Modal>
      </>
    );
  }
}

export default SearchAndAssign;
