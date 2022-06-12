import React, { useEffect, useState } from 'react';
import SignaturePad from "react-signature-canvas";
import useDynamicRefs from 'use-dynamic-refs';

const PatientCareFormRendering = (props) => {

    const [getRef, setRef] = useDynamicRefs();


    function handleNameInput(value, type, index) {
        console.log(props.patronInfoArray)
        let propsArrayObj = props.patronInfoArray[index];

        if (type == "name") propsArrayObj.name = value
        if (type == "email") propsArrayObj.email = value
        if (type == "phone") propsArrayObj.phone = value

        console.log(propsArrayObj);
        props.updatePatronArray(propsArrayObj, index);
    }

    function HandleMainStateUpdate(data, index, prop) {
        let s = props.allSigs;
        console.log(data, index);

        s[index] = { data: data, info: prop };
        props.setAllSigs(s)

    }

    const handleRefChange = (e) => {
        console.log(e.target.checked);
        let c = e.target.checked;
        if (c)
            setRef(e.target.value)

    }

    function SigPad(props) {

        const [trimmedDataURL, setTrimmedDataURL] = useState(null)
        const [sigPadRef, setSigPadRef] = useState({})


        const trim = (data, index,) => {
            let sig = sigPadRef.getTrimmedCanvas().toDataURL('image/png')
            setTrimmedDataURL(sig)
            HandleMainStateUpdate(sig, index, props.props)
        }

        return <SignaturePad
            style={{ width: 40 }}
            canvasProps={{
                maxWidth: 500,
                minWidth: 100,
                width: window.innerWidth,
                height: 200,
                backgroundColor: "#fff",
            }}
            onEnd={(data, i) => trim(data, props.index)}
            ref={(ref) => { setSigPadRef(ref) }}
        />
    }

    const QuestionRendering = () => (
        <>

            <div>
                <div className="container p-4  my-8 ">
                    <br />
                    <label className="text-2xl"> Patron Info</label>
                    <br />
                    <button
                        className="px-4 py-2 text-white bg-red-500 rounded"
                        onClick={() => props.handleAddPatronInfo()}
                    >

                        Add another patron to the report

                    </button>
                </div>
                <div>
                    {/*  You can begin to render questions here  */}

                    <div className={`grid grid-cols-2`} style={{ display: `${props.activeStep == 1 ? "grid" : "none"}` }}>

                        {props.patronInfoArray ?
                            props.patronInfoArray.map((newItem, k) => (
                                <>
                                    <div className="my-8">

                                        <h2 className="text-2xl">
                                            Enter Info for patron #{k + 1})
                                        </h2>

                                        <label className="text-md"> Name</label>
                                        <br />
                                        <input onChange={(e) => handleNameInput(e.target.value, "name", k)}
                                            type="text"
                                        />
                                        <br />

                                        <label className="text-md">Phone</label>
                                        <br />

                                        <input onChange={(e) => handleNameInput(e.target.value, "phone", k)}
                                            type="text"
                                        />
                                        <br />

                                        <label className="text-md">Email</label>
                                        <br />

                                        <input onChange={(e) => handleNameInput(e.target.value, "email", k)}
                                            type="text"
                                        />
                                    </div>
                                </>
                            )) : (
                                <></>
                            )}
                    </div>
                    <div className="container p-4 mx-auto max-w-2xl" style={{ display: `${props.activeStep == 2 ? "grid" : "none"}` }}>
                        <div>
                            <label className="text-md">Event Description</label>
                            <br />
                            <div className="w-11/12">
                                <textarea
                                    type="textarea"
                                    className="w-full"
                                    rows={6}
                                    value={props.eventDescription}
                                    onChange={(e) => props.setEventDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-md">Resolution Description</label>
                            <br />
                            <div className="w-11/12">
                                <textarea
                                    type="textarea"
                                    className="w-full"
                                    rows={6}
                                    value={props.resDescription}
                                    onChange={(e) => props.setResDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="container p-4 mx-auto max-w-2xl" style={{ display: `${props.activeStep == 3 ? "grid" : "none"}` }}>
                        <>
                            <div className="p-4">
                                <div className="container max-w-md mx-auto">

                                    {props.patronInfoArray ? (
                                        props.patronInfoArray.map((piaItem, idx) => (
                                            <>
                                                <div>
                                                    <input onChange={handleRefChange} className="checkbox" type="checkbox" />

                                                </div>
                                                <div>
                                                    <label className="font-lg font-weight-500">Signature pad for: {piaItem.name ? piaItem.name : `Patron ${idx}`}</label>
                                                </div>
                                                <div className='bg-white'>
                                                    <SigPad props={piaItem} index={idx} setAllSigs={props.setAllSigs} />
                                                    <div />
                                                </div>
                                            </>
                                        ))
                                    ) : (<></>)}
                                </div>


                            </div>
                        </>
                    </div>

                </div>
            </div>
        </>
    )


    return (
        <>
            <div className="mx-auto text-center">
                <>
                    {props.activeStep == 1 ? (
                        <div className={`display-inline mx-auto`}>
                            <button
                                className="p-4 text-white bg-red-500 rounded"
                                onClick={() => props.nextStep(props.activeStep + 1)}
                            >
                                Next
                            </button>
                        </div>
                    ) : (<></>)}

                </>
                {props.activeStep == 2 ? (

                    <div className="display-inline mx-auto">
                        <button
                            className="p-4 text-white bg-red-500 rounded mx-2 "
                            onClick={() => props.nextStep(props.activeStep - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className="p-4 text-white bg-red-500 rounded mx-2 "
                            onClick={() => props.nextStep(props.activeStep + 1)}
                        >
                            Next
                        </button>
                    </div>
                ) : (<></>)}
                {props.activeStep == 3 ? (

                    <div className="display-inline mx-auto my-4">
                        <button
                            className="p-4 text-white bg-red-500 rounded mx-2"
                            onClick={() => props.nextStep(props.activeStep - 1)}
                        >
                            Previous
                        </button>
                        <button
                            onClick={props.handleFinalSubmit}
                            className="p-4 text-white bg-red-500 rounded mx-2 "
                        >
                            Submit
                        </button>
                    </div>
                ) : (<></>)}

            </div>
            {QuestionRendering(props.patronInfoArray)}

        </>
        //end of return
    )
}

export default PatientCareFormRendering