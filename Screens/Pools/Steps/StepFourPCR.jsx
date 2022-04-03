import React from 'react';

const StepFourPCR = (props) => {


    let [localState, setLocalState] = React.useState({
        active: false,
        distressed: false,
        passive: false,
        spinal: false,
        activeFront: false,
        activeRear: false,
        passiveFront: false,
        passiveRear: false,
        passiveSubmerged: false,
        surfaceSpinal: false,
        submergedSpinal: false,
        sampleArray: []
    })

    const [sampleArray, setSampleArray] = React.useState([
        {letter: "S", value: ""},
        {letter: "A", value: ""},
        {letter: "M", value: ""},
        {letter: "P", value: ""},
        {letter: "L", value: ""},
        {letter: "E", value: ""},
    ]);

    const updateMasterState = () => {
        props.setStepData("step4",localState);
    }
    const setSample = (value, item, i) => {
        let sa = sampleArray;

        sa[i].value = value;

        setSampleArray(sa);
        setLocalState({...localState,sampleArray: sa})
        updateMasterState();
    }

    const setBoolChanges = (key,value) => {

        let ls = localState;

        ls[`${key}`] = value;

        setLocalState({...ls})

        updateMasterState()

    }
    return (
        <div className="container">
            <div className={"w-full bg-red-500 text-white"}>

            <label className="text-3xl px-2">S.A.M.P.L.E:</label>
            </div>
            {sampleArray.map((item,i) => (
                <div>
                    <input
                        className="mx-2 border-2 shadow-xl my-2"
                        type="text"
                        placeholder={item.letter}
                        onChange={(e) => setSample(e.target.value, item,i)}
                    />
                </div>
            ))}

            <div className={"w-full bg-red-500 text-white"}>
                <label className="text-3xl my-4 ">Type Of Rescue</label>

            </div>
            <div className="px-2 my-4">
                <div>
                    <label className="text-2xl ">Active:</label>
                    <input
                        className="mx-2"
                        type="checkbox"
                        value={localState.active}
                        onChange={(e) => setBoolChanges("active", e.target.checked)}
                    />
                    {localState.active ? (
                        <div className="grid grid-cols-1">
                            <div>
                                <label className="text-sm">Front:</label>
                                <input
                                    className="mx-2"
                                    type="checkbox"
                                    value={localState.activeFront}
                                    onChange={(e) => setBoolChanges("activeFront", e.target.checked)}
                                />
                            </div>
                            <div>
                                <label className="text-sm">Rear:</label>
                                <input
                                    className="mx-2"
                                    type="checkbox"
                                    value={localState.activeRear}
                                    onChange={(e) => setBoolChanges("activeRear", e.target.checked)}
                                />
                            </div>
                        </div>
                    ):(
                        <>
                        </>
                    )}

                </div>
                <label className="text-2xl my-2">Distressed:</label>
                <input
                    className="mx-2"
                    type="checkbox"
                    value={localState.distressed}
                    onChange={(e) => setBoolChanges("distressed", e.target.checked)}
                />{" "}
                <br /> <label className="text-2xl my-2">Passive:</label>
                <input
                    className="mx-2"
                    type="checkbox"
                    value={localState.passive}
                    onChange={(e) => setBoolChanges("passive", e.target.checked)}
                />
                {localState.passive ? (
                    <>
                        <div className="grid grid-cols-1">
                            <div>
                                <input
                                    className="mx-2"
                                    type="checkbox"
                                    value={localState.passiveFront}
                                    onChange={(e) => setBoolChanges("passiveFront", e.target.checked)}
                                />
                                <label className="text-sm">Front</label>

                            </div>
                            <div>
                                <input
                                    className="mx-2"
                                    type="checkbox"
                                    value={localState.passiveRear}
                                    onChange={(e) => setBoolChanges("passiveRear", e.target.checked)}
                                />
                                <label className="text-sm">Rear</label>
                            </div>


                            <div>
                                <input
                                    className="mx-2"
                                    type="checkbox"
                                    value={localState.passiveSubmerged}
                                    onChange={(e) => setBoolChanges("passiveSubmerged", e.target.checked)}
                                />
                                <label className="text-sm">Submerged</label>

                            </div>
                        </div>
                    </>
                ):(
                    <></>
                )}

                <br />
                <label className="text-2xl my-2">Spinal:</label>
                <input
                    className="mx-2"
                    type="checkbox"
                    value={localState.spinal}
                    onChange={(e) => setBoolChanges("spinal", e.target.checked)}
                />
                {localState.spinal ? (

                    <div className="grid grid-cols-1">
                    <div>
                        <label className="text-sm">Surface:</label>
                        <input
                            className="mx-2"
                            type="checkbox"
                            value={localState.surfaceSpinal}
                            onChange={(e) => setBoolChanges("surfaceSpinal", e.target.checked)}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Submerged:</label>
                        <input
                            className="mx-2"
                            type="checkbox"
                            value={localState.submergedSpinal}
                            onChange={(e) => setBoolChanges("submergedSpinal", e.target.checked)}
                        />
                    </div>
                </div>
                ):(
                    <></>
                )}
            </div>
        </div>
    )
}

export default StepFourPCR;