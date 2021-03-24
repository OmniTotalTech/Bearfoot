import React from "react";
import SignaturePad from "react-signature-canvas";

const IncidentReportForm = (props) => {
  ///Patient information set Step 1
  const [patientName, setPatientName] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");
  const [patientAge, setPatientAge] = React.useState("");
  const [patientSex, setPatientSex] = React.useState("");
  const [patientAddress, setPatientAddress] = React.useState("");
  const [patientCity, setPatientCity] = React.useState("");
  const [patientState, setPatientState] = React.useState("");
  const [patientZip, setPatientZip] = React.useState("");

  //incidentInformation Step 2
  const [date, setDate] = React.useState("");
  const [ems, setEms] = React.useState(false);
  const [hospital, setHospital] = React.useState(false);
  const [hospitalName, setHospitalName] = React.useState("");
  const [legalAdult, setLegalAdult] = React.useState(false);
  const [location, setlocation] = React.useState("");
  const [injured, setInjured] = React.useState(false);
  const [detailedDescription, setDetailedDescription] = React.useState("");
  const [detailedTreatment, setDetailedTreatment] = React.useState("");
  const [detailedResolution, setDetailedResolution] = React.useState("");

  // Rescurer Information Step 4
  const [rescuer, setRescuer] = React.useState("");
  //Type of victim
  const [active, setActive] = React.useState(false);
  const [distressed, setDistressed] = React.useState(false);
  const [passive, setPassive] = React.useState(false);
  const [spinal, setSpinal] = React.useState(false);
  //type of rescue
  const [activeFront, setActiveFront] = React.useState(false);
  const [activeRear, setActiveRear] = React.useState(false);
  const [passiveFront, setPassiveFront] = React.useState(false);
  const [passiveRear, setPassiveRear] = React.useState(false);
  const [passiveSubmerged, setPassiveSubmerged] = React.useState(false);
  const [surfaceSpinal, setSurfaceSpinal] = React.useState(false);
  const [submergedSpinal, setSubmergedSpinal] = React.useState(false);

  // witness Information Step 5
  const [witnessName, setWitnessName] = React.useState("");
  const [witnessPhone, setWitnessPhone] = React.useState("");
  const [witnessAddress, setWitnessAddress] = React.useState("");
  const [witnessCity, setWitnessCity] = React.useState("");
  const [witnessState, setWitnessState] = React.useState("");
  const [witnessZip, setWitnessZip] = React.useState("");

  //Signatures Step 6
  const [reportFilerName, setReportFiler] = React.useState("");
  const [filerSignature, setFilerSignature] = React.useState("");
  const [managerName, setManagerName] = React.useState("");
  const [manFilerSignature, setManFilerSignature] = React.useState("");
  const [supName, setSupName] = React.useState("");
  const [supFilerSignature, setSupFilerSignature] = React.useState("");
  // Name of Facility Manager
  // Signature of Facility Manager
  // Name of Supervisor

  //Injuries List Step 3
  // Head: {
  //  Skull
  //  Right Ear
  //  Left Ear
  //  Right Eye
  //  Left Eye
  //  Mouth
  //  Teeth
  //  Face
  //  Neck
  // },
  // torso{
  //  Upper Back
  //  Middle Back
  //  Lower Back
  //  Chest
  //  Abdomen
  // }
  // arm {
  //  Shoulder
  //  Upper Arm
  //  Elbow
  //  Forearm
  //  Wrist
  //  Hand
  //  Finger(s)
  // }
  // leg {
  //  Hip
  //  Groin
  //  Thigh
  //  Knee
  //  Shin
  //  Calf
  //  Ankle
  //  Foot
  //  Toes
  // }
  // Wounds
  //  Abrasion
  //  Laceration
  //  Puncture
  //  Avulsion
  //  Bruise
  //  Embedded Object
  // Burns
  //  Chemical
  //  Thermal
  //  Radiation
  //  Electrical
  // Sudden Illness
  //  Diabetic
  //  Stroke
  //  Cardiac
  //  Shock
  //  Anaphylaxis
  //  Seizure
  //  Fainting
  //  Heat-Related
  //  Cold-Related
  //  Vomit
  // }

  let trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
  };
  console.log(props);

  return (
    <>
      <div className=" mx-auto container max-w-3xl">
        <div className="container p-4 text-2xl mx-auto">Patient Care form</div>
        {props.activeStep == 1 ? (
          <div className="container p-4 mx-auto">
            <div>
              <label className="text-md">Patron Name</label>
              <br />
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patron Phone</label>
              <br />
              <input
                type="number"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patron Email</label>
              <br />
              <input
                type="text"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patient Age</label>
              <br />
              <input
                type="text"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patient Sex</label>
              <br />
              <input
                type="text"
                value={patientSex}
                onChange={(e) => setPatientSex(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patient Address</label>
              <br />
              <input
                type="text"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patient City</label>
              <br />
              <input
                type="text"
                value={patientCity}
                onChange={(e) => setPatientCity(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patient State</label>
              <br />
              <input
                type="text"
                value={patientState}
                onChange={(e) => setPatientState(e.target.value)}
              />
            </div>
            <br />

            <div>
              <label className="text-md">Patient Zip</label>
              <br />
              <input
                type="text"
                value={patientZip}
                onChange={(e) => setPatientZip(e.target.value)}
              />
            </div>
            <br />
          </div>
        ) : props.activeStep == 2 ? (
          <div className="container p-4">
            <div>
              <label className="text-md">Was the EMS Contacted?</label>
              <br />
              <input
                type="checkbox"
                value={ems}
                onChange={(e) => setEms(e.target.checked)}
              />
            </div>
            <div>
              <label className="text-md">
                Did the patient go to the hospital?
              </label>
              <br />
              <input
                type="checkbox"
                value={hospital}
                onChange={(e) => setHospital(e.target.checked)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patient City</label>
              <br />
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-md">Is the patient a legal adult?</label>
              <br />
              <input
                type="checkbox"
                value={legalAdult}
                onChange={(e) => setLegalAdult(e.target.checked)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Was the patient injured?</label>
              <br />
              <input
                type="checkbox"
                value={injured}
                onChange={(e) => setInjured(e.target.checked)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patron Name</label>
              <br />
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Location of Injury:</label>
              <br />
              <input
                type="number"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Detailed Description:</label>
              <br />
              <input
                type="number"
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Detailed Treatment:</label>
              <br />
              <input
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
                type="text"
                value={detailedResolution}
                onChange={(e) => setDetailedResolution(e.target.value)}
              />
            </div>
            <br />
          </div>
        ) : props.activeStep == 3 ? (
          <div className="container p-4 bg-white max-w-2xl">
            <label>Employee Signature</label>
          </div>
        ) : props.activeStep == 4 ? (
          <div>
            <div className="container">
              <label className="text-md">Detailed Desc</label>
              <br />
              <textarea
                type="text"
                value={rescuer}
                onChange={(e) => setIn(e.target.value)}
              />
            </div>

            <div>
              {" "}
              <br /> <label className="text-md">Active:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={active}
                onChange={(e) => setActive(e.target.checked)}
              />{" "}
              <br /> <label className="text-md">Distressed:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={distressed}
                onChange={(e) => setDistressed(e.target.checked)}
              />{" "}
              <br /> <label className="text-md">Passive:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={passive}
                onChange={(e) => setPassive(e.target.checked)}
              />{" "}
              <br /> <label className="text-md">Spinal:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={spinal}
                onChange={(e) => setSpinal(e.target.checked)}
              />{" "}
            </div>

            <div>
              <br /> <label className="text-md">Active Front:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={activeFront}
                onChange={(e) => setActiveFront(e.target.checked)}
              />{" "}
              <br /> <label className="text-md">Active Rear:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={activeRear}
                onChange={(e) => setActiveRear(e.target.checked)}
              />{" "}
              <br /> <label className="text-md">Passive Front:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={passiveFront}
                onChange={(e) => setPassiveFront(e.target.checked)}
              />{" "}
              <br />
              <label className="text-md">Passive Rear:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={passiveRear}
                onChange={(e) => setPassiveRear(e.target.checked)}
              />{" "}
              <br /> <label className="text-md">Passive Submerged:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={passiveSubmerged}
                onChange={(e) => setPassiveSubmerged(e.target.checked)}
              />{" "}
              <br /> <label className="text-md">Surface Spinal:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={surfaceSpinal}
                onChange={(e) => setSurfaceSpinal(e.target.checked)}
              />{" "}
              <br /> <label className="text-md">Submerged Spinal:</label>
              <input
                className="mx-2"
                type="checkbox"
                value={submergedSpinal}
                onChange={(e) => setSubmergedSpinal(e.target.checked)}
              />{" "}
              <br />{" "}
            </div>
            <br />
          </div>
        ) : props.activeStep == 5 ? (
          <div className="container ">
            <div>
              <label className="text-md">Witness Name:</label>
              <br />
              <textarea
                type="text"
                value={witnessName}
                onChange={(e) => setWitnessName(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">Phone:</label>
              <br />
              <textarea
                type="text"
                value={witnessPhone}
                onChange={(e) => setWitnessPhone(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">Address:</label>
              <br />
              <textarea
                type="text"
                value={witnessAddress}
                onChange={(e) => setWitnessAddress(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">City:</label>
              <br />
              <textarea
                type="text"
                value={witnessCity}
                onChange={(e) => setWitnessCity(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">State:</label>
              <br />
              <textarea
                type="text"
                value={witnessState}
                onChange={(e) => setWitnessState(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">Zip:</label>
              <br />
              <textarea
                type="text"
                value={witnessZip}
                onChange={(e) => setWitnessZip(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="container mx-auto p-4 m-4">
            <br />
            <div>
              <label className="text-md">Set Reporter Name:</label>
              <br />
              <input
                type="text"
                value={reportFilerName}
                onChange={(e) => setReportFiler(e.target.value)}
              />
            </div>{" "}
            <br />
            <div>
              <label className="text-md">Manager Name:</label>
              <br />
              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
              />
            </div>{" "}
            <br />
            <div>
              <label className="text-md">Manager Name:</label>
              <br />
              <input
                type="text"
                value={supName}
                onChange={(e) => setSupName(e.target.value)}
              />
            </div>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default IncidentReportForm;
