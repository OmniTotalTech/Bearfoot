import React, { Component } from "react";
import api from "../../utils/api";
import ChemicalLogFormContainer from "./ChemicalLogFormContainer";
import { connect } from "react-redux";

class ChemicalLog extends Component {
  state = { timeArray: [], formObject: {} };

  async componentDidMount() {
    await api
      .get("/chemTimes/" + this.props.route.params.id)
      .then((response) => {
        console.log(response.data);
        if (
          response.data.data.chemTimeData &&
          response.data.data.chemTimeData.length > 0
        ) {
          this.setState({ timeArray: response.data.data.chemTimeData });
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  }

  render() {
    const onSubmit = async (body) => {
      let url = "/records/checklist";

      await api
        .post(url, body)
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log(errorMsg);
        });
    };
    const loadSubPools = async () => {
      let body = {
        poolId: this.props.route.params.id,
        subPoolName: this.state.newSubPoolString,
      };

      await api
        .get("/subPools/" + this.props.id)
        .then((response) => {
          console.log(response);
          this.setState({ subPools: response.data });
          this.setState({ newSubPoolString: "" });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    };
    return (
      <>
        <ChemicalLogFormContainer
          navigation={this.props.navigation}
          user={this.props.user}
          onSubmit={onSubmit}
          timeArray={this.state.timeArray}
          id={this.props.route.params.id}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(ChemicalLog);
