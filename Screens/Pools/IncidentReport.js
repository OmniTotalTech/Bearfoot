import React from "react";
import SignaturePad from "react-signature-canvas";
import moment from "moment";
import api from "../../utils/api";
import { Stepper } from "react-form-stepper";
import { useEffect } from "react";
import StepOnePCR from "./Steps/StepOnePCR";
import { ScrollView } from "react-native";
import StepThreePCR from "./Steps/StepThreePCR";
import StepTwoPCR from "./Steps/StepTwoPCR";
import StepFourPCR from "./Steps/StepFourPCR";
import StepFivePCR from "./Steps/StepFivePCR";
import StepSixPCR from "./Steps/StepSixPCR";
import StepSevenPCR from "./Steps/StepSevenPCR";
import {connect} from "react-redux";
import BackButton from "../../Components/BackButton";

const IncidentReport = (props) => {

  useEffect(() => {

  }, [])

  const [activeStep, setActiveStep] = React.useState(1)

  const increase = () => {
    setActiveStep(activeStep + 1)
  }
  const decrease = () => {
    setActiveStep(activeStep - 1)
  }


  const [witnessArray, setWitnessArray] = React.useState([]);


  const [stepData,setStepData] = React.useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
  });

  const submitFormIR = async (e) => {
    e.preventDefault();

    let sd = stepData;

    sd.step5 = witnessArray;

    console.log(props)
    let body = {
      user_id: props.user._id,
      pool_id: props.route.params.id,
      recordType: "patientCare",
      date: moment().format("YYYY-MM-DD"),
      dataObject: sd,
    };
    console.log(body);
    await api
        .post("/records/incidentReport", body)
        .then((response) => {
          console.log(response);
          props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
        });

  };



  let displayStyle = (step) => {
    if (activeStep == step) {
      return {}
    } else {
      return { display: "none" }
    }
  }

  const handleStepData = (stepIndex,objectReceived) => {

    let currentData = stepData;

    currentData[stepIndex] = objectReceived

    setStepData(currentData)

  }
  return (

    <>
      <ScrollView>
        <BackButton navigation={props.navigation} />

        <div className=" mx-auto container">

          <div className="container p-4 text-2xl mx-auto">Patient Care Form</div>
          <form>
            <div style={displayStyle(1)}>
              <StepOnePCR setStepData={handleStepData} />
            </div>
            <div style={displayStyle(2)}>
              <StepTwoPCR  setStepData={handleStepData} />
            </div>
            <div style={displayStyle(3)}>
              <StepThreePCR setStepData={handleStepData} />
            </div>
            <div style={displayStyle(4)}>
              <StepFourPCR setStepData={handleStepData} />
            </div>
            <div style={displayStyle(5)}>
              <StepFivePCR setStepData={handleStepData} witnessArray={witnessArray} setWitnessArray={setWitnessArray} />
            </div>
            <div style={displayStyle(6)}>
              <StepSixPCR setStepData={handleStepData}  witnessArray={witnessArray}/>
            </div>
          </form>


          {/*    )}*/}
          <div className="w-full text-center my-4">


            {activeStep == 1 ? (
              <>
                <div className="display-inline mx-auto">
                  <button
                    className="p-4 text-white bg-red-500 rounded"
                    onClick={() => increase()}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : activeStep > 1 && activeStep < 6 ? (
              <div className="display-inline mx-auto">
                <button
                  className="p-4 text-white bg-red-500 rounded mx-2 "
                  onClick={() => decrease()}
                >
                  Previous
                </button>
                <button
                  className="p-4 text-white bg-red-500 rounded mx-2 "
                  onClick={() => increase()}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="display-inline mx-auto">
                <button
                  className="p-4 text-white bg-red-500 rounded mx-2"
                  onClick={() => decrease()}
                >
                  Previous
                </button>
                <button
                  className="p-4 text-white bg-red-500 rounded mx-2 "
                  onClick={submitFormIR}
                >
                  Final
                </button>
              </div>
            )}
          </div>
          <Stepper
            steps={[
              { label: "1" },
              { label: "2" },
              { label: "3" },
              { label: "4" },
              { label: "5" },
              { label: "6" },

            ]}
            activeStep={activeStep-1}
          />
        </div>
      </ScrollView>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(IncidentReport);
