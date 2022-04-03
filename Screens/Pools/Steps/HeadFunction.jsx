import React from 'react';

const HeadFunction = (props) => {
    console.log(props)



    return (
        <>
            <div>
                {" "}
                <label className="text-xl my-8">Injury Type</label>
            </div>
            <input
                type="checkbox"
                className="border-2 shadow-xl mx-2 "
                value={"activeHead"}
                onChange={(e) =>
                    props.handleStateChange(e.target.value, e.target.checked)
                }
            />
            <label className="text-lg my-4  px-4 py-1 my-8">Head</label>
            <br />
            {props.localState.activeHead ? (
                <div className="grid grid-cols-2">
                    {injures.Head.map((item) => (
                        <>
                            <div>
                                <input
                                    type="checkbox"
                                    className="border-2 shadow-xl mx-2 "
                                    value={item}
                                    onChange={(e) =>
                                        props.setInjuryListFunction(e.target.checked, item, "Head")
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
    )
}

export default HeadFunction;