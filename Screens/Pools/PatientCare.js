import React, { Component } from "react";
import { Stepper } from "react-form-stepper";
import PatientCareForm from "./PatientCareForm";
import BackButton from "../../Components/BackButton";
class PatientCare extends Component {
  state = {
    activeStep: 1,
  };
  render() {
    console.log(this.state);
    return (
      <>
        {" "}
        <BackButton navigation={this.props.navigation} />
        <Stepper
          steps={[
            { label: "Step 1" },
            { label: "Step 2" },
            { label: "Step 3" },
          ]}
          activeStep={this.state.activeStep}
        />
        <PatientCareForm activeStep={this.state.activeStep} />
        {this.state.activeStep == 1 ? (
          <>
            <div className="display-inline mx-auto">
              <button
                className="p-4 text-white bg-red-500 rounded"
                onClick={() =>
                  this.setState({ activeStep: this.state.activeStep + 1 })
                }
              >
                Next
              </button>
            </div>
          </>
        ) : this.state.activeStep == 2 ? (
          <div className="display-inline mx-auto">
            <button
              className="p-4 text-white bg-red-500 rounded mx-2 "
              onClick={() =>
                this.setState({ activeStep: this.state.activeStep - 1 })
              }
            >
              Previous
            </button>
            <button
              className="p-4 text-white bg-red-500 rounded mx-2 "
              onClick={() =>
                this.setState({ activeStep: this.state.activeStep + 1 })
              }
            >
              Next
            </button>
          </div>
        ) : (
          <div className="display-inline mx-auto">
            <button
              className="p-4 text-white bg-red-500 rounded mx-2"
              onClick={() =>
                this.setState({ activeStep: this.state.activeStep - 1 })
              }
            >
              Previous
            </button>
            <button
              className="p-4 text-white bg-red-500 rounded mx-2 "
              onClick={() => console.log("Final")}
            >
              Final
            </button>
          </div>
        )}
      </>
    );
  }
}

export default PatientCare;
