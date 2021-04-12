import React from "react";
import SignaturePad from "react-signature-canvas";
import moment from "moment";
import api from "../../utils/api";
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
  const [injuryList, setInjuryList] = React.useState([]);
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
  const [sampleArray, setSampleArray] = React.useState([]);
  const [witnessName, setWitnessName] = React.useState("");
  const [witnessPhone, setWitnessPhone] = React.useState("");
  const [witnessAddress, setWitnessAddress] = React.useState("");
  const [witnessCity, setWitnessCity] = React.useState("");
  const [witnessState, setWitnessState] = React.useState("");
  const [witnessZip, setWitnessZip] = React.useState("");

  //Signatures Step 6
  const [reportFilerName, setReportFiler] = React.useState("");
  const [filerSignature, setTrimmedDataURL] = React.useState("");
  const [managerName, setManagerName] = React.useState("");
  const [manFilerSignature, setTrimmedDataURL2] = React.useState("");
  const [supName, setSupName] = React.useState("");
  const [supFilerSignature, setTrimmedDataURL3] = React.useState("");
  // Name of Facility Manager
  // Signature of Facility Manager
  // Name of Supervisor

  //Injuries List Step 3
  const injures = {
    Head: [
      "Skull",
      "Right Ear",
      "Left Ear",
      "Right Eye",
      "Left Eye",
      "Mouth",
      "Teeth",
      "Face",
      "Neck",
    ],
    torso: ["Upper Back", "Middle Back", "Lower Back", "Chest", "Abdomen"],
    arm: [
      "Shoulder",
      "Upper Arm",
      "Elbow",
      "Forearm",
      "Wrist",
      "Hand",
      "Finger(s)",
    ],
    leg: [
      "Hip",
      "Groin",
      "Thigh",
      "Knee",
      "Shin",
      "Calf",
      "Ankle",
      "Foot",
      "Toes",
    ],
    wounds: [
      "Abrasion",
      "Laceration",
      "Puncture",
      "Avulsion",
      "Bruise",
      "Embedded Object",
    ],
    burns: ["Chemical", "Thermal", "Radiation", "Electrical"],
    suddenIllness: [
      "Diabetic",
      "Stroke",
      "Cardiac",
      "Shock",
      "Anaphylaxis",
      "Seizure",
      "Fainting",
      "Heat-Related",
      "Cold-Related",
      "Vomit",
    ],
  };
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

  const submitFormIR = async (e) => {
    e.preventDefault();
    let body1 = {
      patientName: patientName,
      patientEmail: patientEmail,
      patientPhone: patientPhone,
      patientAge: patientAge,
      patientSex: patientSex,
      patientAddress: patientAddress,
      patientCity: patientCity,
      patientState: patientState,
      patientZip: patientZip,
      date: moment().format("YYYY-MM-DD"),
      ems: ems,
      hospital: hospital,
      hospitalName: hospitalName,
      legalAdult: legalAdult,
      location: location,
      injured: injured,
      detailedDescription: detailedDescription,
      detailedTreatment: detailedTreatment,
      detailedResolution: detailedResolution,
      rescuer: rescuer,
      active: active,
      distressed: distressed,
      passive: passive,
      spinal: spinal,
      activeFront: activeFront,
      activeRear: activeRear,
      passiveFront: passiveFront,
      passiveRear: passiveRear,
      passiveSubmerged: passiveSubmerged,
      surfaceSpinal: surfaceSpinal,
      submergedSpinal: submergedSpinal,
      witnessName: witnessName,
      witnessPhone: witnessPhone,
      witnessAddress: witnessAddress,
      witnessCity: witnessCity,
      witnessState: witnessState,
      witnessZip: witnessZip,
      reportFilerName: reportFilerName,
      filerSignature: filerSignature,
      managerName: managerName,
      manFilerSignature: manFilerSignature,
      supName: supName,
      supFilerSignature: supFilerSignature,
      injuryList: injuryList,
    };
    let dataObject = body1;
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

  return (
    <>
      <div className=" mx-auto container text-center max-w-3xl">
        {props.activeStep == 1 ? (
          <>
            <div className="display-inline mx-auto">
              <button
                className="p-4 text-white bg-red-500 rounded"
                onClick={() => props.increase()}
              >
                Next
              </button>
            </div>
          </>
        ) : props.activeStep > 1 && props.activeStep < 6 ? (
          <div className="display-inline mx-auto">
            <button
              className="p-4 text-white bg-red-500 rounded mx-2 "
              onClick={() => props.decrease()}
            >
              Previous
            </button>
            <button
              className="p-4 text-white bg-red-500 rounded mx-2 "
              onClick={() => props.increase()}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="display-inline mx-auto">
            <button
              className="p-4 text-white bg-red-500 rounded mx-2"
              onClick={() => props.decrease()}
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
        <div className="container p-4 text-2xl mx-auto">Patient Care Form</div>
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
                type="tel"
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
                placeholder="example@email.com"
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
                placeholder="Male, Female, Other"
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
                placeholder="Ex: TX, AL, MD"
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
                placeholder="00000"
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
            <div>
              <label className="text-md">Name Of Hospital:</label>
              <br />
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            </div>
            <br />
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
          </div>
        ) : props.activeStep == 3 ? (
          <div className="container p-4 bg-white max-w-2xl mx-auto text-left">
            <div>
              {" "}
              <label className="text-xl my-8">Injury Type</label>
            </div>
            <label className="text-lg my-4  px-4 py-1 my-8">Head</label>
            <div className="grid grid-cols-2">
              {injures.Head.map((item) => (
                <>
                  <div>
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={item}
                      onChange={(e) =>
                        setInjuryListFunction(e.target.checked, item, "Head")
                      }
                    />
                    <label>{item}</label>
                  </div>
                </>
              ))}
            </div>
            <label className="text-lg my-4  px-4 py-1 my-8">Torso</label>
            <div className="grid grid-cols-2">
              {injures.torso.map((item) => (
                <>
                  <div>
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      onChange={(e) =>
                        setInjuryListFunction(e.target.checked, item, "Torso")
                      }
                    />
                    <label>{item}</label>
                  </div>
                </>
              ))}
            </div>{" "}
            <label className="text-lg my-4  px-4 py-1 my-8">Arm</label>
            <div className="grid grid-cols-2">
              {injures.arm.map((item) => (
                <>
                  <div>
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      onChange={(e) =>
                        setInjuryListFunction(e.target.checked, item, "Arm")
                      }
                    />
                    <label>{item}</label>
                  </div>
                </>
              ))}
            </div>
            <label className="text-lg my-4  px-4 py-1 my-8">Legs</label>
            <div className="grid grid-cols-2">
              {injures.leg.map((item) => (
                <>
                  <div>
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      onChange={(e) =>
                        setInjuryListFunction(e.target.checked, item, "Legs")
                      }
                    />
                    <label>{item}</label>
                  </div>
                </>
              ))}
            </div>
            <label className="text-lg my-4  px-4 py-1 my-8">Wounds</label>
            <div className="grid grid-cols-2">
              {injures.wounds.map((item) => (
                <>
                  <div>
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      onChange={(e) =>
                        setInjuryListFunction(e.target.checked, item, "Wounds")
                      }
                    />
                    <label>{item}</label>
                  </div>
                </>
              ))}
            </div>
            <label className="text-lg my-4  px-4 py-1 my-8">Burns</label>
            <div className="grid grid-cols-2">
              {injures.burns.map((item) => (
                <>
                  <div>
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      onChange={(e) =>
                        setInjuryListFunction(e.target.checked, item, "Burns")
                      }
                    />
                    <label>{item}</label>
                  </div>
                </>
              ))}
            </div>
            <label className="text-lg my-4  px-4 py-1 my-8">
              Sudden Illness
            </label>
            <div className="grid grid-cols-2">
              {injures.suddenIllness.map((item) => (
                <>
                  <div>
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      onChange={(e) =>
                        setInjuryListFunction(e.target.checked, item, "Illness")
                      }
                    />
                    <label>{item}</label>
                  </div>
                </>
              ))}
            </div>
          </div>
        ) : props.activeStep == 4 ? (
          <div>
            <div className="container">
              <label className="text-md px-2">S.A.M.P.L.E:</label>
              {sampleAnnagram.map((item) => (
                <div>
                  <input
                    className="mx-2 border-2 shadow-xl my-2"
                    type="text"
                    placeholder={item}
                    onChange={(e) => setSample(e.target.value, item)}
                  />
                </div>
              ))}

              <br />
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
            <div className="text-xl">Witness Information</div>
            <div className="text-lg my-4">
              Include information if someone witnessed the incident
            </div>
            <div>
              <label className="text-md">Witness Name:</label>
              <br />
              <input
                type="text"
                value={witnessName}
                onChange={(e) => setWitnessName(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">Witness Phone:</label>
              <br />
              <input
                type="tel"
                placeholder="123-456-7890"
                value={witnessPhone}
                onChange={(e) => setWitnessPhone(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">Witness Address:</label>
              <br />
              <input
                type="text"
                value={witnessAddress}
                onChange={(e) => setWitnessAddress(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">Witness City:</label>
              <br />
              <input
                type="text"
                value={witnessCity}
                onChange={(e) => setWitnessCity(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">Witness State:</label>
              <br />
              <input
                type="text"
                placeholder="Ex: TX, AL, MD"
                value={witnessState}
                onChange={(e) => setWitnessState(e.target.value)}
              />
            </div>{" "}
            <div>
              <label className="text-md">Zip:</label>
              <br />
              <input
                type="text"
                placeholder="0000"
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
              />{" "}
              <br />
              <label className="text-md">Reporter Signature:</label>
              <br />
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
            </div>{" "}
            <br />
            <div>
              <label className="text-md">Manager Name:</label>
              <br />
              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
              />{" "}
              <br />
              <label className="text-md">Manager Signature:</label>
              <br />
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
            </div>{" "}
            <br />
            <div>
              <label className="text-md">Supervisor Name:</label>
              <br />
              <input
                type="text"
                value={supName}
                onChange={(e) => setSupName(e.target.value)}
              />{" "}
              <br />
              <label className="text-md">Supervisor Signature:</label>
              <br />
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
                  onEnd={trim3}
                  ref={(ref) => {
                    sigPad3 = ref;
                  }}
                />
              </div>
            </div>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default IncidentReportForm;
