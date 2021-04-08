import React, { Component } from "react";
import api from "../../utils/api";

class OrganizationManagement extends Component {
  async componentDidMount() {
    await api
      .get("organizationManagement/")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  }
  render() {
    return (
      <div>
        <div className="container"></div>
      </div>
    );
  }
}

export default OrganizationManagement;
