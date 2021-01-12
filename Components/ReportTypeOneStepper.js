import React, { Component } from "react";
import ReportFormConfirm from "./ReportFormConfirm";
import ReportFormOne from "./ReportFormOne";
import ReportFormTwo from "./ReportFormTwo";

export default class ReportTypeOneStepper extends Component {
  state = {
    step: 1,
    inputFieldOne: "",
    inputFieldTwo: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  //   handleChange = () => {
  //     const { inputFieldOne } = this.state;
  //     this.setState({ inputFieldOne: inputFieldOne.e.target.value });
  //   };

  //   handleChange = (input) => (e) => {
  //     this.setState({ [input]: e.target.value });
  //   };

  render() {
    const { step } = this.state;
    const { inputFieldOne, inputFieldTwo } = this.state;
    // const values = { inputFieldOne, inputFieldTwo };

    switch (step) {
      case 1:
        return (
          <ReportFormOne
            nextStep={this.nextStep}
            // handleChange={this.handleChange}
            // values={values}
          />
        );
      case 2:
        return (
          <ReportFormTwo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            // handleChange={this.handleChange}
            // values={values}
          />
        );
      case 3:
        return <ReportFormConfirm prevStep={this.prevStep} />;
    }
  }
}
