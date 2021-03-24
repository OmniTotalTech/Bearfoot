import React, { Component } from "react";
import { ScrollView } from "react-native";
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
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}
        >
          {" "}
          <BackButton navigation={this.props.navigation} />
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
          <IncidentReportForm activeStep={this.state.activeStep} />
        </ScrollView>
      </>
    );
  }
}

export default IncidentReport;
