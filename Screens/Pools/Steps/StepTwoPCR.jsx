import React from 'react';

const StepTwoPCR = (props) => {

  //incidentInformation Step 2
  const [date, setDate] = React.useState("");
  const [ems, setEms] = React.useState(false);
  const [hospital, setHospital] = React.useState(false);
  const [hospitalName, setHospitalName] = React.useState("");
  const [legalAdult, setLegalAdult] = React.useState('false');
  const [location, setlocation] = React.useState("");
  const [injured, setInjured] = React.useState(false);
  const [detailedDescription, setDetailedDescription] = React.useState("");
  const [detailedTreatment, setDetailedTreatment] = React.useState("");
  const [detailedResolution, setDetailedResolution] = React.useState("");
  const [rescuer, setRescuer] = React.useState("");


  const [localState, setLocalState] = React.useState({
    ems: false,
    hospital: false,
    hospitalName: "",
    legalAdult: false,
    location: "",
    injured: false,
    detailedDescription: "",
    detailedResolution: "",
    detailedTreatment: "",
    rescuer: ""
  })
  const HandleLocalState = (e, key) => {
    let val = e.target.value;
    let state = localState;

    state[key] = val;
    console.log(state);
    setLocalState(state);
  }


  const handleAdultChange = (e) => {
    setLegalAdult(e.target.value);
  }

  const LegalAdultChoice = (props) => {
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
              onChange={(e) => HandleLocalState(e, "name")}
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



  return (
    <div className="container p-4">
      <div>
        <label className="text-md">Was the EMS Contacted</label>
        <br />
        {/* <input
                   type="checkbox"
                   value={ems}
                   onChange={(e) => setEms(e.target.checked)}
                      /> */}
        <select
          value={ems}
          onChange={(e) => setEms(e.target.value)}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      <div>
        <label className="text-md">
          Did the patient go to the hospital
        </label>
        <br />
        {/* <input
                        type="checkbox"
                        value={hospital}
                        onChange={(e) => setHospital(e.target.checked)}
                      /> */}
        <select
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      {hospital ? (
        <div>
          <label className="text-md">Name Of Hospital:</label>
          <br />
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </div>
      ) : (<></>)}

      <br />
      <div>
        <label className="text-md">Is the patient a legal adult?</label>
        <br />
        <select
          value={legalAdult}
          onChange={handleAdultChange}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <LegalAdultChoice legalAdult={legalAdult} />



      </div>

      <br />
      <div>
        <label className="text-md">Was the patient injured?</label>
        <br />
        <select
          value={injured}
          onChange={(e) => setInjured(e.target.value)}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      <br />
      {injured ? (
        <>
          <div>
            <label className="text-md">Location of Injury:</label>
            <br />
            <input
              type="text"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="text-md">Rescuer:</label>
            <br />
            <input
              type="text"
              value={rescuer}
              onChange={(e) => setRescuer(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="text-md">Detailed Description:</label>
            <br />
            <textarea
              rows={6}
              type="text"
              value={detailedDescription}
              onChange={(e) => setDetailedDescription(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="text-md">Detailed Treatment:</label>
            <br />
            <textarea
              rows={6}
              type="text"
              value={detailedTreatment}
              onChange={(e) => setDetailedTreatment(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="text-md">Detailed Resolution:</label>
            <br />
            <textarea
              rows={6}
              type="text"
              value={detailedResolution}
              onChange={(e) => setDetailedResolution(e.target.value)}
            />
          </div>
          <br />
        </>
      ) : (
        <>
        </>
      )}
    </div>
  )
}


export default StepTwoPCR;