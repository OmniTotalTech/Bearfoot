import React from 'react';
import SignaturePad from "react-signature-canvas";

const StepSixPCR = (props) => {

    const [localState, setLocalState] = React.useState({
        witness1Sig: "",
        witness2Sig: "",
        witness3Sig: "",
        reporterSig: "",
        reporterName:"",
        managerSig: "",
        managerName:"",
        supervisorSig: "",
        supervisorName: ""
    })

    let sigPad = {};
    let sigPad2 = {};
    let sigPad3 = {};
    let witnessSigPad1 = {};
    let witnessSigPad2 = {};
    let witnessSigPad3 = {};



    const witnessRender = (props) => {
        return (
            props.witnessArray?.length > 0 ? (
                props.witnessArray.map((item,i) => (

                    <>
                        <div>
                            <label className="text-md"> {item.name.length > 0 ? item.name + "'s" : `Witness ${i+1}'s`} Signature:</label>
                            <br />
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (i == 0) {
                                    witnessSigPad1.clear();
                                    setLocalState({...localState, witness1Sig: ""})
                                    props.setStepData("step6",localState);
                                }
                                if (i == 1) {
                                    witnessSigPad2.clear();
                                    setLocalState({...localState, witness2Sig: ""})
                                    props.setStepData("step6",localState);
                                }
                                if (i == 2) {
                                    witnessSigPad3.clear();
                                    setLocalState({...localState, witness3Sig: ""})
                                    props.setStepData("step6",localState);
                                }

                            }} className="px-4 py-2 bg-red-500 btn btn-lg text-white">
                                Clear Signature
                            </button>

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
                                    onEnd={() => {
                                        if(i == 0)  {
                                            setLocalState({...localState, witness1Sig : witnessSigPad1.getTrimmedCanvas().toDataURL("image/png")});

                                        }
                                        if(i == 1){
                                            setLocalState({...localState, witness2Sig : witnessSigPad2.getTrimmedCanvas().toDataURL("image/png")});
                                        }
                                        if(i == 2)  {
                                            setLocalState({...localState, witness3Sig : witnessSigPad3.getTrimmedCanvas().toDataURL("image/png")});
                                        }
                                            props.setStepData("step6",localState);

                                    }}
                                    ref={(ref) => {
                                        if(i == 0)  witnessSigPad1 = ref;
                                        if(i == 1)  witnessSigPad2 = ref;
                                        if(i == 2)  witnessSigPad3 = ref;
                                    }}
                                />
                            </div>
                        </div>{" "}
                    </>
                ))
            ) : (<></>)
        )
    }

    return (
        <>
        <div className={"bg-red-500 w-full"}>
            <h2 className="text-3xl text-white px-2 bold my-2">Finalization</h2>
        </div>
        <div className="container mx-auto px-2 mb-4">
            {witnessRender(props)}
            <br />
            <div>
                <label className="text-md">Name of the person completing the report:</label>
                <br />
                <input
                    type="text"
                    value={localState.reporterName}
                    onChange={(e) => setLocalState({...localState,reporterName: e.target.value})}
                />{" "}
                <br />
                <label className="text-md">Reporter Signature:</label>
                <br />
                <button onClick={(e) => (e.preventDefault(),sigPad.clear())} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>

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
                        onEnd={() => {
                            setLocalState({...localState, reporterSig : sigPad2.getTrimmedCanvas().toDataURL("image/png")});
                            props.setStepData("step6",localState);

                        }}
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
                    value={localState.managerName}
                    onChange={(e) => setLocalState({...localState,managerName: e.target.value})}
                />{" "}
                <br />
                <label className="text-md">Manager Signature:</label>
                <br />

                <button onClick={(e) => (e.preventDefault(),sigPad2.clear())} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>

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
                        onEnd={() => {
                            setLocalState({...localState, managerSig : sigPad2.getTrimmedCanvas().toDataURL("image/png")});
                            props.setStepData("step6",localState);

                        }}
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
                    value={localState.supervisorName}
                    onChange={(e) => setLocalState({...localState,supervisorName: e.target.value})}
                />{" "}
                <br />
                <label className="text-md">Supervisor Signature:</label>
                <br />

                <button onClick={(e) => (e.preventDefault(), sigPad3.clear())} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>

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
                        onEnd={() => {
                            setLocalState({...localState, supervisorSig : sigPad3.getTrimmedCanvas().toDataURL("image/png")});
                            props.setStepData("step6",localState);

                        }}
                        ref={(ref) => {
                            sigPad3 = ref;
                        }}
                    />
                </div>
            </div>{" "}
        </div>
        </>
    )

}

export default StepSixPCR