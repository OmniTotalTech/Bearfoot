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
              step six
            </div>
            <div style={displayStyle(7)}>
              step seven
            </div>
          </form>
          {/*    {activeStep == 1 ? (*/}
          {/*<></>*/}
          {/*    ) : activeStep == 2 ? (*/}
          {/*      <div className="container p-4">*/}
          {/*        <div>*/}
          {/*          <label className="text-md">Was the EMS Contacted</label>*/}
          {/*          <br />*/}
          {/*          /!* <input*/}
          {/*            type="checkbox"*/}
          {/*            value={ems}*/}
          {/*            onChange={(e) => setEms(e.target.checked)}*/}
          {/*          /> *!/*/}
          {/*          <select*/}
          {/*            value={ems}*/}
          {/*            onChange={(e) => setEms(e.target.value)}>*/}
          {/*            <option value={false}>No</option>*/}
          {/*            <option value={true}>Yes</option>*/}
          {/*          </select>*/}
          {/*        </div>*/}
          {/*        <div>*/}
          {/*          <label className="text-md">*/}
          {/*            Did the patient go to the hospital*/}
          {/*          </label>*/}
          {/*          <br />*/}
          {/*          /!* <input*/}
          {/*            type="checkbox"*/}
          {/*            value={hospital}*/}
          {/*            onChange={(e) => setHospital(e.target.checked)}*/}
          {/*          /> *!/*/}
          {/*          <select*/}
          {/*            value={hospital}*/}
          {/*            onChange={(e) => setHospital(e.target.value)}>*/}
          {/*            <option value={false}>No</option>*/}
          {/*            <option value={true}>Yes</option>*/}
          {/*          </select>*/}
          {/*        </div>*/}
          {/*        {hospital ? (*/}
          {/*          <div>*/}
          {/*            <label className="text-md">Name Of Hospital:</label>*/}
          {/*            <br />*/}
          {/*            <input*/}
          {/*              type="text"*/}
          {/*              value={hospitalName}*/}
          {/*              onChange={(e) => setHospitalName(e.target.value)}*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*        ) : (<></>)}*/}

          {/*        <br />*/}
          {/*        <div>*/}
          {/*          <label className="text-md">Is the patient a legal adult?</label>*/}
          {/*          <br />*/}
          {/*          <select*/}
          {/*            value={legalAdult}*/}
          {/*            onChange={handleAdultChange}>*/}
          {/*            <option value={false}>No</option>*/}
          {/*            <option value={true}>Yes</option>*/}
          {/*          </select>*/}
          {/*          <LegalAdultChoice legalAdult={legalAdult} />*/}



          {/*        </div>*/}

          {/*        <br />*/}
          {/*        <div>*/}
          {/*          <label className="text-md">Was the patient injured?</label>*/}
          {/*          <br />*/}
          {/*          <select*/}
          {/*            value={injured}*/}
          {/*            onChange={(e) => setInjured(e.target.value)}>*/}
          {/*            <option value={false}>No</option>*/}
          {/*            <option value={true}>Yes</option>*/}
          {/*          </select>*/}
          {/*        </div>*/}
          {/*        <br />*/}
          {/*        {injured ? (*/}
          {/*          <>*/}
          {/*            <div>*/}
          {/*              <label className="text-md">Location of Injury:</label>*/}
          {/*              <br />*/}
          {/*              <input*/}
          {/*                type="text"*/}
          {/*                value={location}*/}
          {/*                onChange={(e) => setlocation(e.target.value)}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*            <br />*/}
          {/*            <div>*/}
          {/*              <label className="text-md">Rescuer:</label>*/}
          {/*              <br />*/}
          {/*              <input*/}
          {/*                type="text"*/}
          {/*                value={rescuer}*/}
          {/*                onChange={(e) => setRescuer(e.target.value)}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*            <br />*/}
          {/*            <div>*/}
          {/*              <label className="text-md">Detailed Description:</label>*/}
          {/*              <br />*/}
          {/*              <textarea*/}
          {/*                rows={6}*/}
          {/*                type="text"*/}
          {/*                value={detailedDescription}*/}
          {/*                onChange={(e) => setDetailedDescription(e.target.value)}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*            <br />*/}
          {/*            <div>*/}
          {/*              <label className="text-md">Detailed Treatment:</label>*/}
          {/*              <br />*/}
          {/*              <textarea*/}
          {/*                rows={6}*/}
          {/*                type="text"*/}
          {/*                value={detailedTreatment}*/}
          {/*                onChange={(e) => setDetailedTreatment(e.target.value)}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*            <br />*/}
          {/*            <div>*/}
          {/*              <label className="text-md">Detailed Resolution:</label>*/}
          {/*              <br />*/}
          {/*              <textarea*/}
          {/*                rows={6}*/}
          {/*                type="text"*/}
          {/*                value={detailedResolution}*/}
          {/*                onChange={(e) => setDetailedResolution(e.target.value)}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*            <br />*/}
          {/*          </>*/}
          {/*        ) : (*/}
          {/*          <>*/}
          {/*          </>*/}
          {/*        )}*/}
          {/*      </div>*/}
          {/*    ) : activeStep == 3 ? (*/}
          {/*      <div className="container p-4 bg-white max-w-2xl mx-auto text-left">*/}
          {/*        <div>*/}
          {/*          {" "}*/}
          {/*          <label className="text-xl my-8">Injury Type</label>*/}
          {/*        </div>*/}
          {/*        <input*/}
          {/*          type="checkbox"*/}
          {/*          className="border-2 shadow-xl mx-2 "*/}
          {/*          value={"Head"}*/}
          {/*          onChange={(e) =>*/}
          {/*            setActiveStep4Head(!activeStep4Head)*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <label className="text-lg my-4  px-4 py-1 my-8">Head</label>*/}
          {/*        <br />*/}
          {/*        {activeStep4Head ? (*/}
          {/*          <div className="grid grid-cols-2">*/}
          {/*            {injures.Head.map((item) => (*/}
          {/*              <>*/}
          {/*                <div>*/}
          {/*                  <input*/}
          {/*                    type="checkbox"*/}
          {/*                    className="border-2 shadow-xl mx-2 "*/}
          {/*                    value={item}*/}
          {/*                    onChange={(e) =>*/}
          {/*                      setInjuryListFunction(e.target.checked, item, "Head")*/}
          {/*                    }*/}
          {/*                  />*/}
          {/*                  <label>{item}</label>*/}
          {/*                </div>*/}
          {/*              </>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        ) : (*/}
          {/*          <></>*/}
          {/*        )}*/}

          {/*        <input*/}
          {/*          type="checkbox"*/}
          {/*          className="border-2 shadow-xl mx-2 "*/}
          {/*          value={"Torso"}*/}
          {/*          onChange={(e) =>*/}
          {/*            setActiveStep4Torso(!activeStep4Torso)*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <label className="text-lg my-4  px-4 py-1 my-8">Torso</label>*/}
          {/*        <br />*/}
          {/*        {activeStep4Torso ? (*/}
          {/*          <div className="grid grid-cols-2">*/}
          {/*            {injures.torso.map((item) => (*/}
          {/*              <>*/}
          {/*                <div>*/}
          {/*                  <input*/}
          {/*                    type="checkbox"*/}
          {/*                    className="border-2 shadow-xl mx-2 "*/}
          {/*                    onChange={(e) =>*/}
          {/*                      setInjuryListFunction(e.target.checked, item, "Torso")*/}
          {/*                    }*/}
          {/*                  />*/}
          {/*                  <label>{item}</label>*/}
          {/*                </div>*/}
          {/*              </>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        ) : (<></>)}*/}

          {/*        <input*/}
          {/*          type="checkbox"*/}
          {/*          className="border-2 shadow-xl mx-2 "*/}
          {/*          value={"Arm"}*/}
          {/*          onChange={(e) =>*/}
          {/*            setActiveStep4Arm(!activeStep4Arm)*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <label className="text-lg my-4  px-4 py-1 my-8">Arm</label>*/}
          {/*        <br />*/}

          {/*        {activeStep4Arm ? (*/}


          {/*          <div className="grid grid-cols-2">*/}
          {/*            {injures.arm.map((item) => (*/}
          {/*              <>*/}
          {/*                <div>*/}
          {/*                  <input*/}
          {/*                    type="checkbox"*/}
          {/*                    className="border-2 shadow-xl mx-2 "*/}
          {/*                    onChange={(e) =>*/}
          {/*                      setInjuryListFunction(e.target.checked, item, "Arm")*/}
          {/*                    }*/}
          {/*                  />*/}
          {/*                  <label>{item}</label>*/}
          {/*                </div>*/}
          {/*              </>*/}
          {/*            ))}*/}
          {/*          </div>*/}


          {/*        ) : (<></>)}*/}

          {/*        <input*/}
          {/*          type="checkbox"*/}
          {/*          className="border-2 shadow-xl mx-2 "*/}
          {/*          value={"Legs"}*/}
          {/*          onChange={(e) =>*/}
          {/*            setActiveStep4Legs(!activeStep4Legs)*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <label className="text-lg my-4  px-4 py-1 my-8">Legs</label>*/}
          {/*        <br />*/}
          {/*        {activeStep4Legs ? (*/}

          {/*          <div className="grid grid-cols-2">*/}
          {/*            {injures.leg.map((item) => (*/}
          {/*              <>*/}
          {/*                <div>*/}
          {/*                  <input*/}
          {/*                    type="checkbox"*/}
          {/*                    className="border-2 shadow-xl mx-2 "*/}
          {/*                    onChange={(e) =>*/}
          {/*                      setInjuryListFunction(e.target.checked, item, "Legs")*/}
          {/*                    }*/}
          {/*                  />*/}
          {/*                  <label>{item}</label>*/}
          {/*                </div>*/}
          {/*              </>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        ) : (<></>)}*/}

          {/*        <input*/}
          {/*          type="checkbox"*/}
          {/*          className="border-2 shadow-xl mx-2 "*/}
          {/*          value={"wounds"}*/}
          {/*          onChange={(e) =>*/}
          {/*            setActiveStep4Wounds(!activeStep4Wounds)*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <label className="text-lg my-4  px-4 py-1 my-8">Wounds</label>*/}
          {/*        <br />*/}
          {/*        {activeStep4Wounds ? (*/}
          {/*          <div className="grid grid-cols-2">*/}
          {/*            {injures.wounds.map((item) => (*/}
          {/*              <>*/}
          {/*                <div>*/}
          {/*                  <input*/}
          {/*                    type="checkbox"*/}
          {/*                    className="border-2 shadow-xl mx-2 "*/}
          {/*                    onChange={(e) =>*/}
          {/*                      setInjuryListFunction(e.target.checked, item, "Wounds")*/}
          {/*                    }*/}
          {/*                  />*/}
          {/*                  <label>{item}</label>*/}
          {/*                </div>*/}
          {/*              </>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        ) : (<></>)}*/}

          {/*        <input*/}
          {/*          type="checkbox"*/}
          {/*          className="border-2 shadow-xl mx-2 "*/}
          {/*          value={"burns"}*/}
          {/*          onChange={(e) =>*/}
          {/*            setActiveStep4Burns(!activeStep4Burns)*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <label className="text-lg my-4  px-4 py-1 my-8">Burns</label>*/}
          {/*        {activeStep4Burns ? (*/}
          {/*          <div className="grid grid-cols-2">*/}
          {/*            {injures.burns.map((item) => (*/}
          {/*              <>*/}
          {/*                <div>*/}
          {/*                  <input*/}
          {/*                    type="checkbox"*/}
          {/*                    className="border-2 shadow-xl mx-2 "*/}
          {/*                    onChange={(e) =>*/}
          {/*                      setInjuryListFunction(e.target.checked, item, "Burns")*/}
          {/*                    }*/}
          {/*                  />*/}
          {/*                  <label>{item}</label>*/}
          {/*                </div>*/}
          {/*              </>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        ) : (<></>)}*/}
          {/*        <br />*/}
          {/*        <input*/}
          {/*          type="checkbox"*/}
          {/*          className="border-2 shadow-xl mx-2 "*/}
          {/*          value={"suddenIllness"}*/}
          {/*          onChange={(e) =>*/}
          {/*            setActiveStep4SuddenIllness(!activeStep4SuddenIllness)*/}
          {/*          }*/}
          {/*        />*/}
          {/*        <label className="text-lg my-4  px-4 py-1 my-8">*/}
          {/*          Sudden Illness*/}
          {/*        </label>*/}
          {/*        {activeStep4SuddenIllness ? (*/}
          {/*          <div className="grid grid-cols-2">*/}
          {/*            {injures.suddenIllness.map((item) => (*/}
          {/*              <>*/}
          {/*                <div>*/}
          {/*                  <input*/}
          {/*                    type="checkbox"*/}
          {/*                    className="border-2 shadow-xl mx-2 "*/}
          {/*                    onChange={(e) =>*/}
          {/*                      setInjuryListFunction(e.target.checked, item, "Illness")*/}
          {/*                    }*/}
          {/*                  />*/}
          {/*                  <label>{item}</label>*/}
          {/*                </div>*/}
          {/*              </>*/}
          {/*            ))}*/}
          {/*          </div>*/}
          {/*        ) : (<></>)}*/}

          {/*      </div>*/}
          {/*    ) : activeStep == 4 ? (*/}
          {/*      <div>*/}
          {/*        <div className="container">*/}
          {/*          <label className="text-md px-2">S.A.M.P.L.E:</label>*/}
          {/*          {sampleAnnagram.map((item) => (*/}
          {/*            <div>*/}
          {/*              <input*/}
          {/*                className="mx-2 border-2 shadow-xl my-2"*/}
          {/*                type="text"*/}
          {/*                placeholder={item}*/}
          {/*                onChange={(e) => setSample(e.target.value, item)}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*          ))}*/}

          {/*          <br />*/}
          {/*        </div>*/}

          {/*        <div>*/}
          {/*          {" "}*/}
          {/*          <br /> <label className="text-md">Active:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={active}*/}
          {/*            onChange={(e) => setActive(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br /> <label className="text-md">Distressed:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={distressed}*/}
          {/*            onChange={(e) => setDistressed(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br /> <label className="text-md">Passive:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={passive}*/}
          {/*            onChange={(e) => setPassive(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br /> <label className="text-md">Spinal:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={spinal}*/}
          {/*            onChange={(e) => setSpinal(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*        </div>*/}

          {/*        <div>*/}
          {/*          <br /> <label className="text-md">Active Front:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={activeFront}*/}
          {/*            onChange={(e) => setActiveFront(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br /> <label className="text-md">Active Rear:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={activeRear}*/}
          {/*            onChange={(e) => setActiveRear(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br /> <label className="text-md">Passive Front:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={passiveFront}*/}
          {/*            onChange={(e) => setPassiveFront(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br />*/}
          {/*          <label className="text-md">Passive Rear:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={passiveRear}*/}
          {/*            onChange={(e) => setPassiveRear(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br /> <label className="text-md">Passive Submerged:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={passiveSubmerged}*/}
          {/*            onChange={(e) => setPassiveSubmerged(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br /> <label className="text-md">Surface Spinal:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={surfaceSpinal}*/}
          {/*            onChange={(e) => setSurfaceSpinal(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br /> <label className="text-md">Submerged Spinal:</label>*/}
          {/*          <input*/}
          {/*            className="mx-2"*/}
          {/*            type="checkbox"*/}
          {/*            value={submergedSpinal}*/}
          {/*            onChange={(e) => setSubmergedSpinal(e.target.checked)}*/}
          {/*          />{" "}*/}
          {/*          <br />{" "}*/}
          {/*        </div>*/}
          {/*        <br />*/}
          {/*      </div>*/}
          {/*    ) : activeStep == 5 ? (*/}

          {/*      <div className="container ">*/}
          {/*        <div className="text-xl">Witness Information</div>*/}
          {/*        {wa.length < 3 ? (*/}
          {/*          <button onClick={() => addAWitness()} className="btn btn-lg text-white text-xl px-4 py-2 bg-red-500">*/}
          {/*            Add a Witness*/}
          {/*          </button>*/}
          {/*        ) : (*/}
          {/*          <></>*/}
          {/*        )}*/}
          {/*        <>*/}
          {/*          {witnessArray.map((item, i) => (*/}
          {/*            <>*/}
          {/*              <div className="">*/}
          {/*                <label className="text-md">Witness Name:</label>*/}
          {/*                <br />*/}
          {/*                <input*/}
          {/*                  type="text"*/}
          {/*                  value={witnessName}*/}
          {/*                  onChange={(e) => setWitnessName(e.target.value)}*/}
          {/*                />*/}
          {/*              </div>{" "}*/}
          {/*              <div>*/}
          {/*                <label className="text-md">Witness Phone:</label>*/}
          {/*                <br />*/}
          {/*                <input*/}
          {/*                  type="tel"*/}
          {/*                  placeholder="123-456-7890"*/}
          {/*                  value={witnessPhone}*/}
          {/*                  onChange={(e) => setWitnessPhone(e.target.value)}*/}
          {/*                />*/}
          {/*              </div>{" "}*/}
          {/*              <div>*/}
          {/*                <label className="text-md">Witness Address:</label>*/}
          {/*                <br />*/}
          {/*                <input*/}
          {/*                  type="text"*/}
          {/*                  value={witnessAddress}*/}
          {/*                  onChange={(e) => setWitnessAddress(e.target.value)}*/}
          {/*                />*/}
          {/*              </div>{" "}*/}
          {/*              <div>*/}
          {/*                <label className="text-md">Witness City:</label>*/}
          {/*                <br />*/}
          {/*                <input*/}
          {/*                  type="text"*/}
          {/*                  value={witnessCity}*/}
          {/*                  onChange={(e) => setWitnessCity(e.target.value)}*/}
          {/*                />*/}
          {/*              </div>{" "}*/}
          {/*              <div>*/}
          {/*                <label className="text-md">Witness State:</label>*/}
          {/*                <br />*/}
          {/*                <input*/}
          {/*                  type="text"*/}
          {/*                  placeholder="Ex: TX, AL, MD"*/}
          {/*                  value={witnessState}*/}
          {/*                  onChange={(e) => setWitnessState(e.target.value)}*/}
          {/*                />*/}
          {/*              </div>{" "}*/}
          {/*              <div>*/}
          {/*                <label className="text-md">Zip:</label>*/}
          {/*                <br />*/}
          {/*                <input*/}
          {/*                  type="text"*/}
          {/*                  placeholder="0000"*/}
          {/*                  value={witnessZip}*/}
          {/*                  onChange={(e) => setWitnessZip(e.target.value)}*/}
          {/*                />*/}
          {/*              </div>*/}
          {/*            </>*/}
          {/*          ))}*/}
          {/*        </>*/}
          {/*      </div>*/}
          {/*    ) : (*/}
          {/*      <div className="container mx-auto p-4 m-4">*/}
          {/*        <br />*/}
          {/*        <div>*/}
          {/*          <label className="text-md">Name of the person completing the report:</label>*/}
          {/*          <br />*/}
          {/*          <input*/}
          {/*            type="text"*/}
          {/*            value={reportFilerName}*/}
          {/*            onChange={(e) => setReportFiler(e.target.value)}*/}
          {/*          />{" "}*/}
          {/*          <br />*/}
          {/*          <label className="text-md">Reporter Signature:</label>*/}
          {/*          <br />*/}
          {/*          <button onClick={() => sigPad.clear()} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>*/}

          {/*          <div className="bg-white max-w-md mx-auto">*/}
          {/*            <SignaturePad*/}
          {/*              style={{ width: 40 }}*/}
          {/*              canvasProps={{*/}
          {/*                maxWidth: 500,*/}
          {/*                minWidth: 100,*/}
          {/*                width: window.innerWidth,*/}
          {/*                height: 200,*/}

          {/*                backgroundColor: "#fff",*/}
          {/*              }}*/}
          {/*              onEnd={trim}*/}
          {/*              ref={(ref) => {*/}
          {/*                sigPad = ref;*/}
          {/*              }}*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*        </div>{" "}*/}
          {/*        <br />*/}
          {/*        <div>*/}
          {/*          <label className="text-md">Manager Name:</label>*/}
          {/*          <br />*/}
          {/*          <input*/}
          {/*            type="text"*/}
          {/*            value={managerName}*/}
          {/*            onChange={(e) => setManagerName(e.target.value)}*/}
          {/*          />{" "}*/}
          {/*          <br />*/}
          {/*          <label className="text-md">Manager Signature:</label>*/}
          {/*          <br />*/}

          {/*          <button onClick={() => sigPad2.clear()} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>*/}

          {/*          <div className="bg-white max-w-md mx-auto">*/}
          {/*            <SignaturePad*/}
          {/*              style={{ width: 40 }}*/}
          {/*              canvasProps={{*/}
          {/*                maxWidth: 500,*/}
          {/*                minWidth: 100,*/}
          {/*                width: window.innerWidth,*/}
          {/*                height: 200,*/}
          {/*                backgroundColor: "#fff",*/}
          {/*              }}*/}
          {/*              onEnd={trim2}*/}
          {/*              ref={(ref) => {*/}
          {/*                sigPad2 = ref;*/}
          {/*              }}*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*        </div>{" "}*/}
          {/*        <br />*/}
          {/*        <div>*/}
          {/*          <label className="text-md">Supervisor Name:</label>*/}
          {/*          <br />*/}
          {/*          <input*/}
          {/*            type="text"*/}
          {/*            value={supName}*/}
          {/*            onChange={(e) => setSupName(e.target.value)}*/}
          {/*          />{" "}*/}
          {/*          <br />*/}
          {/*          <label className="text-md">Supervisor Signature:</label>*/}
          {/*          <br />*/}
          {/*          <button onClick={() => sigPad3.clear()} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>*/}

          {/*          <div className="bg-white max-w-md mx-auto">*/}
          {/*            <SignaturePad*/}
          {/*              style={{ width: 40 }}*/}
          {/*              canvasProps={{*/}
          {/*                maxWidth: 500,*/}
          {/*                minWidth: 100,*/}
          {/*                width: window.innerWidth,*/}
          {/*                height: 200,*/}
          {/*                backgroundColor: "#fff",*/}
          {/*              }}*/}
          {/*              onEnd={trim3}*/}
          {/*              ref={(ref) => {*/}
          {/*                sigPad3 = ref;*/}
          {/*              }}*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*        </div>{" "}*/}
          {/*      </div>*/}
          {/*    )}*/}
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
            activeStep={activeStep}
          />
        </div>
      </ScrollView>
    </>
  );
};

export default IncidentReport;
