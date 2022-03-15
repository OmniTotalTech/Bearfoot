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

  // witness Information Step 5
  const [sampleArray, setSampleArray] = React.useState([]);

  //Signatures Step 6
  const [filerSignature, setTrimmedDataURL] = React.useState("");
  const [manFilerSignature, setTrimmedDataURL2] = React.useState("");
  const [supFilerSignature, setTrimmedDataURL3] = React.useState("");

  let sampleAnnagram = ["S", "A", "M", "P", "L", "E"];
  let sigPad = {};
  let sigPad2 = {};
  let sigPad3 = {};

  let setInjuryListFunction = (value, item, injuryType) => {
    let oldArray = injuryList;
    let newElement = { type: injuryType, checked: value, value: item };
    setSampleArray([...oldArray, newElement]);

    console.log(injuryList);
  };
  let setSample = (value, item) => {
    let oldArray = sampleArray;
    let newElement = { letter: item, value: value };
    setInjuryList([...oldArray, newElement]);
  };

  let trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
  };
  let trim2 = () => {
    setTrimmedDataURL2(sigPad2.getTrimmedCanvas().toDataURL("image/png"));
  };
  let trim3 = () => {
    setTrimmedDataURL3(sigPad3.getTrimmedCanvas().toDataURL("image/png"));
  };

  const handleAdultChange = (e) => {
    console.log(e.target.value)
    setLegalAdult(e.target.value);
    console.log(legalAdult)
  }
  const submitFormIR = async (e) => {
    e.preventDefault();
    let dataBody = {}
    let dataObject = dataBody;
    let body = {
      user_id: props.user_id,
      pool_id: props.id,
      recordType: "incidentReport",
      date: moment().format("YYYY-MM-DD"),
      dataObject: dataObject,
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

  function LegalAdultChoice(props) {
    console.log(props);
    if (props.legalAdult == 'false') {
      return (
        <>
          <div>
            <br />
            <label className="text-md">Guardian name:</label>
            <br />

            <input
              type="text"
            // value={hospitalName}
            // onChange={(e) => setHospitalName(e.target.value)}
            />
            <br />

            <label className="text-md">Contact phone number for guardian:</label>
            <br />

            <input
              type="text"
            // value={hospitalName}
            // onChange={(e) => setHospitalName(e.target.value)}
            />
          </div>
        </>
      )
    } else {
      return (
        <></>
      )

    }

  }


  let displayStyle = (step) => {
    if (activeStep == step) {
      return {}
    } else {
      return { display: "none" }
    }
  }
  return (

    <>
      <ScrollView>
        <div className=" mx-auto container">

          <div className="container p-4 text-2xl mx-auto">Patient Care Form</div>
          <form>
            <div style={displayStyle(1)}>
              <StepOnePCR />
            </div>
            <div style={displayStyle(2)}>
              <StepTwoPCR />
            </div>
            <div style={displayStyle(3)}>
              <StepThreePCR />
            </div>
            <div style={displayStyle(4)}>
              <StepFourPCR />
            </div>
            <div style={displayStyle(5)}>
              <StepFivePCR witnessArray={witnessArray} setWitnessArray={setWitnessArray} />
            </div>
            <div style={displayStyle(6)}>
              <StepSixPCR />
            </div>
            <div style={displayStyle(7)}>
              <StepSevenPCR />
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
            activeStep={activeStep}
          />
        </div>
      </ScrollView>
    </>
  );
};

export default IncidentReport;
