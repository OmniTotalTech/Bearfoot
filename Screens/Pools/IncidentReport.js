import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Stepper } from "react-form-stepper";
import PatientCareForm from "./PatientCareForm";
import BackButton from "../../Components/BackButton";
import IncidentReportForm from "./IncidentReportForm";
import { connect } from "react-redux";

class IncidentReport extends Component {
  state = {
    activeStep: 1,
  };
  increase = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };
  decrease = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };
  render() {
    console.log(this.state);
    return (
      <>
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}
        >
          {" "}
          <BackButton navigation={this.props.navigation} />

          <IncidentReportForm
            increase={this.increase}
            decrease={this.decrease}
            activeStep={this.state.activeStep}
            navigation={this.props.navigation}
            id={this.props.route.params.id}
            user_id={this.props.user._id}
          />
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(IncidentReport);
