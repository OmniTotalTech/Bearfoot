import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../redux/actions/auth";
import api from "../../utils/api";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { name: "" }, value: 1 };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    console.log(this.props.id);
    await api
      .get("/users/" + this.props.route.params.id)
      .then((response) => {
        console.log(response.data.data);
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
  submit = async () => {
    console.log(this.state.value);
    const body = {
      role: this.state.value,
    };
    await api
      .patch("/users/" + this.props.route.params.id, body)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
    this.props.navigation.navigate("SuccessScreen");
  };
  handleChange(event) {
    this.setState({ value: event.target.value });
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
  render() {
    console.log(this.props.route.params.id);
    return (
      <>
        <div className="container mx-auto p-4 rounded-br-lg">
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
          <p className="text-md pt-4 -pb-1">Assign Role:</p>
          <br />
          <select
            onChange={this.handleChange}
            value={this.state.value}
            className=" text-sm"
          >
            {this.roles.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
          </select>
          <br />
          <button
            onClick={this.submit}
            className="bg-red-500 p-2 m-2 text-white rounded"
          >
            Update
          </button>
        </div>
      </>
    );
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
