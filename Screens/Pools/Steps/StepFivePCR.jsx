import React from 'react';

let RenderWitnessArray = (props) => {

    const updateState = (key,value,index) => {

        let wa = props.wa;

        wa[index][`${key}`] = value;

        props.swa(wa);
    }


    return (
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
                    onChange={(e) => updateState("name",e.target.value, i)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">Phone:</label>
                    <br />
                    <input
                        type="tel"
                        placeholder="123-456-7890"
                    // value={witnessPhone}
                        onChange={(e) => updateState("phone",e.target.value, i)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">Address:</label>
                    <br />
                    <input
                        type="text"
                    // value={witnessAddress}
                        onChange={(e) => updateState("address",e.target.value, i)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">City:</label>
                    <br />
                    <input
                        type="text"
                    // value={witnessCity}
                        onChange={(e) => updateState("city",e.target.value, i)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">State:</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Ex: TX, AL, MD"
                    // value={witnessState}
                        onChange={(e) => updateState("state",e.target.value, i)}
                    />
                </div>{" "}
                <div className="my-2">
                    <label className="text-lg">Zip:</label>
                    <br />
                    <input
                        type="text"
                        placeholder="0000"
                    // value={witnessZip}
                        onChange={(e) => updateState("zip",e.target.value, i)}
                    />
                </div>
            </div>
        </>
    ))

)}

const StepFivePCR = (props) => {


    const { witnessArray, setWitnessArray } = props

    const handle = (arr) => {
        setWitnessArray(arr)
    }

    return (
        <>

            <div className="container ">

                <div className={"w-full bg-red-500 text-white"}>
                    <h2 className="text-3xl px-4">Witness Information</h2>
                </div>
                <button className={"w-full px-4 py-2 text-white bg-blue-300 my-4"} onClick={(e) => (e.preventDefault(), witnessArray.length < 3 ? props.setWitnessArray(
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
                <RenderWitnessArray wa={props.witnessArray} swa={handle} />

            </div>
        </>
    )

}

export default StepFivePCR