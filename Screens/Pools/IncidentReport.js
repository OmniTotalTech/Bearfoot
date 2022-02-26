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
<<<<<<< HEAD

=======
          <Stepper
            steps={[
              { label: "1" },
              { label: "2" },
              { label: "3" },
              { label: "4" },
              { label: "5" },
              { label: "6" },
              { label: "7" },
            ]}
            activeStep={this.state.activeStep}
          />
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
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
