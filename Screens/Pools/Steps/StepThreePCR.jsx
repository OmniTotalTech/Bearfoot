import React, {useEffect} from 'react'
import HeadFunction from "./HeadFunction";

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

const StepThreePCR = (props) => {


    const [localState,setLocalState] = React.useState({
        activeHead: false,
        activeTorso: false,
        activeArm: false,
        activeLegs: false,
        activeWounds: false,
        activeBurns: false,
        activeSuddenIllness: false,
        injuryList : []
    })

    const [,updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState());

    const setInjuryListFunction = (value, item, injuryType) => {
        let oldArray = localState.injuryList;

        if (oldArray.some(function(o){return o[`${item}` === item]})){
            console.log("already found");
        } else {
            console.log("not found")
            let newElement = { type: injuryType, checked: value, value: item };
            oldArray.push(newElement);
        }
        setLocalState({...localState, injuryList: oldArray})

        props.setStepData("step3",localState);

        forceUpdate();

        //let newElement = { type: injuryType, checked: value, value: item };



    }

    const handleStateChange = (value, boolReceived) => {
        let ls = localState;


        if(ls[value] == undefined){
            console.log("couldnt find key");
            return
        }

        if(ls[value] != undefined){
            console.log(ls)
            ls[value] = boolReceived;

            setLocalState({...ls})
            props.setStepData("step3",ls);

        }

        //forceUpdate();


    }


    return (
        <>
        <div className={"bg-red-500 w-full"}>
            <h2 className="text-3xl text-white px-2 bold">Injury Information</h2>
        </div>
        <div className="container p-4 bg-white max-w-2xl mx-auto text-left">
            {/*<HeadFunction handleStateChange={handleStateChange} setInjuryListFunction={setInjuryListFunction}/>*/}
            <>
                <br />

                <input
                    type="checkbox"
                    className="border-2 shadow-xl mx-2 "
                    value={"activeHead"}
                    onChange={(e) =>
                        handleStateChange(e.target.value, e.target.checked)
                    }
                />

                <label className="text-lg  px-4 py-1 ">Head</label>
                {localState.activeHead ? (
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
                ) : (
                    <></>
                )}
            </>
            <br />

            <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"activeTorso"}
                      onChange={(e) =>
                          handleStateChange(e.target.value, e.target.checked)
                      }
                    />
                    <label className="text-lg  px-4 py-1">Torso</label>

            {localState.activeTorso ? (
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
                      </div>
                    ) : (<></>)}
            <br />

                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"activeArm"}
                      onChange={(e) =>
                          handleStateChange(e.target.value, e.target.checked)
                      }
                    />
                    <label className="text-lg  px-4 py-1 ">Arm</label>

                    {localState.activeArm ? (


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


                    ) : (<></>)}
            <br />

                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"activeLegs"}
                      onChange={(e) =>
                          handleStateChange(e.target.value, e.target.checked)
                      }
                    />
                    <label className="text-lg px-4 py-1 ">Legs</label>
                    <br />

            {localState.activeLegs ? (

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
                    ) : (<></>)}
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"activeWounds"}
                      onChange={(e) =>
                          handleStateChange(e.target.value, e.target.checked)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 ">Wounds</label>
            {localState.activeWounds ? (
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
                    ) : (<></>)}
            <br />

            <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"activeBurns"}
                      onChange={(e) =>
                          handleStateChange(e.target.value, e.target.checked)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 ">Burns</label>

            {localState.activeBurns ? (
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
                    ) : (<></>)}
                    <br />
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"activeSuddenIllness"}
                      onChange={(e) =>
                          handleStateChange(e.target.value, e.target.checked)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 ">
                      Sudden Illness
                    </label>

            {localState.activeSuddenIllness ? (
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
                    ) : (<></>)}
            </div>

            </>
    )
}





export default StepThreePCR