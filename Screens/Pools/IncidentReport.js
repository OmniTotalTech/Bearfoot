import React, { Component } from "react";
import { Stepper } from "react-form-stepper";
import PatientCareForm from "./PatientCareForm";
import BackButton from "../../Components/BackButton";
import IncidentReportForm from "./IncidentReportForm";
class IncidentReport extends Component {
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
            { label: "Patient Information" },
            { label: "Step 2" },
            { label: "Step 3" },
            { label: "Step 4" },
            { label: "Step 5" },
            { label: "Step 6" },
            { label: "Step 7" },
          ]}
          activeStep={this.state.activeStep}
        />
        <IncidentReportForm activeStep={this.state.activeStep} />
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
        ) : this.state.activeStep > 1 && this.state.activeStep < 6 ? (
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

export default IncidentReport;
