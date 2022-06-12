import React, { useEffect } from 'react';

export const InformationSections = (props) => {



    const handleMovedIndex = (movingIndex, targetIndex) => {


        let data = props.state.accordionData;
        let tempdata = data[movingIndex];

        data[movingIndex] = data[targetIndex];
        data[targetIndex] = tempdata;


        data.forEach((item, i) => {
            if (item.headerText == null || item.headerText == undefined) {
                item.headerText = ""
            }

            if (item.bodyText == null || item.bodyText == undefined) {
                item.bodyText = ""
            }
        })

        props.updateState(data)

    }

    const handleChange = (value, i, type) => {
        let data = props.state.accordionData;
        console.log(data)

        if (type == "header") {
            data[i].headerText = value.toString();
        }

        if (type == "body") {
            data[i].bodyText = value.toString()
        }

        props.updateState(data)


    }

    return (
        <>
            {console.log(props.state)}
            {props.state.accordionData.length > 0 ? (
                props.state.accordionData.map((item, i) => (
                    <>
                        <div>
                            <p>{i + 1})</p>
                            <div >
                                <p className="italic font-italic font-weight-900">Move:</p>
                                <div className="row w-100">
                                    <button onClick={() => handleMovedIndex(i, i - 1)} className="bg-gray-600 btn-block btn text-white px-4 py-2 my-2">Up</button>
                                    <button onClick={() => handleMovedIndex(i, i + 1)} className="bg-blue-700 text-white btn-block btn px-4 py-2 my-2">Down</button>
                                </div>
                            </div>
                            <label className="text-xl">Header</label>
                            <br />
                            <textarea onChange={(e) => handleChange(e.target.value, i, "header")} style={{ borderWidth: 5 }} value={item.headerText} className="text-xl border border-danger" />
                            <br />
                            <label className="text-lg">Body</label>
                            <br />
                            <textarea onChange={(e) => handleChange(e.target.value, i, "body")} style={{ borderWidth: 5 }} value={item.bodyText} className="text-md border border-danger" />

                            <div>
                                {props.state.accordionData[i].images != null &&
                                    props.state.accordionData[i].images.length > 0 ? (
                                    props.state.accordionData[
                                        i
                                    ].images.map((item) => (
                                        <img
                                            src={item.image}
                                            alt="..."
                                            className="shadow object-contain h-32  align-middle border-none object-contain"
                                        />
                                    ))
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <button
                                className="bg-red-500 text-white px-4 py-2 my-2"
                                onClick={() => props.handlePoolDetailDelete(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                ))
            ) : (
                <div></div>
            )}
        </>
    )
}