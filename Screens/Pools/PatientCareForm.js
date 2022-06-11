import React, { useEffect, useState } from "react";
import SignaturePad from "react-signature-canvas";
import moment from "moment";
import api from "../../utils/api";
import PatientCareFormRendering from "./PatientCareFormRendering";
const PatientCareForm = (props) => {
  const [patronInfoArray, setPatronInfoArray] = React.useState([{ name: "", phone: null, email: "" }]);
  const [eventDescription, setEventDescription] = React.useState("");
  const [resDescription, setResDescription] = React.useState("");
  const [trimmedDataURL, setTrimmedDataURL] = React.useState();
  const [trimmedDataURL2, setTrimmedDataURL2] = React.useState();
  const [trimmedDataURLArray, setTrimmedDataURLArray] = React.useState([])
  const [allSigs, setAllSigs] = useState([])


  useEffect(() => {

  }, [patronInfoArray, allSigs])


  const handleFinalSubmit = async () => {
    let body1 = {
      patronInfo: patronInfoArray,
      signature: allSigs,
      eventDescription: eventDescription,
      resDescription: resDescription,
    };

    let body = {
      pool_id: props.id,
      recordType: "incidentReport",
      date: moment().format("YYYY-MM-DD"),
      dataObject: body1,
      user_id: props.user_id,
    };
    await api
      .post("/records/incidentReport", body)
      .then((response) => {
        console.log(response);
        props.navigation.navigate("SuccessScreen");
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
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

  return (
    <>
      <div className="overflow-scroll">
        <div className="container p-4 text-2xl mx-auto text-center">
          Incident Report Form
        </div>

        <div className="container w-full mx-auto">
          <PatientCareFormRendering handleFinalSubmit={handleFinalSubmit} allSigs={allSigs} setAllSigs={setAllSigs} trimmedDataURLArray={trimmedDataURLArray} setTrimmedDataURLArray={setTrimmedDataURLArray} eventDescription={eventDescription} setEventDescription={setEventDescription} setResDescription={setResDescription} resDescription={resDescription} updatePatronArray={updatePatronArray} activeStep={props.activeStep} patronInfoArray={patronInfoArray} handleAddPatronInfo={handleAddPatronInfo} nextStep={props.nextStep} />
        </div>

      </div>
    </>
  );
};

export default PatientCareForm;
