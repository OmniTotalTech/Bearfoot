import React, { Component } from "react";
import { Stepper } from "react-form-stepper";
import PatientCareForm from "./PatientCareForm";
import BackButton from "../../Components/BackButton";
import { connect } from "react-redux";

class PatientCare extends Component {
  state = {
    activeStep: 1,
<<<<<<< HEAD
      patronInfoState: []
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
  };
  render() {
    const handleFinalSubmit = (formValues) => {
      console.log(formValues);
    };
<<<<<<< HEAD
=======
    console.log(this.state);
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
    return (
      <>
        <BackButton navigation={this.props.navigation} />
        <Stepper
          steps={[{ label: "1" }, { label: "2" }, { label: "3" }]}
          activeStep={this.state.activeStep}
        />
        <PatientCareForm
          navigation={this.props.navigation}
          id={this.props.route.params.id}
          onFinalSubmit={handleFinalSubmit}
          activeStep={this.state.activeStep}
          user_id={this.props.user._id}
<<<<<<< HEAD
          updateState={(newArray) => this.setState({patronInfoArray: newArray})}
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
          nextStep={(newStep) => this.setState({ activeStep: newStep })}
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
export default connect(mapStateToProps)(PatientCare);
