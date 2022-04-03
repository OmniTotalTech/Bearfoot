import React from 'react';

const StepTwoPCR = (props) => {



  const [localState, setLocalState] = React.useState({
    ems: false,
    hospital: false,
    hospitalName: "",
    legalAdult: false,
    legalAdultName: "",
    location: "",
    injured: false,
    detailedDescription: "",
    detailedResolution: "",
    detailedTreatment: "",
    rescuer: "",
    guardianPhone: ""
  })
  const HandleLocalState = (value,key) => {
    console.log("hit",value)
    let state = localState;

    state[key] = value;

    setLocalState({...state});
    updateMasterState();
  }
  const updateMasterState = () => {
    props.setStepData("step2",localState);
  }

  const handleAdultChange = (e) => {
    setLegalAdult(e.target.value);
  }

  const LegalAdultChoice = (props) => {
    if (props.legalAdult != "true") {
      return (
        <>
          <div>
            <br />
            <label className="text-md">Guardian name:</label>
            <br />

            <input
              type="text"
              value={localState.legalAdultName}
              onChange={(e) => HandleLocalState(e.target.value, "legalAdultName")}
            />
            <br />

            <label className="text-md">Contact phone number for guardian:</label>
            <br />

            <input
              type="text"
              value={localState.guardianPhone}
              onChange={(e) => HandleLocalState(e.target.value, "guardianPhone")}
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
      <>
        <div className={"bg-red-500 w-full"}>
          <h2 className="text-3xl text-white px-2 bold">Incident Information</h2>
        </div>
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
          value={localState.ems}
          onChange={(e) => HandleLocalState(e.target.value, "ems")}>

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
          value={localState.hospital}
          onChange={(e) => HandleLocalState(e.target.value, "hospital")}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      {localState.hospital == "true" ? (
        <div>
          <label className="text-md">Name Of Hospital:</label>
          <br />
          <input
            type="text"
            value={localState.hospitalName}
            onChange={(e) => HandleLocalState(e.target.value, "hospitalName")}
          />
        </div>
      ) : (<></>)}

      <br />
      <div>
        <label className="text-md">Is the patient a legal adult?</label>
        <br />
        <select
          value={localState.legalAdult}
          onChange={(e) => HandleLocalState(e.target.value, "legalAdult")}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <LegalAdultChoice legalAdult={localState.legalAdult} />



      </div>

      <br />
      <div>
        <label className="text-md">Was the patient injured?</label>
        <br />
        <select
          value={localState.injured}
          onChange={(e) => HandleLocalState(e.target.value, "injured")}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      <br />
      {localState.injured == "true" ? (
        <>
          <div>
            <label className="text-md">Location of Injury:</label>
            <br />
            <input
              type="text"
              value={localState.location}
              onChange={(e) => HandleLocalState(e.target.value, "location")}
            />
          </div>
          <br />
          <div>
            <label className="text-md">Rescuer:</label>
            <br />
            <input
              type="text"
              value={localState.rescuer}
              onChange={(e) => HandleLocalState(e.target.value, "rescuer")}
            />
          </div>
          <br />
          <div>
            <label className="text-md">Detailed Description:</label>
            <br />
            <textarea
              rows={6}
              type="text"
              value={localState.detailedDescription}
              onChange={(e) => HandleLocalState(e.target.value, "detailedDescription")}
            />
          </div>
          <br />
          <div>
            <label className="text-md">Detailed Treatment:</label>
            <br />
            <textarea
              rows={6}
              type="text"
              value={localState.detailedTreatment}
              onChange={(e) => HandleLocalState(e.target.value, "detailedTreatment")}
            />
          </div>
          <br />
          <div>
            <label className="text-md">Detailed Resolution:</label>
            <br />
            <textarea
              rows={6}
              type="text"
              value={localState.detailedResolution}
              onChange={(e) => HandleLocalState(e.target.value, "detailedResolution")}
            />
          </div>
          <br />
        </>
      ) : (
        <>
        </>
      )}
    </div>
        </>
  )
}


export default StepTwoPCR;