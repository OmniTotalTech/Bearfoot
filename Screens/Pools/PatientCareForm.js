<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import SignaturePad from "react-signature-canvas";
import moment from "moment";
import api from "../../utils/api";
import PatientCareFormRendering from "./PatientCareFormRendering";
const PatientCareForm = (props) => {
  const [patronInfoArray, setPatronInfoArray] = React.useState([{ name: "", phone: null, email: "" }]);
=======
import React from "react";
import SignaturePad from "react-signature-canvas";
import moment from "moment";
import api from "../../utils/api";
const PatientCareForm = (props) => {
  const [patronName, setPatronName] = React.useState("");
  const [patronEmail, setPatronEmail] = React.useState("");
  const [patronPhone, setPatronPhone] = React.useState("");
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
  const [eventDescription, setEventDescription] = React.useState("");
  const [resDescription, setResDescription] = React.useState("");
  const [trimmedDataURL, setTrimmedDataURL] = React.useState();
  const [trimmedDataURL2, setTrimmedDataURL2] = React.useState();
<<<<<<< HEAD
  const [trimmedDataURLArray, setTrimmedDataURLArray] = React.useState([])
  const [allSigs, setAllSigs] = useState([])


  useEffect(() => {

  }, [patronInfoArray, allSigs])


  console.log(props);
  const handleFinalSubmit = async () => {
    console.log(allSigs)
    let body1 = {
      patronInfo: allSigs,
      eventDescription: eventDescription,
      resDescription: resDescription,
=======

  let sigPad = {};
  let sigPad2 = {};

  let trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
    console.log(trimmedDataURL);
  };
  let trim2 = () => {
    setTrimmedDataURL2(sigPad2.getTrimmedCanvas().toDataURL("image/png"));
    console.log(trimmedDataURL2);
  };
  console.log(props);
  const handleFinalSubmit = async () => {
    let body1 = {
      patronName: patronName,
      patronEmail: patronEmail,
      patronPhone: patronPhone,
      eventDescription: eventDescription,
      resDescription: resDescription,
      trimmedDataURL: trimmedDataURL,
      trimmedDataURL2: trimmedDataURL2,
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
    };

    let body = {
      pool_id: props.id,
<<<<<<< HEAD
      recordType: "incidentReport",
=======
      recordType: "patientCare",
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
      date: moment().format("YYYY-MM-DD"),
      dataObject: body1,
      user_id: props.user_id,
    };
    await api
<<<<<<< HEAD
      .post("/records/incidentReport", body)
=======
      .post("/records/patientCare", body)
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
      .then((response) => {
        console.log(response);
        props.navigation.navigate("SuccessScreen");
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
<<<<<<< HEAD
    console.log(body1);
  };

  function handleAddPatronInfo() {
    console.log("adding user")
    let currentPatrons = patronInfoArray;
    let body = {
      name: "",
      phone: null,
      email: ""
    }
    currentPatrons.push(body)
    props.updateState(currentPatrons);
  }
  function updatePatronArray(patronObject, index) {
    console.log(patronObject)
    let currentPatrons = patronInfoArray;

    currentPatrons[index] = patronObject;

    props.updateState(currentPatrons);
  }
  function handleRemovePatronInfo(i) {
    let currentPatrons = patronInfoArray;
    currentPatrons.splice(0, 1);
    setPatronInfoArray(currentPatrons)
  }

=======
    console.log(body);
  };
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
  return (
    <>
      <div className="overflow-scroll">
        <div className="container p-4 text-2xl mx-auto text-center">
          Incident Report Form
        </div>
<<<<<<< HEAD

        <div className="container w-full mx-auto">
          <PatientCareFormRendering handleFinalSubmit={handleFinalSubmit} allSigs={allSigs} setAllSigs={setAllSigs} trimmedDataURLArray={trimmedDataURLArray} setTrimmedDataURLArray={setTrimmedDataURLArray} eventDescription={eventDescription} setEventDescription={setEventDescription} setResDescription={setResDescription} resDescription={resDescription} updatePatronArray={updatePatronArray} activeStep={props.activeStep} patronInfoArray={patronInfoArray} handleAddPatronInfo={handleAddPatronInfo} nextStep={props.nextStep} />
        </div>

=======
        <div className="container w-full mx-auto">
          <div className="mx-auto text-center">
            {props.activeStep == 1 ? (
              <>
                <div className="display-inline mx-auto">
                  <button
                    className="p-4 text-white bg-red-500 rounded"
                    onClick={() => props.nextStep(props.activeStep + 1)}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : props.activeStep == 2 ? (
              <div className="display-inline mx-auto">
                <button
                  className="p-4 text-white bg-red-500 rounded mx-2 "
                  onClick={() => props.nextStep(props.activeStep - 1)}
                >
                  Previous
                </button>
                <button
                  className="p-4 text-white bg-red-500 rounded mx-2 "
                  onClick={() => props.nextStep(props.activeStep + 1)}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="display-inline mx-auto my-4">
                <button
                  className="p-4 text-white bg-red-500 rounded mx-2"
                  onClick={() => props.nextStep(props.activeStep - 1)}
                >
                  Previous
                </button>
                <button
                  className="p-4 text-white bg-red-500 rounded mx-2 "
                  onClick={handleFinalSubmit}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
        {props.activeStep == 1 ? (
          <div className="container p-4 max-w-2xl mx-auto">
            <div>
              <label className="text-2xl">Patron Name</label>
              <br />
              <input
                type="text"
                value={patronName}
                onChange={(e) => setPatronName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patron Phone</label>
              <br />
              <input
                type="number"
                value={patronPhone}
                onChange={(e) => setPatronPhone(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patron Email</label>
              <br />
              <input
                type="text"
                value={patronEmail}
                onChange={(e) => setPatronEmail(e.target.value)}
              />
            </div>
            <br />
          </div>
        ) : props.activeStep == 2 ? (
          <div className="container p-4 mx-auto max-w-2xl">
            <div>
              <label className="text-md">Event Description</label>
              <br />
              <div className="w-11/12">
                <textarea
                  type="textarea"
                  className="w-full"
                  rows={6}
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-md">Resolution Description</label>
              <br />
              <div className="w-11/12">
                <textarea
                  type="textarea"
                  className="w-full"
                  rows={6}
                  value={resDescription}
                  onChange={(e) => setResDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4">
              <div className="container max-w-md mx-auto">
                <label className="text-lg">Patron Signature</label>
              </div>
              <div className="bg-white max-w-md mx-auto">
                <SignaturePad
                  style={{ width: 40 }}
                  canvasProps={{
                    maxWidth: 500,
                    minWidth: 100,
                    width: window.innerWidth,
                    height: 200,
                    backgroundColor: "#fff",
                  }}
                  onEnd={trim}
                  ref={(ref) => {
                    sigPad = ref;
                  }}
                />
              </div>
            </div>

            <div className="p-4">
              <div className="container max-w-md mx-auto">
                <label className="text-lg">Employee Signature</label>
              </div>
              <div className="bg-white max-w-md mx-auto">
                <SignaturePad
                  style={{ width: 40 }}
                  canvasProps={{
                    maxWidth: 500,
                    minWidth: 100,
                    width: window.innerWidth,
                    height: 200,
                    backgroundColor: "#fff",
                  }}
                  onEnd={trim2}
                  ref={(ref) => {
                    sigPad2 = ref;
                  }}
                />
              </div>
            </div>
          </>
        )}
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
      </div>
    </>
  );
};

export default PatientCareForm;
