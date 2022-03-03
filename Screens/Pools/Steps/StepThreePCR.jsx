import React from 'react'

const StepThreePCR = (props) => {

    const [activeHead, setActiveHead] = React.useState(false)
    const [activeTorso, setActiveTorso] = React.useState(false)
    const [activeArm, setActiveArm] = React.useState(false)
    const [activeLegs, setActiveLegs] = React.useState(false)
    const [activeWounds, setActiveWounds] = React.useState(false)
    const [activeBurns, setActiveBurns] = React.useState(false)
    const [activeSuddenIllness, setActiveSuddenIllness] = React.useState(false)
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
    return (
        <div className="container p-4 bg-white max-w-2xl mx-auto text-left">
                    <div>
                      {" "}
                      <label className="text-xl my-8">Injury Type</label>
                    </div>
                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"Head"}
                      onChange={(e) =>
                        setActiveHead(!activeHead)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 my-8">Head</label>
                    <br />
                    {activeHead ? (
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

                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"Torso"}
                      onChange={(e) =>
                        setActiveTorso(!activeTorso)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 my-8">Torso</label>
                    <br />
                    {activeTorso ? (
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

                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"Arm"}
                      onChange={(e) =>
                        setActiveArm(!activeArm)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 my-8">Arm</label>
                    <br />

                    {activeArm ? (


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

                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"Legs"}
                      onChange={(e) =>
                        setActiveLegs(!activeLegs)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 my-8">Legs</label>
                    <br />
                    {activeLegs ? (

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
                      value={"wounds"}
                      onChange={(e) =>
                        setActiveWounds(!activeWounds)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 my-8">Wounds</label>
                    <br />
                    {activeWounds ? (
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

                    <input
                      type="checkbox"
                      className="border-2 shadow-xl mx-2 "
                      value={"burns"}
                      onChange={(e) =>
                        setActiveBurns(!activeBurns)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 my-8">Burns</label>
                    {activeBurns ? (
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
                      value={"suddenIllness"}
                      onChange={(e) =>
                        setActiveSuddenIllness(!activeSuddenIllness)
                      }
                    />
                    <label className="text-lg my-4  px-4 py-1 my-8">
                      Sudden Illness
                    </label>
                    {activeSuddenIllness ? (
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
    )
}

export default StepThreePCR