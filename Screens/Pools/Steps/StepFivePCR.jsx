import React from 'react';
import { useEffect } from 'react';

let RenderWitnessArray = (props) => (

    props.wa.map((item, i) => (
        <>
            <div className={"my-2"}>
                <div className="my-2">
                    <h1 className='text-3xl'>Witness {i + 1} )</h1>
                </div>
                <div className="my-2">
                    <label className="text-xl">Name:</label>
                    <br />
                    <input
                        type="text"
                    // value={witnessName}
                    // onChange={(e) => setWitnessName(e.target.value)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">Phone:</label>
                    <br />
                    <input
                        type="tel"
                        placeholder="123-456-7890"
                    // value={witnessPhone}
                    // onChange={(e) => setWitnessPhone(e.target.value)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">Address:</label>
                    <br />
                    <input
                        type="text"
                    // value={witnessAddress}
                    // onChange={(e) => setWitnessAddress(e.target.value)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">City:</label>
                    <br />
                    <input
                        type="text"
                    // value={witnessCity}
                    // onChange={(e) => setWitnessCity(e.target.value)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">State:</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Ex: TX, AL, MD"
                    // value={witnessState}
                    // onChange={(e) => setWitnessState(e.target.value)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">Zip:</label>
                    <br />
                    <input
                        type="text"
                        placeholder="0000"
                    // value={witnessZip}
                    // onChange={(e) => setWitnessZip(e.target.value)}
                    />
                </div>
            </div>
        </>
    ))

)

const StepFivePCR = (props) => {


    const { witnessArray, setWitnessArray } = props

    return (
        <>

            <div className="container ">

                <div className="text-xl">Witness Information</div>
                <button className={"w-full px-4 py-2 text-white bg-red-500"} onClick={(e) => (e.preventDefault(), witnessArray.length < 3 ? props.setWitnessArray(
                    [...props.witnessArray, {
                        id: 0,
                        name: "",
                        phone: "",
                        address: "",
                        city: "",
                        state: "",
                        zip: null
                    }]
                ) : null
                )}>
                    Add A Witness
                </button>
                <RenderWitnessArray wa={props.witnessArray} />

            </div>
        </>
    )
}

export default StepFivePCR